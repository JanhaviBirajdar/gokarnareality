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

    let mousePos = { x: -1000, y: -1000 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mousePos = { x: e.clientX, y: e.clientY };
    };

    // Burst sparks on user click
    const handleClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.3;
        const speed = Math.random() * 2 + 1;
        sparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Multi-depth luxury particles
    const particleCount = Math.min(48, Math.floor(width / 32));
    const particles = [];
    const sparks = [];

    for (let i = 0; i < particleCount; i++) {
      const isBokeh = Math.random() > 0.75;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isBokeh ? Math.random() * 3.5 + 2.5 : Math.random() * 1.6 + 0.6,
        alpha: isBokeh ? Math.random() * 0.15 + 0.05 : Math.random() * 0.45 + 0.15,
        baseAlpha: isBokeh ? 0.12 : 0.4,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        isBokeh,
      });
    }

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      // Render floating golden stardust
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.phase += 0.015;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.phase) * 0.18;

        // Mouse proximity reaction (gentle luxury drift away)
        const dx = p.x - mousePos.x;
        const dy = p.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }

        // Screen wrap
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const currentAlpha = p.baseAlpha * (0.6 + Math.sin(p.phase) * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isBokeh) {
          ctx.fillStyle = `rgba(223, 183, 82, ${currentAlpha * 0.5})`;
          ctx.shadowBlur = 16;
          ctx.shadowColor = 'rgba(223, 183, 82, 0.3)';
        } else {
          ctx.fillStyle = `rgba(247, 231, 180, ${currentAlpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(223, 183, 82, 0.6)';
        }
        ctx.fill();
      }

      // Render interactive click sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.03; // subtle gravity
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 230, 181, ${s.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(223, 183, 82, 0.8)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-85"
      aria-hidden="true"
    />
  );
}
