#!/usr/bin/env python3
"""
convert_to_webp.py
Converts all SEO images for Numa Skin to WebP format (quality=85).
Updates shopify_clean_catalog.json and markdown files.
"""

import os
import json
from PIL import Image

DOCS_DIR = "/Users/ongki/Documents/shopee/numaskin"
SEO_DIR = os.path.join(DOCS_DIR, "public/images/seo")
CATALOG_PATH = os.path.join(DOCS_DIR, "data/shopify_clean_catalog.json")

def convert_images():
    print(f"Scanning {SEO_DIR} for images to convert...")
    files = sorted([f for f in os.listdir(SEO_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
    print(f"Found {len(files)} images to convert to WebP...")

    total_orig_bytes = 0
    total_webp_bytes = 0

    for idx, fname in enumerate(files):
        src_path = os.path.join(SEO_DIR, fname)
        base_name = os.path.splitext(fname)[0]
        dest_filename = f"{base_name}.webp"
        dest_path = os.path.join(SEO_DIR, dest_filename)

        orig_size = os.path.getsize(src_path)
        total_orig_bytes += orig_size

        if not os.path.exists(dest_path):
            with Image.open(src_path) as img:
                # Convert RGBA to RGB if needed
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.save(dest_path, "WEBP", quality=85, method=6)
        
        webp_size = os.path.getsize(dest_path)
        total_webp_bytes += webp_size

        if (idx + 1) % 100 == 0 or idx == len(files) - 1:
            print(f"Converted [{idx+1}/{len(files)}] images...")

    saved_pct = (1 - total_webp_bytes / total_orig_bytes) * 100
    print(f"\nConversion complete!")
    print(f"Original: {total_orig_bytes / 1024 / 1024:.2f} MB")
    print(f"WebP:     {total_webp_bytes / 1024 / 1024:.2f} MB ({saved_pct:.1f}% space saved!)")

def update_catalog():
    print("\nUpdating shopify_clean_catalog.json with WebP paths...")
    with open(CATALOG_PATH) as f:
        catalog = json.load(f)

    for section in ["singles", "bundles"]:
        for p in catalog[section]:
            for m in p.get("media", []):
                old_file = m["seo_filename"]
                base_name = os.path.splitext(old_file)[0]
                webp_file = f"{base_name}.webp"
                m["seo_filename"] = webp_file
                m["local_path"] = os.path.join(SEO_DIR, webp_file)

    with open(CATALOG_PATH, "w") as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)
    print("Catalog updated successfully!")

if __name__ == "__main__":
    convert_images()
    update_catalog()
