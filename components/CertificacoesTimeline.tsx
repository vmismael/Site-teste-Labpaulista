"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CERTIFICACOES } from "@/lib/constants";
import { cn } from "@/lib/cn";

export default function CertificacoesTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Linha cresce conforme a seção sobe pela viewport
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      }
    );

    // Itens revelam com stagger leve, cada um com trigger individual
    const items = sectionRef.current?.querySelectorAll(".cert-item");
    items?.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
        },
        opacity: 0,
        x: -16,
        duration: 0.55,
        ease: "power2.out",
      });
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section ref={sectionRef} className="bg-white py-28" aria-labelledby="cert-heading">
      <div className="container-content">
        <div className="mb-14">
          <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
            Qualidade comprovada
          </p>
          <h2
            id="cert-heading"
            className="text-[#0a0a0a] text-4xl sm:text-5xl font-extrabold leading-tight font-[var(--font-playfair)]"
          >
            Certificações e marcos de qualidade
          </h2>
          <p className="text-[#6b6b6b] mt-4 text-base max-w-xl font-[var(--font-ibmplex)]">
            Mais de 20 anos de rigor técnico, auditoria externa e excelência
            reconhecida pelas principais organizações do setor.
          </p>
        </div>

        <ol aria-label="Linha do tempo de certificações" className="relative">
          <div
            ref={lineRef}
            className="absolute left-[11px] top-2 bottom-2 w-px bg-[rgba(0,0,0,0.08)] origin-top"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {CERTIFICACOES.map((cert) => (
              <li key={`${cert.ano}-${cert.titulo}`} className="cert-item flex gap-6">
                {/* Dot */}
                <div className="relative shrink-0 mt-1">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                      cert.destaque
                        ? "border-[#c8102e] bg-[#c8102e]"
                        : "border-[rgba(0,0,0,0.16)] bg-white"
                    )}
                    aria-hidden="true"
                  >
                    {cert.destaque && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex-1 pb-6",
                    cert.destaque &&
                      "bg-[#fdf2f4] border border-[rgba(200,16,46,0.2)] rounded-[4px] p-5 -ml-2"
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span
                      className={cn(
                        "text-xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded-[2px] font-[var(--font-ibmplex)]",
                        cert.destaque
                          ? "bg-[#c8102e] text-white"
                          : "bg-[#f5f5f5] text-[#6b6b6b]"
                      )}
                    >
                      {cert.mes ? `${cert.mes} ${cert.ano}` : cert.ano}
                    </span>
                    {cert.destaque && (
                      <span className="text-[#c8102e] text-xs font-semibold font-[var(--font-ibmplex)]">
                        Marco de excelência
                      </span>
                    )}
                  </div>
                  <h3 className="text-[#0a0a0a] font-bold text-base mb-1 font-[var(--font-playfair)]">
                    {cert.titulo}
                  </h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed font-[var(--font-ibmplex)]">
                    {cert.descricao}
                  </p>
                </div>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
