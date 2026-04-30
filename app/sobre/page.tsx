import type { Metadata } from "next";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sobre Nós | ${SITE_NAME}`,
  description:
    "Conheça a história do Laboratório Paulista de Análises Clínicas, nossa missão, visão e estrutura.",
};

export default function SobrePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#0a0a0a] overflow-hidden" aria-labelledby="sobre-heading">
        <div className="absolute inset-0">
          <Image
            src="/lab-frente.webp"
            alt="Fachada do Laboratório Paulista"
            fill
            className="object-cover opacity-30"
            priority
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
            Quem somos
          </p>
          <h1
            id="sobre-heading"
            className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8 font-[var(--font-playfair)] max-w-2xl"
          >
            Mais de 20 anos<br />
            de <em className="not-italic text-[#c8102e]">excelência</em><br />
            em saúde.
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed max-w-xl font-[var(--font-ibmplex)]">
            Fundado em 2003, o Laboratório Paulista nasceu da necessidade real de pacientes
            que buscavam análises clínicas de qualidade integradas ao cuidado oncológico e hematológico.
          </p>
        </div>
      </section>

      {/* ── Nossa história — texto à esquerda, foto à direita ── */}
      <section className="bg-white py-24" aria-labelledby="historia-heading">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
                Nossa história
              </p>
              <h2
                id="historia-heading"
                className="text-[#0a0a0a] text-4xl font-extrabold leading-tight mb-8 font-[var(--font-playfair)]"
              >
                De uma necessidade real a referência regional.
              </h2>
              <div className="flex flex-col gap-5 text-[#5a5a5a] text-base leading-relaxed font-[var(--font-ibmplex)]">
                <p>
                  Atividades iniciadas em 12 de junho de 2003, após sentirmos a
                  necessidade de clientes que vinham para consulta médica e tratamento
                  quimioterápico e buscavam também o serviço de análises clínicas.
                </p>
                <p>
                  Surgiu então o Laboratório Paulista de Análises Clínicas, apto
                  para realizar todo e qualquer exame em Medicina Laboratorial. Nossa
                  estrutura conta com área física confortável, salas de coleta individualizadas,
                  coleta infantil, ergonomia para idosos, gestantes e pacientes debilitados.
                </p>
                <p>
                  A rotina é informatizada e automatizada, com dupla conferência
                  em todos os laudos. Nossa equipe multidisciplinar é composta por
                  Médicos, Biomédicos, Enfermeiras, Farmacêutica, Técnicos de
                  Enfermagem e Auxiliares de Laboratório.
                </p>
              </div>

              {/* Estatísticas inline */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-[rgba(0,0,0,0.08)]">
                {[
                  { valor: "2003", label: "Ano de fundação" },
                  { valor: "ONA III", label: "Nível máximo" },
                  { valor: "2", label: "Unidades em SP" },
                ].map(({ valor, label }) => (
                  <div key={label}>
                    <p className="text-[#0a0a0a] text-2xl font-extrabold font-[var(--font-playfair)]">{valor}</p>
                    <p className="text-[#9a9a9a] text-sm mt-1 font-[var(--font-ibmplex)]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] rounded-[4px] overflow-hidden">
              <Image
                src="/lab-entrada.webp"
                alt="Entrada do Laboratório Paulista"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Missão e Visão — fundo escuro, foto de fundo ── */}
      <section className="relative bg-[#0a0a0a] overflow-hidden" aria-labelledby="missao-heading">
        <div className="absolute inset-0">
          <Image
            src="/lab-logo-parede.webp"
            alt=""
            fill
            className="object-cover opacity-15"
            aria-hidden="true"
          />
        </div>
        <div className="relative container-content py-24">
          <div className="max-w-4xl">
            <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
              Propósito
            </p>
            <h2
              id="missao-heading"
              className="text-white text-4xl font-extrabold leading-tight mb-16 font-[var(--font-playfair)]"
            >
              O que nos move.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Missão */}
              <div className="border-l-2 border-[#c8102e] pl-8 py-2">
                <h3 className="text-white text-xl font-bold mb-4 font-[var(--font-playfair)]">
                  Missão
                </h3>
                <p className="text-[rgba(255,255,255,0.65)] text-base leading-relaxed font-[var(--font-ibmplex)]">
                  Prestação de serviços em nível de excelência nas áreas de
                  Oncologia Clínica, Hematologia e Análises Clínicas, com foco
                  no paciente e na sua segurança.
                </p>
              </div>

              {/* Visão */}
              <div className="border-l-2 border-[#c8102e] pl-8 py-2">
                <h3 className="text-white text-xl font-bold mb-4 font-[var(--font-playfair)]">
                  Visão
                </h3>
                <p className="text-[rgba(255,255,255,0.65)] text-base leading-relaxed font-[var(--font-ibmplex)]">
                  Ser centro de referência em Hematologia, Oncologia Clínica e
                  Análises Clínicas para o Sistema de Saúde de Rio Claro e
                  região, oferecendo serviços de qualidade comprovada,
                  profissionais capacitados, tratamento humanizado e
                  responsabilidade socioambiental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Estrutura — foto à esquerda, texto à direita ── */}
      <section className="bg-white py-24" aria-labelledby="estrutura-heading">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[460px] rounded-[4px] overflow-hidden order-last lg:order-first">
              <Image
                src="/lab-cafe.webp"
                alt="Área de conforto do Laboratório Paulista"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
                Estrutura e equipe
              </p>
              <h2
                id="estrutura-heading"
                className="text-[#0a0a0a] text-4xl font-extrabold leading-tight mb-8 font-[var(--font-playfair)]"
              >
                Conforto e precisão em cada detalhe.
              </h2>
              <div className="flex flex-col gap-5 text-[#5a5a5a] text-base leading-relaxed font-[var(--font-ibmplex)]">
                <p>
                  Nossa área física foi projetada para oferecer conforto real: salas de coleta
                  individualizadas, espaço infantil dedicado, acessibilidade para idosos,
                  gestantes e pacientes em situação especial.
                </p>
                <p>
                  Todo o processo analítico é informatizado e automatizado, com
                  dupla conferência obrigatória em todos os laudos — garantia de
                  rastreabilidade e segurança em cada resultado.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                {[
                  "Salas de coleta individualizadas",
                  "Coleta infantil e para pacientes debilitados",
                  "Rotina automatizada com dupla conferência",
                  "Equipe multidisciplinar especializada",
                  "Coleta domiciliar disponível",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#c8102e] shrink-0" aria-hidden="true" />
                    <span className="text-[#5a5a5a] text-sm font-[var(--font-ibmplex)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ações Sociais — fundo neutro ── */}
      <section className="bg-[#f7f7f7] py-24 border-t border-[rgba(0,0,0,0.06)]" aria-labelledby="acoes-heading">
        <div className="container-content">
          <div className="max-w-xl mb-14">
            <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
              Responsabilidade socioambiental
            </p>
            <h2
              id="acoes-heading"
              className="text-[#0a0a0a] text-4xl font-extrabold leading-tight font-[var(--font-playfair)]"
            >
              Além do laudo — cuidando do mundo ao redor.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                titulo: "Saúde dos Colaboradores",
                descricao:
                  "Programa Anual de Qualidade de Vida com exames laboratoriais e consultas médicas para avaliação da saúde e dos hábitos de vida dos colaboradores.",
              },
              {
                titulo: "Redução de Resíduos",
                descricao:
                  "Eliminação de copos descartáveis substituídos por individuais reutilizáveis. Contribuições mensais a instituições filantrópicas de Rio Claro.",
              },
              {
                titulo: "Energia Solar",
                descricao:
                  "Painéis solares instalados para geração de energia limpa, com monitoramento de consumo e conscientização dos colaboradores sobre impacto ambiental.",
              },
              {
                titulo: "Gestão de Resíduos",
                descricao:
                  "Resíduos do Grupo B (químicos) coletados por empresa certificada conforme ANVISA e Cetesb. Recicláveis separados por departamento e coletados semanalmente.",
              },
              {
                titulo: "Educação em Saúde",
                descricao:
                  "Campanhas de educação sobre hábitos saudáveis, prevenção de doenças e detecção precoce voltadas à comunidade de Rio Claro e região.",
              },
              {
                titulo: "Conservação de Recursos",
                descricao:
                  "Treinamento de colaboradores sobre consumo consciente de água e energia, com sinalização ambiental em toda a estrutura física.",
              },
            ].map(({ titulo, descricao }) => (
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
    </>
  );
}
