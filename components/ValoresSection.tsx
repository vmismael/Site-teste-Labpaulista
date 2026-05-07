"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { VALORES } from "@/lib/constants";

export default function ValoresSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".valor-card");
    if (!cards?.length) return;

    gsap.set(cards, { opacity: 0, y: 24 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current!);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-28" aria-labelledby="valores-heading">
      <div className="container-content">
        <div className="mb-14">
          <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
            Nossos valores
          </p>
          <h2
            id="valores-heading"
            className="text-[#111111] text-4xl sm:text-5xl font-extrabold leading-tight font-[var(--font-playfair)]"
          >
            O que guia tudo que fazemos
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALORES.map(({ titulo, descricao, Icon }) => (
            <li
              key={titulo}
              className="valor-card border border-[rgba(0,0,0,0.08)] p-7 rounded-[4px] flex flex-col gap-4 hover:border-[rgba(200,16,46,0.25)] hover:shadow-sm transition-all duration-200 bg-white"
            >
              <div
                className="w-10 h-10 flex items-center justify-center bg-[rgba(200,16,46,0.07)] rounded-[4px]"
                aria-hidden="true"
              >
                <Icon size={20} className="text-[#c8102e]" />
              </div>
              <div>
                <h3 className="text-[#111111] font-bold text-lg mb-2 font-[var(--font-playfair)]">
                  {titulo}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed font-[var(--font-ibmplex)]">
                  {descricao}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
