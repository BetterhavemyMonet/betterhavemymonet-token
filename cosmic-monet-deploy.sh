#!/bin/bash

# Go to project folder
cd ~/betterhavemymonet-token || exit

# 1️⃣ Merge public branch into main (favor public)
git fetch origin
git checkout main
git pull origin main
git merge origin/public -X theirs || true

# 2️⃣ Set domain
echo "betterhavemymonet.com" > CNAME

# 3️⃣ Fix all paths + remove emergent.host references
find . \( -name "*.html" -o -name "*.css" -o -name "*.js" \) -exec sed -i \
's|https://solana-token-hub-1.emergent.host||g;
 s|/solana-token-hub-1.emergent.host||g;
 s|src="/|src="./|g;
 s|href="/|href="./|g' {} +

# 4️⃣ Add galaxy background
cat << 'CSS' > galaxy.css
body {
  margin: 0;
  background: url("assets/galaxy.jpg") no-repeat center center fixed;
  background-size: cover;
  color: white;
  font-family: Arial, sans-serif;
}
CSS

# Inject galaxy.css if not already linked
grep -q 'galaxy.css' index.html || sed -i 's|</head>|<link rel="stylesheet" href="galaxy.css"></head>|' index.html

# 5️⃣ Add MonetMoney.png as M's in Monet Money
mkdir -p assets
mv ~/path_to_your_logo/MonetMoney.png assets/MonetMoney.png 2>/dev/null || echo "MonetMoney.png already in assets, skipping move"

sed -i '/Monet Money/ {
  s|.*|<h1 style="font-size:3rem; display:flex; align-items:center; justify-content:center; gap:0.2rem;"><img src=\"assets/MonetMoney.png\" style=\"height:1em;\">onet <img src=\"assets/MonetMoney.png\" style=\"height:1em;\">oney</h1>|
}' index.html

# Add glow effect for headline
grep -q 'h1 {' galaxy.css || cat << 'CSS' >> galaxy.css
h1 {
  color: #fff;
  text-shadow: 0 0 10px #00f, 0 0 20px #0ff, 0 0 30px #0ff;
}
CSS

# 6️⃣ Commit and push everything
git add .
git commit -m "Cosmic Monet deploy: merge, paths, galaxy background, MonetMoney.png M's, CNAME" || true
git push origin main

echo "🚀 DONE: Cosmic Monet site deployed live!"
