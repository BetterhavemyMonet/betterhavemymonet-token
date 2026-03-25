#!/bin/bash

# Go to project folder
cd ~/betterhavemymonet-token || exit

# Make sure assets folder exists
mkdir -p assets

# Move your logo into assets (replace this path with actual local file path if different)
mv ~/path_to_your_logo/logo.png assets/logo.png

# Inject logo into Monet Money headline in index.html
# Replace the first H1 that contains 'Monet Money'
sed -i '/Monet Money/ {
  s|.*|<h1 style="font-size:3rem; display:flex; align-items:center; justify-content:center; gap:0.2rem;"><img src=\"assets/logo.png\" style=\"height:1em;\">onet <img src=\"assets/logo.png\" style=\"height:1em;\">oney</h1>|
}' index.html

# Optional: add glow CSS for h1 if not already added
grep -q 'h1 {' galaxy.css || cat << 'CSS' >> galaxy.css
h1 {
  color: #fff;
  text-shadow: 0 0 10px #00f, 0 0 20px #0ff, 0 0 30px #0ff;
}
CSS

# Commit and push changes
git add index.html assets/logo.png galaxy.css
git commit -m "Add logo M's to Monet Money headline"
git push origin main

echo "✅ DONE: Logo M's applied and pushed live!"
