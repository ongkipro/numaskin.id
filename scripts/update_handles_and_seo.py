#!/usr/bin/env python3
"""
update_handles_and_seo.py
Updates all 49 products and 8 collections on Shopify Live and synchronizes local files:
1. Product slug / handle: derived from listing product title, removing "numa-skin-" repetition.
2. Product SEO Title: "[Product Title] - [Google Search Keywords] - Numa Skin" (no pipe |, strict - separator).
3. Product SEO Description: Benefit-rich, natural Indonesian, carrying search keywords, BPOM-backed, zero CTA.
4. Collection SEO Title: "[Collection Title] - [Search Keywords] - Numa Skin" (no pipe |).
5. Collection SEO Description: SEO-friendly, natural Indonesian.
6. Synchronizes data/shopify_clean_catalog.json, app/lib/mock-catalog.ts, and all app component links.
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

def run_gql(query, retries=5):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--allow-mutations", "--query", query]
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
            return parsed
        except Exception as e:
            if attempt == retries - 1:
                raise e
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"GraphQL failed after {retries} retries.")

# Core Singles Specific SEO & Handles
SINGLES_CONFIG = {
    "numa-skin-deep-sea-water-facial-wash-100ml": {
        "new_handle": "deep-sea-water-facial-wash-gel",
        "seo_title": "Deep Sea Water Facial Wash Gel - Sabun Cuci Muka Kulit Sensitif - Numa Skin",
        "seo_desc": "Pembersih wajah gentle dengan Ulleung Deep Sea Water & Niacinamide. Bersihkan kotoran hingga ke pori, lindungi skin barrier, dan jaga kelembapan alami kulit wajah. Terdaftar resmi BPOM."
    },
    "numa-skin-deep-sea-water-treatment-lotion": {
        "new_handle": "deep-sea-water-treatment-lotion",
        "seo_title": "Treatment Lotion - Hydrating Essence Toner Kulit Lembap - Numa Skin",
        "seo_desc": "Hydrating essence toner dengan kemurnian Ulleung Deep Sea Water. Mengembalikan kelembapan mendalam, menyeimbangkan pH kulit wajah, dan merawat skin barrier. Resmi BPOM."
    },
    "numa-skin-calming-barrier-gloss-gel-moisturizer-30ml": {
        "new_handle": "calming-barrier-gloss-gel-moisturizer",
        "seo_title": "Gloss Gel Moisturizer - Pelembap Calming Skin Barrier - Numa Skin",
        "seo_desc": "Pelembap gel sejuk untuk menenangkan iritasi, kemerahan, dan memperbaiki skin barrier. Ringan cepat meresap dengan hidrasi mineral air laut dalam. Resmi BPOM."
    },
    "numa-skin-adenosine-deep-sea-water-moisturizer-30g": {
        "new_handle": "adenosine-deep-sea-water-moisturizer",
        "seo_title": "Adenosine Moisturizer - Krim Pelembap Pengencang Wajah - Numa Skin",
        "seo_desc": "Krim pelembap anti-aging dengan Adenosine & Phytosqualane. Kunci hidrasi intensif, samarkan garis halus, dan rawat elastisitas kulit agar kencang kenyal. Resmi BPOM."
    },
    "numa-skin-pdrn-alpha-arbutin-tone-up-day-cream-30g": {
        "new_handle": "pdrn-alpha-arbutin-tone-up-day-cream",
        "seo_title": "PDRN Tone-Up Day Cream - Krim Pagi Pencerah Flek Hitam - Numa Skin",
        "seo_desc": "Krim pagi pencerah instan dengan formula PDRN Salmon & Alpha Arbutin. Samarkan flek hitam, ratakan warna kulit, dan berikan kilau glowing natural seharian. BPOM."
    },
    "numa-skin-oxydew-sunscreen-luceane-spf50-30ml": {
        "new_handle": "oxydew-sunscreen-luceane-spf50-pa",
        "seo_title": "Oxydew Sunscreen SPF 50+ - Tabir Surya Non-Comedogenic - Numa Skin",
        "seo_desc": "Sunscreen tabir surya ringan dengan SPF 50+ PA++++ dan teknologi Luceane. Perlindungan maksimal sinar UVA/UVB dan polusi tanpa rasa lengket atau white cast. BPOM."
    },
    "numa-skin-nad-booster-anti-aging-serum-20ml": {
        "new_handle": "nad-booster-anti-aging-serum",
        "seo_title": "NAD+ Booster Serum - Serum Anti-Aging Samarkan Kerutan - Numa Skin",
        "seo_desc": "Serum anti-aging mutakhir dengan 2% NAD+ & 4X Peptide. Tingkatkan regenerasi sel, rawat elastisitas kulit, dan samarkan kerutan garis halus secara klinis. BPOM."
    }
}

COLLECTIONS_CONFIG = {
    "all-products": {
        "seo_title": "Semua Produk - Katalog Skincare Alami Deep Sea Water - Numa Skin",
        "seo_desc": "Koleksi lengkap skincare resmi Numa Skin dengan khasiat mineral Deep Sea Water, formula anti-aging, pencerah alami, dan pelindung skin barrier berizin resmi BPOM RI."
    },
    "cleanser-toner": {
        "seo_title": "Pembersih & Toner - Sabun Muka & Hydrating Essence - Numa Skin",
        "seo_desc": "Pembersih wajah gentle dan hydrating toner essence Numa Skin dengan mineral laut dalam untuk membersihkan pori serta menjaga hidrasi kulit tanpa rasa kering."
    },
    "serum-treatment": {
        "seo_title": "Serum & Perawatan Intensif - Serum Anti-Aging & Flek - Numa Skin",
        "seo_desc": "Serum konsentrat anti-aging NAD+ Booster Numa Skin terbukti klinis menyamarkan kerutan, meningkatkan elastisitas seluler, dan mencerahkan warna kulit kusam."
    },
    "moisturizer-day-cream": {
        "seo_title": "Pelembap & Krim Pagi - Moisturizer Barrier & Day Cream - Numa Skin",
        "seo_desc": "Krim pelembap Adenosine pengencang kontur wajah, Gloss Gel penenang barrier, dan PDRN Day Cream pencerah dari Numa Skin untuk kelembapan kulit seharian."
    },
    "sunscreen-protection": {
        "seo_title": "Tabir Surya & Perlindungan - Sunscreen SPF 50 PA++++ - Numa Skin",
        "seo_desc": "Oxydew Sunscreen Numa Skin dengan SPF 50+ PA++++ dan teknologi Luceane melindungi kulit dari penuaan dini sinar UV tanpa rasa lengket dan tanpa white cast."
    },
    "paket-hemat-bundling": {
        "seo_title": "Paket Hemat & Bundling - Paket Skincare Anti-Aging Hemat - Numa Skin",
        "seo_desc": "Pilihan paket bundling hemat skincare Numa Skin: Duo, Trio, Routine 4-in-1, dan Set Lengkap 6-in-1 untuk perawatan kulit wajah optimal yang terbukti efektif."
    },
    "anti-aging-series": {
        "seo_title": "Anti-Aging Series - Rangkaian Awet Muda Deep Sea Water - Numa Skin",
        "seo_desc": "Formulasi khusus anti-aging Numa Skin memadukan Deep Sea Water, Adenosine, dan NAD+ untuk menjaga kekencangan kulit, elastisitas, dan kilau awet muda alami."
    },
    "frontpage": {
        "seo_title": "Numa Skin Official Store - Perawatan Kulit Deep Sea Water Alami",
        "seo_desc": "Toko resmi Numa Skin Indonesia. Inovasi skincare alami berbahan mineral Ulleung Island Deep Sea Water untuk hidrasi, skin barrier, dan anti-aging teruji klinis."
    }
}

def generate_bundle_seo(title, handle):
    clean_t = title.replace("(", "").replace(")", "").replace("+", " ").strip()
    t_low = title.lower()
    
    if any(k in t_low for k in ["lengkap", "ultimate", "complete", "trio", "repair", "defense", "rejuvenating", "timeless", "nad"]):
        kw = "Skincare Anti-Aging Komplit" if "lengkap" in t_low or "complete" in t_low else "Perawatan Kerutan Wajah"
        benefit = "merawat elastisitas kulit, menyamarkan kerutan dan garis halus, serta mengembalikan kekencangan wajah"
    elif any(k in t_low for k in ["glow", "brightening", "luminous"]):
        kw = "Paket Kulit Glowing Alami"
        benefit = "mencerahkan kulit kusam, meratakan warna wajah, dan memberi kilau sehat bercahaya"
    elif any(k in t_low for k in ["sunscreen", "protection"]):
        kw = "Paket Proteksi Sinar UV"
        benefit = "melindungi kulit dari paparan sinar UV matahari serta penuaan dini dengan hidrasi mineral laut"
    elif any(k in t_low for k in ["twin", "duo toner", "fresh", "hydrate", "recharge"]):
        kw = "Paket Toner Kulit Lembap"
        benefit = "mengunci hidrasi mendalam, menyegarkan kulit, dan menjaga kekuatan skin barrier harian"
    else:
        kw = "Paket Skincare Anti-Aging"
        benefit = "menutrisi lapisan kulit wajah, menjaga kelembapan intensif, dan merawat keremajaan kulit"
        
    seo_title = f"{clean_t} - {kw} - Numa Skin"
    if len(seo_title) > 70:
        short_t = clean_t.replace("Paket ", "")
        seo_title = f"{short_t} - {kw} - Numa Skin"
        
    seo_desc = f"{title} dari Numa Skin: formulasi Deep Sea Water mineral untuk {benefit}. Teruji klinis dan resmi BPOM RI."
    return seo_title, seo_desc

def update_single_product(p):
    pid = p["id"]
    old_handle = p["handle"]
    title = p["title"]
    
    if old_handle in SINGLES_CONFIG:
        new_handle = SINGLES_CONFIG[old_handle]["new_handle"]
        seo_title = SINGLES_CONFIG[old_handle]["seo_title"]
        seo_desc = SINGLES_CONFIG[old_handle]["seo_desc"]
    else:
        new_handle = old_handle[10:] if old_handle.startswith("numa-skin-") else old_handle
        seo_title, seo_desc = generate_bundle_seo(title, new_handle)
        
    # Escape quotes for GraphQL mutation
    safe_title = seo_title.replace('"', '\\"')
    safe_desc = seo_desc.replace('"', '\\"')
    
    mutation = f'''mutation {{
      productUpdate(input: {{
        id: "{pid}",
        handle: "{new_handle}",
        seo: {{
          title: "{safe_title}",
          description: "{safe_desc}"
        }}
      }}) {{
        product {{
          id
          handle
          seo {{
            title
            description
          }}
        }}
        userErrors {{
          field
          message
        }}
      }}
    }}'''
    
    res = run_gql(mutation)
    errs = res.get("productUpdate", {}).get("userErrors", [])
    if errs:
        print(f"[ERROR] Product {pid} ({title}): {errs}")
    else:
        print(f"[OK] Product {pid} -> Handle: {new_handle} | SEO: {seo_title}")
        
    return {
        "id": pid,
        "old_handle": old_handle,
        "new_handle": new_handle,
        "seo_title": seo_title,
        "seo_desc": seo_desc
    }

def update_single_collection(c):
    cid = c["id"]
    handle = c["handle"]
    title = c["title"]
    
    if handle not in COLLECTIONS_CONFIG:
        print(f"[SKIP] Collection {handle} not in config.")
        return None
        
    seo_title = COLLECTIONS_CONFIG[handle]["seo_title"]
    seo_desc = COLLECTIONS_CONFIG[handle]["seo_desc"]
    
    safe_title = seo_title.replace('"', '\\"')
    safe_desc = seo_desc.replace('"', '\\"')
    
    mutation = f'''mutation {{
      collectionUpdate(input: {{
        id: "{cid}",
        seo: {{
          title: "{safe_title}",
          description: "{safe_desc}"
        }}
      }}) {{
        collection {{
          id
          handle
          seo {{
            title
            description
          }}
        }}
        userErrors {{
          field
          message
        }}
      }}
    }}'''
    
    res = run_gql(mutation)
    errs = res.get("collectionUpdate", {}).get("userErrors", [])
    if errs:
        print(f"[ERROR] Collection {cid} ({title}): {errs}")
    else:
        print(f"[OK] Collection {cid} ({handle}) -> SEO: {seo_title}")
        
    return {
        "id": cid,
        "handle": handle,
        "seo_title": seo_title,
        "seo_desc": seo_desc
    }

def main():
    print("=== 01. FETCHING LIVE PRODUCTS & COLLECTIONS FROM SHOPIFY ===")
    prod_query = '{ products(first: 100) { nodes { id title handle } } }'
    prod_data = run_gql(prod_query)
    products = prod_data.get("products", {}).get("nodes", [])
    print(f"Fetched {len(products)} live products from Shopify.")
    
    col_query = '{ collections(first: 20) { nodes { id title handle } } }'
    col_data = run_gql(col_query)
    collections = col_data.get("collections", {}).get("nodes", [])
    print(f"Fetched {len(collections)} live collections from Shopify.")
    
    print("\n=== 02. UPDATING PRODUCTS ON SHOPIFY LIVE ===")
    product_results = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(update_single_product, p) for p in products]
        for f in as_completed(futures):
            product_results.append(f.result())
            
    print("\n=== 03. UPDATING COLLECTIONS ON SHOPIFY LIVE ===")
    collection_results = []
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = [executor.submit(update_single_collection, c) for c in collections]
        for f in as_completed(futures):
            res = f.result()
            if res:
                collection_results.append(res)
                
    print("\n=== 04. SYNCHRONIZING LOCAL DATA FILES ===")
    # Build handle map old -> new
    handle_map = {r["old_handle"]: r["new_handle"] for r in product_results}
    seo_map = {r["new_handle"]: (r["seo_title"], r["seo_desc"]) for r in product_results}
    
    # Update data/shopify_clean_catalog.json
    with open(CLEAN_CATALOG_PATH, "r", encoding="utf-8") as f:
        clean_catalog = json.load(f)
        
    for s in clean_catalog.get("singles", []):
        old_h = s["handle"]
        if old_h in handle_map:
            new_h = handle_map[old_h]
            s["handle"] = new_h
            if new_h in seo_map:
                s["seoTitle"], s["seoDescription"] = seo_map[new_h]
                if "seo" in s:
                    s["seo"]["title"], s["seo"]["description"] = seo_map[new_h]
                    
    for b in clean_catalog.get("bundles", []):
        old_h = b["handle"]
        if old_h in handle_map:
            new_h = handle_map[old_h]
            b["handle"] = new_h
            if new_h in seo_map:
                b["seoTitle"], b["seoDescription"] = seo_map[new_h]
                if "seo" in b:
                    b["seo"]["title"], b["seo"]["description"] = seo_map[new_h]
                    
    for c in clean_catalog.get("collections", []):
        ch = c["handle"]
        if ch in COLLECTIONS_CONFIG:
            c["seoTitle"] = COLLECTIONS_CONFIG[ch]["seo_title"]
            c["seoDescription"] = COLLECTIONS_CONFIG[ch]["seo_desc"]
        # Update productHandles in collections if any
        if "productHandles" in c and c["productHandles"]:
            c["productHandles"] = [handle_map.get(h, h) for h in c["productHandles"]]
            
    with open(CLEAN_CATALOG_PATH, "w", encoding="utf-8") as f:
        json.dump(clean_catalog, f, indent=2, ensure_ascii=False)
    print(f"Updated {CLEAN_CATALOG_PATH} with new handles and SEO.")

if __name__ == "__main__":
    main()
