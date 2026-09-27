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
                data = json.loads(out[idx:])
                return data.get("data", data)
            time.sleep(2 * (attempt + 1))
        except Exception as e:
            time.sleep(2 * (attempt + 1))
    raise RuntimeError("GraphQL request failed after retries")

# 1. Staged upload create
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
target = res_s["stagedUploadsCreate"]["stagedTargets"][0]
upload_url = target["url"]
resource_url = target["resourceUrl"]
params = {p["name"]: p["value"] for p in target["parameters"]}

# 2. Upload file
print("2. Uploading to GCS...")
with open(IMG_PATH, "rb") as f:
    r = requests.post(upload_url, data=params, files={"file": (FILENAME, f, "image/webp")})
print("Upload status:", r.status_code)

# 3. fileCreate
print("3. Calling fileCreate...")
q_file = """
mutation fileCreate($files: [FileCreateInput!]!) {
  fileCreate(files: $files) {
    userErrors { field message }
    files {
      id
      fileStatus
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
file_id = res_f["fileCreate"]["files"][0]["id"]
print("Created file ID:", file_id)

# 4. Wait for READY
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
for i in range(12):
    time.sleep(2)
    res_st = run_gql(q_file_status, {"id": file_id})
    node = res_st.get("node", {})
    status = node.get("fileStatus")
    print(f"  Attempt {i+1}: {status}")
    if status == "READY":
        cdn_url = node.get("image", {}).get("url")
        print("Ready! CDN URL:", cdn_url)
        break

if not cdn_url:
    print("File not ready in time")
    exit(1)

# 5. Try updating collection
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
