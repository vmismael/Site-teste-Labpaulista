"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MolecularNet from "@/components/animations/MolecularNet";
import FloatingCells from "@/components/animations/FloatingCells";
import ECGWave from "@/components/animations/ECGWave";
import DNAHelix from "@/components/animations/DNAHelix";

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function fadeInOut(s0: number, s1: number, e0: number, e1: number, p: number): number {
  if (p <= s0) return 0;
  if (p <= s1) return (p - s0) / (s1 - s0);
  if (p <= e0) return 1;
  if (p <= e1) return 1 - (p - e0) / (e1 - e0);
  return 0;
}

// ─── Mapa de timing (todos os valores em % do scroll total 0–1) ────────────
//
//  Logo
//    hold center:   0.00 → 0.16   (≈ 88 vh com 550vh)
//    move to corner: 0.16 → 0.26  (≈ 55 vh — logo chega antes do texto)
//    fade out:      0.50 → 0.58
//
//  Animações de fundo          fade-in      hold          fade-out
//    Molecular:     0.00→0.06  [0.06–0.42]  0.42→0.52
//    Células:       0.44→0.50  [0.50–0.62]  0.62→0.72
//    ECG:           0.64→0.70  [0.70–0.78]  0.78→0.84
//    DNA:           0.78→0.84  [0.84–1.00]  (sem fade-out)
//
//  Textos — cada cena alinhada à janela hold da animação correspondente
//    s0 headline:   0.28 → 0.43  (dentro de Molecular hold 0.06–0.42)
//    s1 stats:      0.50 → 0.63  (dentro de Células hold 0.50–0.62)
//    s2 CTA:        0.84 → 0.97  (dentro de DNA hold 0.84–1.00)
// ──────────────────────────────────────────────────────────────────────────

function HeroLogo() {
  return (
    <Image
      src="/logo-white.png"
      alt="LabPaulista — Análises Clínicas"
      width={260}
      height={120}
      priority
      className="object-contain select-none"
      draggable={false}
    />
  );
}

export default function VideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const lastProgRef = useRef(-1);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      progressRef.current = clamp(-rect.top, 0, scrollable) / scrollable;
    };

    const tick = () => {
      const p = progressRef.current;
      if (Math.abs(p - lastProgRef.current) >= 0.002) {
        lastProgRef.current = p;
        setProgress(p);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Logo ─────────────────────────────────────────────────────────────────
  const logoT = easeInOut(clamp((progress - 0.16) / 0.10, 0, 1));
  const logoLeft = lerp(50, 94, logoT);
  const logoTop = lerp(50, 13, logoT);
  const logoScale = lerp(1.6, 1, logoT);
  const logoOpacity = Math.min(progress / 0.04, 1);

  // ── Animações de fundo ───────────────────────────────────────────────────
  const a0 = fadeInOut(0.00, 0.06, 0.42, 0.52, progress); // Molecular
  const a1 = fadeInOut(0.44, 0.50, 0.62, 0.72, progress); // Células
  const a2 = fadeInOut(0.64, 0.70, 0.78, 0.84, progress); // ECG
  // DNA: fade-in suave, sem fade-out (fica até o fim da seção)
  const a3 = fadeInOut(0.78, 0.84, 1.00, 1.00, progress);

  // DNA sobe de baixo: começa 750px abaixo do centro (400px no mobile), chega ao centro conforme scrola
  const dnaRise = clamp((progress - 0.78) / 0.22, 0, 1);
  const dnaMaxShift = typeof window !== "undefined" && window.innerWidth < 768 ? 400 : 750;
  const dnaYShift = (1 - dnaRise) * dnaMaxShift;

  // ── Textos ───────────────────────────────────────────────────────────────
  const s0 = fadeInOut(0.28, 0.33, 0.44, 0.50, progress); // Headline
  const s1 = fadeInOut(0.50, 0.55, 0.64, 0.70, progress); // Estatísticas
  const s2 = fadeInOut(0.84, 0.90, 1.00, 1.00, progress); // CTA — dentro do DNA hold (após ECG sumir)

  // Y de cada cena: sobe de baixo na entrada, sai pelo topo na saída
  const slideIn = (s: number, e: number) => (1 - clamp((progress - s) / (e - s), 0, 1)) * 30;
  const slideOut = (s: number, e: number) => clamp((progress - s) / (e - s), 0, 1) * -50;
  const s0Y = slideIn(0.28, 0.33) + slideOut(0.44, 0.50);
  const s1Y = slideIn(0.50, 0.55) + slideOut(0.64, 0.70);
  const s2Y = slideIn(0.84, 0.90);

  const showScrollHint = progress < 0.03;

  return (
    <section
      id="video-hero"
      ref={sectionRef}
      className="-mt-16 relative"
      style={{ height: "550vh" }}
      aria-label="Apresentação do Laboratório Paulista"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">

        {/* ── Animações ── */}
        <MolecularNet opacity={a0} />
        <FloatingCells opacity={a1} />
        <ECGWave opacity={a2} />
        <DNAHelix opacity={a3} yShift={dnaYShift} />

        {/* Vinheta radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 5,
            background:
              "radial-gradient(ellipse 72% 72% at 50% 50%, transparent 38%, rgba(10,10,10,0.62) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Gradiente direcional */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 5,
            background:
              "linear-gradient(160deg, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.40) 100%)",
          }}
          aria-hidden="true"
        />

        {/* ── Logo animado ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            zIndex: 8,
            left: `${logoLeft}%`,
            top: `${logoTop}%`,
            transform: `translate(-50%, -50%) scale(${logoScale})`,
            opacity: logoOpacity,
            willChange: "transform, opacity",
          }}
          aria-hidden="true"
        >
          <HeroLogo />
        </div>

        {/* ── Cenas de texto ── */}
        <div className="absolute inset-0 flex items-center" style={{ zIndex: 6 }}>
          <div className="container-content relative" style={{ paddingTop: "64px" }}>

            {/* Cena 1 — Headline */}
            <div
              className="absolute inset-x-0 px-6 md:px-10"
              style={{
                display: s0 < 0.01 ? "none" : "block",
                opacity: s0,
                transform: `translateY(${s0Y}px)`,
                pointerEvents: s0 > 0.3 ? "auto" : "none",
              }}
              aria-hidden={s0 < 0.1}
            >
              <div className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 border border-[rgba(255,255,255,0.18)] rounded-[2px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e]" aria-hidden="true" />
                <span className="text-white text-xs font-medium tracking-widest uppercase font-[var(--font-ibmplex)]">
                  Desde 2003 · ONA III · Platina PNCQ
                </span>
              </div>
              <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight font-[var(--font-playfair)]">
                Excelência em<br />
                <em className="not-italic text-[#c8102e]">análises clínicas</em><br />
                ao seu alcance.
              </h1>
            </div>

            {/* Cena 2 — Estatísticas */}
            <div
              className="absolute inset-x-0 px-6 md:px-10"
              style={{
                display: s1 < 0.01 ? "none" : "block",
                opacity: s1,
                transform: `translateY(${s1Y}px)`,
                pointerEvents: s1 > 0.3 ? "auto" : "none",
              }}
              aria-hidden={s1 < 0.1}
            >
              <h2 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight font-[var(--font-playfair)] mb-10">
                Mais de 20 anos<br />
                de <em className="not-italic text-[#c8102e]">excelência</em><br />
                comprovada.
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
                {[
                  { valor: "+20", label: "Anos de operação" },
                  { valor: "ONA III", label: "Nível máximo" },
                  { valor: "Platina", label: "15 anos PNCQ" },
                  { valor: "2", label: "Unidades SP" },
                ].map(({ valor, label }) => (
                  <div key={label} className="border-l-2 border-[#c8102e] pl-4">
                    <p className="text-white text-2xl font-extrabold font-[var(--font-playfair)]">{valor}</p>
                    <p className="text-[rgba(255,255,255,0.55)] text-sm font-[var(--font-ibmplex)]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cena 3 — CTA */}
            <div
              className="absolute inset-x-0 px-6 md:px-10"
              style={{
                display: s2 < 0.01 ? "none" : "block",
                opacity: s2,
                transform: `translateY(${s2Y}px)`,
                pointerEvents: s2 > 0.3 ? "auto" : "none",
              }}
              aria-hidden={s2 < 0.1}
            >
              <h2 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight font-[var(--font-playfair)] mb-8">
                Agende o seu<br />
                <em className="not-italic text-[#c8102e]">exame</em><br />
                hoje mesmo.
              </h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/5519994757375"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-[#c8102e] hover:bg-[#a00e25] text-white font-semibold rounded-[4px] transition-colors text-base font-[var(--font-ibmplex)]"
                >
                  Agendar via WhatsApp
                </a>
                <Link
                  href="/unidades"
                  className="px-7 py-3.5 border border-[rgba(255,255,255,0.22)] hover:border-white text-white font-medium rounded-[4px] transition-colors text-base font-[var(--font-ibmplex)]"
                >
                  Nossas unidades →
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ── Indicador de scroll ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ zIndex: 6, opacity: showScrollHint ? 1 : 0, transition: "opacity 0.6s ease" }}
          aria-hidden="true"
        >
          <span className="text-[rgba(255,255,255,0.5)] text-xs tracking-widest uppercase font-[var(--font-ibmplex)]">
            Role para explorar
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[rgba(255,255,255,0.4)] to-transparent animate-scroll-line" />
        </div>

      </div>
    </section>
  );
}
