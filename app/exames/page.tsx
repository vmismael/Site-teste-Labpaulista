import type { Metadata } from "next";
import Image from "next/image";
import ExamesGrid from "@/components/ExamesGrid";
import ExamesSearch from "@/components/ExamesSearch";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Exames | ${SITE_NAME}`,
  description:
    "Conheça os exames realizados pelo Laboratório Paulista: bioquímica, hematologia, hormônios, imunologia e muito mais.",
};

export default function ExamesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0a0a0a] overflow-hidden" aria-labelledby="exames-page-heading">
        <div className="absolute inset-0">
          <Image
            src="/lab-exames.png"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.55) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="relative container-content py-36">
          <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-5 font-[var(--font-ibmplex)]">
            Medicina laboratorial
          </p>
          <h1
            id="exames-page-heading"
            className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8 font-[var(--font-playfair)] max-w-2xl"
          >
            Exames<br />
            <em className="not-italic text-[#c8102e]">realizados</em>
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed max-w-xl font-[var(--font-ibmplex)]">
            Cobertura completa em análises clínicas, com rotina informatizada e
            dupla conferência em todos os laudos.
          </p>
        </div>
      </section>

      <ExamesSearch />
      <ExamesGrid showAll />
    </>
  );
}
