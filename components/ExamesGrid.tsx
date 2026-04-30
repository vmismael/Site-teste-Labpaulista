import Link from "next/link";
import { ESPECIALIDADES } from "@/lib/constants";

const EXAMES_DESTAQUE = [
  "Hemograma Completo",
  "Glicemia",
  "Colesterol Total e Frações",
  "Hemoglobina Glicada (HbA1c)",
  "TSH / T4 Livre",
  "Vitamina D",
  "Ferritina",
  "Testosterona",
  "Insulina Basal",
  "Perfil Lipídico",
  "Paternidade (DNA)",
  "Sexagem Fetal",
  "Teste de Gravidez (Beta-hCG)",
  "Toxicológico (Urina / Cabelo)",
  "Anticorpos Neutralizantes",
  "Urina Tipo I / Urocultura",
];

interface ExamesGridProps {
  showAll?: boolean;
}

export default function ExamesGrid({ showAll = false }: ExamesGridProps) {
  const items = showAll ? ESPECIALIDADES : ESPECIALIDADES.slice(0, 8);

  return (
    <>
      <section className="bg-[#f5f5f5] py-28" aria-labelledby="exames-heading">
        <div className="container-content">
          {!showAll && (
            <div className="mb-14">
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
                Especialidades
              </p>
              <h2
                id="exames-heading"
                className="text-[#0a0a0a] text-4xl sm:text-5xl font-extrabold leading-tight font-[var(--font-playfair)]"
              >
                Exames realizados
              </h2>
              <p className="text-[#6b6b6b] mt-4 text-base max-w-lg font-[var(--font-ibmplex)]">
                Ampla cobertura em medicina laboratorial, com rotina informatizada
                e dupla conferência em todos os laudos.
              </p>
            </div>
          )}

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map(({ nome, descricao }) => (
              <li
                key={nome}
                className="bg-white border border-[rgba(0,0,0,0.08)] p-6 rounded-[4px] flex flex-col gap-3 group hover:border-[rgba(200,16,46,0.3)] transition-colors duration-200"
              >
                <div
                  className="w-1 h-5 bg-[#c8102e] rounded-full"
                  aria-hidden="true"
                />
                <h3 className="text-[#0a0a0a] font-bold text-base font-[var(--font-playfair)]">
                  {nome}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed font-[var(--font-ibmplex)]">
                  {descricao}
                </p>
              </li>
            ))}
          </ul>

          {!showAll && (
            <div className="mt-10">
              <Link
                href="/exames"
                className="inline-flex items-center gap-2 text-[#c8102e] hover:text-[#a00e25] text-sm font-semibold transition-colors font-[var(--font-ibmplex)]"
              >
                Ver todos os exames →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Exames em destaque — exibido só na página /exames */}
      {showAll && (
        <section className="bg-white py-20 border-t border-[rgba(0,0,0,0.06)]" aria-labelledby="destaque-heading">
          <div className="container-content">
            <div className="mb-10">
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
                Mais solicitados
              </p>
              <h2
                id="destaque-heading"
                className="text-[#0a0a0a] text-2xl font-bold font-[var(--font-playfair)]"
              >
                Exames em destaque
              </h2>
              <p className="text-[#6b6b6b] mt-3 text-sm max-w-lg font-[var(--font-ibmplex)]">
                Realizamos exames de A a Z em medicina laboratorial. Abaixo
                estão alguns dos mais solicitados. Dúvidas?{" "}
                <Link href="/contato" className="text-[#c8102e] hover:underline">
                  Entre em contato.
                </Link>
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {EXAMES_DESTAQUE.map((exame) => (
                <li
                  key={exame}
                  className="flex items-center gap-3 px-4 py-3 border border-[rgba(0,0,0,0.08)] rounded-[4px] bg-[#f7f7f7] text-sm text-[#0a0a0a] font-[var(--font-ibmplex)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] shrink-0" aria-hidden="true" />
                  {exame}
                </li>
              ))}
            </ul>

            {/* Coleta domiciliar */}
            <div className="mt-10 p-6 border border-[rgba(200,16,46,0.2)] bg-[rgba(200,16,46,0.03)] rounded-[4px]">
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-2 font-[var(--font-ibmplex)]">
                Serviço disponível
              </p>
              <p className="text-[#0a0a0a] font-semibold text-base mb-1 font-[var(--font-playfair)]">
                Coleta domiciliar e empresarial
              </p>
              <p className="text-[#6b6b6b] text-sm font-[var(--font-ibmplex)]">
                Realizamos coleta no local de sua preferência — residência,
                empresa ou instituição de saúde. Entre em contato para agendar.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
