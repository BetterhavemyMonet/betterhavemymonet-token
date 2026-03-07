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
