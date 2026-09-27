#!/usr/bin/env python3
import subprocess
import json
import os
import requests
import time

STORE = "y2x75f-40.myshopify.com"
IMG_PATH = "/Users/ongki/Documents/shopee/numaskin/public/images/collections/collection-pembersih-toner-banner.webp"
FILENAME = "collection-pembersih-toner-banner.webp"
COL_ID = "gid://shopify/Collection/500131266806"

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
                return json.loads(out[idx:])
            print(f"Retry {attempt+1}/{retries}: non-JSON output, waiting...")
            time.sleep(2 * (attempt + 1))
        except Exception as e:
            print(f"Retry {attempt+1}/{retries}: exception {e}, waiting...")
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"GraphQL request failed after {retries} retries")

print("1. Creating Staged Upload...")
q_staged = """
mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
  stagedUploadsCreate(input: $input) {
    userErrors { field message }
    stagedTargets {
      url
      resourceUrl
      parameters { name value }
    }
  }
}
"""
v_staged = {
  "input": [{
    "filename": FILENAME,
    "mimeType": "image/webp",
    "resource": "IMAGE",
    "httpMethod": "POST"
  }]
}
res_s = run_gql(q_staged, v_staged)
target = res_s.get("data", res_s)["stagedUploadsCreate"]["stagedTargets"][0]
upload_url = target["url"]
resource_url = target["resourceUrl"]
params = {p["name"]: p["value"] for p in target["parameters"]}

print("2. Uploading to GCS...")
with open(IMG_PATH, "rb") as f:
    r = requests.post(upload_url, data=params, files={"file": (FILENAME, f, "image/webp")})
print("Upload status:", r.status_code)

print("3. Calling fileCreate...")
q_file = """
mutation fileCreate($files: [FileCreateInput!]!) {
  fileCreate(files: $files) {
    userErrors { field message }
    files {
      id
      fileStatus
      alt
      createdAt
    }
  }
}
"""
v_file = {
  "files": [{
    "originalSource": resource_url,
    "contentType": "IMAGE",
    "alt": "Pembersih Wajah dan Hydrating Treatment Lotion Numa Skin"
  }]
}
res_f = run_gql(q_file, v_file)
print("fileCreate result:", res_f)
files = res_f.get("data", res_f)["fileCreate"]["files"]
if not files:
    print("User errors:", res_f.get("data", res_f)["fileCreate"]["userErrors"])
    exit(1)
file_id = files[0]["id"]
print("Created file ID:", file_id)

print("4. Waiting for file to be READY...")
q_file_status = """
query getFile($id: ID!) {
  node(id: $id) {
    ... on MediaImage {
      fileStatus
      image {
        url
      }
    }
  }
}
"""
cdn_url = None
for _ in range(10):
    time.sleep(2)
    res_st = run_gql(q_file_status, {"id": file_id})
    node = res_st.get("data", res_st).get("node", {})
    status = node.get("fileStatus")
    print("Status:", status)
    if status == "READY":
        cdn_url = node.get("image", {}).get("url")
        print("Ready! CDN URL:", cdn_url)
        break

if not cdn_url:
    print("File not ready in time")
    exit(1)

print("5. Updating collection with CDN URL...")
q_update = """
mutation collectionUpdate($input: CollectionInput!) {
  collectionUpdate(input: $input) {
    userErrors { field message }
    collection {
      id
      title
      image {
        url
        altText
        width
        height
      }
    }
  }
}
"""
v_update = {
  "input": {
    "id": COL_ID,
    "image": {
      "src": cdn_url,
      "altText": "Pembersih Wajah dan Hydrating Treatment Lotion Numa Skin"
    }
  }
}
res_u = run_gql(q_update, v_update)
print("Collection update result:", res_u)
