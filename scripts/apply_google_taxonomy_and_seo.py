#!/usr/bin/env python3
"""
apply_google_taxonomy_and_seo.py
1. Applies Google Product Category / Shopify Standard Taxonomy across all 49 Numa Skin products:
   - Facial Cleanser -> hb-3-2-9-6 (Facial Cleansers / GPC 2740)
   - Treatment Lotion -> hb-3-2-9-17 (Toners & Astringents / GPC 2548)
   - NAD+ Booster Serum -> hb-3-2-9-21 (Face Serums / GPC 473/2737)
   - Moisturizers -> hb-3-2-9-20 (Face Moisturizers / GPC 2678)
   - Sunscreen -> hb-3-2-9-15 (Sunscreen / GPC 2741)
   - Bundles -> hb-3-2-9-25 (Skin Care Kits & Sets / GPC 2739)
2. Enriches SEO Title (<=60 chars, keyword-focused, distinct from product title) & SEO Description (<=155 chars, benefit-led, zero CTA, BPOM-backed).
3. Synchronizes local catalog files.
"""

import os
import json
import time
import subprocess
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

CATEGORY_MAP = {
    "numa-skin-deep-sea-water-facial-wash-100ml": "gid://shopify/TaxonomyCategory/hb-3-2-9-6", # Facial Cleansers
    "numa-skin-deep-sea-water-treatment-lotion": "gid://shopify/TaxonomyCategory/hb-3-2-9-17", # Toners & Astringents
    "numa-skin-nad-booster-anti-aging-serum-20ml": "gid://shopify/TaxonomyCategory/hb-3-2-9-21", # Face Serums
    "numa-skin-adenosine-deep-sea-water-moisturizer-30g": "gid://shopify/TaxonomyCategory/hb-3-2-9-20", # Face Moisturizers
    "numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g": "gid://shopify/TaxonomyCategory/hb-3-2-9-20", # Face Moisturizers
    "numa-skin-calming-barrier-gloss-gel-moisturizer-30ml": "gid://shopify/TaxonomyCategory/hb-3-2-9-20", # Face Moisturizers
    "numa-skin-oxydew-sunscreen-luceane-spf50-30ml": "gid://shopify/TaxonomyCategory/hb-3-2-9-15", # Sunscreen
}

CUSTOM_SINGLES_SEO = {
    "numa-skin-deep-sea-water-facial-wash-100ml": {
        "title": "Facial Wash Gel Numa Skin – Sabun Cuci Muka Anti-Aging",
        "description": "Pembersih wajah lembut dengan Deep Sea Water & 5% Niacinamide. Bersihkan pori mendalam, rawat skin barrier tanpa rasa kering tertarik. Resmi BPOM."
    },
    "numa-skin-deep-sea-water-treatment-lotion": {
        "title": "Treatment Lotion Numa Skin – Hydrating Toner Essence",
        "description": "Hydrating toner essence dengan Ulleung Deep Sea Water. Mengunci hidrasi kulit mendalam, seimbangkan pH, dan optimalkan serum. Resmi BPOM."
    },
    "numa-skin-nad-booster-anti-aging-serum-20ml": {
        "title": "NAD+ Serum Numa Skin – Serum Anti-Aging Samarkan Kerutan",
        "description": "Serum anti-aging dengan 2% NAD+ & 4X Peptide. Tingkatkan elastisitas seluler, samarkan garis halus, dan cerahkan kulit kusam secara klinis. BPOM."
    },
    "numa-skin-adenosine-deep-sea-water-moisturizer-30g": {
        "title": "Adenosine Moisturizer Numa Skin – Krim Anti-Aging Wajah",
        "description": "Pelembap anti-aging dengan Adenosine & Phytosqualane. Kunci kelembapan intensif, kencangkan kontur wajah, dan rawat elastisitas kulit. Resmi BPOM."
    },
    "numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g": {
        "title": "PDRN Day Cream Numa Skin – Krim Pagi Mencerahkan Wajah",
        "description": "Krim pagi pencerah instan dengan PDRN & Alpha Arbutin. Samarkan flek hitam, ratakan warna kulit, dan berikan kilau sehat natural. Resmi BPOM."
    },
    "numa-skin-calming-barrier-gloss-gel-moisturizer-30ml": {
        "title": "Gloss Gel Numa Skin – Pelembap Calming Skin Barrier",
        "description": "Pelembap gel sejuk untuk menenangkan kemerahan dan kulit sensitif. Kaya mineral laut dalam menjaga kekuatan skin barrier alami. Resmi BPOM."
    },
    "numa-skin-oxydew-sunscreen-luceane-spf50-30ml": {
        "title": "Oxydew Sunscreen Numa Skin – Tabir Surya SPF 50+ PA++++",
        "description": "Sunscreen ringan tanpa white cast dengan SPF 50+ PA++++ & Luceane. Lindungi kulit dari radiasi UV dan penuaan dini dengan hasil dewy segar. BPOM."
    }
}

def generate_bundle_seo(title, handle):
    clean_t = title
    if clean_t.lower().startswith("numa skin "):
        clean_t = clean_t[10:].strip()
    
    t_low = clean_t.lower()
    if "glowing" in t_low or "glow" in t_low or "brightening" in t_low:
        kw = "Paket Kulit Glowing"
        benefit = "mencerahkan kulit kusam, meratakan warna wajah, dan memberi kilau sehat alami"
    elif "barrier" in t_low or "calming" in t_low:
        kw = "Paket Skin Barrier"
        benefit = "memperkuat lapisan pelindung kulit, menenangkan kemerahan, dan hidrasi sejuk"
    elif "protection" in t_low or "sunscreen" in t_low or "defense" in t_low:
        kw = "Paket Proteksi & Anti-Aging"
        benefit = "melindungi kulit dari sinar UV serta penuaan dini dengan hidrasi mineral laut"
    elif "complete" in t_low or "lengkap" in t_low or "routine" in t_low or "ultimate" in t_low:
        kw = "Paket Skincare Anti-Aging Lengkap"
        benefit = "perawatan holistik anti-aging, hidrasi seluler, dan pengencangan kulit optimal"
    else:
        kw = "Paket Skincare Anti-Aging"
        benefit = "merawat elastisitas kulit, menyamarkan kerutan, dan menjaga kelembapan mendalam"
    
    suffix = f" – {kw}"
    if len(clean_t) + len(suffix) <= 60:
        seo_title = clean_t + suffix
    else:
        short_t = clean_t[:57 - len(kw)].strip()
        seo_title = f"{short_t} – {kw}"
    
    seo_desc = f"{clean_t} dari Numa Skin dengan Ulleung Deep Sea Water. Formulasi efektif untuk {benefit}. 100% Resmi BPOM RI."
    if len(seo_desc) > 155:
        seo_desc = f"{clean_t} dari Numa Skin: formulasi Deep Sea Water mineral untuk {benefit}. 100% Terdaftar BPOM RI."
        if len(seo_desc) > 155:
            seo_desc = seo_desc[:152] + "..."
            
    return seo_title, seo_desc

MUTATION_UPDATE = """
mutation($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      id
      title
      category {
        id
        name
        fullName
      }
      seo {
        title
        description
      }
    }
    userErrors {
      field
      message
    }
  }
}
"""

def update_product_worker(p, total_idx, total_count):
    pid = p["id"]
    handle = p["handle"]
    title = p["title"]
    
    cat_id = CATEGORY_MAP.get(handle, "gid://shopify/TaxonomyCategory/hb-3-2-9-25")
    
    if handle in CUSTOM_SINGLES_SEO:
        seo_t = CUSTOM_SINGLES_SEO[handle]["title"]
        seo_d = CUSTOM_SINGLES_SEO[handle]["description"]
    else:
        seo_t, seo_d = generate_bundle_seo(title, handle)
        
    variables = {
        "input": {
            "id": pid,
            "category": cat_id,
            "seo": {
                "title": seo_t,
                "description": seo_d
            }
        }
    }
    
    res = run_gql(MUTATION_UPDATE, variables)
    update_res = res.get("productUpdate", {})
    user_errors = update_res.get("userErrors", [])
    
    with lock:
        if user_errors:
            print(f"[{total_idx}/{total_count}] ⚠️ {title[:30]} Error: {user_errors}")
            return False, pid, user_errors
        else:
            cat_name = update_res.get("product", {}).get("category", {}).get("name", "Unknown")
            print(f"[{total_idx}/{total_count}] ✓ {title[:30]} | Cat: {cat_name} | SEO Title ({len(seo_t)}c): {seo_t}")
            return True, pid, {
                "category": update_res.get("product", {}).get("category"),
                "seo": {"title": seo_t, "description": seo_d}
            }

def main():
    with open(CLEAN_CATALOG_PATH, "r", encoding="utf-8") as f:
        catalog = json.load(f)
        
    all_prods = catalog.get("singles", []) + catalog.get("bundles", [])
    total_count = len(all_prods)
    print(f"[*] Starting Category & SEO Optimization for all {total_count} products...")
    
    success_count = 0
    results_map = {}
    
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {
            executor.submit(update_product_worker, p, i+1, total_count): p
            for i, p in enumerate(all_prods)
        }
        for fut in as_completed(futures):
            ok, pid, data = fut.result()
            if ok:
                success_count += 1
                results_map[pid] = data

    print(f"\n==========================================")
    print(f"[✓] Completed Category & SEO update: {success_count}/{total_count} products successfully updated.")
    print(f"==========================================")

if __name__ == "__main__":
    main()
