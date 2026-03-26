#!/bin/bash

cd ~/betterhavemymonet-token || exit

# Merge public branch into main (favor public)
git fetch origin
git checkout main
git pull origin main
git merge origin/public -X theirs || true

# Set domain
echo "betterhavemymonet.com" > CNAME

# Fix all paths + remove emergent.host references
find . \( -name "*.html" -o -name "*.css" -o -name "*.js" \) -exec sed -i \
's|https://solana-token-hub-1.emergent.host||g;
 s|/solana-token-hub-1.emergent.host||g;
 s|src="/|src="./|g;
 s|href="/|href="./|g' {} +

# Add galaxy background + animated M's + stars
cat << 'CSS' > galaxy.css
body {
  margin: 0;
  background: url("assets/galaxy.jpg") no-repeat center center fixed;
  background-size: cover;
  color: white;
  font-family: Arial, sans-serif;
}
h1 {
  color: #fff;
  text-shadow: 0 0 10px #00f, 0 0 20px #0ff, 0 0 30px #0ff;
}
.logo-M {
  height: 1em;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%   { filter: drop-shadow(0 0 5px #0ff) drop-shadow(0 0 10px #00f); transform: scale(1); }
  50%  { filter: drop-shadow(0 0 15px #0ff) drop-shadow(0 0 30px #00f); transform: scale(1.2); }
  100% { filter: drop-shadow(0 0 5px #0ff) drop-shadow(0 0 10px #00f); transform: scale(1); }
}

/* Twinkling stars */
.stars {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
  background: transparent;
}
.star {
  position: absolute;
  width: 2px; height: 2px;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
  animation: twinkle 3s infinite alternate;
}
@keyframes twinkle {
  0% { opacity: 0.2; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.2; transform: scale(0.5); }
}
CSS

# Inject galaxy.css if not already linked
grep -q 'galaxy.css' index.html || sed -i 's|</head>|<link rel="stylesheet" href="galaxy.css"></head>|' index.html

# Add MonetMoney.png as animated M's
mkdir -p assets
mv ~/path_to_your_logo/MonetMoney.png assets/MonetMoney.png 2>/dev/null || echo "MonetMoney.png already in assets, skipping move"
sed -i '/Monet Money/ {
  s|.*|<h1 style="font-size:3rem; display:flex; align-items:center; justify-content:center; gap:0.2rem;"><img src=\"assets/MonetMoney.png\" class=\"logo-M\">onet <img src=\"assets/MonetMoney.png\" class=\"logo-M\">oney</h1>|
}' index.html

# Add stars container + JS
grep -q 'stars-container' index.html || sed -i 's|<body>|<body><div class="stars" id="stars-container"></div>|' index.html
grep -q 'stars-container' index.html || cat << 'JS' >> index.html
<script>
const starCount = 100;
const container = document.getElementById('stars-container');
for(let i=0;i<starCount;i++){
  const star=document.createElement('div');
  star.className='star';
  star.style.top=Math.random()*100+'%';
  star.style.left=Math.random()*100+'%';
  star.style.animationDuration=(2+Math.random()*3)+'s';
  star.style.width=star.style.height=(1+Math.random()*2)+'px';
  container.appendChild(star);
}
</script>
JS

# Commit & push
git add .
git commit -m "Cosmic Monet deploy: merge, paths, galaxy background, animated MonetMoney M's, twinkling stars, CNAME" || true
git push origin main

echo "🚀 DONE: Cosmic Monet site deployed live!"
