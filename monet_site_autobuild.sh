#!/bin/bash

set -e

REPO="https://github.com/Betterhavemymonet/betterhavemymonet-token.git"
DIR="$HOME/betterhavemymonet-token"

echo "🧠 Preparing repo..."

if [ ! -d "$DIR" ]; then
  git clone $REPO
fi

cd $DIR

echo "📦 Installing Solana + wallet libraries..."

npm init -y >/dev/null 2>&1 || true

npm install \
@solana/web3.js \
@solana/wallet-adapter-base \
@solana/wallet-adapter-wallets \
@solana/wallet-adapter-react \
@solana/wallet-adapter-react-ui \
@solana/wallet-adapter-phantom \
@solana/wallet-adapter-solflare \
@jup-ag/wallet-adapter >/dev/null

mkdir -p js

echo "⚡ Creating wallet connect script..."

cat > js/wallet.js <<'WALLET'

const connectBtn = document.getElementById("connectWallet");

async function connectWallet() {

  if (window.solana && window.solana.isPhantom) {
    try {

      const resp = await window.solana.connect();

      document.getElementById("walletAddress").innerText =
        resp.publicKey.toString();

    } catch (err) {

      console.log(err);

    }
  } else {

    alert("Install Phantom Wallet");

  }

}

connectBtn.onclick = connectWallet;

WALLET

echo "🎨 Updating landing page..."

if [ ! -f index.html ]; then

cat > index.html <<'HTML'

<!DOCTYPE html>
<html>
<head>
<title>Monet Money</title>
<style>
body{
background:black;
color:white;
font-family:sans-serif;
text-align:center;
padding-top:100px;
}
button{
padding:15px 25px;
font-size:18px;
cursor:pointer;
}
</style>
</head>

<body>

<h1>Monet Money</h1>

<p>The Future Currency of Creativity</p>

<button id="connectWallet">Connect Wallet</button>

<p id="walletAddress"></p>

<script src="js/wallet.js"></script>

</body>
</html>

HTML

fi

echo "🚀 Deploying..."

git add .

git commit -m "Auto Monet wallet portal build" || true

git push

echo "✅ Monet site updated and redeployed."

