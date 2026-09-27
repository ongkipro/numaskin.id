#!/usr/bin/env python3
"""
update_vendor.py
Updates the vendor field on all 50 products in Shopify store y2x75f-40.myshopify.com
to 'Numaskin' (without space).
"""

import subprocess
import json
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

STORE = "y2x75f-40.myshopify.com"
DESIRED_VENDOR = "Numa Skin"

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

QUERY_PRODUCTS = """
query {
  products(first: 60) {
    nodes {
      id
      title
      handle
      vendor
    }
  }
}
"""

MUTATION_UPDATE_VENDOR = """
mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    userErrors {
      field
      message
    }
    product {
      id
      title
      vendor
    }
  }
}
"""

def update_product_vendor(p, idx, total):
    pid = p["id"]
    title = p["title"]
    cur_v = p.get("vendor")

    if cur_v == DESIRED_VENDOR:
        with lock:
            print(f"[{idx}/{total}] ⏩ Already '{DESIRED_VENDOR}': {title}")
        return True

    res = run_gql(MUTATION_UPDATE_VENDOR, {"input": {"id": pid, "vendor": DESIRED_VENDOR}})
    errs = res.get("productUpdate", {}).get("userErrors", [])
    if errs:
        with lock:
            print(f"[{idx}/{total}] ❌ Failed to update vendor for {title}: {errs}")
        return False
    else:
        with lock:
            print(f"[{idx}/{total}] ✅ Vendor updated to '{DESIRED_VENDOR}': {title}")
        return True

def main():
    print(f"=== UPDATING VENDOR TO '{DESIRED_VENDOR}' FOR ALL PRODUCTS ===")
    data = run_gql(QUERY_PRODUCTS)
    products = data.get("products", {}).get("nodes", [])
    total = len(products)
    print(f"Found {total} products.\n")

    success_count = 0
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(update_product_vendor, p, idx, total) for idx, p in enumerate(products, 1)]
        for f in as_completed(futures):
            if f.result():
                success_count += 1

    print(f"\nUpdate completed: {success_count} / {total} products processed.")

    # Verification
    print("\n=== RUNNING INDEPENDENT VERIFICATION ===")
    vdata = run_gql(QUERY_PRODUCTS)
    v_products = vdata.get("products", {}).get("nodes", [])
    
    vendors_found = set(p.get("vendor") for p in v_products)
    all_ok = (vendors_found == {DESIRED_VENDOR})

    print(f"Distinct vendors found across all {len(v_products)} products: {vendors_found}")
    print(f"Verification Result: {'PASS - All products have vendor ' + DESIRED_VENDOR if all_ok else 'FAIL'}")

if __name__ == "__main__":
    main()
