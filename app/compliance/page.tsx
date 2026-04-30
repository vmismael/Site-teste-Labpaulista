import type { Metadata } from "next";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Programa Compliance | ${SITE_NAME}`,
  description:
    "Conheça o Programa de Compliance do Laboratório Paulista: ética, boas práticas clínicas e canais de denúncia.",
};

const PILARES = [
  {
    titulo: "Código de Ética e Conduta",
    descricao:
      "Tratamento respeitoso e humanizado a todos os pacientes, sem discriminação. Vedação expressa ao assédio moral, sexual e qualquer forma de intimidação. Confidencialidade das informações em todas as circunstâncias.",
  },
  {
    titulo: "Política Anticorrupção",
    descricao:
      "Proibição de oferecer ou conceder vantagens indevidas a agentes públicos ou privados. Pagamentos facilitadores, contribuições políticas impróprias e falsificação de documentos são faltas graves.",
  },
  {
    titulo: "Conflito de Interesses",
    descricao:
      "Relações familiares entre colaboradores permitidas sem subordinação direta. Processos de seleção de fornecedores exigem declaração prévia de qualquer conflito. Atividades externas devem ser comunicadas à liderança.",
  },
  {
    titulo: "Política de Concorrência",
    descricao:
      "Proibidos acordos de fixação de preços, dominação de mercado e precificação predatória. Tratamento equitativo de fornecedores com critérios objetivos e documentados.",
  },
  {
    titulo: "Responsabilidades",
    descricao:
      "Colaboradores reportam violações de boa-fé. Liderança garante adesão e coordena treinamentos obrigatórios. Grupo de Compliance investiga violações e emite determinações vinculantes.",
  },
  {
    titulo: "Proteção ao Denunciante",
    descricao:
      "Reportes de boa-fé são encorajados e protegidos. Nenhuma retaliação será tolerada contra quem comunique irregularidades pelos canais oficiais.",
  },
];

export default function CompliancePage() {
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

      {/* ── Responsabilidades técnica e legal ── */}
      <section className="bg-white py-24" aria-labelledby="lideranca-heading">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
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

            <div className="flex items-center justify-end">
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

      {/* ── Pilares do programa ── */}
      <section className="bg-[#f7f7f7] py-24 border-t border-[rgba(0,0,0,0.06)]" aria-labelledby="pilares-heading">
        <div className="container-content">
          <div className="max-w-xl mb-14">
            <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
              Pilares do programa
            </p>
            <h2
              id="pilares-heading"
              className="text-[#0a0a0a] text-4xl font-extrabold leading-tight font-[var(--font-playfair)]"
            >
              O que rege cada decisão.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILARES.map(({ titulo, descricao }) => (
              <div
                key={titulo}
                className="bg-white border border-[rgba(0,0,0,0.07)] rounded-[4px] p-7 hover:border-[rgba(0,0,0,0.14)] transition-colors"
              >
                <div className="w-8 h-[2px] bg-[#c8102e] mb-5" aria-hidden="true" />
                <h3 className="text-[#0a0a0a] font-semibold text-base mb-3 font-[var(--font-playfair)]">
                  {titulo}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed font-[var(--font-ibmplex)]">
                  {descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Canal de denúncia ── */}
      <section className="relative bg-[#0a0a0a] overflow-hidden" aria-labelledby="canal-heading">
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
                  valor: "www.chorc.com.br",
                  href: "https://www.chorc.com.br",
                  external: true,
                },
              ].map(({ label, valor, href, external }) => (
                <div key={label} className="border-l-2 border-[#c8102e] pl-6 py-1">
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
