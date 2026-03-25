#!/bin/bash

# Go to project
cd ~/betterhavemymonet-token || exit

# Merge public into main (favor public changes)
git fetch origin
git checkout main
git pull origin main
git merge origin/public -X theirs || true

# Add CNAME for domain
echo "betterhavemymonet.com" > CNAME

# Fix all paths + remove emergent references
find . \( -name "*.html" -o -name "*.css" -o -name "*.js" \) -exec sed -i \
's|https://solana-token-hub-1.emergent.host||g;
 s|/solana-token-hub-1.emergent.host||g;
 s|src="/|src="./|g;
 s|href="/|href="./|g' {} +

# Create galaxy background CSS
cat << 'CSS' > galaxy.css
body {
  margin: 0;
  background: url("assets/galaxy.jpg") no-repeat center center fixed;
  background-size: cover;
  color: white;
  font-family: Arial, sans-serif;
}
CSS

# Inject CSS into index.html
sed -i 's|</head>|<link rel="stylesheet" href="galaxy.css"></head>|' index.html

# Commit and push
git add .
git commit -m "final fix: merge, paths, galaxy background, CNAME" || true
git push origin main

echo "🔥 DONE: Your site is updated and pushed!"
