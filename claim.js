async function updateCounters(){
 const r = await fetch
cd ~/betterhavemymonet-token && \
if [ -f "libra.png" ]; then \
  mkdir -p images && mv -f libra.png images/ && \
  sed -i '/<section style="padding:40px;text-align:center;background:#111;color:white">/a <img src="images/libra.png" alt="LIBRA Token" style="width:100px;margin-bottom:20px;border-radius:50%">' index.html && \
  echo "LIBRA token image moved and dashboard updated"; \
else \
  echo "No libra.png detected in repo root"; \
fi
mv ~/Downloads/Libra.png ~/betterhavemyMonet-token/Libra.png
mv -f ~/Downloads/Libra.png ~/betterhavemyMonet-token/Libra.png && echo "✅ Libra.png is ready in betterhavemyMonet-token"
cd ~/betterhavemymonet-token && \
if [ -f "libra.png" ]; then \
  mkdir -p images && mv -f libra.png images/ && \
  sed -i '/<section style="padding:40px;text-align:center;background:#111;color:white">/c\
<section style="padding:40px;text-align:center;background:#111;color:white">\
  <div style=\"display:flex;justify-content:center;align-items:center;gap:20px\">\
    <img src=\"images/libra.png\" alt=\"LIBRA Token\" style=\"width:80px;border-radius:50%;animation:spin 4s linear infinite;\">\
    <div>\
      <p>Tokens claimed: <span id=\"airdropClaimed\">0</span></p>\
      <p>Tokens remaining: <span id=\"airdropRemaining\">0</span></p>\
    </div>\
  </div>\
</section>' index.html && \
  echo "@keyframes spin { from {transform:rotate(0deg);} to {transform:rotate(360deg);} }" >> spin.css && \
  sed -i '/<\/head>/i <link rel=\"stylesheet\" href=\"spin.css\">' index.html && \
  echo "LIBRA token image moved, dashboard updated, spinning animation added"; \
else \
  echo "No libra.png detected in repo root"; \
fi
cd ~/betterhavemymonet-token && \
if [ -f "libra.png" ]; then \
  mkdir -p images && mv -f libra.png images/ && \
  echo "✅ Libra.png is ready in images/"; \
else \
  echo "No libra.png detected in repo root"; \
fi
cd ~/betterhavemymonet-token && \
# 1️⃣ Move image
if [ -f "libra.png" ]; then \
  mkdir -p images && mv -f libra.png images/ && \
  echo "✅ Libra.png is ready in images/"; \
else \
  echo "No libra.png detected in repo root"; \
fi && \
# 2️⃣ Update dashboard section
sed -i '/<section style="padding:40px;text-align:center;background:#111;color:white">/c\
<section style="padding:40px;text-align:center;background:#111;color:white">\
  <div style="display:flex;justify-content:center;align-items:center;gap:20px">\
    <img src=\"images/libra.png\" alt=\"LIBRA Token\" style=\"width:80px;border-radius:50%;animation:spin 4s linear infinite;\">\
    <div>\
      <p>Tokens claimed: <span id=\"airdropClaimed\">0</span></p>\
      <p>Tokens remaining: <span id=\"airdropRemaining\">0</span></p>\
    </div>\
  </div>\
</section>' index.html && \
# 3️⃣ Add spin CSS
echo "@keyframes spin { from {transform:rotate(0deg);} to {transform:rotate(360deg);} }" > spin.css && \
sed -i '/<\/head>/i <link rel="stylesheet" href="spin.css">' index.html && \
# 4️⃣ Update claim.js
cat <<'EOF' > claim.js
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
 if(!window.solana){
  alert('Install
cd ~/betterhavemymonet-token && \
# 1️⃣ Move image
if [ -f "libra.png" ]; then \
  mkdir -p images && mv -f libra.png images/ && \
  echo "✅ Libra.png is ready in images/"; \
else \
  echo "No libra.png detected in repo root"; \
fi && \
# 2️⃣ Update dashboard section
sed -i '/<section style="padding:40px;text-align:center;background:#111;color:white">/c\
<section style="padding:40px;text-align:center;background:#111;color:white">\
  <div style="display:flex;justify-content:center;align-items:center;gap:20px">\
    <img src=\"images/libra.png\" alt=\"LIBRA Token\" style=\"width:80px;border-radius:50%;animation:spin 4s linear infinite;\">\
    <div>\
      <p>Tokens claimed: <span id=\"airdropClaimed\">0</span></p>\
      <p>Tokens remaining: <span id=\"airdropRemaining\">0</span></p>\
    </div>\
  </div>\
</section>' index.html && \
# 3️⃣ Add spin CSS
echo "@keyframes spin { from {transform:rotate(0deg);} to {transform:rotate(360deg);} }" > spin.css && \
sed -i '/<\/head>/i <link rel="stylesheet" href="spin.css">' index.html && \
# 4️⃣ Update claim.js
cat <<'EOF' > claim.js
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
 if(!window.solana){
  alert('Install Phantom');
  return;
 }
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
document.getElementById('claimAirdrop').onclick = claimAirdrop;
updateCounters();
