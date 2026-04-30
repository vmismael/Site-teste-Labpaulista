import type { Metadata } from "next";
import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import ConveniosCarousel from "@/components/ConveniosCarousel";
import AvaliacaoSection from "@/components/AvaliacaoSection";
import ExamesGrid from "@/components/ExamesGrid";
import ValoresSection from "@/components/ValoresSection";
import CertificacoesTimeline from "@/components/CertificacoesTimeline";
import { SITE_NAME, SITE_DESCRIPTION, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <VideoHero />
      <ConveniosCarousel />
      <AvaliacaoSection />
      <ExamesGrid />
      <ValoresSection />
      <CertificacoesTimeline />

      {/* Highlight — vermelho sólido */}
      <section className="bg-[#c8102e] py-24" aria-labelledby="highlight-heading">
        <div className="container-content">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="text-[rgba(255,255,255,0.55)] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
                Certificação de excelência
              </p>
              <h2
                id="highlight-heading"
                className="text-white text-4xl sm:text-5xl font-extrabold leading-tight font-[var(--font-playfair)]"
              >
                ONA Nível III.<br />
                O padrão mais alto<br />
                da saúde brasileira.
              </h2>
            </div>
            <div className="flex flex-col gap-5 md:items-end shrink-0">
              <p className="text-[rgba(255,255,255,0.78)] text-base max-w-sm md:text-right font-[var(--font-ibmplex)]">
                Um dos poucos laboratórios do interior de SP com Certificação
                de Excelência ONA III e Certificado Platina PNCQ por 15 anos.
              </p>
              <Link
                href="/qualidade"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#c8102e] font-semibold rounded-[4px] hover:bg-[rgba(255,255,255,0.92)] transition-colors text-sm self-start md:self-end font-[var(--font-ibmplex)]"
              >
                Ver certificações →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final — branco limpo */}
      <section className="bg-[#f7f7f7] py-24" aria-labelledby="cta-heading">
        <div className="container-content text-center">
          <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
            Fale conosco
          </p>
          <h2
            id="cta-heading"
            className="text-[#111111] text-4xl sm:text-5xl font-extrabold leading-tight mb-4 font-[var(--font-playfair)]"
          >
            Mais de 20 anos de<br />qualidade comprovada.
          </h2>
          <p className="text-[#6b6b6b] text-lg max-w-md mx-auto mb-10 font-[var(--font-ibmplex)]">
            Agende seu exame ou tire dúvidas. Estamos em Rio Claro e Santa Gertrudes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#c8102e] hover:bg-[#a00e25] text-white font-semibold rounded-[4px] transition-colors font-[var(--font-ibmplex)]"
            >
              Falar pelo WhatsApp
            </a>
            <Link
              href="/contato"
              className="px-7 py-3.5 border border-[rgba(0,0,0,0.15)] hover:border-[rgba(0,0,0,0.3)] text-[#111111] font-medium rounded-[4px] transition-colors font-[var(--font-ibmplex)]"
            >
              Ver formas de contato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
