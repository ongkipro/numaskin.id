#!/usr/bin/env python3
"""
create_collections.py
Creates the 7 standardized collections on Shopify (y2x75f-40.myshopify.com)
with SEO titles and descriptions.
Saves collection handles and IDs to data/shopify_collections.json
"""

import os
import json
import subprocess
import time

STORE = "y2x75f-40.myshopify.com"
DATA_DIR = "/Users/ongki/Documents/shopee/numaskin/data"

def run_graphql(query, variables=None):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--allow-mutations"]
    cmd.extend(["--query", query])
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"Shopify CLI failed: {res.stderr}\n{res.stdout}")
    
    # Extract json block from stdout
    output = res.stdout.strip()
    idx = output.find("{")
    if idx == -1:
        raise ValueError(f"No JSON found in response:\n{output}")
    return json.loads(output[idx:])

def main():
    with open(os.path.join(DATA_DIR, "shopify_clean_catalog.json")) as f:
        catalog = json.load(f)

    # First, query existing collections
    print("Checking existing collections...")
    q_existing = """
    query {
      collections(first: 50) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
    """
    existing_res = run_graphql(q_existing)
    existing_map = {}
    for edge in existing_res.get("data", {}).get("collections", {}).get("edges", []):
        node = edge["node"]
        existing_map[node["handle"]] = node["id"]
        print(f"  Existing collection: {node['title']} ({node['handle']}) -> {node['id']}")

    collection_map = dict(existing_map)

    # Create missing collections
    m_create = """
    mutation collectionCreate($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
    """

    for c in catalog["collections"]:
        handle = c["handle"]
        if handle in collection_map:
            print(f"Collection already exists: {c['title']} ({handle})")
            continue

        print(f"Creating collection: {c['title']} ({handle})...")
        input_data = {
            "title": c["title"],
            "handle": handle,
            "descriptionHtml": f"<p>{c['description']}</p>",
            "seo": {
                "title": c["seoTitle"][:60],
                "description": c["seoDescription"][:155]
            },
            "sortOrder": "BEST_SELLING"
        }

        res = run_graphql(m_create, {"input": input_data})
        data = res.get("data", {}).get("collectionCreate", {})
        errors = data.get("userErrors", [])
        if errors:
            print(f"Error creating collection {c['title']}: {errors}")
        else:
            col = data.get("collection")
            if col:
                collection_map[handle] = col["id"]
                print(f"✔ Successfully created: {col['title']} -> {col['id']}")

    # Save collection map
    out_path = os.path.join(DATA_DIR, "shopify_collections.json")
    with open(out_path, "w") as f:
        json.dump(collection_map, f, indent=2)
    print(f"\nSaved {len(collection_map)} collections to {out_path}")

if __name__ == "__main__":
    main()
