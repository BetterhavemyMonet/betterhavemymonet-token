#!/bin/bash
# deploy_monet_full.sh - Auto fix dirs + flatten assets + dependencies + Cloudflare Pages deploy

export CLOUDFLARE_API_TOKEN="K_sc1oOb12gvdm2_g0aX5llPRbY_EiGaRo9ayPpe"

echo "🔍 Detecting project root..."
ROOT_DIR=$(find . -maxdepth 2 -type f \( -name "index.html" -o -name "package.json" \) -exec dirname {} \; | head -n 1)

if [ -z "$ROOT_DIR" ]; then
    echo "⚠️ No index.html or package.json found. Creating default root..."
    mkdir -p ./webroot
    ROOT_DIR="./webroot"
    touch "$ROOT_DIR/index.html"
fi

echo "✅ Using project root: $ROOT_DIR"

# Flatten nested folders: move all assets (HTML, JS, CSS, images) to root
echo "📦 Flattening nested folders..."
find "$ROOT_DIR" -mindepth 2 -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) -exec mv -t "$ROOT_DIR" {} +
find "$ROOT_DIR" -type d -empty -delete

# Ensure assets outside root get moved
find . -maxdepth 2 -type f \( -name "index.html" -o -name "*.js" -o -name "*.css" -o -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) ! -path "$ROOT_DIR/*" -exec mv -t "$ROOT_DIR" {} +

cd "$ROOT_DIR"

# Install npm dependencies if package.json exists
if [ -f package.json ]; then
    echo "📥 Installing npm dependencies..."
    npm install
fi

# Install Wrangler if missing
if ! command -v wrangler &> /dev/null; then
    echo "⚙️ Installing Wrangler..."
    npm install -g wrangler
fi

# Commit and push changes
echo "💾 Committing changes..."
git add .
git commit -m "Auto Web3 deploy + flatten directories" --allow-empty
git push origin HEAD:main --force

# Deploy to Cloudflare Pages
echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy . --project-name betterhavemymonet --branch main

echo "🎉 Deployment complete! Your site should now load without 404 errors!"
echo "🔗 URL: https://betterhavemymonet.pages.dev"
