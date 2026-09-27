#!/usr/bin/env python3
"""
clean_variant_names.py
Renames internal/raw Shopee variant codes to clean, professional retail Indonesian names
for all multi-variant bundle products on Shopify via GraphQL productOptionUpdate.
"""

import subprocess
import json
import time

STORE = "y2x75f-40.myshopify.com"

# Mapping of product handle to variant renaming dictionary
VARIANT_MAPPINGS = {
    "numa-skin-paket-lengkap-6-in-1-routine": {
        "option_name": "Pilihan Paket",
        "values": {
            "Complete Set 2": "Paket Lengkap + Toner 150ml",
            "Complete Set 1": "Paket Lengkap + Toner 50ml",
            "Paket Lengkap + Toner 150ml": "Paket Lengkap + Toner 150ml",
            "Paket Lengkap + Toner 50ml": "Paket Lengkap + Toner 50ml",
        }
    },
    "numa-skin-paket-glow-up-adenosine": {
        "option_name": "Pilihan Paket",
        "values": {
            "FW+MOIS+TONER 150ML": "Paket Glow Up (Toner 150ml)",
            "FW+MOIS+TONER 50ML": "Paket Glow Up (Toner 50ml)",
            "Paket Glow Up (Toner 150ml)": "Paket Glow Up (Toner 150ml)",
            "Paket Glow Up (Toner 50ml)": "Paket Glow Up (Toner 50ml)",
        }
    },
    "numa-skin-paket-glow-up-gloss-gel": {
        "option_name": "Pilihan Paket",
        "values": {
            "FW+MOIS+TONER 150ML": "Paket Gloss Gel (Toner 150ml)",
            "FW+MOIS+TONER 50ML": "Paket Gloss Gel (Toner 50ml)",
        }
    },
    "numa-skin-paket-fresh-and-hydrate": {
        "option_name": "Pilihan Paket",
        "values": {
            "FW + Toner 150ml": "Facial Wash + Toner 150ml",
            "FW + Toner 50ml": "Facial Wash + Toner 50ml",
        }
    },
    "numa-skin-paket-sunscreen-dan-gloss-gel": {
        "option_name": "Pilihan Paket",
        "values": {
            "SSMOIS": "Paket Sunscreen & Gloss Gel",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-sunscreen-dan-toner-150ml": {
        "option_name": "Pilihan Paket",
        "values": {
            "SS+Toner150ml": "Paket Sunscreen + Toner 150ml",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-sunscreen-dan-toner-50ml": {
        "option_name": "Pilihan Paket",
        "values": {
            "SS+Toner50ml": "Paket Sunscreen + Toner 50ml",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-sunscreen-adenosine-toner-150ml": {
        "option_name": "Pilihan Paket",
        "values": {
            "SSMOISTTONER150ML": "Paket Sunscreen + Adenosine + Toner 150ml",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-sunscreen-adenosine-toner-50ml": {
        "option_name": "Pilihan Paket",
        "values": {
            "SSMOISTTONER": "Paket Sunscreen + Adenosine + Toner 50ml",
            "Sunscreen": "Sunscreen Saja",
            "AMDMoist": "Adenosine Moisturizer Saja",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-adenosine-dan-sunscreen": {
        "option_name": "Pilihan Paket",
        "values": {
            "BundlingAMDSS": "Paket Adenosine + Sunscreen",
            "Sunscreen": "Sunscreen Saja",
            "Adenosine": "Adenosine Moisturizer Saja",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-adenosine-dan-toner-150ml": {
        "option_name": "Pilihan Paket",
        "values": {
            "Bundle Moist + Toner": "Paket Adenosine + Toner 150ml",
            "Toner 150 ml": "Toner 150ml Saja",
            "Adenosine": "Adenosine Moisturizer Saja",
            "Toner 50 ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-toner-150ml-dan-gloss-gel": {
        "option_name": "Pilihan Paket",
        "values": {
            "MOIS+TONER 150ML": "Paket Gloss Gel + Toner 150ml",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-toner-50ml-dan-gloss-gel": {
        "option_name": "Pilihan Paket",
        "values": {
            "MOIS+TONER50ML": "Paket Gloss Gel + Toner 50ml",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-twin-pack-toner-2x150ml": {
        "option_name": "Pilihan Paket",
        "values": {
            "2PCS TONER150ML-IWG": "Twin Pack (2x Toner 150ml)",
            "Toner 50ml": "Toner 50ml Saja",
        }
    },
    "numa-skin-paket-duo-toner-150ml-50ml": {
        "option_name": "Pilihan Paket",
        "values": {
            "Toner 150ml & 50 ml": "Paket Duo (Toner 150ml + 50ml)",
            "Toner 50ml": "Toner 50ml Saja",
        }
    }
}

def run_graphql(query, variables=None):
    cmd = ["shopify", "store", "execute", "--store", STORE, "-j", "--allow-mutations", "--query", query]
    if variables:
        cmd.extend(["--variables", json.dumps(variables)])
    res = subprocess.run(cmd, capture_output=True, text=True)
    out = res.stdout.strip()
    idx = out.find("{")
    if idx == -1:
        raise RuntimeError(f"GraphQL returned non-JSON: {res.stdout} / {res.stderr}")
    raw = json.loads(out[idx:])
    return raw.get("data", raw)

QUERY_PRODUCT = """
query getProduct($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    handle
    options {
      id
      name
      values
      optionValues {
        id
        name
      }
    }
    variants(first: 10) {
      nodes {
        id
        title
      }
    }
  }
}
"""

MUTATION_UPDATE = """
mutation productOptionUpdate($productId: ID!, $option: OptionUpdateInput!, $optionValuesToUpdate: [OptionValueUpdateInput!]) {
  productOptionUpdate(productId: $productId, option: $option, optionValuesToUpdate: $optionValuesToUpdate) {
    userErrors {
      field
      message
    }
    product {
      id
      title
      options {
        id
        name
        values
      }
      variants(first: 10) {
        nodes {
          id
          title
        }
      }
    }
  }
}
"""

def main():
    print(f"Cleaning variant names for {len(VARIANT_MAPPINGS)} multi-variant bundles...")
    success_count = 0
    skipped_count = 0

    for handle, mapping in VARIANT_MAPPINGS.items():
        print(f"\nProcessing: {handle}...")
        prod_data = run_graphql(QUERY_PRODUCT, {"handle": handle})
        product = prod_data.get("productByHandle")
        if not product:
            print(f"  [ERROR] Product not found for handle: {handle}")
            continue

        product_id = product["id"]
        options = product.get("options", [])
        if not options:
            print(f"  [WARN] No options found for {handle}")
            continue

        target_opt = options[0]
        opt_id = target_opt["id"]
        current_opt_name = target_opt["name"]
        desired_opt_name = mapping.get("option_name", "Pilihan Paket")
        
        values_to_update = []
        needs_update = (current_opt_name != desired_opt_name)

        for val_node in target_opt.get("optionValues", []):
            val_id = val_node["id"]
            current_val_name = val_node["name"]
            desired_val_name = mapping["values"].get(current_val_name)
            
            if desired_val_name and desired_val_name != current_val_name:
                values_to_update.append({
                    "id": val_id,
                    "name": desired_val_name
                })
                needs_update = True
            elif desired_val_name:
                # Already desired
                pass
            else:
                print(f"  [NOTE] Unmapped value '{current_val_name}' on {handle}")

        if not needs_update and not values_to_update:
            print(f"  [OK] Already clean: {current_opt_name} -> {[v['name'] for v in target_opt.get('optionValues', [])]}")
            skipped_count += 1
            continue

        variables = {
            "productId": product_id,
            "option": {
                "id": opt_id,
                "name": desired_opt_name
            },
            "optionValuesToUpdate": values_to_update if values_to_update else None
        }
        if not values_to_update:
            del variables["optionValuesToUpdate"]

        res = run_graphql(MUTATION_UPDATE, variables)
        update_res = res.get("productOptionUpdate", {})
        errs = update_res.get("userErrors", [])
        if errs:
            print(f"  [ERROR] Failed to update {handle}: {errs}")
        else:
            updated_p = update_res.get("product", {})
            updated_opts = updated_p.get("options", [{}])[0]
            updated_variants = [v["title"] for v in updated_p.get("variants", {}).get("nodes", [])]
            print(f"  [SUCCESS] Option: '{updated_opts.get('name')}', Variants: {updated_variants}")
            success_count += 1
        
        time.sleep(0.5)

    print(f"\nVariant name cleanup finished! Updated: {success_count}, Already clean: {skipped_count}, Total: {len(VARIANT_MAPPINGS)}")

if __name__ == "__main__":
    main()
