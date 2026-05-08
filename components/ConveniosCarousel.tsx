"use client";

import { useEffect, useRef } from "react";

const LOGOS = [
  { src: "/convenios/convenio-2.png" },
  { src: "/convenios/convenio-3.jpg" },
  { src: "/convenios/convenio-4.png" },
  { src: "/convenios/convenio-5.png" },
  { src: "/convenios/convenio-6.png" },
  { src: "/convenios/convenio-7.png" },
  { src: "/convenios/convenio-8.png" },
  { src: "/convenios/convenio-9.png" },
  { src: "/convenios/convenio-10.jpg" },
  { src: "/convenios/convenio-11.jpg" },
  { src: "/convenios/convenio-12.png" },
  { src: "/convenios/convenio-13.png" },
  { src: "/convenios/convenio-14.png" },
  { src: "/convenios/convenio-15.jpg" },
];

const TRACK = [...LOGOS, ...LOGOS];
const DURATION_S = 50;

export default function ConveniosCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);
  const offsetAtStart = useRef(0);
  const currentPx = useRef(0);

  // Pré-decodifica todas as imagens no mount → sem decode mid-animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      if (!img.complete) img.decode().catch(() => {});
    });
  }, []);

  const readCurrentPx = (): number => {
    const track = trackRef.current;
    if (!track) return 0;
    const t = getComputedStyle(track).transform;
    if (!t || t === "none") return 0;
    try {
      return new DOMMatrixReadOnly(t).m41;
    } catch {
      return 0;
    }
  };

  const halfPx = (): number => (trackRef.current?.scrollWidth ?? 0) / 2;

  const wrap = (px: number, half: number): number => {
    if (half <= 0) return px;
    let p = px;
    while (p > 0) p -= half;
    while (p < -half) p += half;
    return p;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    currentPx.current = readCurrentPx();
    track.style.animation = "none";
    track.style.transform = `translate3d(${Math.round(currentPx.current)}px, 0, 0)`;

    isDragging.current = true;
    didDrag.current = false;
    dragStartX.current = e.clientX;
    offsetAtStart.current = currentPx.current;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 2) didDrag.current = true;

    const half = halfPx();
    const next = wrap(offsetAtStart.current + dx, half);
    currentPx.current = next;
    trackRef.current.style.transform = `translate3d(${Math.round(next)}px, 0, 0)`;
  };

  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    isDragging.current = false;

    const track = trackRef.current;
    const half = halfPx();
    if (half > 0) {
      const elapsedFrac = -currentPx.current / half;
      const delay = elapsedFrac * DURATION_S;
      track.style.transform = "";
      track.style.animation = `labp-marquee-scroll ${DURATION_S}s linear -${delay}s infinite`;
    }

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section
      className="bg-white py-16 border-t border-[rgba(0,0,0,0.06)]"
      aria-label="Convênios aceitos"
    >
      <div className="container-content mb-10">
        <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-2 font-[var(--font-ibmplex)]">
          Planos de saúde
        </p>
        <h2 className="text-[#0a0a0a] text-2xl font-bold font-[var(--font-playfair)]">
          Convênios aceitos
        </h2>
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="labp-marquee flex w-max cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          {TRACK.map(({ src }, i) => (
            <div
              key={i}
              className="shrink-0 mx-3 w-44 h-24 flex items-center justify-center px-5 border border-[rgba(0,0,0,0.08)] rounded-[4px] bg-white"
            >
              <div
                className="pointer-events-none select-none"
                style={{
                  width: 130,
                  height: 70,
                  backgroundImage: `url(${src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundColor: "white",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes labp-marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .labp-marquee {
          animation: labp-marquee-scroll ${DURATION_S}s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .labp-marquee { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
