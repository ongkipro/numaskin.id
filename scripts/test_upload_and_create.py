#!/usr/bin/env python3
"""
test_upload_and_create.py
Pilot test to verify image staged upload and productSet mutation on Shopify
"""

import os
import json
import subprocess
import requests

STORE = "y2x75f-40.myshopify.com"

def run_graphql(query, variables=None):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--allow-mutations"]
    cmd.extend(["--query", query])
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"Shopify CLI failed: {res.stderr}\n{res.stdout}")
    output = res.stdout.strip()
    idx = output.find("{")
    if idx == -1:
        raise ValueError(f"No JSON found in response:\n{output}")
    data = json.loads(output[idx:])
    if "data" in data:
        return data["data"]
    return data

def upload_image(local_path, filename):
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
    res = run_graphql(staged_query, {
        "input": [{
            "resource": "IMAGE",
            "filename": filename,
            "mimeType": "image/jpeg",
            "httpMethod": "POST"
        }]
    })
    target = res["stagedUploadsCreate"]["stagedTargets"][0]
    upload_url = target["url"]
    resource_url = target["resourceUrl"]
    params = {p["name"]: p["value"] for p in target["parameters"]}

    with open(local_path, "rb") as f:
        files = {"file": (filename, f, "image/jpeg")}
        r = requests.post(upload_url, data=params, files=files)
        if r.status_code not in (200, 201, 204):
            raise RuntimeError(f"Failed to upload to staged URL {r.status_code}: {r.text}")
    
    print(f"✔ Uploaded {filename} -> {resource_url}")
    return resource_url

def main():
    with open("/Users/ongki/Documents/shopee/numaskin/data/shopify_clean_catalog.json") as f:
        catalog = json.load(f)

    with open("/Users/ongki/Documents/shopee/numaskin/data/shopify_collections.json") as f:
        collections_map = json.load(f)

    pilot = catalog["singles"][0] # Facial wash
    print(f"Testing pilot: {pilot['title']}")

    # Upload first 2 images for pilot test
    files_payload = []
    for media_item in pilot["media"][:2]:
        res_url = upload_image(media_item["local_path"], media_item["seo_filename"])
        files_payload.append({
            "originalSource": res_url,
            "alt": media_item["alt_text"],
            "contentType": "IMAGE",
            "filename": media_item["seo_filename"]
        })

    # Prepare collections GIDs
    col_gids = [collections_map[c] for c in pilot["collections"] if c in collections_map]

    # Prepare productSet input
    product_input = {
        "title": pilot["title"],
        "handle": pilot["handle"],
        "descriptionHtml": pilot["bodyHtml"],
        "vendor": "Numa Skin",
        "productType": pilot["productType"],
        "tags": pilot["tags"],
        "status": "ACTIVE",
        "seo": {
            "title": pilot["metaTitle"][:60],
            "description": pilot["metaDescription"][:155]
        },
        "collections": col_gids,
        "files": files_payload,
        "productOptions": [{"name": "Title", "values": [{"name": "Default Title"}]}],
        "variants": [{
            "optionValues": [{"optionName": "Title", "name": "Default Title"}],
            "price": str(pilot["price"]),
            "compareAtPrice": str(pilot["compareAtPrice"]),
            "sku": pilot["variants"][0]["sku"]
        }]
    }

    m_set = """
    mutation productSet($input: ProductSetInput!) {
      productSet(input: $input) {
        product {
          id
          title
          handle
          status
          variants(first: 5) {
            nodes {
              id
              price
              compareAtPrice
              sku
            }
          }
          media(first: 5) {
            nodes {
              alt
              mediaContentType
            }
          }
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
        print(f"❌ UserErrors: {json.dumps(errors, indent=2)}")
    else:
        prod = data.get("product", {})
        print(f"🎉 SUCCESS! Created product:\n{json.dumps(prod, indent=2)}")

if __name__ == "__main__":
    main()
