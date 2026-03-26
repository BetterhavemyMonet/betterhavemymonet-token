const CA="9CHAHyqDhPyiQgg4TKfyJ9iVp7dZaQqVao9uU7W7B5ZD";

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
