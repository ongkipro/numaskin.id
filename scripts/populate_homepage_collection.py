#!/usr/bin/env python3
"""
populate_homepage_collection.py
Populates the 'Home page' collection (frontpage) with Numa Skin's primary/flagship products.
"""

import subprocess
import json
import time

STORE = "y2x75f-40.myshopify.com"
HOMEPAGE_COL_ID = "gid://shopify/Collection/500130513142"

PRIMARY_PRODUCT_HANDLES = [
    "numa-skin-deep-sea-water-facial-wash-100ml",
    "numa-skin-deep-sea-water-treatment-lotion",
    "numa-skin-adenosine-deep-sea-water-moisturizer-30g",
    "numa-skin-calming-barrier-gloss-gel-moisturizer-30ml",
    "numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g",
    "numa-skin-oxydew-sunscreen-luceane-spf50-30ml",
    "numa-skin-nad-booster-anti-aging-serum-20ml",
    "numa-skin-paket-lengkap-6-in-1-routine"
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
            print(f"Retry {attempt+1}/{retries}: non-JSON output, waiting...")
            time.sleep(2 * (attempt + 1))
        except Exception as e:
            print(f"Retry {attempt+1}/{retries}: exception {e}, waiting...")
            time.sleep(2 * (attempt + 1))
    raise RuntimeError("GraphQL request failed after retries")

QUERY_PRODUCT_BY_HANDLE = """
query getProduct($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    handle
  }
}
"""

MUTATION_COLLECTION_ADD = """
mutation collectionAddProducts($id: ID!, $productIds: [ID!]!) {
  collectionAddProducts(id: $id, productIds: $productIds) {
    userErrors {
      field
      message
    }
    collection {
      id
      title
      productsCount {
        count
      }
      products(first: 20) {
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

MUTATION_COLLECTION_UPDATE = """
mutation collectionUpdate($input: CollectionInput!) {
  collectionUpdate(input: $input) {
    userErrors {
      field
      message
    }
    collection {
      id
      title
      sortOrder
    }
  }
}
"""

def main():
    print("=== POPULATING HOMEPAGE COLLECTION WITH PRIMARY PRODUCTS ===")
    
    # 1. Resolve product IDs for primary products
    product_ids = []
    print("\n1. Resolving Primary Products:")
    for handle in PRIMARY_PRODUCT_HANDLES:
        res = run_gql(QUERY_PRODUCT_BY_HANDLE, {"handle": handle})
        p = res.get("productByHandle")
        if p:
            product_ids.append(p["id"])
            print(f"  ✅ {p['title']} ({p['id']})")
        else:
            print(f"  ❌ Not found for handle: {handle}")

    print(f"\nTotal primary products resolved: {len(product_ids)} / {len(PRIMARY_PRODUCT_HANDLES)}")

    # 2. Add products to Homepage collection
    print(f"\n2. Adding products to collection {HOMEPAGE_COL_ID}...")
    res_add = run_gql(MUTATION_COLLECTION_ADD, {
        "id": HOMEPAGE_COL_ID,
        "productIds": product_ids
    })
    
    col_data = res_add.get("collectionAddProducts", {})
    errs = col_data.get("userErrors", [])
    if errs:
        print(f"UserErrors from collectionAddProducts: {errs}")
    else:
        col = col_data.get("collection", {})
        print(f"Successfully added products! Total in collection: {col.get('productsCount', {}).get('count')}")
        print("Products in Homepage Collection:")
        for p in col.get("products", {}).get("nodes", []):
            print(f"  - {p['title']} ({p['handle']})")

    # 3. Set sort order to MANUAL so products display in optimal order
    print("\n3. Setting sortOrder to MANUAL for Homepage...")
    res_u = run_gql(MUTATION_COLLECTION_UPDATE, {
        "input": {
            "id": HOMEPAGE_COL_ID,
            "sortOrder": "MANUAL"
        }
    })
    print("Sort order update result:", res_u)

    print("\n=== HOMEPAGE POPULATION COMPLETE ===")

if __name__ == "__main__":
    main()
