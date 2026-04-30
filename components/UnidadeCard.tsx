import Image from "next/image";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import type { Unidade } from "@/lib/constants";

interface UnidadeCardProps {
  unidade: Unidade;
}

export default function UnidadeCard({ unidade }: UnidadeCardProps) {
  return (
    <article
      className="bg-white border border-[rgba(0,0,0,0.08)] rounded-[4px] overflow-hidden"
      aria-label={unidade.nome}
    >
      {unidade.foto && (
        <div className="relative w-full h-56">
          <Image
            src={unidade.foto}
            alt={`Fachada da ${unidade.nome}`}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-7 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[#0a0a0a] font-bold text-lg font-[var(--font-playfair)]">
            {unidade.nome}
          </h3>
          <a
            href={unidade.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${unidade.nome} no Google Maps`}
            className="shrink-0 text-[#c8102e] hover:text-[#a00e25] transition-colors"
          >
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>

        <ul className="flex flex-col gap-4 text-sm font-[var(--font-ibmplex)]">
          <li className="flex gap-3">
            <MapPin size={16} className="shrink-0 mt-0.5 text-[#c8102e]" aria-hidden="true" />
            <span className="text-[#6b6b6b]">
              {unidade.endereco}
              <br />
              {unidade.cidade}/SP
              {unidade.cep ? ` — CEP ${unidade.cep}` : ""}
            </span>
          </li>

          <li className="flex flex-col gap-2">
            {unidade.telefones.map((tel) => (
              <div key={tel} className="flex gap-3 items-center">
                <Phone size={16} className="shrink-0 text-[#c8102e]" aria-hidden="true" />
                <a
                  href={`tel:${tel.replace(/\D/g, "")}`}
                  className="text-[#6b6b6b] hover:text-[#c8102e] transition-colors"
                >
                  {tel}
                </a>
              </div>
            ))}
          </li>

          <li className="flex flex-col gap-2">
            {unidade.horarios.map((h) => (
              <div key={h.dias} className="flex gap-3">
                <Clock size={16} className="shrink-0 mt-0.5 text-[#c8102e]" aria-hidden="true" />
                <span className="text-[#6b6b6b]">
                  <span className="text-[#0a0a0a] font-semibold">{h.dias}:</span>{" "}
                  {h.horario}
                </span>
              </div>
            ))}
          </li>
        </ul>
      </div>

      <div className="w-full h-48 border-t border-[rgba(0,0,0,0.06)]">
        <iframe
          src={unidade.mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa da ${unidade.nome}`}
          aria-label={`Mapa de localização da ${unidade.nome}`}
        />
      </div>
    </article>
  );
}
