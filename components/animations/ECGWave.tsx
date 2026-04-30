"use client";

import { useEffect, useRef } from "react";

// ── Tabela ECG pré-computada (1 ciclo PQRST, ~2000 amostras) ──────────────
const TABLE = 2000;
const ecgTable = new Float32Array(TABLE);
(function buildTable() {
  const g = (x: number, mu: number, s: number) =>
    Math.exp(-((x - mu) ** 2) / (2 * s * s));
  for (let i = 0; i < TABLE; i++) {
    const t = i / TABLE;
    let y = 0;
    y += 0.14  * g(t, 0.135, 0.024);  // onda P
    y -= 0.08  * g(t, 0.272, 0.010);  // Q
    y += 0.95  * g(t, 0.300, 0.013);  // R (pico)
    y -= 0.18  * g(t, 0.328, 0.010);  // S
    y += 0.24  * g(t, 0.500, 0.038);  // onda T
    y += 0.04  * g(t, 0.700, 0.060);  // leve elevação U
    ecgTable[i] = y;
  }
})();

function ecgSample(phase: number): number {
  const idx = Math.floor(((phase % 1) + 1) % 1 * TABLE);
  return ecgTable[idx];
}

// ── Configuração dos 3 canais ─────────────────────────────────────────────
interface Channel {
  yFrac: number;    // posição vertical (0–1 do canvas)
  amp: number;      // amplitude como fração do canvas H
  period: number;   // duração de 1 ciclo (s)
  offset: number;   // defasagem de fase
  r: number; g: number; b: number;
  label: string;
  glow: boolean;
}

const CHANNELS: Channel[] = [
  { yFrac: 0.22, amp: 0.175, period: 0.833, offset: 0.00, r: 200, g:  16, b:  46, label: "LEAD I",  glow: true  },
  { yFrac: 0.56, amp: 0.120, period: 0.845, offset: 0.18, r: 210, g: 210, b: 255, label: "LEAD II", glow: false },
  { yFrac: 0.83, amp: 0.080, period: 0.820, offset: 0.37, r: 180, g: 220, b: 255, label: "LEAD III",glow: false },
];

// ── Render ────────────────────────────────────────────────────────────────
function render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, ts: number) {
  const W = canvas.width;
  const H = canvas.height;
  const time = ts * 0.001;

  ctx.clearRect(0, 0, W, H);

  // Grade minor
  ctx.strokeStyle = "rgba(200,16,46,0.055)";
  ctx.lineWidth = 0.5;
  const gs = Math.round(W / 48); // ~40px a 1920
  for (let x = 0; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Grade major (cada 5 linhas)
  ctx.strokeStyle = "rgba(200,16,46,0.13)";
  ctx.lineWidth = 0.9;
  for (let x = 0; x < W; x += gs * 5) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += gs * 5) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // ── Canais ──
  CHANNELS.forEach((ch) => {
    const { yFrac, amp, period, offset, r, g, b, label, glow } = ch;
    const CY  = H * yFrac;
    const AMP = H * amp;
    const sweepX = ((time % period) / period) * W;
    const speed  = W / period; // px/s

    const getY = (x: number) => {
      const age = x <= sweepX
        ? (sweepX - x) / speed
        : (sweepX + W - x) / speed;
      const phase = ((time - age) / period + offset) % 1;
      return CY - AMP * ecgSample((phase + 1) % 1);
    };

    // ── Desenho em 4 passes (dim → brilhante) ──
    const drawRange = (x0: number, x1: number) => {
      if (x1 <= x0) return;
      ctx.beginPath();
      ctx.moveTo(x0, getY(x0));
      for (let x = x0 + 1; x <= x1; x += 1) ctx.lineTo(x, getY(x));
      ctx.stroke();
    };

    // Pass 1 — traço inteiro, muito suave
    ctx.strokeStyle = `rgba(${r},${g},${b},0.13)`;
    ctx.lineWidth = 0.9;
    drawRange(0, W);

    // Pass 2 — últimos 35% do varredura, médio
    const p2Start = Math.max(0, sweepX - W * 0.35);
    ctx.strokeStyle = `rgba(${r},${g},${b},0.48)`;
    ctx.lineWidth = 1.5;
    drawRange(Math.floor(p2Start), Math.floor(sweepX));

    // Pass 3 — últimos 8%, brilhante
    const p3Start = Math.max(0, sweepX - W * 0.08);
    if (glow) { ctx.shadowColor = `rgba(${r},${g},${b},0.9)`; ctx.shadowBlur = 9; }
    ctx.strokeStyle = `rgba(${r},${g},${b},0.88)`;
    ctx.lineWidth = 2.0;
    drawRange(Math.floor(p3Start), Math.floor(sweepX));
    ctx.shadowBlur = 0;

    // Pass 4 — ponta pura (2%), máximo brilho + glow forte
    const p4Start = Math.max(0, sweepX - W * 0.02);
    if (glow) { ctx.shadowColor = `rgba(${r},${g},${b},1.0)`; ctx.shadowBlur = 18; }
    ctx.strokeStyle = `rgba(255,255,255,${glow ? 0.95 : 0.70})`;
    ctx.lineWidth = 2.6;
    drawRange(Math.floor(p4Start), Math.floor(sweepX));
    ctx.shadowBlur = 0;

    // Cursor (linha vertical sutil na posição da ponta)
    ctx.strokeStyle = `rgba(${r},${g},${b},0.22)`;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 7]);
    ctx.beginPath(); ctx.moveTo(sweepX, CY - AMP * 1.5); ctx.lineTo(sweepX, CY + AMP * 1.5); ctx.stroke();
    ctx.setLineDash([]);

    // Linha de base tracejada
    ctx.strokeStyle = `rgba(${r},${g},${b},0.09)`;
    ctx.lineWidth = 0.6;
    ctx.setLineDash([4, 12]);
    ctx.beginPath(); ctx.moveTo(0, CY); ctx.lineTo(W, CY); ctx.stroke();
    ctx.setLineDash([]);

    // Rótulo do canal
    ctx.fillStyle = `rgba(${r},${g},${b},0.60)`;
    ctx.font = "bold 11px monospace";
    ctx.fillText(label, 18, CY - AMP * 1.35);
  });

  // ── Display de BPM ──
  const bpmPeriod = CHANNELS[0].period;
  const heartPhase = (time % bpmPeriod) / bpmPeriod;
  // Pulso visual no pico R (fase ≈ 0.30)
  const pulseDist = Math.abs(heartPhase - 0.30);
  const pulse = Math.exp(-pulseDist * pulseDist / 0.002);

  const bpmSize = 36 + pulse * 8;
  ctx.shadowColor = `rgba(200,16,46,${pulse * 0.9})`;
  ctx.shadowBlur = pulse * 20;
  ctx.fillStyle = `rgba(200,16,46,${0.72 + pulse * 0.28})`;
  ctx.font = `bold ${bpmSize}px monospace`;
  ctx.textAlign = "right";
  ctx.fillText("72", W - 64, 56);
  ctx.shadowBlur = 0;

  ctx.font = "bold 13px monospace";
  ctx.fillStyle = `rgba(255,255,255,${0.35 + pulse * 0.15})`;
  ctx.fillText("BPM", W - 14, 56);

  ctx.font = "10px monospace";
  ctx.fillStyle = "rgba(255,255,255,0.30)";
  ctx.fillText("RITMO SINUSAL", W - 14, 74);

  // Escala de tempo (linha pequena + rótulo)
  const scaleW = gs * 5; // 5 quadrados = 200ms a padrão clínico
  ctx.strokeStyle = "rgba(255,255,255,0.40)";
  ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(18, H - 24); ctx.lineTo(18 + scaleW, H - 24); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(18, H - 20); ctx.lineTo(18, H - 28); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(18 + scaleW, H - 20); ctx.lineTo(18 + scaleW, H - 28); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.30)";
  ctx.font = "9px monospace";
  ctx.textAlign = "left";
  ctx.fillText("200ms", 20 + scaleW, H - 16);

  // Timestamp
  const sec = Math.floor(time);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.font = "9px monospace";
  ctx.textAlign = "right";
  ctx.fillText(
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`,
    W - 14,
    H - 16
  );
  ctx.textAlign = "left";
}

// ── Componente ────────────────────────────────────────────────────────────
export default function ECGWave({ opacity }: { opacity: number }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef(opacity);
  const rafRef     = useRef<number>(0);

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

    const tick = (ts: number) => {
      if (opacityRef.current > 0.02) render(canvas, ctx, ts);
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
