"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const LOGOS = [
  { src: "/convenios/convenio-2.png" },
  { src: "/convenios/convenio-3.png" },
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

// Duplicate for seamless infinite loop
const TRACK = [...LOGOS, ...LOGOS];

export default function ConveniosCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const dragging     = useRef(false);
  const dragStartX   = useRef(0);
  const scrollStart  = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const SPEED = 0.7; // px per frame

    const tick = () => {
      if (!dragging.current) {
        el.scrollLeft += SPEED;
        // Reset when past the first half (original set)
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const resetLoop = (el: HTMLDivElement) => {
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  };

  return (
    <section className="bg-white py-16 border-t border-[rgba(0,0,0,0.06)]" aria-label="Convênios aceitos">
      <div className="container-content mb-10">
        <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-2 font-[var(--font-ibmplex)]">
          Planos de saúde
        </p>
        <h2 className="text-[#0a0a0a] text-2xl font-bold font-[var(--font-playfair)]">
          Convênios aceitos
        </h2>
      </div>

      {/* Track */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden select-none"
        style={{ scrollbarWidth: "none", cursor: dragging.current ? "grabbing" : "grab" }}
        onMouseLeave={() => { dragging.current = false; }}
        onMouseDown={(e) => {
          dragging.current = true;
          dragStartX.current = e.clientX;
          scrollStart.current = containerRef.current!.scrollLeft;
        }}
        onMouseMove={(e) => {
          if (!dragging.current) return;
          const el = containerRef.current!;
          el.scrollLeft = scrollStart.current + (dragStartX.current - e.clientX);
          resetLoop(el);
        }}
        onMouseUp={() => { dragging.current = false; }}
        onTouchStart={(e) => {
          dragging.current = true;
          dragStartX.current = e.touches[0].clientX;
          scrollStart.current = containerRef.current!.scrollLeft;
        }}
        onTouchMove={(e) => {
          if (!dragging.current) return;
          const el = containerRef.current!;
          el.scrollLeft = scrollStart.current + (dragStartX.current - e.touches[0].clientX);
          resetLoop(el);
        }}
        onTouchEnd={() => { dragging.current = false; }}
      >
        {TRACK.map(({ src }, i) => (
          <div
            key={i}
            className="shrink-0 mx-3 w-44 h-24 flex items-center justify-center px-5 border border-[rgba(0,0,0,0.08)] rounded-[4px] bg-white hover:border-[rgba(0,0,0,0.18)] transition-colors"
          >
            <Image
              src={src}
              alt="Convênio aceito"
              width={130}
              height={70}
              className="object-contain max-h-[70px] w-auto pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
