"use client";

import { useEffect, useRef } from "react";

const TURNS  = 3.5;
const STEPS  = Math.round(TURNS * 80);
const RADIUS = 148;
const TUBE   = 22;
const TILT_X = 0.10;

// 4 tipos de par de bases ciclando — visual do modelo físico
const PAIRS = [
  { half1: [245, 245, 250], half2: [190, 195, 215] },  // pearl / cinza
  { half1: [200, 16,  46 ], half2: [120, 8,   24 ] },  // vermelho / escuro
  { half1: [255, 190, 200], half2: [200, 16,  46 ] },  // rosa / vermelho
  { half1: [220, 220, 235], half2: [160, 8,   30 ] },  // branco / escuro
];

interface P2 { sx: number; sy: number; z: number; scale: number }
interface Item { z: number; draw: (ctx: CanvasRenderingContext2D) => void }

function project(x: number, y: number, z: number, cx: number, cy: number, fov: number, ay: number, ax: number, fy: number): P2 {
  const rx  = x * Math.cos(ay) - z * Math.sin(ay);
  const rz  = x * Math.sin(ay) + z * Math.cos(ay);
  const ry2 = y  * Math.cos(ax) - rz * Math.sin(ax);
  const rz2 = y  * Math.sin(ax) + rz * Math.cos(ax);
  const s   = fov / (fov + rz2 + fov * 0.45);
  return { sx: cx + rx * s, sy: cy + ry2 * s + fy, z: rz2, scale: s };
}

function depth(z: number, fov: number): number {
  return Math.max(0, Math.min(1, 1 - (z + fov * 0.55) / (fov * 1.1)));
}

function depthPow(z: number, fov: number, exp: number): number {
  const raw = depth(z, fov);
  return raw ** exp;
}

function drawTube(ctx: CanvasRenderingContext2D, q: P2, p: P2, r: number, g: number, b: number, d: number, tube: number) {
  const lw = Math.max(1.5, p.scale * tube);
  const dx = p.sx - q.sx, dy = p.sy - q.sy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = (-dy / len) * lw * 0.22;
  const ny = ( dx / len) * lw * 0.22;

  // Corpo do tubo
  ctx.beginPath();
  ctx.moveTo(q.sx, q.sy); ctx.lineTo(p.sx, p.sy);
  ctx.strokeStyle = `rgba(${r},${g},${b},${d * 0.92})`;
  ctx.lineWidth = lw; ctx.lineCap = "round"; ctx.stroke();

  // Highlight especular (brilho lateral)
  ctx.beginPath();
  ctx.moveTo(q.sx + nx, q.sy + ny); ctx.lineTo(p.sx + nx, p.sy + ny);
  ctx.strokeStyle = `rgba(255,255,255,${d * 0.42})`;
  ctx.lineWidth = Math.max(0.8, lw * 0.20); ctx.lineCap = "round"; ctx.stroke();

  // Segundo highlight mais suave
  ctx.beginPath();
  ctx.moveTo(q.sx + nx * 0.5, q.sy + ny * 0.5); ctx.lineTo(p.sx + nx * 0.5, p.sy + ny * 0.5);
  ctx.strokeStyle = `rgba(255,255,255,${d * 0.14})`;
  ctx.lineWidth = Math.max(0.4, lw * 0.42); ctx.lineCap = "round"; ctx.stroke();
}

function drawNode(ctx: CanvasRenderingContext2D, p: P2, r: number, g: number, b: number, d: number) {
  if (d < 0.008) return;
  const nr = Math.max(1.5, p.scale * 5.5);
  const gr = ctx.createRadialGradient(p.sx - nr * 0.30, p.sy - nr * 0.30, 0, p.sx, p.sy, nr);
  gr.addColorStop(0, `rgba(255,255,255,${d * 0.90})`);
  gr.addColorStop(0.4, `rgba(${r},${g},${b},${d * 0.90})`);
  gr.addColorStop(1, `rgba(${Math.round(r * 0.4)},${Math.round(g * 0.4)},${Math.round(b * 0.4)},${d * 0.60})`);

  ctx.beginPath(); ctx.arc(p.sx, p.sy, nr, 0, Math.PI * 2);
  ctx.fillStyle = gr; ctx.fill();
}

function drawRung(ctx: CanvasRenderingContext2D, p1: P2, p2: P2, pairIdx: number, d: number) {
  const pair  = PAIRS[pairIdx % PAIRS.length];
  const mx    = (p1.sx + p2.sx) / 2;
  const my    = (p1.sy + p2.sy) / 2;
  const barW  = Math.max(2, p1.scale * 7.5);

  const [r1, g1, b1] = pair.half1;
  const [r2, g2, b2] = pair.half2;

  // Sombra do degrau inteiro
  ctx.beginPath();
  ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy);
  ctx.strokeStyle = `rgba(0,0,0,${d * 0.35})`;
  ctx.lineWidth = barW * 2.2; ctx.lineCap = "round"; ctx.stroke();

  // Metade 1 (strand1 → meio)
  ctx.beginPath();
  ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(mx, my);
  ctx.strokeStyle = `rgba(${r1},${g1},${b1},${0.20 + d * 0.75})`;
  ctx.lineWidth = barW; ctx.lineCap = "round"; ctx.stroke();

  // Metade 2 (meio → strand2)
  ctx.beginPath();
  ctx.moveTo(mx, my); ctx.lineTo(p2.sx, p2.sy);
  ctx.strokeStyle = `rgba(${r2},${g2},${b2},${0.20 + d * 0.75})`;
  ctx.lineWidth = barW; ctx.lineCap = "round"; ctx.stroke();

  // Ponto de junção no meio
  const jr = Math.max(1.2, p1.scale * 3.5);
  const jg = ctx.createRadialGradient(mx - jr * 0.3, my - jr * 0.3, 0, mx, my, jr);
  jg.addColorStop(0, `rgba(255,255,255,${d * 0.90})`);
  jg.addColorStop(1, `rgba(180,180,200,${d * 0.50})`);
  ctx.beginPath(); ctx.arc(mx, my, jr, 0, Math.PI * 2);
  ctx.fillStyle = jg; ctx.fill();
}

function render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, ts: number, yShift: number) {
  const W  = canvas.width;
  const H  = canvas.height;
  const isMobile = W < 768;
  const radius = isMobile ? Math.min(W * 0.21, RADIUS) : RADIUS;
  const tube   = isMobile ? Math.round(TUBE * (radius / RADIUS)) : TUBE;
  const CX = isMobile ? W * 0.65 : W * 0.66;
  const CY = H / 2;
  const FOV = Math.min(W, H) * 0.90;

  ctx.clearRect(0, 0, W, H);

  const ay     = ts * 0.00044;
  const floatY = Math.sin(ts * 0.00032) * 12 + yShift;
  const helixH = H * 1.60;

  const s1: P2[] = [];
  const s2: P2[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * TURNS * 2 * Math.PI;
    const y = (i / STEPS - 0.5) * helixH;
    s1.push(project(radius * Math.cos(t),           y, radius * Math.sin(t),           CX, CY, FOV, ay, TILT_X, floatY));
    s2.push(project(radius * Math.cos(t + Math.PI), y, radius * Math.sin(t + Math.PI), CX, CY, FOV, ay, TILT_X, floatY));
  }

  const items: Item[] = [];

  // Strand 1 — pearl/branco
  for (let i = 1; i < s1.length; i++) {
    const p = s1[i], q = s1[i - 1];
    const z = (p.z + q.z) / 2;
    items.push({ z, draw: (c) => drawTube(c, q, p, 230, 232, 245, depthPow(z, FOV, 2), tube) });
  }

  // Strand 2 — vermelho da marca
  for (let i = 1; i < s2.length; i++) {
    const p = s2[i], q = s2[i - 1];
    const z = (p.z + q.z) / 2;
    items.push({ z, draw: (c) => drawTube(c, q, p, 200, 16, 46, depthPow(z, FOV, 2), tube) });
  }

  // Degraus com pares de bases — a cada 3 passos
  let pairIdx = 0;
  for (let i = 0; i <= STEPS; i += 3) {
    const p1 = s1[i], p2 = s2[i];
    const z  = (p1.z + p2.z) / 2;
    const pi = pairIdx++;
    items.push({
      z,
      draw: (c) => {
        const dRung = depthPow(z, FOV, 2);
        const dNode = depthPow(z, FOV, 3);
        drawRung(c, p1, p2, pi, dRung);
        drawNode(c, p1, 230, 232, 245, dNode);
        drawNode(c, p2, 200, 16,  46,  dNode);
      },
    });
  }

  items.sort((a, b) => b.z - a.z);
  items.forEach(({ draw }) => draw(ctx));
}

export default function DNAHelix({ opacity, yShift = 0 }: { opacity: number; yShift?: number }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef(opacity);
  const rafRef     = useRef<number>(0);
  const yShiftRef  = useRef(yShift);

  useEffect(() => { opacityRef.current = opacity; }, [opacity]);
  useEffect(() => { yShiftRef.current  = yShift;  }, [yShift]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const tick = (ts: number) => {
      if (opacityRef.current > 0.01) render(canvas, ctx, ts, yShiftRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(rafRef.current); };
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
