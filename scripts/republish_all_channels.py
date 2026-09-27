#!/usr/bin/env python3
"""
republish_all_channels.py
Re-publishes all 50 products and all 8 collections to ALL available sales channels:
1. Online Store (gid://shopify/Publication/223613124854)
2. Point of Sale (gid://shopify/Publication/223613157622)
3. Numaskin Official Headless (gid://shopify/Publication/223616663798)
"""

import subprocess
import json
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

STORE = "y2x75f-40.myshopify.com"

PUBLICATIONS = [
    {"name": "Online Store", "id": "gid://shopify/Publication/223613124854"},
    {"name": "Point of Sale", "id": "gid://shopify/Publication/223613157622"},
    {"name": "Numaskin Official Headless", "id": "gid://shopify/Publication/223616663798"},
]

PUB_INPUTS = [{"publicationId": p["id"]} for p in PUBLICATIONS]

MUTATION_PUBLISH = """
mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
  publishablePublish(id: $id, input: $input) {
    userErrors {
      field
      message
    }
  }
}
"""

QUERY_RESOURCES = """
query {
  products(first: 60) {
    nodes {
      id
      title
      handle
      status
    }
  }
  collections(first: 30) {
    nodes {
      id
      title
      handle
    }
  }
}
"""

QUERY_VERIFY = """
query {
  products(first: 60) {
    nodes {
      id
      title
      handle
      resourcePublicationsV2(first: 10) {
        nodes {
          publication {
            name
          }
          isPublished
        }
      }
    }
  }
  collections(first: 30) {
    nodes {
      id
      title
      handle
      resourcePublicationsV2(first: 10) {
        nodes {
          publication {
            name
          }
          isPublished
        }
      }
    }
  }
}
"""

lock = threading.Lock()

def run_gql(query, variables=None, retries=3):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--allow-mutations", "--query", query]
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    for attempt in range(retries):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            out = res.stdout.strip()
            idx = out.find("{")
            if idx == -1:
                time.sleep(1 * (attempt + 1))
                continue
            raw = json.loads(out[idx:])
            return raw.get("data", raw)
        except Exception as e:
            if attempt == retries - 1:
                raise e
            time.sleep(1 * (attempt + 1))
    raise RuntimeError("GraphQL request failed after retries")

def publish_item(item, kind, idx, total):
    item_id = item["id"]
    title = item["title"]
    variables = {
        "id": item_id,
        "input": PUB_INPUTS
    }
    res = run_gql(MUTATION_PUBLISH, variables)
    errs = res.get("publishablePublish", {}).get("userErrors", [])
    if errs:
        with lock:
            print(f"[{idx}/{total}] ❌ Failed to publish {kind} '{title}': {errs}")
        return False
    else:
        with lock:
            print(f"[{idx}/{total}] ✅ Published {kind}: {title}")
        return True

def main():
    print(f"=== RE-PUBLISHING ALL CHANNELS FOR STORE: {STORE} ===")
    print("Channels targeted:")
    for p in PUBLICATIONS:
        print(f"  - {p['name']} ({p['id']})")
    
    # 1. Fetch all items
    data = run_gql(QUERY_RESOURCES)
    products = data.get("products", {}).get("nodes", [])
    collections = data.get("collections", {}).get("nodes", [])

    print(f"\nFound {len(products)} products and {len(collections)} collections.")

    all_tasks = []
    for idx, c in enumerate(collections, 1):
        all_tasks.append((c, "Collection", idx, len(collections)))
    for idx, p in enumerate(products, 1):
        all_tasks.append((p, "Product", idx, len(products)))

    total_tasks = len(all_tasks)
    print(f"\nStarting concurrent publishing for {total_tasks} resources with 4 workers...")
    
    success_count = 0
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(publish_item, item, kind, idx, total) for item, kind, idx, total in all_tasks]
        for f in as_completed(futures):
            if f.result():
                success_count += 1

    print(f"\nPublishing completed: {success_count} / {total_tasks} succeeded.")

    # 2. Verification
    print("\n=== RUNNING INDEPENDENT VERIFICATION ===")
    vdata = run_gql(QUERY_VERIFY)
    v_prods = vdata.get("products", {}).get("nodes", [])
    v_cols = vdata.get("collections", {}).get("nodes", [])

    all_prods_ok = True
    for p in v_prods:
        pubs = {node["publication"]["name"]: node["isPublished"] for node in p.get("resourcePublicationsV2", {}).get("nodes", []) if node.get("publication")}
        for target in ["Online Store", "Point of Sale", "Numaskin Official Headless"]:
            if not pubs.get(target, False):
                all_prods_ok = False
                print(f"[FAIL] Product '{p['title']}' missing publication '{target}' (Current: {pubs})")

    all_cols_ok = True
    for c in v_cols:
        pubs = {node["publication"]["name"]: node["isPublished"] for node in c.get("resourcePublicationsV2", {}).get("nodes", []) if node.get("publication")}
        for target in ["Online Store", "Point of Sale", "Numaskin Official Headless"]:
            if not pubs.get(target, False):
                all_cols_ok = False
                print(f"[FAIL] Collection '{c['title']}' missing publication '{target}' (Current: {pubs})")

    print("\n--- FINAL AUDIT RESULT ---")
    print(f"Products ({len(v_prods)} items): {'ALL PUBLISHED (PASS)' if all_prods_ok else 'SOME MISSING (FAIL)'}")
    print(f"Collections ({len(v_cols)} items): {'ALL PUBLISHED (PASS)' if all_cols_ok else 'SOME MISSING (FAIL)'}")

if __name__ == "__main__":
    main()
