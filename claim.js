async function updateCounters(){
  const r = await fetch('/status');
  const d = await r.json();
  if(d.success){
    document.getElementById('airdropClaimed').innerText = d.claimed;
    document.getElementById('airdropRemaining').innerText = d.remaining;
    if(d.remaining === 0){
      document.getElementById('claimAirdrop').disabled = true;
      document.getElementById('claimStatus').innerText = "Airdrop fully claimed";
    }
  }
}

async function claimAirdrop(){
  if(!window.solana){ alert('Install Phantom'); return; }
  const resp = await window.solana.connect();
  const wallet = resp.publicKey.toString();
  document.getElementById('claimStatus').innerText = 'Submitting claim...';
  const r = await fetch('/claim',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({wallet})
  });
  const d = await r.json();
  if(d.success){
    document.getElementById('claimStatus').innerText = 'Airdrop sent! TX: '+d.tx;
  }else{
    document.getElementById('claimStatus').innerText = d.error;
  }
  await updateCounters();
}

// Jupiter swap + price
async function getLibraPrice(){
  try{
    const res = await fetch("https://quote-api.jup.ag/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=8AGu8Li9s9yWaGuGLxJKPe5V4irEENjtJYeYKuWQ1ray&amount=100000000");
    const data = await res.json();
    if(data.data && data.data.length > 0){
      document.getElementById('libraPrice').innerText = (data.data[0].outAmount/1e9).toFixed(2)+" LIBRA per 0.1 SOL";
    }
  }catch(e){console.error(e);}
}

async function swapLibra(){
  if(!window.solana){ alert('Install Phantom'); return; }
  const resp = await window.solana.connect();
  const wallet = resp.publicKey.toString();
  try{
    const quoteRes = await fetch("https://quote-api.jup.ag/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=8AGu8Li9s9yWaGuGLxJKPe5V4irEENjtJYeYKuWQ1ray&amount=100000000");
    const quoteData = await quoteRes.json();
    const route = quoteData.data[0].route;
    const swapRes = await fetch("https://quote-api.jup.ag/v1/swap", {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({route, userPublicKey: wallet})
    });
    const swapData = await swapRes.json();
    document.getElementById('swapStatus').innerText = "Swap complete! TX: "+swapData.tx;
  }catch(e){
    console.error(e);
    document.getElementById('swapStatus').innerText = "Swap failed: "+e;
  }
}

document.getElementById('claimAirdrop').onclick = claimAirdrop;
const swapBtn = document.getElementById('swapButton');
if(swapBtn){ swapBtn.onclick = swapLibra; }
updateCounters();
getLibraPrice();
setInterval(getLibraPrice,15000);
