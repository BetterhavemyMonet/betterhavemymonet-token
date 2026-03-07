async function claimAirdrop(){

 if(!window.solana){
  alert("Install Phantom");
  return;
 }

 const resp = await window.solana.connect();
 const wallet = resp.publicKey.toString();

 document.getElementById("claimStatus").innerText="Submitting claim...";

 const r = await fetch("/claim",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({wallet})
 });

 const d = await r.json();

 if(d.success){
  document.getElementById("claimStatus").innerText =
  "Airdrop sent! TX: "+d.tx;
 }else{
  document.getElementById("claimStatus").innerText =
  d.error;
 }

}

document.getElementById("claimAirdrop").onclick = claimAirdrop;
