import type { Metadata } from "next";
import Image from "next/image";
import CertificacoesTimeline from "@/components/CertificacoesTimeline";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Qualidade e Certificações | ${SITE_NAME}`,
  description:
    "ONA Nível III e Platina PNCQ por 15 anos consecutivos. Conheça nossa trajetória de excelência.",
};

export default function QualidadePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#0a0a0a] overflow-hidden" aria-labelledby="qualidade-heading">
        <div className="absolute inset-0">
          <Image
            src="/lab-exames.png"
            alt=""
            fill
            className="object-cover opacity-25"
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
            Acreditação e controle
          </p>
          <h1
            id="qualidade-heading"
            className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8 font-[var(--font-playfair)] max-w-2xl"
          >
            O padrão mais alto<br />
            da saúde<br />
            <em className="not-italic text-[#c8102e]">brasileira.</em>
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed max-w-xl font-[var(--font-ibmplex)]">
            Certificação de Excelência ONA Nível III e Certificado Platina PNCQ por
            15 anos consecutivos — reconhecimentos que nenhum laboratório do interior
            de SP obtém sem rigor técnico real.
          </p>
        </div>
      </section>

      {/* ── ONA — texto esquerda, logo direita ── */}
      <section className="bg-white py-24" aria-labelledby="ona-heading">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
                Certificação ONA
              </p>
              <h2
                id="ona-heading"
                className="text-[#0a0a0a] text-4xl font-extrabold leading-tight mb-8 font-[var(--font-playfair)]"
              >
                Nível III — a excelência máxima em saúde.
              </h2>
              <div className="flex flex-col gap-5 text-[#5a5a5a] text-base leading-relaxed font-[var(--font-ibmplex)]">
                <p>
                  A ONA — Organização Nacional de Acreditação — é a entidade não
                  governamental responsável por certificar a qualidade de serviços
                  de saúde no Brasil, com foco absoluto na segurança do paciente.
                </p>
                <p>
                  O Nível III, denominado Certificação de Excelência, é o grau mais
                  alto da escala ONA. Exige processos documentados, auditorias externas
                  rigorosas, gestão de riscos e cultura de melhoria contínua em toda
                  a organização.
                </p>
                <p>
                  O Laboratório Paulista conquistou essa certificação em novembro de
                  2018 e a mantém até hoje — uma das poucas instituições laboratoriais
                  do interior de São Paulo a ostentar esse nível.
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-[rgba(0,0,0,0.08)]">
                <p className="text-[#9a9a9a] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
                  Desde
                </p>
                <p className="text-[#0a0a0a] text-3xl font-extrabold font-[var(--font-playfair)]">
                  Novembro de 2018
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center py-8">
              <Image
                src="/ona-nivel3.png"
                alt="Certificação ONA Nível III — Excelência"
                width={300}
                height={300}
                className="object-contain max-h-[300px] w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PNCQ — fundo cinza claro, logo esquerda, texto direita ── */}
      <section className="bg-[#f7f7f7] py-24 border-t border-[rgba(0,0,0,0.06)]" aria-labelledby="pncq-heading">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex items-center justify-center py-8 order-last lg:order-first">
              <Image
                src="/logo-pncq.png"
                alt="Certificado Platina PNCQ"
                width={300}
                height={300}
                className="object-contain max-h-[300px] w-auto"
              />
            </div>

            <div>
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
                Certificação PNCQ
              </p>
              <h2
                id="pncq-heading"
                className="text-[#0a0a0a] text-4xl font-extrabold leading-tight mb-8 font-[var(--font-playfair)]"
              >
                15 anos consecutivos com o Certificado Platina.
              </h2>
              <div className="flex flex-col gap-5 text-[#5a5a5a] text-base leading-relaxed font-[var(--font-ibmplex)]">
                <p>
                  O PNCQ — Programa Nacional de Controle de Qualidade — é gerido
                  pela SBAC (Sociedade Brasileira de Análises Clínicas) e avalia
                  a qualidade dos resultados de exames por meio de ensaios de
                  proficiência comparativos entre laboratórios.
                </p>
                <p>
                  A classificação Platina representa o nível mais alto de desempenho
                  no programa. O Laboratório Paulista a conquista ininterruptamente
                  desde junho de 2003 — ano de sua fundação.
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-[rgba(0,0,0,0.08)]">
                <p className="text-[#9a9a9a] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
                  Classificação
                </p>
                <p className="text-[#0a0a0a] text-3xl font-extrabold font-[var(--font-playfair)]">
                  Platina · 15 anos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <CertificacoesTimeline />
    </>
  );
}
