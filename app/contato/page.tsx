import type { Metadata } from "next";
import { Phone, MapPin, Clock, Mail, MessageCircle, Instagram, Facebook } from "lucide-react";
import { UNIDADES, SITE_NAME, EMAIL, WHATSAPP_URL, INSTAGRAM, FACEBOOK } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contato | ${SITE_NAME}`,
  description:
    "Entre em contato com o Laboratório Paulista. Telefones, endereços e formulário de mensagem.",
};

export default function ContatoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#f7f7f7] border-b border-[rgba(0,0,0,0.06)] py-24" aria-labelledby="contato-heading">
        <div className="container-content max-w-3xl">
          <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
            Fale conosco
          </p>
          <h1
            id="contato-heading"
            className="text-[#111111] text-4xl sm:text-5xl font-extrabold leading-tight mb-6 font-[var(--font-playfair)]"
          >
            Contato
          </h1>
          <p className="text-[#6b6b6b] text-lg leading-relaxed font-[var(--font-ibmplex)]">
            Dúvidas, agendamentos ou informações sobre exames. Entre em contato
            pela forma que preferir.
          </p>
        </div>
      </section>

      {/* Form + Dados */}
      <section className="bg-white py-24">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Formulário */}
            <div>
              {/* Canais rápidos */}
              <div className="mb-8 p-5 border border-[rgba(0,0,0,0.08)] rounded-[4px] bg-[#f7f7f7]">
                <p className="text-[#0a0a0a] text-sm font-semibold mb-4 font-[var(--font-ibmplex)]">
                  Canais de atendimento
                </p>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors font-[var(--font-ibmplex)]"
                      aria-label="Abrir WhatsApp"
                    >
                      <MessageCircle size={16} className="text-[#25d366] shrink-0" aria-hidden="true" />
                      WhatsApp: (19) 99475-7375
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="inline-flex items-center gap-2.5 text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors font-[var(--font-ibmplex)]"
                    >
                      <Mail size={16} className="text-[#c8102e] shrink-0" aria-hidden="true" />
                      {EMAIL}
                    </a>
                  </li>
                  <li>
                    <a
                      href={INSTAGRAM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors font-[var(--font-ibmplex)]"
                      aria-label="Instagram do Laboratório Paulista"
                    >
                      <Instagram size={16} className="text-[#c8102e] shrink-0" aria-hidden="true" />
                      @laboratoriopaulistasp
                    </a>
                  </li>
                  <li>
                    <a
                      href={FACEBOOK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors font-[var(--font-ibmplex)]"
                      aria-label="Facebook do Laboratório Paulista"
                    >
                      <Facebook size={16} className="text-[#c8102e] shrink-0" aria-hidden="true" />
                      laboratoriopaulistasp
                    </a>
                  </li>
                </ul>
              </div>

              <h2 className="text-[#0a0a0a] text-2xl font-bold mb-8">
                Envie uma mensagem
              </h2>
              <form
                action={`mailto:${EMAIL}`}
                method="get"
                encType="text/plain"
                className="flex flex-col gap-5"
                aria-label="Formulário de contato"
              >
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="nome"
                    className="text-[#0a0a0a] text-sm font-medium"
                  >
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Seu nome"
                    className="px-4 py-3 border border-[rgba(0,0,0,0.16)] rounded-[4px] text-[#0a0a0a] placeholder:text-[#6b6b6b] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e] focus-visible:ring-offset-0"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-[#0a0a0a] text-sm font-medium"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="seu@email.com"
                    className="px-4 py-3 border border-[rgba(0,0,0,0.16)] rounded-[4px] text-[#0a0a0a] placeholder:text-[#6b6b6b] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e] focus-visible:ring-offset-0"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="telefone"
                    className="text-[#0a0a0a] text-sm font-medium"
                  >
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(19) 99999-9999"
                    className="px-4 py-3 border border-[rgba(0,0,0,0.16)] rounded-[4px] text-[#0a0a0a] placeholder:text-[#6b6b6b] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e] focus-visible:ring-offset-0"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="mensagem"
                    className="text-[#0a0a0a] text-sm font-medium"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    required
                    placeholder="Como podemos ajudar?"
                    className="px-4 py-3 border border-[rgba(0,0,0,0.16)] rounded-[4px] text-[#0a0a0a] placeholder:text-[#6b6b6b] text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8102e] focus-visible:ring-offset-0"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#c8102e] hover:bg-[#a00e25] text-white font-medium rounded-[4px] transition-colors duration-150 text-sm self-start"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>

            {/* Dados das unidades */}
            <div>
              <h2 className="text-[#0a0a0a] text-2xl font-bold mb-8">
                Nossas unidades
              </h2>
              <div className="flex flex-col gap-8">
                {UNIDADES.map((u) => (
                  <div
                    key={u.nome}
                    className="border border-[rgba(0,0,0,0.08)] rounded-[4px] p-6"
                  >
                    <h3 className="text-[#0a0a0a] font-semibold text-base mb-4">
                      {u.nome}
                    </h3>
                    <ul className="flex flex-col gap-3 text-sm">
                      <li className="flex gap-3">
                        <MapPin size={16} className="shrink-0 mt-0.5 text-[#c8102e]" aria-hidden="true" />
                        <span className="text-[#6b6b6b]">
                          {u.endereco} — {u.cidade}/SP
                          {u.cep ? `, CEP ${u.cep}` : ""}
                        </span>
                      </li>
                      {u.telefones.map((tel) => (
                        <li key={tel} className="flex gap-3 items-center">
                          <Phone size={16} className="shrink-0 text-[#c8102e]" aria-hidden="true" />
                          <a
                            href={`tel:${tel.replace(/\D/g, "")}`}
                            className="text-[#6b6b6b] hover:text-[#c8102e] transition-colors"
                          >
                            {tel}
                          </a>
                        </li>
                      ))}
                      {u.horarios.map((h) => (
                        <li key={h.dias} className="flex gap-3">
                          <Clock size={16} className="shrink-0 mt-0.5 text-[#c8102e]" aria-hidden="true" />
                          <span className="text-[#6b6b6b]">
                            <span className="text-[#0a0a0a] font-medium">{h.dias}:</span>{" "}
                            {h.horario}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
