import type { Metadata } from "next";
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
      <section className="bg-[#f7f7f7] border-b border-[rgba(0,0,0,0.06)] py-24" aria-labelledby="exames-page-heading">
        <div className="container-content max-w-3xl">
          <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
            Medicina laboratorial
          </p>
          <h1
            id="exames-page-heading"
            className="text-[#111111] text-4xl sm:text-5xl font-extrabold leading-tight mb-6 font-[var(--font-playfair)]"
          >
            Exames realizados
          </h1>
          <p className="text-[#6b6b6b] text-lg leading-relaxed font-[var(--font-ibmplex)]">
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
