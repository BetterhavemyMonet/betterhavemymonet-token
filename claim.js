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
  // Fetch mock price (replace with real API if needed)
  const priceResp = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=libra&vs_currencies=sol');
  const priceData = await priceResp.json();
  document.getElementById('libraPrice').innerText = priceData.libra?.sol ?? 'N/A';
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
    const coin = document.querySelector("#airdropDashboard img");
    coin.classList.add("pulse");
    setTimeout(()=>{coin.classList.remove("pulse");},1000);
  }else{
    document.getElementById('claimStatus').innerText = d.error;
  }
  await updateCounters();
}
document.getElementById('claimAirdrop').onclick = claimAirdrop;
updateCounters();
