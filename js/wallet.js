
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

