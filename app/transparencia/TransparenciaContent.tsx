"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRAZO: { ano: number; valor: number }[] = [
  { ano: 2020, valor: 99.53 },
  { ano: 2021, valor: 99.58 },
  { ano: 2022, valor: 99.17 },
  { ano: 2023, valor: 99.98 },
  { ano: 2024, valor: 99.64 },
  { ano: 2025, valor: 99.15 },
];

const RECOLETA: { ano: number; valor: number }[] = [
  { ano: 2020, valor: 99.97 },
  { ano: 2021, valor: 99.63 },
  { ano: 2022, valor: 99.60 },
  { ano: 2023, valor: 99.04 },
  { ano: 2024, valor: 98.91 },
  { ano: 2025, valor: 92.12 },
];

const SATISFACAO = [
  { ano: 2020, excelente: 0,     otimo: 96.81, bom: 2.23 },
  { ano: 2021, excelente: 0,     otimo: 98.10, bom: 1.90 },
  { ano: 2022, excelente: 0,     otimo: 94.24, bom: 5.67 },
  { ano: 2023, excelente: 0,     otimo: 95.82, bom: 3.62 },
  { ano: 2024, excelente: 89.25, otimo:  8.98, bom: 1.35 },
  { ano: 2025, excelente: 87.34, otimo: 10.49, bom: 1.42 },
];

function fmt(v: number): string {
  return v.toFixed(2).replace(".", ",") + "%";
}

// ─── SimpleBarChart ────────────────────────────────────────────────────────────

const BAR_W = 72;
const BAR_G = 24;
const CH    = 155;
const CT    = 36;
const CB    = CT + CH;   // 191
const LP    = 20;
const RP    = 20;
const SW    = LP + PRAZO.length * BAR_W + (PRAZO.length - 1) * BAR_G + RP; // 592
const SH    = CB + 46;  // 237

function SimpleBarChart({
  data,
  yMin,
  yMax,
}: {
  data: { ano: number; valor: number }[];
  yMin: number;
  yMax: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const bars   = Array.from(svg.querySelectorAll<SVGRectElement>(".bar"));
    const labels = Array.from(svg.querySelectorAll<SVGTextElement>(".bv"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bars.forEach((b) => {
        b.setAttribute("height", b.dataset.h ?? "0");
        b.setAttribute("y",      b.dataset.y ?? String(CB));
      });
      labels.forEach((t) => { t.style.opacity = "1"; });
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        bars.forEach((b, i) =>
          gsap.to(b, {
            attr: {
              height: parseFloat(b.dataset.h ?? "0"),
              y:      parseFloat(b.dataset.y ?? String(CB)),
            },
            duration: 0.65,
            ease: "power2.out",
            delay: i * 0.07,
          })
        );
        gsap.to(labels, { opacity: 1, duration: 0.35, stagger: 0.07, delay: 0.55 });
        obs.disconnect();
      },
      { threshold: 0.25 }
    );

    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  const range = yMax - yMin;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SW} ${SH}`}
      aria-hidden="true"
      className="w-full max-w-2xl mx-auto"
      style={{ overflow: "visible" }}
    >
      <line
        x1={LP} y1={CB} x2={SW - RP} y2={CB}
        stroke="rgba(0,0,0,0.10)" strokeWidth={1}
      />

      {data.map((d, i) => {
        const ratio = Math.max(0, Math.min(1, (d.valor - yMin) / range));
        const bH  = Math.max(4, ratio * CH);
        const bY  = CB - bH;
        const bX  = LP + i * (BAR_W + BAR_G);
        const cx  = bX + BAR_W / 2;
        const is25 = d.ano === 2025;
        const fill = is25 ? "#a00e25" : "#c8102e";

        return (
          <g key={d.ano}>
            <rect
              className="bar"
              x={bX} y={CB} width={BAR_W} height={0}
              fill={fill} rx={2}
              data-h={bH} data-y={bY}
            />
            <text
              className="bv"
              x={cx} y={bY - 7}
              textAnchor="middle" fontSize={11} fontWeight={700}
              fill={fill}
              fontFamily="var(--font-ibmplex), sans-serif"
              opacity={0}
            >
              {fmt(d.valor)}
            </text>
            <text
              x={cx} y={CB + 22}
              textAnchor="middle" fontSize={11}
              fill={is25 ? "#0a0a0a" : "#6b6b6b"}
              fontWeight={is25 ? 600 : 400}
              fontFamily="var(--font-ibmplex), sans-serif"
            >
              {d.ano}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── SatisfacaoChart ──────────────────────────────────────────────────────────

const SBH   = 30;
const SBG   = 14;
const SLBW  = 46;
const SBAW  = 340;
const SSVGW = 560;
const STOP  = 10;
const SSVGH = STOP + SATISFACAO.length * (SBH + SBG) - SBG + 46;

function SatisfacaoChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const clips  = Array.from(svg.querySelectorAll<SVGRectElement>(".cr"));
    const labels = Array.from(svg.querySelectorAll<SVGTextElement>(".sl"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clips.forEach((r)  => r.setAttribute("width", r.dataset.w ?? "0"));
      labels.forEach((t) => { t.style.opacity = "1"; });
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        clips.forEach((r, i) =>
          gsap.to(r, {
            attr: { width: parseFloat(r.dataset.w ?? "0") },
            duration: 0.75,
            ease: "power2.out",
            delay: i * 0.08,
          })
        );
        gsap.to(labels, { opacity: 1, duration: 0.35, stagger: 0.08, delay: 0.65 });
        obs.disconnect();
      },
      { threshold: 0.15 }
    );

    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  const legendY = STOP + SATISFACAO.length * (SBH + SBG) - SBG + 24;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SSVGW} ${SSVGH}`}
      aria-hidden="true"
      className="w-full max-w-2xl mx-auto"
      style={{ overflow: "visible" }}
    >
      <defs>
        {SATISFACAO.map((d, i) => {
          const y  = STOP + i * (SBH + SBG);
          const tw = ((d.excelente + d.otimo + d.bom) / 100) * SBAW;
          return (
            <clipPath key={i} id={`sc${i}`}>
              <rect className="cr" x={SLBW} y={y} width={0} height={SBH} data-w={tw} />
            </clipPath>
          );
        })}
      </defs>

      {SATISFACAO.map((d, i) => {
        const y      = STOP + i * (SBH + SBG);
        const wE     = (d.excelente / 100) * SBAW;
        const wO     = (d.otimo     / 100) * SBAW;
        const wB     = (d.bom       / 100) * SBAW;
        const tw     = ((d.excelente + d.otimo + d.bom) / 100) * SBAW;
        const dom    = d.excelente > 0
          ? `${fmt(d.excelente)} Excelente`
          : `${fmt(d.otimo)} Ótimo`;
        const latest = i === SATISFACAO.length - 1;
        const cy     = y + SBH / 2 + 4;

        return (
          <g key={d.ano}>
            <text
              x={SLBW - 6} y={cy}
              textAnchor="end" fontSize={11}
              fill={latest ? "#0a0a0a" : "#6b6b6b"}
              fontWeight={latest ? 600 : 400}
              fontFamily="var(--font-ibmplex), sans-serif"
            >
              {d.ano}
            </text>

            <g clipPath={`url(#sc${i})`}>
              {d.excelente > 0 && (
                <rect x={SLBW}         y={y} width={wE} height={SBH} fill="#c8102e" />
              )}
              <rect x={SLBW + wE}      y={y} width={wO} height={SBH} fill="#3a3a3a" />
              <rect x={SLBW + wE + wO} y={y} width={wB} height={SBH} fill="#b8b8b8" />
            </g>

            <text
              className="sl"
              x={SLBW + tw + 10} y={cy}
              fontSize={10.5} fill="#0a0a0a" fontWeight={600}
              fontFamily="var(--font-ibmplex), sans-serif"
              opacity={0}
            >
              {dom}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x={SLBW}       y={legendY} width={10} height={10} fill="#c8102e" rx={1} />
      <text x={SLBW + 14}  y={legendY + 8} fontSize={10} fill="#6b6b6b" fontFamily="var(--font-ibmplex), sans-serif">Excelente</text>
      <rect x={SLBW + 84}  y={legendY} width={10} height={10} fill="#3a3a3a" rx={1} />
      <text x={SLBW + 98}  y={legendY + 8} fontSize={10} fill="#6b6b6b" fontFamily="var(--font-ibmplex), sans-serif">Ótimo</text>
      <rect x={SLBW + 140} y={legendY} width={10} height={10} fill="#b8b8b8" rx={1} />
      <text x={SLBW + 154} y={legendY + 8} fontSize={10} fill="#6b6b6b" fontFamily="var(--font-ibmplex), sans-serif">Bom</text>
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TransparenciaContent() {
  const prazoRef    = useRef<HTMLElement>(null);
  const satRef      = useRef<HTMLElement>(null);
  const recoletaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observers: IntersectionObserver[] = [];

    const fadeSection = (el: HTMLElement | null, sel: string) => {
      if (!el) return;
      const target = el.querySelector<HTMLElement>(sel);
      if (!target) return;
      gsap.set(target, { opacity: 0, y: 16 });
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(target, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
          obs.disconnect();
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    };

    fadeSection(prazoRef.current,    ".prazo-hd");
    fadeSection(satRef.current,      ".sat-hd");
    fadeSection(recoletaRef.current, ".recoleta-hd");

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative bg-[#0a0a0a] overflow-hidden"
        aria-labelledby="transparencia-heading"
      >
        <div className="absolute inset-0">
          <Image
            src="/lab-entrada.webp"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,10,10,0.95) 40%, rgba(10,10,10,0.60) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="relative container-content py-36">
          <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-5 font-[var(--font-ibmplex)]">
            Indicadores de desempenho
          </p>
          <h1
            id="transparencia-heading"
            className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8 font-[var(--font-playfair)] max-w-2xl"
          >
            Resultados que<br />
            falam por<br />
            <em className="not-italic text-[#c8102e]">si mesmos.</em>
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed max-w-xl font-[var(--font-ibmplex)]">
            Publicamos anualmente os indicadores de qualidade operacional do Laboratório Paulista.
            Sem filtro, sem ajuste de imagem — só o número real.
          </p>
        </div>
      </section>

      {/* ── Exames no prazo ── */}
      <section
        ref={prazoRef}
        className="bg-white py-24"
        aria-labelledby="prazo-heading"
      >
        <div className="container-content">
          <div className="prazo-hd max-w-xl mb-14">
            <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
              Pontualidade
            </p>
            <h2
              id="prazo-heading"
              className="text-[#0a0a0a] text-4xl font-extrabold leading-tight font-[var(--font-playfair)]"
            >
              Exames entregues dentro do prazo.
            </h2>
            <p className="mt-5 text-[#5a5a5a] text-base leading-relaxed font-[var(--font-ibmplex)]">
              Percentual de resultados liberados dentro do prazo estabelecido para cada tipo
              de exame, medido sobre o total de laudos emitidos no ano.
            </p>
          </div>
          <SimpleBarChart data={PRAZO} yMin={0} yMax={100} />
        </div>
      </section>

      {/* ── Satisfação ── */}
      <section
        ref={satRef}
        className="bg-[#f7f7f7] py-24 border-t border-[rgba(0,0,0,0.06)]"
        aria-labelledby="satisfacao-heading"
      >
        <div className="container-content">
          <div className="sat-hd max-w-xl mb-14">
            <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
              Percepção dos pacientes
            </p>
            <h2
              id="satisfacao-heading"
              className="text-[#0a0a0a] text-4xl font-extrabold leading-tight font-[var(--font-playfair)]"
            >
              Satisfação do cliente.
            </h2>
            <p className="mt-5 text-[#5a5a5a] text-base leading-relaxed font-[var(--font-ibmplex)]">
              Avaliação coletada via pesquisa aplicada após o atendimento. A partir de 2024,
              o critério "Excelente" passou a ser rastreado separadamente de "Ótimo".
            </p>
          </div>
          <SatisfacaoChart />
          <p className="text-[#9a9a9a] text-xs mt-5 font-[var(--font-ibmplex)]">
            * O critério "Excelente" foi introduzido na pesquisa de satisfação a partir de 2024. Nos anos anteriores, a escala contemplava apenas Ótimo, Bom, Regular e Ruim.
          </p>
        </div>
      </section>

      {/* ── Sem recoleta ── */}
      <section
        ref={recoletaRef}
        className="bg-white py-24 border-t border-[rgba(0,0,0,0.06)]"
        aria-labelledby="recoleta-heading"
      >
        <div className="container-content">
          <div className="recoleta-hd max-w-xl mb-14">
            <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
              Coleta técnica
            </p>
            <h2
              id="recoleta-heading"
              className="text-[#0a0a0a] text-4xl font-extrabold leading-tight font-[var(--font-playfair)]"
            >
              Pacientes sem necessidade de recoleta.
            </h2>
            <p className="mt-5 text-[#5a5a5a] text-base leading-relaxed font-[var(--font-ibmplex)]">
              Mede a qualidade da coleta de amostras. Um índice elevado reflete menos erros
              de hemólise, volume insuficiente ou identificação incorreta — e menos retorno
              desnecessário do paciente ao laboratório.
            </p>
          </div>
          <SimpleBarChart data={RECOLETA} yMin={0} yMax={100} />
        </div>
      </section>
    </>
  );
}
