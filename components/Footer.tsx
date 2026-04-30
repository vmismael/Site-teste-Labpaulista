import Link from "next/link";
import { Phone, MapPin, Clock, Mail, Instagram, Facebook, ExternalLink } from "lucide-react";
import { UNIDADES, EMAIL, INSTAGRAM, FACEBOOK, RESULTADOS_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.08)]">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-[#c8102e] rounded-[1px]" aria-hidden="true" />
              <p className="text-white font-semibold text-base font-[var(--font-ibmplex)]">
                Lab<span className="text-[#c8102e]">Paulista</span>
              </p>
            </div>
            <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-xs font-[var(--font-ibmplex)]">
              Excelência em análises clínicas desde 2003. Certificação ONA III
              e Platina PNCQ.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link href="/sobre" className="text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]">
                Sobre nós
              </Link>
              <Link href="/exames" className="text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]">
                Exames
              </Link>
              <Link href="/qualidade" className="text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]">
                Qualidade e Certificações
              </Link>
              <Link href="/compliance" className="text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]">
                Programa Compliance
              </Link>
              <Link href="/privacidade" className="text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]">
                Política de Privacidade
              </Link>
              <a
                href={RESULTADOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]"
              >
                Portal de Resultados
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]"
              >
                <Mail size={14} className="text-[#c8102e]" aria-hidden="true" />
                {EMAIL}
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]"
                aria-label="Instagram do Laboratório Paulista"
              >
                <Instagram size={14} className="text-[#c8102e]" aria-hidden="true" />
                @laboratoriopaulistasp
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#6b6b6b] hover:text-white text-sm transition-colors font-[var(--font-ibmplex)]"
                aria-label="Facebook do Laboratório Paulista"
              >
                <Facebook size={14} className="text-[#c8102e]" aria-hidden="true" />
                laboratoriopaulistasp
              </a>
            </div>
          </div>

          {UNIDADES.map((u) => (
            <div key={u.nome}>
              <p className="text-white text-sm font-semibold mb-4 font-[var(--font-ibmplex)]">
                {u.nome}
              </p>
              <ul className="flex flex-col gap-3 text-[#6b6b6b] text-sm font-[var(--font-ibmplex)]">
                <li className="flex gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-[#c8102e]" aria-hidden="true" />
                  <span>
                    {u.endereco}
                    <br />
                    {u.cidade}/SP
                    {u.cep ? ` — CEP ${u.cep}` : ""}
                  </span>
                </li>
                {u.telefones.slice(0, 2).map((tel) => (
                  <li key={tel} className="flex gap-2 items-center">
                    <Phone size={16} className="shrink-0 text-[#c8102e]" aria-hidden="true" />
                    <a href={`tel:${tel.replace(/\D/g, "")}`} className="hover:text-white transition-colors">
                      {tel}
                    </a>
                  </li>
                ))}
                {u.horarios.map((h) => (
                  <li key={h.dias} className="flex gap-2">
                    <Clock size={16} className="shrink-0 mt-0.5 text-[#c8102e]" aria-hidden="true" />
                    <span>
                      {h.dias}: {h.horario}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6b6b6b] text-xs font-[var(--font-ibmplex)]">
            © {new Date().getFullYear()} Laboratório Paulista de Análises Clínicas. Todos os direitos reservados.
          </p>
          <p className="text-[#6b6b6b] text-xs font-[var(--font-ibmplex)]">
            Rio Claro e Santa Gertrudes, SP
          </p>
        </div>
      </div>
    </footer>
  );
}
