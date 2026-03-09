#!/bin/bash
echo "---- LIBRA AUTO SITE FIX ----"

mkdir -p assets

if [ -f ~/Downloads/libra.png ]; then
  mv ~/Downloads/libra.png assets/libra.png
  echo "Moved libra.png to assets/"
fi

if ! grep -q "assets/libra.png" index.html; then
  sed -i "/<body>/a <img src=\"assets/libra.png\" alt=\"Libra Token\" id=\"libra-logo\">" index.html
fi

if ! grep -q "#libra-logo" index.html; then
  sed -i "/<head>/a <style>#libra-logo{width:120px;height:auto;display:block;margin:auto}</style>" index.html
fi

if ! grep -q "dexscreener.com" index.html; then
cat >> index.html << EOL

<div id="dexscreener-embed" style="width:100%;max-width:900px;margin:auto;">
<iframe src="https://dexscreener.com/solana/PAIR_ADDRESS?embed=1&theme=dark" style="width:100%;height:600px;border:0;"></iframe>
</div>

EOL
fi

git add .
git commit -m "Auto fix: Libra logo + Dexscreener embed"
git push

echo "---- FIX COMPLETE ----"
