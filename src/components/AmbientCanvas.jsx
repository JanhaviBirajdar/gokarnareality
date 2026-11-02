import React, { useEffect, useRef } from 'react';

export default function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle golden particles
    const particleCount = Math.min(32, Math.floor(width / 40));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        speedY: -(Math.random() * 0.25 + 0.08),
        speedX: (Math.random() - 0.5) * 0.15,
        fadeSpeed: (Math.random() * 0.004 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.fadeSpeed;

        if (p.alpha > 0.6) {
          p.alpha = 0.6;
          p.fadeSpeed = -p.fadeSpeed;
        } else if (p.alpha < 0.08) {
          p.alpha = 0.08;
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 183, 82, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(223, 183, 82, 0.4)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}

