const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.redirect('/claim');
});

app.get('/claim', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>MONET Airdrop</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="background:black;color:white;text-align:center;padding:40px;font-family:sans-serif;">
    <h1>💵 MONET AIRDROP</h1>
    <p>Connect your wallet and claim your tokens.</p>

    <button onclick="connectWallet()" style="padding:15px 30px;font-size:18px;background:#00ffcc;border:none;border-radius:10px;font-weight:bold;box-shadow:0 0 15px #00ffcc;">
      🚀 Claim MONET
    </button>

    <p id="status" style="margin-top:20px;opacity:0.8;"></p>

    <script>
    async function connectWallet(){
      const status = document.getElementById("status");
      try {
        if(window.solana && window.solana.isPhantom){
          const resp = await window.solana.connect();
          status.innerText = "Connected: " + resp.publicKey.toString();
        } else {
          status.innerText = "⚠️ Open inside Phantom or Solflare wallet";
        }
      } catch(e){
        status.innerText = "Error: " + e.message;
      }
    }
    </script>

  </body>
  </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 MONET Airdrop running"));
