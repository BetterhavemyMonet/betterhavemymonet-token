const CA="9CHAHyqDhPyiQgg4TKfyJ9iVp7dZaQqVao9uU7W7B5ZD";
// LIVE STATS
async function loadStats(){
 try{
  let r=await fetch("https://api.dexscreener.com/latest/dex/tokens/9CHAHyqDhPyiQgg4TKfyJ9iVp7dZaQqVao9uU7W7B5ZD");
  let d=await r.json();
  let p=d.pairs[0];
  let price=p.priceUsd;
  let mcap=p.fdv;
  let change=p.priceChange.h24;
  let color=change>=0?"#14F195":"#ff4d4d";
  document.getElementById("stats").innerHTML=
   "Price: $"+Number(price).toFixed(6)+" | MC: $"+Number(mcap).toLocaleString()+" | <span style=color:"+color+">"+change+"%</span>";
 }catch(e){console.log(e)}
}
setInterval(loadStats,10000);
loadStats();

// FAKE VIEWERS
setInterval(()=>{
 let v= Math.floor(Math.random()*40)+12;
 document.getElementById("viewers").innerHTML=v+" people viewing right now 👀";
},3000);
// LIVE PRICE + MCAP
async function loadStats(){
 try{
  let r=await fetch("https://api.dexscreener.com/latest/dex/tokens/9CHAHyqDhPyiQgg4TKfyJ9iVp7dZaQqVao9uU7W7B5ZD");
  let d=await r.json();
  let p=d.pairs[0];
  let price=p.priceUsd;
  let mcap=p.fdv;
  document.getElementById("stats").innerHTML=
   "Price: $"+Number(price).toFixed(6)+" | Market Cap: $"+Number(mcap).toLocaleString();
 }catch(e){console.log(e)}
}
setInterval(loadStats,10000);
loadStats();

function copyCA(){
  navigator.clipboard.writeText(CA);
  alert("Contract copied!");
}

// countdown
const target=new Date().getTime()+86400000;
setInterval(()=>{
  let now=new Date().getTime();
  let d=target-now;
  let el=document.getElementById("countdown");
  if(el){
    el.innerHTML=Math.floor(d/1000/60/60)+"h "+Math.floor((d/1000/60)%60)+"m ";
  }
},1000);

// fake buys ticker
const names=["Alex","Jordan","Chris","Taylor","Morgan","Riley"];
setInterval(()=>{
  let name=names[Math.floor(Math.random()*names.length)];
  let amount=(Math.random()*3).toFixed(2);
  let el=document.getElementById("ticker");
  if(el){
    el.innerHTML=name+" just bought "+amount+" SOL worth of $MONET 🚀";
  }
},3000);
