#!/bin/bash

# -----------------------------
# AUTO-DETECT VARIABLES
# -----------------------------
# Detect GitHub repo remote URL
GIT_REMOTE=$(git remote get-url origin 2>/dev/null)
if [ -z "$GIT_REMOTE" ]; then
    echo "Error: Not a git repository or no origin set!"
    exit 1
fi

# Extract username and repo name
USERNAME=$(echo "$GIT_REMOTE" | sed -E 's/.*[:\/]([^\/]+)\/(.+)\.git/\1/')
REPO=$(echo "$GIT_REMOTE" | sed -E 's/.*[:\/]([^\/]+)\/(.+)\.git/\2/')

SITE_URL="https://${USERNAME}.github.io/${REPO}/"

# Detect Solana wallet
if command -v solana >/dev/null 2>&1; then
    WALLET_ADDRESS=$(solana address 2>/dev/null)
else
    echo "Warning: Solana CLI not found. You must edit WALLET_ADDRESS manually."
    WALLET_ADDRESS="YOUR_WALLET_ADDRESS_HERE"
fi

# Detect image file (first PNG or WebP found)
IMAGE_FILE=$(ls *.png 2>/dev/null | head -n1)
if [ -z "$IMAGE_FILE" ]; then
    IMAGE_FILE=$(ls *.webp 2>/dev/null | head -n1)
fi
if [ -z "$IMAGE_FILE" ]; then
    echo "Error: No image found (PNG or WebP)!"
    exit 1
fi

TOKEN_NAME="Libra"
TOKEN_SYMBOL="LIBRA"
DESCRIPTION="Libra is a community-driven SPL token on Solana, representing balance, fairness, and collaboration within our ecosystem."
INDEX_FILE="index.html"
JSON_FILE="libra_metadata.json"

# -----------------------------
# Convert image to base64
# -----------------------------
IMAGE_BASE64=$(base64 -w 0 "$IMAGE_FILE")

# -----------------------------
# Generate self-contained JSON metadata
# -----------------------------
cat > $JSON_FILE << METADATA
{
  "name": "$TOKEN_NAME",
  "symbol": "$TOKEN_SYMBOL",
  "description": "$DESCRIPTION",
  "seller_fee_basis_points": 0,
  "image": "data:image/png;base64,${IMAGE_BASE64}",
  "external_url": "https://betterhavemymonet.com",
  "attributes": [
    {"trait_type": "Theme", "value": "Balance & Cosmic"},
    {"trait_type": "Color Scheme", "value": "Neon Blue & Purple"}
  ],
  "properties": {
    "files": [
      {"uri": "data:image/png;base64,${IMAGE_BASE64}", "type": "image/png"}
    ],
    "category": "image",
    "creators": [
      {"address": "$WALLET_ADDRESS", "share": 100}
    ]
  }
}
METADATA

# -----------------------------
# Generate index.html with embedded image
# -----------------------------
cat > $INDEX_FILE << HTMLPAGE
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>$TOKEN_NAME Token</title>
<style>
body { font-family: Arial, sans-serif; background: #0b0f2a; color: #fff; text-align: center; }
h1 { color: #00f6ff; margin-top: 50px; }
img { max-width: 400px; margin: 30px auto; display: block; }
button { padding: 15px 30px; margin-top: 20px; font-size: 18px; cursor: pointer; background: #6f00ff; color: #fff; border: none; border-radius: 10px; }
</style>
</head>
<body>
<h1>$TOKEN_NAME Token</h1>
<img src="data:image/png;base64,${IMAGE_BASE64}" alt="$TOKEN_NAME Logo">
<p>Balance, fairness, and community-driven rewards on Solana.</p>
<button onclick="alert('Airdrop coming soon!')">Join the Airdrop</button>
</body>
</html>
HTMLPAGE

# -----------------------------
# Git operations
# -----------------------------
git add "$INDEX_FILE" "$JSON_FILE"
git commit -m "Auto-deploy $TOKEN_NAME site with embedded image and metadata"
git push origin main

# -----------------------------
# Output URLs
# -----------------------------
echo "✅ GitHub Pages site live at: $SITE_URL"
echo "✅ Self-contained metadata JSON URL: ${SITE_URL}${JSON_FILE}"
echo "Detected wallet: $WALLET_ADDRESS"
echo "Embedded image file: $IMAGE_FILE"
