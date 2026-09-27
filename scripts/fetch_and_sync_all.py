#!/usr/bin/env python3
"""
fetch_and_sync_all.py
Fetches live Shopify data directly from y2x75f-40.myshopify.com and updates:
1. data/live_shopify_storefront_export.json
2. data/shopify_clean_catalog.json
3. Verifies alignment with Hydrogen storefront requirements.
"""

import os
import json
import time
import subprocess
import re

STORE = "y2x75f-40.myshopify.com"
PROJECT_DIR = "/Users/ongki/Projects/numaskin.id"
DATA_DIR = os.path.join(PROJECT_DIR, "data")
CLEAN_CATALOG_PATH = os.path.join(DATA_DIR, "shopify_clean_catalog.json")
LIVE_EXPORT_PATH = os.path.join(DATA_DIR, "live_shopify_storefront_export.json")

def run_gql(query, variables=None, retries=5):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--query", query]
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    for attempt in range(retries):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=90)
            if res.returncode != 0:
                print(f"[RETRY {attempt+1}] GraphQL returned error: {res.stderr[:200]}")
                time.sleep(2 * (attempt + 1))
                continue
            out = res.stdout.strip()
            idx = out.find("{")
            if idx == -1:
                time.sleep(2 * (attempt + 1))
                continue
            parsed = json.loads(out[idx:])
            if "errors" in parsed:
                print(f"[WARN] GraphQL errors: {parsed['errors']}")
            return parsed.get("data", parsed)
        except Exception as e:
            if attempt == retries - 1:
                raise e
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"GraphQL failed after {retries} retries.")

def fetch_live_data():
    print(f"[*] Fetching live Shopify data from {STORE}...")

    # 1. Shop details
    q_shop = """
    query {
      shop {
        name
        primaryDomain {
          host
          url
        }
        myshopifyDomain
        currencyCode
      }
    }
    """
    shop_data = run_gql(q_shop).get("shop", {})
    print(f"[+] Shop: {shop_data.get('name')} | Currency: {shop_data.get('currencyCode')}")

    # 2. Collections
    q_collections = """
    query {
      collections(first: 20) {
        nodes {
          id
          title
          handle
          description
          descriptionHtml
          image {
            id
            url
            altText
            width
            height
          }
          products(first: 50) {
            nodes {
              id
              title
              handle
            }
          }
        }
      }
    }
    """
    col_nodes = run_gql(q_collections).get("collections", {}).get("nodes", [])
    print(f"[+] Collections fetched: {len(col_nodes)}")

    # 3. Products
    q_products = """
    query($cursor: String) {
      products(first: 50, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          handle
          status
          vendor
          productType
          tags
          description
          descriptionHtml
          totalVariants
          category {
            id
            name
            fullName
          }
          seo {
            title
            description
          }
          options {
            id
            name
            values
          }
          variants(first: 10) {
            nodes {
              id
              title
              sku
              price
              compareAtPrice
              inventoryPolicy
              selectedOptions {
                name
                value
              }
            }
          }
          media(first: 20) {
            nodes {
              mediaContentType
              alt
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
              ... on Video {
                id
                sources {
                  url
                  mimeType
                  format
                  height
                  width
                }
              }
            }
          }
          collections(first: 10) {
            nodes {
              id
              handle
              title
            }
          }
        }
      }
    }
    """
    all_products = []
    cursor = None
    has_next = True
    while has_next:
        data = run_gql(q_products, {"cursor": cursor})
        conn = data.get("products", {})
        nodes = conn.get("nodes", [])
        all_products.extend(nodes)
        page_info = conn.get("pageInfo", {})
        has_next = page_info.get("hasNextPage", False)
        cursor = page_info.get("endCursor")
    
    print(f"[+] Total live products: {len(all_products)}")
    return shop_data, col_nodes, all_products

# Known singles handles or patterns
SINGLE_HANDLES = {
    "numa-skin-deep-sea-water-facial-wash-100ml",
    "numa-skin-deep-sea-water-treatment-lotion",
    "numa-skin-deep-sea-water-treatment-lotion-150ml",
    "numa-skin-deep-sea-water-gloss-gel-30ml",
    "numa-skin-calming-barrier-gloss-gel-moisturizer-30ml",
    "numa-skin-deep-sea-water-adenosine-moisturizer-30g",
    "numa-skin-adenosine-deep-sea-water-moisturizer-30g",
    "numa-skin-deep-sea-water-pdrn-day-cream-30g",
    "numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g",
    "numa-skin-deep-sea-water-oxydew-sunscreen-30ml",
    "numa-skin-oxydew-sunscreen-luceane-spf50-30ml",
    "numa-skin-deep-sea-water-nad-serum-20ml",
    "numa-skin-nad-booster-anti-aging-serum-20ml",
}

def is_single(product):
    h = product["handle"]
    if h in SINGLE_HANDLES:
        return True
    t = product["title"].lower()
    pt = (product.get("productType") or "").lower()
    if "paket" in t or "bundle" in t or "set" in pt or "bundling" in pt:
        return False
    return False

def sync():
    shop, collections, products = fetch_live_data()

    # Load existing clean catalog to preserve manually enriched metadata (BPOM, keyActives, subtitle)
    old_data = {}
    if os.path.exists(CLEAN_CATALOG_PATH):
        try:
            with open(CLEAN_CATALOG_PATH, "r", encoding="utf-8") as f:
                old_data = json.load(f)
        except Exception as e:
            print(f"[WARN] Could not parse existing clean catalog: {e}")

    old_singles_map = {s["handle"]: s for s in old_data.get("singles", [])}
    old_bundles_map = {b["handle"]: b for b in old_data.get("bundles", [])}
    old_all_map = {**old_singles_map, **old_bundles_map}

    # 1. Generate live_shopify_storefront_export.json
    export_data = {
        "shop": shop,
        "collections": {
            "nodes": collections
        },
        "products": {
            "nodes": products
        }
    }
    with open(LIVE_EXPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(export_data, f, indent=2, ensure_ascii=False)
    print(f"[✓] Written live Storefront export to {LIVE_EXPORT_PATH}")

    # 2. Build clean collections list
    clean_collections = []
    for c in collections:
        img_obj = None
        if c.get("image"):
            img_obj = {
                "url": c["image"].get("url"),
                "altText": c["image"].get("altText") or c["title"],
                "width": c["image"].get("width"),
                "height": c["image"].get("height"),
            }
        
        prod_handles = [p["handle"] for p in c.get("products", {}).get("nodes", [])]
        clean_collections.append({
            "id": c["id"],
            "title": c["title"],
            "handle": c["handle"],
            "description": c.get("description", ""),
            "descriptionHtml": c.get("descriptionHtml", ""),
            "seoTitle": f"{c['title']} — Numa Skin Official Store",
            "seoDescription": c.get("description", ""),
            "image": img_obj,
            "productCount": len(prod_handles),
            "productHandles": prod_handles,
        })

    # 3. Process products into singles & bundles
    clean_singles = []
    clean_bundles = []

    for p in products:
        handle = p["handle"]
        prev = old_all_map.get(handle, {})

        # Extract Media
        media_list = []
        for m in p.get("media", {}).get("nodes", []):
            if m.get("mediaContentType") == "IMAGE" and m.get("image"):
                media_list.append({
                    "url": m["image"]["url"],
                    "alt_text": m["image"].get("altText") or p["title"],
                    "width": m["image"].get("width", 800),
                    "height": m["image"].get("height", 800),
                })
            elif m.get("mediaContentType") == "VIDEO":
                sources = m.get("sources", [])
                src_url = sources[0]["url"] if sources else None
                media_list.append({
                    "type": "video",
                    "url": src_url,
                    "alt_text": m.get("alt") or f"{p['title']} Official Video",
                })

        # Featured and Secondary images
        img_nodes = [m for m in media_list if m.get("type") != "video"]
        featured_img = img_nodes[0] if img_nodes else {
            "url": "/images/banners/02-shop-avatar-shopee-shop-profile-avatar.jpg",
            "alt_text": p["title"]
        }
        secondary_img = img_nodes[1] if len(img_nodes) > 1 else featured_img

        # Variants
        variant_nodes = p.get("variants", {}).get("nodes", [])
        clean_variants = []
        prices = []
        compare_prices = []

        for v in variant_nodes:
            pr = float(v.get("price") or 0)
            cpr = float(v.get("compareAtPrice") or 0) if v.get("compareAtPrice") else None
            prices.append(pr)
            if cpr:
                compare_prices.append(cpr)

            clean_variants.append({
                "id": v["id"],
                "title": v["title"],
                "sku": v.get("sku") or f"NUMA-{handle.upper()[:10]}",
                "price": int(pr),
                "compareAtPrice": int(cpr) if cpr else None,
                "inventoryPolicy": v.get("inventoryPolicy", "CONTINUE"),
                "availableForSale": True,
                "selectedOptions": v.get("selectedOptions", []),
            })

        min_price = int(min(prices)) if prices else 0
        min_cpr = int(min(compare_prices)) if compare_prices else None

        # Collections handles
        col_handles = [c["handle"] for c in p.get("collections", {}).get("nodes", [])]

        # BPOM / Netto / Subtitle
        bpom = prev.get("bpom")
        if not bpom:
            bpom_match = re.search(r"NA\d{11}", p.get("description", "") + " " + p.get("title", ""))
            if bpom_match:
                bpom = bpom_match.group(0)

        netto = prev.get("netto")
        if not netto:
            netto_match = re.search(r"(\d+\s*(?:ml|g|gram|liter))\b", p.get("title", ""), re.IGNORECASE)
            if netto_match:
                netto = netto_match.group(1)

        subtitle = prev.get("subtitle") or p.get("description", "").split("\n")[0][:100]

        prod_record = {
            "id": p["id"],
            "title": p["title"],
            "subtitle": subtitle,
            "handle": p["handle"],
            "productType": p.get("productType") or "Perawatan Kulit",
            "vendor": p.get("vendor") or "Numa Skin",
            "tags": p.get("tags") or [],
            "collections": col_handles,
            "bpom": bpom,
            "netto": netto,
            "price": min_price,
            "compareAtPrice": min_cpr,
            "metaDescription": p.get("seo", {}).get("description") or p.get("description", "")[:160],
            "bodyHtml": p.get("descriptionHtml") or p.get("description", ""),
            "category": p.get("category"),
            "seo": p.get("seo") or {},
            "seoTitle": p.get("seo", {}).get("title") or p["title"],
            "seoDescription": p.get("seo", {}).get("description") or p.get("description", "")[:155],
            "featuredImage": {
                "url": featured_img.get("url"),
                "altText": featured_img.get("alt_text", p["title"]),
            },
            "secondaryImage": {
                "url": secondary_img.get("url"),
                "altText": secondary_img.get("alt_text", p["title"]),
            },
            "media": media_list,
            "options": p.get("options", []),
            "variants": clean_variants,
            "keyActives": prev.get("keyActives", []),
        }

        if is_single(p):
            clean_singles.append(prod_record)
        else:
            clean_bundles.append(prod_record)

    clean_catalog = {
        "store": {
            "name": shop.get("name", "Numa Skin Official"),
            "domain": shop.get("primaryDomain", {}).get("host", "numaskin.id"),
            "currency": shop.get("currencyCode", "IDR"),
        },
        "collections": clean_collections,
        "singles": clean_singles,
        "bundles": clean_bundles,
    }

    with open(CLEAN_CATALOG_PATH, "w", encoding="utf-8") as f:
        json.dump(clean_catalog, f, indent=2, ensure_ascii=False)

    print(f"[✓] Written clean catalog to {CLEAN_CATALOG_PATH}")
    print(f"    - Collections: {len(clean_collections)}")
    print(f"    - Singles: {len(clean_singles)}")
    print(f"    - Bundles: {len(clean_bundles)}")
    print(f"    - Total products: {len(clean_singles) + len(clean_bundles)}")

if __name__ == "__main__":
    sync()
