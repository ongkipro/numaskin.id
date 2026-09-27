#!/usr/bin/env python3
"""
upload_all_collection_banners.py
Uploads and attaches 3:2 WebP featured images to all 8 collections on Shopify:
1. Home page (frontpage)
2. Semua Produk (all-products)
3. Pembersih & Toner (cleanser-toner)
4. Serum & Perawatan Intensif (serum-treatment)
5. Pelembap & Krim Pagi (moisturizer-day-cream)
6. Tabir Surya & Perlindungan (sunscreen-protection)
7. Paket Hemat & Bundling (paket-hemat-bundling)
8. Anti-Aging Series (anti-aging-series)
"""

import subprocess
import json
import os
import requests
import time

STORE = "y2x75f-40.myshopify.com"
COLLECTIONS_DIR = "/Users/ongki/Documents/shopee/numaskin/public/images/collections"

COLLECTIONS_CONFIG = [
    {
        "handle": "frontpage",
        "id": "gid://shopify/Collection/500130513142",
        "title": "Home page",
        "filename": "collection-frontpage-hero-banner.webp",
        "alt": "Numa Skin Deep Sea Water Skincare Hero Collection Banner"
    },
    {
        "handle": "all-products",
        "id": "gid://shopify/Collection/500131234038",
        "title": "Semua Produk",
        "filename": "collection-semua-produk-banner.webp",
        "alt": "Koleksi Lengkap Skincare Numa Skin Resmi"
    },
    {
        "handle": "cleanser-toner",
        "id": "gid://shopify/Collection/500131266806",
        "title": "Pembersih & Toner",
        "filename": "collection-pembersih-toner-banner.webp",
        "alt": "Pembersih Wajah dan Hydrating Treatment Lotion Numa Skin"
    },
    {
        "handle": "serum-treatment",
        "id": "gid://shopify/Collection/500131299574",
        "title": "Serum & Perawatan Intensif",
        "filename": "collection-serum-treatment-banner.webp",
        "alt": "Serum Konsentrat Anti Aging NAD+ Booster Numa Skin"
    },
    {
        "handle": "moisturizer-day-cream",
        "id": "gid://shopify/Collection/500131332342",
        "title": "Pelembap & Krim Pagi",
        "filename": "collection-pelembap-krim-pagi-banner.webp",
        "alt": "Moisturizer Adenosine dan Gloss Gel Barrier Numa Skin"
    },
    {
        "handle": "sunscreen-protection",
        "id": "gid://shopify/Collection/500131365110",
        "title": "Tabir Surya & Perlindungan",
        "filename": "collection-tabir-surya-perlindungan-banner.webp",
        "alt": "Oxydew Sunscreen Luceane SPF 50+ PA++++ Numa Skin"
    },
    {
        "handle": "paket-hemat-bundling",
        "id": "gid://shopify/Collection/500131397878",
        "title": "Paket Hemat & Bundling",
        "filename": "collection-paket-hemat-bundling-banner.webp",
        "alt": "Paket Hemat Rutinitas Skincare Lengkap Numa Skin"
    },
    {
        "handle": "anti-aging-series",
        "id": "gid://shopify/Collection/500131430646",
        "title": "Anti-Aging Series",
        "filename": "collection-anti-aging-series-banner.webp",
        "alt": "Rangkaian Perawatan Anti Aging dan Peremajaan Kulit Numa Skin"
    }
]

def run_gql(query, variables=None, retries=5):
    cmd = ["shopify", "store", "execute", "-s", STORE, "-j", "--allow-mutations", "-q", query]
    if variables:
        cmd.extend(["-v", json.dumps(variables)])
    for attempt in range(retries):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            out = res.stdout.strip()
            idx = out.find("{")
            if idx != -1:
                data = json.loads(out[idx:])
                return data.get("data", data)
            time.sleep(2 * (attempt + 1))
        except Exception as e:
            time.sleep(2 * (attempt + 1))
    raise RuntimeError("GraphQL request failed after retries")

# 1. Staged Upload Query
Q_STAGED = """
mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
  stagedUploadsCreate(input: $input) {
    userErrors { field message }
    stagedTargets {
      url
      resourceUrl
      parameters { name value }
    }
  }
}
"""

# 2. File Create Mutation
Q_FILE_CREATE = """
mutation fileCreate($files: [FileCreateInput!]!) {
  fileCreate(files: $files) {
    userErrors { field message }
    files {
      id
      fileStatus
    }
  }
}
"""

# 3. File Status Query
Q_FILE_STATUS = """
query getFile($id: ID!) {
  node(id: $id) {
    ... on MediaImage {
      fileStatus
      image {
        url
      }
    }
  }
}
"""

# 4. Collection Update Mutation
Q_COLLECTION_UPDATE = """
mutation collectionUpdate($input: CollectionInput!) {
  collectionUpdate(input: $input) {
    userErrors { field message }
    collection {
      id
      title
      handle
      image {
        url
        altText
        width
        height
      }
    }
  }
}
"""

def upload_and_attach(cfg, idx, total):
    col_id = cfg["id"]
    title = cfg["title"]
    filename = cfg["filename"]
    alt = cfg["alt"]
    img_path = os.path.join(COLLECTIONS_DIR, filename)

    if not os.path.exists(img_path):
        print(f"[{idx}/{total}] ❌ File not found: {img_path}")
        return False

    print(f"\n[{idx}/{total}] 🚀 Processing: {title} ({filename})...")

    # Step A: Staged upload
    v_staged = {
        "input": [{
            "filename": filename,
            "mimeType": "image/webp",
            "resource": "IMAGE",
            "httpMethod": "POST"
        }]
    }
    res_s = run_gql(Q_STAGED, v_staged)
    targets = res_s.get("stagedUploadsCreate", {}).get("stagedTargets", [])
    if not targets:
        print(f"  ❌ Failed to get staged upload target for {filename}")
        return False
    
    target = targets[0]
    upload_url = target["url"]
    resource_url = target["resourceUrl"]
    params = {p["name"]: p["value"] for p in target["parameters"]}

    # Step B: POST to GCS
    with open(img_path, "rb") as f:
        r = requests.post(upload_url, data=params, files={"file": (filename, f, "image/webp")}, timeout=30)
    if r.status_code not in (200, 201, 204):
        print(f"  ❌ GCS upload failed with status {r.status_code}")
        return False
    print(f"  ✅ Uploaded to storage (status: {r.status_code})")

    # Step C: fileCreate
    res_f = run_gql(Q_FILE_CREATE, {
        "files": [{
            "originalSource": resource_url,
            "contentType": "IMAGE",
            "alt": alt
        }]
    })
    files = res_f.get("fileCreate", {}).get("files", [])
    if not files:
        print(f"  ❌ fileCreate failed: {res_f}")
        return False
    file_id = files[0]["id"]

    # Step D: Poll until READY
    cdn_url = None
    for attempt in range(15):
        time.sleep(1.5)
        res_st = run_gql(Q_FILE_STATUS, {"id": file_id})
        node = res_st.get("node", {})
        status = node.get("fileStatus")
        if status == "READY":
            cdn_url = node.get("image", {}).get("url")
            break
    
    if not cdn_url:
        print(f"  ❌ File {file_id} not ready in time")
        return False
    print(f"  ✅ File ready on Shopify CDN: {cdn_url[:65]}...")

    # Step E: collectionUpdate
    res_u = run_gql(Q_COLLECTION_UPDATE, {
        "input": {
            "id": col_id,
            "image": {
                "src": cdn_url,
                "altText": alt
            }
        }
    })
    col_res = res_u.get("collectionUpdate", {})
    errs = col_res.get("userErrors", [])
    if errs:
        print(f"  ❌ Failed to update collection image: {errs}")
        return False
    
    col_img = col_res.get("collection", {}).get("image", {})
    print(f"  🎉 SUCCESS! Attached featured image to {title} ({col_img.get('width')}x{col_img.get('height')})")
    return True

def main():
    print(f"=== UPLOADING 3:2 WEBP FEATURED IMAGES TO ALL 8 COLLECTIONS ===")
    total = len(COLLECTIONS_CONFIG)
    success_count = 0

    for idx, cfg in enumerate(COLLECTIONS_CONFIG, 1):
        if upload_and_attach(cfg, idx, total):
            success_count += 1

    print(f"\n=== UPLOAD SUMMARY: {success_count}/{total} COLLECTIONS UPDATED ===")

    # Final independent verification
    print("\nVerifying all collections in store:")
    q_verify = """
    query {
      collections(first: 10) {
        nodes {
          id
          title
          handle
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    """
    v_data = run_gql(q_verify)
    for c in v_data.get("collections", {}).get("nodes", []):
        img = c.get("image")
        if img:
            print(f"  ✅ {c['title']} ({c['handle']}): {img['width']}x{img['height']} | Alt: '{img['altText']}'")
        else:
            print(f"  ❌ {c['title']} ({c['handle']}): NO IMAGE")

if __name__ == "__main__":
    main()
