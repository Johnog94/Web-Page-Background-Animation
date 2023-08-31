<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    margin: 0;
    overflow: hidden;
    background-color: #fff; /* White background */
    cursor: pointer; color: blue;
    
  }
  canvas {
    display: block;
  }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let dots = [];
  const repulsionRadius = 100; // Radius around cursor that repels dots

  class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 2;
      this.color = '#007BFF'; // Blue color
      this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      };
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.velocity.x = -this.velocity.x;
      }

      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.velocity.y = -this.velocity.y;
      }
    }
  }

  function connectDots() {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0, 123, 255, 0.2)'; // Blue color with opacity
          ctx.lineWidth = 1;
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const dot of dots) {
      dot.update();
      dot.draw();
    }

    connectDots();

    requestAnimationFrame(animate);
  }

  function init() {
    dots = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      dots.push(new Dot(x, y));
    }

    animate();
  }

  init();

  canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (const dot of dots) {
      const dx = dot.x - mouseX;
      const dy = dot.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < repulsionRadius) {
        const angle = Math.atan2(dy, dx);
        dot.velocity.x += Math.cos(angle) * 0.2;
        dot.velocity.y += Math.sin(angle) * 0.2;
      }
    }
  });
</script>
</body>
</html>
