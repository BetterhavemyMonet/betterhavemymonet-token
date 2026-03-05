#!/bin/bash
# deploy_monet.sh - Auto push + Cloudflare Pages deploy

# 1️⃣ Check for existing CF API token
if [ -z "$CF_API_TOKEN" ]; then
    echo "Cloudflare API token not found."
    read -p "Enter your Cloudflare API token: " CF_API_TOKEN
    export CF_API_TOKEN
    echo "export CF_API_TOKEN=\"$CF_API_TOKEN\"" >> ~/.bashrc
fi

# 2️⃣ Ensure Wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler..."
    npm install -g wrangler
fi

# 3️⃣ Add & commit changes (allow empty commits)
git add .
git commit -m "Auto Monet Web3 deploy" --allow-empty

# 4️⃣ Force push to main branch
git push origin HEAD:main --force

# 5️⃣ Deploy to Cloudflare Pages (headless using API token)
echo "Deploying to Cloudflare Pages..."
wrangler pages deploy . \
  --project-name betterhavemymonet \
  --branch main \
  --token "$CF_API_TOKEN"

echo "✅ Deployment complete!"
