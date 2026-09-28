#!/usr/bin/env python3
"""
clean_all_shopify_titles.py
1. Strips "Numa Skin " prefix from all 49 products on Shopify live.
2. Removes loose size measurements (100ml, 30g, 30ml, 20ml) from single product titles.
3. Injects precise size tags (100ml, 30g, 30ml, 20ml, 50ml, 150ml) into tags so size is structured.
4. Formats bundle titles cleanly and professionally.
5. Re-syncs local catalog data and Hydrogen storefront.
"""

import os
import json
import time
import subprocess
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

STORE = "y2x75f-40.myshopify.com"
PROJECT_DIR = "/Users/ongki/Projects/numaskin.id"
DATA_DIR = os.path.join(PROJECT_DIR, "data")
CLEAN_CATALOG_PATH = os.path.join(DATA_DIR, "shopify_clean_catalog.json")

lock = threading.Lock()

def run_gql(query, variables=None, retries=5):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--allow-mutations", "--query", query]
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    for attempt in range(retries):
        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=90)
            if res.returncode != 0:
                time.sleep(2 * (attempt + 1))
                continue
            out = res.stdout.strip()
            idx = out.find("{")
            if idx == -1:
                time.sleep(2 * (attempt + 1))
                continue
            parsed = json.loads(out[idx:])
            return parsed.get("data", parsed)
        except Exception as e:
            if attempt == retries - 1:
                raise e
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"GraphQL failed after {retries} retries.")

# Specific clean titles and size tags for the 7 Singles
SINGLES_CONFIG = {
    "numa-skin-deep-sea-water-facial-wash-100ml": {
        "title": "Deep Sea Water Facial Wash Gel",
        "size_tag": "100ml",
    },
    "numa-skin-calming-barrier-gloss-gel-moisturizer-30ml": {
        "title": "Calming Barrier Gloss Gel Moisturizer",
        "size_tag": "30ml",
    },
    "numa-skin-deep-sea-water-treatment-lotion": {
        "title": "Deep Sea Water Treatment Lotion",
        "size_tag": "50ml, 150ml",
    },
    "numa-skin-adenosine-deep-sea-water-moisturizer-30g": {
        "title": "Adenosine Deep Sea Water Moisturizer",
        "size_tag": "30g",
    },
    "numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g": {
        "title": "PDRN Alpha Arbutin Tone-Up Day Cream",
        "size_tag": "30g",
    },
    "numa-skin-oxydew-sunscreen-luceane-spf50-30ml": {
        "title": "Oxydew Sunscreen Luceane SPF 50+ PA++++",
        "size_tag": "30ml",
    },
    "numa-skin-nad-booster-anti-aging-serum-20ml": {
        "title": "NAD+ Booster Anti-Aging Serum",
        "size_tag": "20ml",
    },
}

def clean_bundle_title(raw_title):
    t = raw_title
    if t.lower().startswith("numa skin "):
        t = t[10:].strip()
    
    # Format size at the end neatly in parentheses e.g. " 150ml" -> " (150ml)"
    match = re.search(r'\s+(\d+ml|\d+\s*gr|\d+x\d+ml|\d+ml\s*\+\s*\d+ml)$', t, re.IGNORECASE)
    if match:
        size_part = match.group(1).replace(" ", "")
        t = t[:match.start()].strip() + f" ({size_part})"
        
    return t

MUTATION_UPDATE = """
mutation($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      id
      title
      tags
    }
    userErrors {
      field
      message
    }
  }
}
"""

def update_worker(product, idx, total):
    pid = product["id"]
    handle = product["handle"]
    raw_title = product["title"]
    existing_tags = set(product.get("tags") or [])
    
    if handle in SINGLES_CONFIG:
        new_title = SINGLES_CONFIG[handle]["title"]
        size_tags = [st.strip() for st in SINGLES_CONFIG[handle]["size_tag"].split(",")]
        for st in size_tags:
            existing_tags.add(st)
    else:
        new_title = clean_bundle_title(raw_title)
        # Extract size from title if any and add to tags
        size_match = re.search(r'\((\d+ml|\d+g|\d+x\d+ml)\)', new_title, re.IGNORECASE)
        if size_match:
            existing_tags.add(size_match.group(1).lower())
            
    updated_tags = sorted(list(existing_tags))
    
    variables = {
        "input": {
            "id": pid,
            "title": new_title,
            "tags": updated_tags
        }
    }
    
    res = run_gql(MUTATION_UPDATE, variables)
    update_res = res.get("productUpdate", {})
    errs = update_res.get("userErrors", [])
    
    with lock:
        if errs:
            print(f"[{idx}/{total}] ⚠️ Error on {handle}: {errs}")
            return False, pid, errs
        else:
            final_title = update_res.get("product", {}).get("title")
            print(f"[{idx}/{total}] ✓ '{raw_title}' -> '{final_title}'")
            return True, pid, final_title

def main():
    with open(CLEAN_CATALOG_PATH, "r", encoding="utf-8") as f:
        catalog = json.load(f)
        
    all_prods = catalog.get("singles", []) + catalog.get("bundles", [])
    total = len(all_prods)
    print(f"[*] Starting Title & Size Clean-Up for all {total} products on Shopify...")
    
    success = 0
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {
            executor.submit(update_worker, p, i+1, total): p
            for i, p in enumerate(all_prods)
        }
        for fut in as_completed(futures):
            ok, pid, _ = fut.result()
            if ok:
                success += 1
                
    print(f"\n==========================================")
    print(f"[✓] Title Clean-Up Completed: {success}/{total} products updated on Shopify.")
    print(f"==========================================")
    
    # Run fetch_and_sync_all to keep Hydrogen in sync
    print("\n[*] Synchronizing Hydrogen local catalog data...")
    sync_script = os.path.join(PROJECT_DIR, "scripts/fetch_and_sync_all.py")
    subprocess.run(["python3", sync_script], check=True)

if __name__ == "__main__":
    main()
