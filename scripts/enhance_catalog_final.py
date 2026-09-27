#!/usr/bin/env python3
"""
enhance_catalog_final.py
Applies all 4 requirements across all 50 Numa Skin products:
1. Dynamic psychological compareAtPrice (harga coret dinamis)
2. inventoryPolicy: CONTINUE (continue selling when out of stock)
3. publishablePublish (publish to all sales channels: Online Store + POS)
4. Upload official product-video.mp4 to product media gallery
"""

import os
import json
import time
import math
import subprocess
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

STORE = "y2x75f-40.myshopify.com"
DATA_DIR = "/Users/ongki/Documents/shopee/numaskin/data"
PUBLIC_DIR = "/Users/ongki/Documents/shopee/numaskin/public"
PROGRESS_FILE = os.path.join(DATA_DIR, "shopify_enhance_progress.json")
MAX_WORKERS = 3

ONLINE_STORE_PUB = "gid://shopify/Publication/223613124854"
POS_PUB = "gid://shopify/Publication/223613157622"

lock = threading.Lock()

def run_graphql(query, variables=None, retries=3):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--allow-mutations"]
    cmd.extend(["--query", query])
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    
    for attempt in range(retries):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=90)
            if res.returncode != 0:
                time.sleep(2 * (attempt + 1))
                continue
            out = res.stdout.strip()
            idx = out.find("{")
            if idx == -1:
                time.sleep(2 * (attempt + 1))
                continue
            data = json.loads(out[idx:])
            if "data" in data:
                return data["data"]
            return data
        except Exception as e:
            if attempt == retries - 1:
                raise e
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"GraphQL failed after {retries} retries.")

def format_idr_compare_at(price, raw_cap):
    """
    Rounds up to clean Indonesian psychological pricing:
    e.g. 98,750 -> 99,000 | 123,750 -> 125,000 | 171,250 -> 175,000
    680,625 -> 685,000 | 801,875 -> 805,000
    Always guarantees compareAtPrice > price.
    """
    p = float(price)
    c = float(raw_cap) if raw_cap else p * 1.35
    if c <= p:
        c = p * 1.35
    
    thousands = math.ceil(c / 1000.0)
    last_digit = thousands % 10
    if last_digit == 0:
        clean = thousands * 1000
    elif last_digit <= 5:
        clean = (thousands - last_digit + 5) * 1000
    else:
        clean = (thousands - last_digit + 9) * 1000
    
    if clean <= p:
        clean = (math.ceil(p / 10000.0) * 10 + 9) * 1000
    return f"{int(clean)}.00"

def upload_video_file(video_path, filename):
    fsize = os.path.getsize(video_path)
    q_stage = """
    mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url
          resourceUrl
          parameters {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }
    """
    var_stage = {
        "input": [{
            "resource": "VIDEO",
            "filename": filename,
            "mimeType": "video/mp4",
            "fileSize": str(fsize),
            "httpMethod": "POST"
        }]
    }
    res = run_graphql(q_stage, var_stage)
    target = res["stagedUploadsCreate"]["stagedTargets"][0]
    params = {p["name"]: p["value"] for p in target["parameters"]}
    
    with open(video_path, "rb") as f:
        r = requests.post(target["url"], data=params, files={"file": (os.path.basename(video_path), f, "video/mp4")}, timeout=120)
        if r.status_code not in (200, 201, 204):
            raise RuntimeError(f"GCS upload failed with status {r.status_code}: {r.text}")
    
    return target["resourceUrl"]

def process_product(item, video_path, current_idx, total_count, progress_data):
    handle = item["handle"]
    title = item["title"]

    # Check progress
    if handle in progress_data and progress_data[handle].get("status") == "SUCCESS":
        print(f"[{current_idx}/{total_count}] ⏩ Already enhanced: {title}")
        return handle, "SKIPPED"

    print(f"[{current_idx}/{total_count}] 🚀 Enhancing: {title}...")

    # 1. Fetch current product details from Shopify
    q_get = """
    query($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        variants(first: 10) {
          edges {
            node {
              id
              title
              price
              compareAtPrice
              inventoryPolicy
            }
          }
        }
        media(first: 30) {
          edges {
            node {
              id
              mediaContentType
            }
          }
        }
      }
    }
    """
    prod_data = run_graphql(q_get, {"handle": handle})
    prod = prod_data.get("productByHandle")
    if not prod:
        print(f"[{current_idx}/{total_count}] ❌ Product not found on Shopify: {handle}")
        return handle, "NOT_FOUND"

    pid = prod["id"]
    shopify_variants = [e["node"] for e in prod["variants"]["edges"]]
    existing_media = [e["node"] for e in prod["media"]["edges"]]
    has_video = any(m["mediaContentType"] == "VIDEO" for m in existing_media)

    # 2. Update Variants: Harga Coret Dinamis + Continue Selling
    cat_variants = item.get("variants", [])
    bulk_variants = []

    for i, sv in enumerate(shopify_variants):
        p_val = float(sv["price"])
        # Find raw compare at price from catalog
        raw_cap = None
        if i < len(cat_variants) and cat_variants[i].get("compareAtPrice"):
            raw_cap = cat_variants[i]["compareAtPrice"]
        elif item.get("compareAtPrice"):
            raw_cap = item["compareAtPrice"]
        
        dyn_cap = format_idr_compare_at(p_val, raw_cap)
        bulk_variants.append({
            "id": sv["id"],
            "price": f"{int(p_val)}.00" if p_val.is_integer() else str(sv["price"]),
            "compareAtPrice": dyn_cap,
            "inventoryPolicy": "CONTINUE"
        })

    q_bulk = """
    mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          compareAtPrice
          inventoryPolicy
        }
        userErrors {
          field
          message
        }
      }
    }
    """
    res_bulk = run_graphql(q_bulk, {"productId": pid, "variants": bulk_variants})
    bulk_errors = res_bulk.get("productVariantsBulkUpdate", {}).get("userErrors", [])
    if bulk_errors:
        print(f"[{current_idx}/{total_count}] ⚠️ Variant update warning for {handle}: {bulk_errors}")

    # 3. Publish to all sales channels (Online Store + POS)
    q_pub = """
    mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        userErrors {
          field
          message
        }
      }
    }
    """
    pub_vars = {
        "id": pid,
        "input": [
            {"publicationId": ONLINE_STORE_PUB},
            {"publicationId": POS_PUB}
        ]
    }
    run_graphql(q_pub, pub_vars)

    # 4. Upload Video if available and not yet attached
    video_uploaded = False
    if video_path and os.path.exists(video_path) and not has_video:
        try:
            video_filename = f"{handle}-showcase.mp4"
            res_url = upload_video_file(video_path, video_filename)
            
            # Construct files payload preserving all existing media IDs
            files_payload = [{"id": m["id"]} for m in existing_media]
            files_payload.append({
                "contentType": "VIDEO",
                "originalSource": res_url,
                "alt": f"{title} - Official Product Video",
                "filename": video_filename
            })

            q_set = """
            mutation productSet($input: ProductSetInput!) {
              productSet(input: $input) {
                userErrors {
                  field
                  message
                }
              }
            }
            """
            run_graphql(q_set, {"input": {"id": pid, "files": files_payload}})
            video_uploaded = True
        except Exception as e:
            print(f"[{current_idx}/{total_count}] ⚠️ Video upload exception for {handle}: {e}")

    with lock:
        progress_data[handle] = {
            "title": title,
            "productId": pid,
            "variants_updated": len(bulk_variants),
            "published_channels": ["Online Store", "Point of Sale"],
            "inventory_policy": "CONTINUE",
            "video_attached": has_video or video_uploaded,
            "status": "SUCCESS",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        with open(PROGRESS_FILE, "w") as f:
            json.dump(progress_data, f, indent=2)

    v_status = "📹 Video Added" if video_uploaded else ("🎥 Has Video" if has_video else "No Video")
    print(f"[{current_idx}/{total_count}] 🎉 Enhanced: {title} | Coret: {bulk_variants[0]['compareAtPrice']} | Inv: CONTINUE | {v_status}")
    return handle, "SUCCESS"

def main():
    with open(os.path.join(DATA_DIR, "shopify_clean_catalog.json")) as f:
        catalog = json.load(f)

    with open(os.path.join(DATA_DIR, "videos.json")) as f:
        videos = json.load(f)

    all_items = catalog["singles"] + catalog["bundles"]
    total = len(all_items)

    # Build video map
    video_map = {}
    for it in all_items:
        slug = it["slug"]
        pv = None
        for v in videos:
            if v.get("type") == "product":
                if v["productSlug"] == slug or v["productSlug"] in it["handle"] or slug in v["productSlug"]:
                    pv = v
                    break
        if pv:
            abs_p = os.path.join(PUBLIC_DIR, pv["localUrl"].lstrip("/"))
            if os.path.exists(abs_p):
                video_map[it["handle"]] = abs_p

    print(f"Total Products to enhance: {total}")
    print(f"Products with verified local videos: {len(video_map)}")

    progress_data = {}
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE) as f:
                progress_data = json.load(f)
        except Exception:
            progress_data = {}

    t0 = time.time()
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {}
        for idx, item in enumerate(all_items, start=1):
            v_path = video_map.get(item["handle"])
            f = executor.submit(process_product, item, v_path, idx, total, progress_data)
            futures[f] = item["handle"]

        for future in as_completed(futures):
            handle = futures[future]
            try:
                future.result()
            except Exception as e:
                print(f"❌ Error processing {handle}: {e}")

    duration = time.time() - t0
    success_count = sum(1 for v in progress_data.values() if v.get("status") == "SUCCESS")
    print("\n" + "="*45)
    print(f"Enhancement complete in {duration:.1f}s!")
    print(f"Total Success: {success_count}/{total}")
    print(f"Progress recorded in: {PROGRESS_FILE}")
    print("="*45)

if __name__ == "__main__":
    main()
