import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { UNIDADES, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Unidades | ${SITE_NAME}`,
  description:
    "Encontre a unidade do Laboratório Paulista mais próxima de você. Rio Claro e Santa Gertrudes, SP.",
};

export default function UnidadesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#0a0a0a] overflow-hidden" aria-labelledby="unidades-heading">
        <div className="absolute inset-0">
          <Image
            src="/lab-frente.webp"
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
            Onde estamos
          </p>
          <h1
            id="unidades-heading"
            className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8 font-[var(--font-playfair)] max-w-2xl"
          >
            Nossas<br />
            <em className="not-italic text-[#c8102e]">Unidades</em>
          </h1>
          <p className="text-[rgba(255,255,255,0.7)] text-lg leading-relaxed max-w-xl font-[var(--font-ibmplex)]">
            Atendemos em Rio Claro e Santa Gertrudes, com salas de coleta
            individualizadas e estrutura adaptada para todos os pacientes.
          </p>
        </div>
      </section>

      {/* ── Grid de unidades ── */}
      <section className="bg-[#f7f7f7] py-24" aria-label="Lista de unidades">
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UNIDADES.map((u, i) => (
              <article
                key={u.nome}
                className="flex flex-col gap-4"
                aria-labelledby={`unidade-${i}-heading`}
              >
                {/* Foto */}
                {u.foto && (
                  <div className="relative w-full h-60 rounded-[4px] overflow-hidden">
                    <Image
                      src={u.foto}
                      alt={`Fachada da ${u.nome}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Box informações */}
                <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] overflow-hidden bg-white">
                  <div className="p-6 flex items-start justify-between gap-4 border-b border-[rgba(0,0,0,0.06)]">
                    <div>
                      <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-1 font-[var(--font-ibmplex)]">
                        {u.cidade} · SP
                      </p>
                      <h2
                        id={`unidade-${i}-heading`}
                        className="text-[#0a0a0a] font-bold text-lg font-[var(--font-playfair)]"
                      >
                        {u.nome}
                      </h2>
                    </div>
                    <a
                      href={u.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${u.nome} no Google Maps`}
                      className="shrink-0 flex items-center gap-1.5 text-[#c8102e] hover:text-[#a00e25] transition-colors text-xs font-semibold font-[var(--font-ibmplex)] mt-1"
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      Ver no Maps
                    </a>
                  </div>

                  <div className="p-6 flex flex-col gap-4 text-sm font-[var(--font-ibmplex)]">
                    <div className="flex gap-3">
                      <MapPin size={15} className="shrink-0 mt-0.5 text-[#c8102e]" aria-hidden="true" />
                      <span className="text-[#6b6b6b]">
                        {u.endereco}<br />
                        {u.cidade}/SP{u.cep ? ` — CEP ${u.cep}` : ""}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {u.telefones.map((tel) => (
                        <div key={tel} className="flex gap-3 items-center">
                          <Phone size={15} className="shrink-0 text-[#c8102e]" aria-hidden="true" />
                          <a
                            href={`tel:${tel.replace(/\D/g, "")}`}
                            className="text-[#6b6b6b] hover:text-[#c8102e] transition-colors"
                          >
                            {tel}
                          </a>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {u.horarios.map((h) => (
                        <div key={h.dias} className="flex gap-3">
                          <Clock size={15} className="shrink-0 mt-0.5 text-[#c8102e]" aria-hidden="true" />
                          <span className="text-[#6b6b6b]">
                            <span className="text-[#0a0a0a] font-semibold">{h.dias}:</span>{" "}
                            {h.horario}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Box mapa */}
                <div className="rounded-[4px] border border-[rgba(0,0,0,0.08)] overflow-hidden h-52">
                  <iframe
                    src={u.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa da ${u.nome}`}
                    aria-label={`Mapa de localização da ${u.nome}`}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
