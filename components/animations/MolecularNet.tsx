"use client";

import { useEffect, useRef } from "react";

const COUNT    = 55;
const MAX_DIST = 145;
const ACCENT   = 8; // primeiros N partículas são vermelhas

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; accent: boolean;
}

export default function MolecularNet({ opacity }: { opacity: number }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const opacityRef  = useRef(opacity);
  const particles   = useRef<Particle[]>([]);
  const rafRef      = useRef<number>(0);

  useEffect(() => { opacityRef.current = opacity; }, [opacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particles.current = Array.from({ length: COUNT }, (_, i) => ({
      x:      Math.random() * canvas.width,
      y:      Math.random() * canvas.height,
      vx:     (Math.random() - 0.5) * 0.45,
      vy:     (Math.random() - 0.5) * 0.45,
      r:      Math.random() * 1.8 + 1.4,
      accent: i < ACCENT,
    }));

    const draw = () => {
      const w   = canvas.width;
      const h   = canvas.height;
      const pts = particles.current;
      ctx.clearRect(0, 0, w, h);

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx   = pts[i].x - pts[j].x;
          const dy   = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * 0.32;
            const isAccentConn = pts[i].accent || pts[j].accent;
            ctx.strokeStyle = isAccentConn
              ? `rgba(200,16,46,${a * 0.7})`
              : `rgba(255,255,255,${a})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.accent
          ? "rgba(200,16,46,0.9)"
          : "rgba(255,255,255,0.82)";
        ctx.fill();
      });
    };

    const tick = () => {
      if (opacityRef.current > 0.02) draw();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
