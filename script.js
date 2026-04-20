// =====================
// PAGE SWITCH
// =====================
function next(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}


// =====================
// BUTTONS (YES / NO)
// =====================
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    noBtn.style.position = "absolute";
    noBtn.style.top = Math.random() * window.innerHeight + "px";
    noBtn.style.left = Math.random() * window.innerWidth + "px";
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {

    if (typeof particles !== "undefined") {
      for (let i = 0; i < 60; i++) {
        particles.push(
          new Particle(
            canvas.width / 2,
            canvas.height / 2,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          )
        );
      }
    }

    next("p1b");

    setTimeout(() => {
      next("p2");
    }, 1500);
  });
}


// =====================
// HEART PARTICLES
// =====================
const canvas = document.getElementById("heartCanvas");
const ctx = canvas?.getContext("2d");

if (canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.life = 100;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.life--;
  }

  draw() {
    if (!ctx) return;
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particles = [];

function createParticles() {
  if (!canvas) return;

  for (let i = 0; i < 2; i++) {
    particles.push(
      new Particle(
        Math.random() * canvas.width,
        canvas.height,
        (Math.random() - 0.5) * 2,
        -Math.random() * 2
      )
    );
  }
}

function animate() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  createParticles();

  particles.forEach((p, index) => {
    p.update();
    p.draw();

    if (p.life <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});


// =====================
// FORM CHECK
// =====================
const form = document.getElementById("favForm");
const input = document.getElementById("favInput");
const msg = document.getElementById("responseMsg");

if (form && input) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let value = input.value.toLowerCase().trim();

    if (value === "prabh") {
      msg.innerText = "Correct ❤️";

      setTimeout(() => {
        next("p2b");

        setTimeout(() => {
          next("p3love");
        }, 2000);

      }, 800);

    } else {
      msg.innerText = "Bad taste 😑 try again";
    }
  });
}


// =====================
// LOVE PARTICLES
// =====================
const loveCanvas = document.getElementById("loveCanvas");
const loveCtx = loveCanvas?.getContext("2d");

if (loveCanvas) {
  loveCanvas.width = window.innerWidth;
  loveCanvas.height = window.innerHeight;
}

class LoveParticle {
  constructor(x, y, dx, dy) {
    this.position = { x, y };
    this.velocity = { x: dx, y: dy };
    this.acceleration = { x: dx * 0.01, y: dy * 0.01 };
    this.age = 100;
  }

  update() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.age--;
  }

  draw() {
    if (!loveCtx) return;

    loveCtx.fillStyle = "pink";
    loveCtx.beginPath();

    let x = this.position.x;
    let y = this.position.y;

    loveCtx.moveTo(x, y);
    loveCtx.arc(x - 3, y, 3, 0, Math.PI, true);
    loveCtx.arc(x + 3, y, 3, 0, Math.PI, true);
    loveCtx.lineTo(x, y + 6);

    loveCtx.fill();
  }
}

let loveParticles = [];
let loveStarted = false;

function createLoveParticles() {
  if (!loveCanvas) return;

  for (let i = 0; i < 3; i++) {
    loveParticles.push(
      new LoveParticle(
        Math.random() * loveCanvas.width,
        loveCanvas.height,
        (Math.random() - 0.5) * 2,
        -Math.random() * 2
      )
    );
  }
}

function animateLove() {
  if (document.getElementById("p3love")?.classList.contains("active")) {

    loveCtx?.clearRect(0, 0, loveCanvas.width, loveCanvas.height);

    createLoveParticles();

    loveParticles.forEach((p, i) => {
      p.update();
      p.draw();

      if (p.age <= 0) loveParticles.splice(i, 1);
    });

    if (!loveStarted) {
      loveStarted = true;

      setTimeout(() => {
        next("p4memories");
      }, 5000);
    }
  }

  requestAnimationFrame(animateLove);
}

animateLove();


// =====================
// SLIDESHOW
// =====================
let images = [
  "img1.jpeg",
  "img2.jpeg",
  "img3.jpeg",
  "img4.jpeg",
  "img5.jpeg",
  "img6.jpeg",
  "img7.jpeg",
  "img8.jpeg",
  "img9.jpeg",
];

let messages = [
  "First time vdia pagg",
  "motor",
  "agayakari bacha mera sohna veera",
  "Meri photo khicho mai ni kise di hon dnda",
  "photoooooooooooooooo",
  "santa kanjoos 1 toffee ni dyi",
  "1 ruppee ki kimat tum kya jaano",
  "kyu ni ho ri pdhayi?",
  "didi mere naal ghr chl mera jee ni lgna"
];

let index = 0;

function showSlide() {
  const img = document.getElementById("slideImg");
  const text = document.getElementById("slideText");

  if (img && text) {
    img.src = images[index];
    text.innerText = messages[index];
  }
}

function nextImage() {
  index++;
  if (index >= images.length) index = 0;
  showSlide();
}

function prevImage() {
  index--;
  if (index < 0) index = images.length - 1;
  showSlide();
}

function startSlideshow() {
  index = 0;
  showSlide();
}


// =====================
// CATCH BUTTON
// =====================
const catchBtn = document.getElementById("catchBtn");

if (catchBtn) {
  catchBtn.addEventListener("mouseover", () => {
    catchBtn.style.position = "absolute";
    catchBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";
    catchBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
  });

  catchBtn.addEventListener("click", () => {
    next("p7loading");
  });
}