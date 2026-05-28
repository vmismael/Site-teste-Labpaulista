"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { DOCUMENTOS } from "./documentos";

function ScrollBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-lenis-prevent
      className="bg-white border border-[rgba(0,0,0,0.07)] rounded-[4px] p-8 max-h-[560px] overflow-y-auto overscroll-contain"
    >
      {children}
    </div>
  );
}

function DocumentContent({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="font-[var(--font-ibmplex)] text-sm leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-3" />;

        if (/^Capítulo\s+/i.test(trimmed)) {
          return (
            <p key={i} className="text-[#c8102e] text-[10px] font-semibold tracking-widest uppercase mt-6 mb-1">
              {trimmed}
            </p>
          );
        }
        if (/^Artigo\s+\d/.test(trimmed)) {
          return (
            <p key={i} className="text-[#0a0a0a] font-semibold mt-4 mb-1">
              {trimmed}
            </p>
          );
        }
        if (/^\d+\.\s+/.test(trimmed) && trimmed.length < 80) {
          return (
            <p key={i} className="text-[#0a0a0a] font-semibold mt-4 mb-1">
              {trimmed}
            </p>
          );
        }
        if (trimmed.startsWith("—") || trimmed.startsWith("–")) {
          return (
            <p key={i} className="pl-4 text-[#4a4a4a] py-[2px] border-l border-[rgba(200,16,46,0.2)]">
              {trimmed}
            </p>
          );
        }
        if (/^\([IVX]+\)/.test(trimmed)) {
          return (
            <p key={i} className="pl-6 text-[#5a5a5a] py-[2px]">
              {trimmed}
            </p>
          );
        }
        if (/^Parágrafo/.test(trimmed)) {
          return (
            <p key={i} className="text-[#7a7a7a] italic mt-2">
              {trimmed}
            </p>
          );
        }
        if (/^[a-z]\)/.test(trimmed)) {
          return (
            <p key={i} className="pl-4 text-[#4a4a4a] py-[2px]">
              {trimmed}
            </p>
          );
        }
        return (
          <p key={i} className="text-[#4a4a4a] mt-2">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function ComplianceContent() {
  const liderancaRef = useRef<HTMLElement>(null);
  const documentosRef = useRef<HTMLElement>(null);
  const canalRef = useRef<HTMLElement>(null);
  const [aberto, setAberto] = useState<number | null>(null);

  const toggle = (i: number) => setAberto((prev) => (prev === i ? null : i));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observers: IntersectionObserver[] = [];

    const liderancaEl = liderancaRef.current;
    if (liderancaEl) {
      const text = liderancaEl.querySelector<HTMLElement>(".lideranca-text");
      const logo = liderancaEl.querySelector<HTMLElement>(".lideranca-logo");
      if (text && logo) {
        gsap.set(text, { opacity: 0, x: -30 });
        gsap.set(logo, { opacity: 0, x: 30 });
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              gsap.to(text, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" });
              gsap.to(logo, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", delay: 0.1 });
              obs.disconnect();
            }
          },
          { threshold: 0.15 }
        );
        obs.observe(liderancaEl);
        observers.push(obs);
      }
    }

    const documentosEl = documentosRef.current;
    if (documentosEl) {
      const heading = documentosEl.querySelector<HTMLElement>(".documentos-heading");
      if (heading) {
        gsap.set(heading, { opacity: 0, y: 16 });
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              gsap.to(heading, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
              obs.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        obs.observe(documentosEl);
        observers.push(obs);
      }
    }

    const canalEl = canalRef.current;
    if (canalEl) {
      const items = canalEl.querySelectorAll<HTMLElement>(".canal-item");
      if (items.length) {
        gsap.set(items, { opacity: 0, y: 16 });
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
              });
              obs.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        obs.observe(canalEl);
        observers.push(obs);
      }
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#0a0a0a] overflow-hidden" aria-labelledby="compliance-heading">
        <div className="absolute inset-0">
          <Image
            src="/lab-logo-parede.webp"
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
            Ética e transparência
          </p>
          <h1
            id="compliance-heading"
            className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8 font-[var(--font-playfair)] max-w-2xl"
          >
            Ética como<br />
            <em className="not-italic text-[#c8102e]">princípio</em>,<br />
            não exceção.
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed max-w-xl font-[var(--font-ibmplex)]">
            O Programa Compliance do Laboratório Paulista assegura que todas as
            atividades sejam conduzidas em conformidade com a legislação, normas
            internas e padrões éticos reconhecidos.
          </p>
        </div>
      </section>

      {/* ── Liderança ── */}
      <section ref={liderancaRef} className="bg-white py-24" aria-labelledby="lideranca-heading">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lideranca-text">
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
                Liderança
              </p>
              <h2
                id="lideranca-heading"
                className="text-[#0a0a0a] text-4xl font-extrabold leading-tight mb-8 font-[var(--font-playfair)]"
              >
                Compromisso começa no topo.
              </h2>
              <p className="text-[#5a5a5a] text-base leading-relaxed mb-10 font-[var(--font-ibmplex)]">
                O programa é conduzido com envolvimento direto da liderança técnica
                e administrativa, garantindo que compliance não seja um documento
                arquivado — mas uma prática diária em cada nível da organização.
              </p>
              <div className="flex flex-col gap-4">
                <div className="border-l-2 border-[#c8102e] pl-6 py-1">
                  <p className="text-[#9a9a9a] text-xs font-semibold tracking-widest uppercase mb-1 font-[var(--font-ibmplex)]">
                    Responsabilidade Técnica
                  </p>
                  <p className="text-[#0a0a0a] font-bold text-lg font-[var(--font-playfair)]">
                    Dr. Gustavo Fernando Veraldi Ismael
                  </p>
                  <p className="text-[#6b6b6b] text-sm font-[var(--font-ibmplex)]">CRM 82.109</p>
                </div>
                <div className="border-l-2 border-[#c8102e] pl-6 py-1">
                  <p className="text-[#9a9a9a] text-xs font-semibold tracking-widest uppercase mb-1 font-[var(--font-ibmplex)]">
                    Responsabilidade Legal
                  </p>
                  <p className="text-[#0a0a0a] font-bold text-lg font-[var(--font-playfair)]">
                    Simone Montemor Ismael
                  </p>
                </div>
              </div>
            </div>

            <div className="lideranca-logo flex items-center justify-end">
              <Image
                src="/logo-colorido.png"
                alt="Logotipo Laboratório Paulista"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Documentos ── */}
      <section
        ref={documentosRef}
        className="bg-[#f7f7f7] py-24 border-t border-[rgba(0,0,0,0.06)]"
        aria-labelledby="documentos-heading"
      >
        <div className="container-content">
          <div className="documentos-heading max-w-xl mb-14">
            <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
              Documentos oficiais
            </p>
            <h2
              id="documentos-heading"
              className="text-[#0a0a0a] text-4xl font-extrabold leading-tight font-[var(--font-playfair)]"
            >
              Políticas e regimentos.
            </h2>
          </div>

          <div className="divide-y divide-[rgba(0,0,0,0.08)] border-t border-[rgba(0,0,0,0.08)]">
            {DOCUMENTOS.map((doc, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={aberto === i}
                  aria-controls={`doc-content-${i}`}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="text-[#0a0a0a] text-base font-semibold font-[var(--font-playfair)] group-hover:text-[#c8102e] transition-colors">
                    {doc.titulo}
                  </span>
                  <span
                    className="ml-6 flex-shrink-0 w-7 h-7 flex items-center justify-center border border-[rgba(0,0,0,0.12)] rounded-[2px] text-[#c8102e] text-lg font-light group-hover:border-[#c8102e] transition-colors"
                    aria-hidden="true"
                  >
                    {aberto === i ? "−" : "+"}
                  </span>
                </button>

                {aberto === i && (
                  <div id={`doc-content-${i}`} className="pb-10">
                    {doc.conteudo ? (
                      <ScrollBox>
                        <DocumentContent text={doc.conteudo} />
                      </ScrollBox>
                    ) : (
                      <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-[4px] p-8">
                        <p className="text-[#9a9a9a] text-sm italic font-[var(--font-ibmplex)]">
                          Documento em elaboração.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Canal de denúncia ── */}
      <section ref={canalRef} className="relative bg-[#0a0a0a] overflow-hidden" aria-labelledby="canal-heading">
        <div className="absolute inset-0">
          <Image
            src="/lab-frente.webp"
            alt=""
            fill
            className="object-cover opacity-15"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(10,10,10,0.82)" }}
            aria-hidden="true"
          />
        </div>
        <div className="relative container-content py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
                Canal de denúncia
              </p>
              <h2
                id="canal-heading"
                className="text-white text-4xl font-extrabold leading-tight mb-6 font-[var(--font-playfair)]"
              >
                Reporte com segurança e sem retaliação.
              </h2>
              <p className="text-[rgba(255,255,255,0.65)] text-base leading-relaxed font-[var(--font-ibmplex)]">
                Reportes de boa-fé são encorajados e protegidos por política
                interna. Nenhuma retaliação será tolerada contra quem comunique
                violações pelos canais oficiais.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                {
                  label: "E-mail",
                  valor: "canalcompliance@laboratoriopaulista.com",
                  href: "mailto:canalcompliance@laboratoriopaulista.com",
                },
                {
                  label: "Telefone",
                  valor: "(19) 3523-4700 — ramal 220",
                  href: "tel:+551935234700",
                },
                {
                  label: "Site",
                  valor: "www.labpaulistarc.com.br",
                  href: "https://www.labpaulistarc.com.br",
                  external: true,
                },
              ].map(({ label, valor, href, external }) => (
                <div key={label} className="canal-item border-l-2 border-[#c8102e] pl-6 py-1">
                  <p className="text-[rgba(255,255,255,0.4)] text-xs font-semibold tracking-widest uppercase mb-2 font-[var(--font-ibmplex)]">
                    {label}
                  </p>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-white hover:text-[#c8102e] transition-colors text-base font-[var(--font-ibmplex)]"
                  >
                    {valor}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
