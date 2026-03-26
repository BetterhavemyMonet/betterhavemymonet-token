// Cursor glow follow
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  if(!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// Click ripple anywhere
const root = document.getElementById('rippleRoot');
document.addEventListener('click', e => {
  if(!root) return;
  const r = document.createElement('span');
  r.className = 'ripple';
  r.style.left = e.clientX + 'px';
  r.style.top  = e.clientY + 'px';
  r.style.width = r.style.height = '24px';
  root.appendChild(r);
  setTimeout(()=> r.remove(), 750);
});

// BUY button shake + logo energy wave
const buy = document.querySelector('.buyNow');
const logo = document.querySelector('.logo');

if(buy){
  buy.addEventListener('click', ()=>{
    document.body.classList.add('shake');
    setTimeout(()=>document.body.classList.remove('shake'), 320);
  });
}

// Pulse wave from logo every few seconds
if(logo){
  setInterval(()=>{
    logo.classList.add('wave');
    setTimeout(()=>logo.classList.remove('wave'), 650);
  }, 3500);
}
