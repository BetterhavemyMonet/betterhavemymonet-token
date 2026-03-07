#!/bin/bash

echo "Installing Solana Web3..."
npm install @solana/web3.js

echo "Creating wallet script..."

cat <<'JS' > wallet.js
let wallet = null;

async function connectWallet(){
 if(!window.solana){
  alert("Please install Phantom Wallet");
  return;
 }

 const resp = await window.solana.connect();
 wallet = resp.publicKey.toString();

 document.getElementById("walletAddress").innerText =
 wallet.slice(0,4) + "..." + wallet.slice(-4);
}

document.getElementById("connectWallet").onclick = connectWallet;

document.getElementById("buyLibra").onclick = () => {

 const LIBRA_MINT="YOUR_LIBRA_TOKEN_ADDRESS";

 window.open(
 "https://jup.ag/swap/SOL-"+LIBRA_MINT,
 "_blank"
 );

};
JS

echo "Injecting scripts into index.html..."

sed -i '/<\/body>/i <script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js"></script>' index.html
sed -i '/<\/body>/i <script src="wallet.js"></script>' index.html

echo "Adding wallet buttons..."

sed -i '1i\
<div style="position:fixed;top:20px;right:20px;background:#000;padding:10px;border-radius:10px;color:white;">\
<button id="connectWallet">Connect Wallet</button>\
<button id="buyLibra">Buy LIBRA</button>\
<p id="walletAddress"></p>\
</div>' index.html

echo "Done. Commit and push your site."
