const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];

for (let i = 0; i < 90; i++) {
  nodes.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    dx: (Math.random()-0.5)*1.2,
    dy: (Math.random()-0.5)*1.2
  });
}

let mouse = { x: null, y: null };

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  nodes.forEach(n => {
    n.x += n.dx;
    n.y += n.dy;

    if(n.x<0||n.x>canvas.width) n.dx*=-1;
    if(n.y<0||n.y>canvas.height) n.dy*=-1;

    ctx.beginPath();
    ctx.arc(n.x,n.y,2,0,Math.PI*2);
    ctx.fillStyle="#a78bfa";
    ctx.fill();
  });

  for(let i=0;i<nodes.length;i++){
    for(let j=i;j<nodes.length;j++){
      let dx = nodes[i].x - nodes[j].x;
      let dy = nodes[i].y - nodes[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);

      if(dist < 120){
        ctx.beginPath();
        ctx.moveTo(nodes[i].x,nodes[i].y);
        ctx.lineTo(nodes[j].x,nodes[j].y);
        ctx.strokeStyle="rgba(167,139,250,0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // interação com mouse
      if(mouse.x){
        let dxm = nodes[i].x - mouse.x;
        let dym = nodes[i].y - mouse.y;
        let distm = Math.sqrt(dxm*dxm + dym*dym);

        if(distm < 150){
          ctx.beginPath();
          ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(mouse.x,mouse.y);
          ctx.strokeStyle="rgba(255,78,205,0.2)";
          ctx.lineWidth = 0.1; 
          ctx.stroke();
        }
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();