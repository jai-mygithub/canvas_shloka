Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};
const canvas = document.getElementById('canvas1');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const colors = ['#db9e30', '#ad5100', '#f9f0b1'];
let particleArray;

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
  this.opacity = Math.random();
  this.opacity_direction = 1;
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.globalAlpha = this.opacity;
  ctx.fill();
};

Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;
  if (this.opacity_direction == 1) {
    this.opacity += 0.01;
  } else {
    this.opacity -= 0.01;
  }
  if (this.opacity <= 0.2 || this.opacity > 0.9) {
    this.opacity_direction = this.opacity_direction * -1;
  }
  this.draw();
};

function init() {
  particleArray = [];
  for (let i = 0; i <= 1000; i++) {
    let size = Math.random() * 2;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = Math.random() * 0.4 - 0.2;
    let directionY = Math.random() * 0.4 - 0.2;
    let color = colors.sample();

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init();
animate();

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
