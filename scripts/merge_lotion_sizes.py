#!/usr/bin/env python3
"""
merge_lotion_sizes.py
Consolidates duplicate Treatment Lotion listings (50ml & 150ml) into a single canonical product
with size variants (50ml and 150ml), dynamic psychological compareAtPrice, inventoryPolicy CONTINUE,
all channels published, and deletes the duplicate 50ml listing.
"""

import subprocess
import json
import time

STORE = "y2x75f-40.myshopify.com"
CANONICAL_ID = "gid://shopify/Product/10321359372534"  # 150ml product that has 31 media items + video
DUPLICATE_ID = "gid://shopify/Product/10321359175926"  # 50ml duplicate product

PUBLICATIONS = [
    "gid://shopify/Publication/223613124854",  # Online Store
    "gid://shopify/Publication/223613157622",  # Point of Sale
    "gid://shopify/Publication/223616663798",  # Numaskin Official Headless
]

def run_gql(query, variables=None, retries=5):
    cmd = ["shopify", "store", "execute", "-s", STORE, "-j", "--allow-mutations", "-q", query]
    if variables:
        cmd.extend(["-v", json.dumps(variables)])
    for attempt in range(retries):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=90)
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

# 1. Fetch current canonical product details (media, description, tags, collections)
QUERY_DETAILS = """
query getDetails($id: ID!) {
  product(id: $id) {
    id
    title
    handle
    descriptionHtml
    productType
    vendor
    tags
    collections(first: 10) {
      nodes {
        id
      }
    }
    media(first: 40) {
      nodes {
        id
      }
    }
  }
}
"""

MUTATION_PRODUCT_SET = """
mutation productSet($input: ProductSetInput!) {
  productSet(input: $input) {
    userErrors {
      field
      message
    }
    product {
      id
      title
      handle
      options {
        id
        name
        values
      }
      variants(first: 5) {
        nodes {
          id
          title
          price
          compareAtPrice
          sku
          inventoryPolicy
        }
      }
      media(first: 35) {
        nodes {
          id
          mediaContentType
        }
      }
    }
  }
}
"""

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

MUTATION_DELETE = """
mutation productDelete($input: ProductDeleteInput!) {
  productDelete(input: $input) {
    deletedProductId
    userErrors {
      field
      message
    }
  }
}
"""

def main():
    print(f"=== CONSOLIDATING TREATMENT LOTION SIZES INTO SINGLE CANONICAL PRODUCT ===")
    
    # 1. Fetch details
    print("1. Fetching canonical product details...")
    data = run_gql(QUERY_DETAILS, {"id": CANONICAL_ID})
    prod = data.get("product")
    if not prod:
        print("Canonical product not found!")
        return

    media_ids = [{"id": m["id"]} for m in prod.get("media", {}).get("nodes", [])]
    col_ids = [c["id"] for c in prod.get("collections", {}).get("nodes", [])]
    
    print(f"Found {len(media_ids)} existing media items and {len(col_ids)} collections.")

    # 2. Update with ProductSet
    print("2. Updating product with 'Ukuran' options (50ml & 150ml)...")
    product_set_input = {
        "id": CANONICAL_ID,
        "title": "Numa Skin Deep Sea Water Treatment Lotion",
        "handle": "numa-skin-deep-sea-water-treatment-lotion",
        "vendor": "Numa Skin",
        "productType": prod.get("productType", "Toner & Lotion"),
        "tags": prod.get("tags", []),
        "collections": col_ids,
        "files": media_ids,
        "productOptions": [
            {
                "name": "Ukuran",
                "values": [
                    {"name": "50ml"},
                    {"name": "150ml"}
                ]
            }
        ],
        "variants": [
            {
                "optionValues": [{"optionName": "Ukuran", "name": "50ml"}],
                "price": "79000.00",
                "compareAtPrice": "125000.00",
                "sku": "NUMA-LOTION-50ML",
                "inventoryPolicy": "CONTINUE"
            },
            {
                "optionValues": [{"optionName": "Ukuran", "name": "150ml"}],
                "price": "109000.00",
                "compareAtPrice": "239000.00",
                "sku": "NUMA-LOTION-150ML",
                "inventoryPolicy": "CONTINUE"
            }
        ],
        "seo": {
            "title": "Numa Skin Deep Sea Water Treatment Lotion | Hydrating Toner",
            "description": "Treatment Lotion Numa Skin dengan ekstrak Deep Sea Water kaya mineral untuk hidrasi intensif, menenangkan kemerahan, dan skin barrier kuat. Tersedia 50ml & 150ml."
        }
    }

    res_set = run_gql(MUTATION_PRODUCT_SET, {"input": product_set_input})
    set_data = res_set.get("productSet", {})
    errs = set_data.get("userErrors", [])
    if errs:
        print(f"ERROR updating product: {errs}")
        return

    updated_prod = set_data.get("product", {})
    print("Product successfully updated!")
    print(f"Title: {updated_prod.get('title')}")
    print(f"Handle: {updated_prod.get('handle')}")
    print("Options:", updated_prod.get("options"))
    print("Variants:")
    for v in updated_prod.get("variants", {}).get("nodes", []):
        print(f"  - {v['title']} | Price: Rp {float(v['price']):,.0f} | Coret: Rp {float(v['compareAtPrice']):,.0f} | Policy: {v['inventoryPolicy']}")

    # 3. Publish to all channels
    print("\n3. Publishing canonical product to all channels...")
    pub_input = [{"publicationId": pid} for pid in PUBLICATIONS]
    res_pub = run_gql(MUTATION_PUBLISH, {"id": CANONICAL_ID, "input": pub_input})
    print("Publication result:", res_pub)

    # 4. Delete duplicate 50ml product
    print(f"\n4. Deleting duplicate separate 50ml product ({DUPLICATE_ID})...")
    res_del = run_gql(MUTATION_DELETE, {"input": {"id": DUPLICATE_ID}})
    del_data = res_del.get("productDelete", {})
    if del_data.get("userErrors"):
        print(f"ERROR deleting duplicate product: {del_data.get('userErrors')}")
    else:
        print(f"Duplicate product successfully deleted: {del_data.get('deletedProductId')}")

    print("\n=== CONSOLIDATION COMPLETED SUCCESSFULLY ===")

if __name__ == "__main__":
    main()
