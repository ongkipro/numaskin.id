#!/usr/bin/env python3
"""
sync_all_products.py
Batch uploads and syncs all Numa Skin products (8 Singles + 42 Bundles) to Shopify
Using modern productSet mutation with batch staged uploads and multithreading.
Using optimized WebP images, SEO filenames, SEO Alt texts, zero CTA, zero marketplace mentions.
"""

import os
import json
import time
import subprocess
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

STORE = "y2x75f-40.myshopify.com"
DATA_DIR = "/Users/ongki/Documents/shopee/numaskin/data"
PROGRESS_FILE = os.path.join(DATA_DIR, "shopify_sync_progress.json")
MAX_WORKERS = 3

lock = threading.Lock()

def run_graphql(query, variables=None, retries=3):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--allow-mutations"]
    cmd.extend(["--query", query])
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    
    for attempt in range(retries):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if res.returncode != 0:
                time.sleep(2 * (attempt + 1))
                continue
            output = res.stdout.strip()
            idx = output.find("{")
            if idx == -1:
                time.sleep(2 * (attempt + 1))
                continue
            data = json.loads(output[idx:])
            if "data" in data:
                return data["data"]
            return data
        except Exception as e:
            if attempt == retries - 1:
                raise e
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"GraphQL failed after {retries} retries.")

def upload_batch_images(media_list):
    """Uploads all images for a product in a single stagedUploadsCreate call."""
    if not media_list:
        return []
    
    staged_input = []
    valid_media = []
    for m in media_list:
        local_path = m["local_path"]
        # Ensure we point to .webp if it exists
        if not local_path.endswith(".webp"):
            webp_path = os.path.splitext(local_path)[0] + ".webp"
            if os.path.exists(webp_path):
                local_path = webp_path
                m["local_path"] = webp_path
                m["seo_filename"] = os.path.splitext(m["seo_filename"])[0] + ".webp"

        if os.path.exists(local_path):
            ext = os.path.splitext(local_path)[1].lower()
            mime = "image/webp" if ext == ".webp" else ("image/png" if ext == ".png" else "image/jpeg")
            staged_input.append({
                "resource": "IMAGE",
                "filename": m["seo_filename"],
                "mimeType": mime,
                "httpMethod": "POST"
            })
            valid_media.append((m, mime))

    if not staged_input:
        return []

    staged_query = """
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
    res = run_graphql(staged_query, {"input": staged_input})
    data = res.get("stagedUploadsCreate", {})
    targets = data.get("stagedTargets", [])

    files_payload = []
    for idx, target in enumerate(targets):
        m, mime = valid_media[idx]
        upload_url = target["url"]
        resource_url = target["resourceUrl"]
        params = {p["name"]: p["value"] for p in target["parameters"]}

        with open(m["local_path"], "rb") as f:
            files = {"file": (m["seo_filename"], f, mime)}
            r = requests.post(upload_url, data=params, files=files, timeout=30)
            if r.status_code in (200, 201, 204):
                files_payload.append({
                    "originalSource": resource_url,
                    "alt": m["alt_text"],
                    "contentType": "IMAGE",
                    "filename": m["seo_filename"]
                })
            else:
                print(f"Warning: Failed to upload {m['seo_filename']}: status {r.status_code}")
    
    return files_payload

def sync_single_product(item, collections_map, progress_data, current_idx, total_count):
    handle = item["handle"]
    
    # Check if already synced
    if handle in progress_data and progress_data[handle].get("status") == "SUCCESS":
        print(f"[{current_idx}/{total_count}] ⏩ Already synced: {item['title']}")
        return handle, "SKIPPED"

    print(f"[{current_idx}/{total_count}] 🚀 Syncing: {item['title']}...")

    # 1. Upload Images
    files_payload = upload_batch_images(item.get("media", []))

    # 2. Map Collections
    col_gids = [collections_map[c] for c in item.get("collections", []) if c in collections_map]

    # 3. Prepare Options & Variants
    raw_variants = item.get("variants", [])
    has_multiple = len(raw_variants) > 1 and raw_variants[0]["title"] != "Default Title"

    if has_multiple:
        option_name = "Paket"
        option_values = [{"name": v["title"]} for v in raw_variants]
        product_options = [{"name": option_name, "values": option_values}]
        variants_payload = []
        for v in raw_variants:
            variants_payload.append({
                "optionValues": [{"optionName": option_name, "name": v["title"]}],
                "price": str(v["price"]),
                "compareAtPrice": str(v["compareAtPrice"]),
                "sku": v.get("sku", f"NUMA-{handle[:10]}")
            })
    else:
        product_options = [{"name": "Title", "values": [{"name": "Default Title"}]}]
        single_sku = raw_variants[0].get("sku", f"NUMA-{handle[:10]}") if raw_variants else f"NUMA-{handle[:10]}"
        variants_payload = [{
            "optionValues": [{"optionName": "Title", "name": "Default Title"}],
            "price": str(item["price"]),
            "compareAtPrice": str(item["compareAtPrice"]),
            "sku": single_sku
        }]

    # 4. Construct ProductSetInput
    product_input = {
        "title": item["title"],
        "handle": handle,
        "descriptionHtml": item["bodyHtml"],
        "vendor": "Numa Skin",
        "productType": item["productType"],
        "tags": item["tags"],
        "status": "ACTIVE",
        "seo": {
            "title": item["metaTitle"][:60],
            "description": item["metaDescription"][:155]
        },
        "collections": col_gids,
        "productOptions": product_options,
        "variants": variants_payload
    }
    if files_payload:
        product_input["files"] = files_payload

    m_set = """
    mutation productSet($input: ProductSetInput!) {
      productSet(input: $input) {
        product {
          id
          title
          handle
          status
        }
        userErrors {
          field
          message
        }
      }
    }
    """

    res = run_graphql(m_set, {"input": product_input})
    data = res.get("productSet", {})
    errors = data.get("userErrors", [])

    if errors:
        err_msg = json.dumps(errors)
        print(f"[{current_idx}/{total_count}] ❌ Error syncing {item['title']}: {err_msg}")
        return handle, f"ERROR: {err_msg}"
    
    prod = data.get("product", {})
    prod_id = prod.get("id")
    print(f"[{current_idx}/{total_count}] 🎉 Success: {item['title']} -> {prod_id}")

    with lock:
        progress_data[handle] = {
            "title": item["title"],
            "productId": prod_id,
            "status": "SUCCESS",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        with open(PROGRESS_FILE, "w") as f:
            json.dump(progress_data, f, indent=2)

    return handle, "SUCCESS"

def main():
    with open(os.path.join(DATA_DIR, "shopify_clean_catalog.json")) as f:
        catalog = json.load(f)

    with open(os.path.join(DATA_DIR, "shopify_collections.json")) as f:
        collections_map = json.load(f)

    progress_data = {}
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE) as f:
                progress_data = json.load(f)
        except Exception:
            progress_data = {}

    all_items = catalog["singles"] + catalog["bundles"]
    total = len(all_items)
    print(f"Total products to sync: {total} (8 Singles + 42 Bundles)")
    print(f"Running in parallel with {MAX_WORKERS} workers...")

    t0 = time.time()
    results = {}

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_item = {
            executor.submit(sync_single_product, item, collections_map, progress_data, idx + 1, total): item
            for idx, item in enumerate(all_items)
        }

        for future in as_completed(future_to_item):
            item = future_to_item[future]
            try:
                handle, status = future.result()
                results[handle] = status
            except Exception as exc:
                print(f"Exception for {item['title']}: {exc}")
                results[item['handle']] = f"EXCEPTION: {exc}"

    elapsed = time.time() - t0
    success_count = sum(1 for s in results.values() if s in ("SUCCESS", "SKIPPED"))
    print(f"\n==========================================")
    print(f"Sync complete in {elapsed:.1f}s!")
    print(f"Total Success: {success_count}/{total}")
    print(f"Progress recorded in: {PROGRESS_FILE}")
    print(f"==========================================")

if __name__ == "__main__":
    main()
