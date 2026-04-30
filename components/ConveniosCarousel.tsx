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

const TRACK = [...LOGOS, ...LOGOS];

export default function ConveniosCarousel() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);
  const posRef      = useRef(0);
  const dragging    = useRef(false);
  const dragStartX  = useRef(0);
  const posAtDrag   = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const SPEED = 0.7;

    const tick = () => {
      if (!dragging.current) {
        posRef.current += SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current -= half;
      }
      track.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onDragStart = (x: number) => {
    dragging.current  = true;
    dragStartX.current = x;
    posAtDrag.current  = posRef.current;
  };

  const onDragMove = (x: number) => {
    if (!dragging.current || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    let next = posAtDrag.current + (dragStartX.current - x);
    if (next >= half) next -= half;
    if (next < 0)     next += half;
    posRef.current = next;
  };

  const onDragEnd = () => { dragging.current = false; };

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

      <div
        className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ willChange: "transform" }}
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
      </div>
    </section>
  );
}
