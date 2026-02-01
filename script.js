window.onload = function() {
  // Show first page
  document.getElementById("page1").classList.add("active");

  // Countdown
  const birthday=new Date("2026-02-02T00:00:00").getTime();
  setInterval(()=>{
    const now=new Date().getTime();
    let diff=birthday-now;
    if(diff<=0){
      document.getElementById("timer").innerHTML="🎉 Happy Birthday! 🎉";
      return;
    }
    const totalSeconds=Math.floor(diff/1000);
    const days=Math.floor(totalSeconds/(24*60*60));
    const hours=Math.floor((totalSeconds%(24*60*60))/3600);
    const minutes=Math.floor((totalSeconds%3600)/60);
    const seconds=totalSeconds%60;
    document.getElementById("timer").innerHTML=
      `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left 💗`;
  },1000);

  // Audio - Jhol song from Dropbox
  let audio = new Audio("https://www.dropbox.com/scl/fi/wmcxta39lgsvzaiv2z657/Jhol-Coke-Studio-Pakistan-pagalall.com.mp3?rlkey=cklchqde3euipc4rrwzmrq6hs&st=fxkz3oe8&?raw=1");
  audio.loop = true;
  audio.play().catch(() => console.log("Tap anywhere to start music"));
  document.body.addEventListener("click", function(){
    if(audio.paused){ audio.play(); }
  }, {once:true});

  // Floating hearts
  function createHeart(){
    const heart = document.createElement("div");
    heart.className="heart";
    heart.style.left=Math.random()*100+"%";
    heart.style.top="100%";
    heart.style.width=20+Math.random()*10+"px";
    heart.style.height=heart.style.width;
    document.getElementById("hearts").appendChild(heart);
    let speed = 1 + Math.random()*3;
    let angle = Math.random()*20 -10;
    let pos = 100;
    function move(){
      pos -= speed;
      heart.style.top = pos + "%";
      heart.style.transform = `rotate(45deg) translateX(${angle}px)`;
      if(pos> -10) requestAnimationFrame(move);
      else heart.remove();
    }
    move();
  }
  setInterval(createHeart,200);

  // Confetti on letter page
  const confettiCanvas = document.getElementById("confetti");
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  let confettis=[];
  for(let i=0;i<200;i++){
    confettis.push({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: Math.random()*6+4,
      d: Math.random()*20+10,
      color: `hsl(${Math.random()*360},100%,50%)`,
      tilt: Math.random()*10-5
    });
  }

  function drawConfetti(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    confettis.forEach(c=>{
      ctx.beginPath();
      ctx.fillStyle=c.color;
      ctx.moveTo(c.x+ c.tilt, c.y);
      ctx.lineTo(c.x+ c.tilt + c.r/2, c.y + c.r);
      ctx.lineTo(c.x+ c.tilt - c.r/2, c.y + c.r);
      ctx.closePath();
      ctx.fill();
      c.y += 2;
      c.x += Math.sin(c.y/10);
      if(c.y>window.innerHeight){c.y=0;c.x=Math.random()*window.innerWidth;}
    });
    requestAnimationFrame(drawConfetti);
  }
  drawConfetti();
};

// Navigation function
function go(n){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page"+n).classList.add("active");
}
