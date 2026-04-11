const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x:50, y:150, w:20, h:20, dy:0 };
let gravity = 0.5;
let playing = false;
let scroll = 0;

function playLevel(){
  player.y = 150;
  player.dy = 0;
  scroll = 0;
  playing = true;
  loop();
}

document.addEventListener("click",()=>{
  if (playing) player.dy = -8;
});

function loop(){
  if (!playing) return;

  ctx.clearRect(0,0,400,300);

  // physics
  player.dy += gravity;
  player.y += player.dy;

  ctx.fillStyle="#00ffa3";
  ctx.fillRect(player.x,player.y,player.w,player.h);

  scroll += 2;

  level.forEach((b,i)=>{
    if (!b) return;

    let x = (i%10)*40 - scroll;
    let y = Math.floor(i/10)*40;

    ctx.fillStyle="#ff0040";
    ctx.fillRect(x,y,40,40);

    if (
      player.x < x+40 &&
      player.x+player.w > x &&
      player.y < y+40 &&
      player.y+player.h > y
    ){
      playing = false;
      alert("Game Over");
    }
  });

  requestAnimationFrame(loop);
}
