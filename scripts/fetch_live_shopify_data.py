#!/usr/bin/env python3
"""
fetch_live_shopify_data.py
Fetches live data from Shopify GraphQL Admin API to keep local catalog 100% in sync with live Shopify.
Outputs to:
- data/live_shopify_storefront_export.json
- data/shopify_clean_catalog.json
"""

import os
import json
import time
import subprocess
import re

STORE = "y2x75f-40.myshopify.com"
PROJECT_DIR = "/Users/ongki/Projects/numaskin.id"
DATA_DIR = os.path.join(PROJECT_DIR, "data")

def run_gql(query, variables=None, retries=5):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--query", query]
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    for attempt in range(retries):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
            if res.returncode != 0:
                print(f"[RETRY {attempt+1}] GraphQL returned non-zero: {res.stderr[:200]}")
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

def fetch_all():
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
    print(f" Shop: {shop_data.get('name')} ({shop_data.get('myshopifyDomain')})")

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
    col_data = run_gql(q_collections).get("collections", {}).get("nodes", [])
    print(f" Collections fetched: {len(col_data)}")
    for c in col_data:
        img_url = c.get("image", {}).get("url") if c.get("image") else "None"
        prod_count = len(c.get("products", {}).get("nodes", []))
        print(f"   - {c['handle']} ({c['title']}): {prod_count} products | image: {img_url[:60] if img_url else 'None'}...")

    # 3. Products (paginate)
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
        print(f"   Fetched {len(nodes)} products (total so far: {len(all_products)})")

    print(f" Total Live Products: {len(all_products)}")
    return shop_data, col_data, all_products

if __name__ == "__main__":
    shop, collections, products = fetch_all()
