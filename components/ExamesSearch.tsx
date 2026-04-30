"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { EXAMES_LISTA } from "@/lib/exames-lista";

export default function ExamesSearch() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = q.length >= 2
    ? EXAMES_LISTA.filter((nome) => nome.toLowerCase().includes(q))
    : [];

  const hasQuery = q.length >= 2;

  return (
    <section className="bg-white border-b border-[rgba(0,0,0,0.06)] py-10">
      <div className="container-content max-w-3xl">
        {/* Input */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9a9a] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar exame — ex: hemograma, vitamina D, TSH…"
            className="w-full pl-11 pr-11 py-4 border border-[rgba(0,0,0,0.12)] rounded-[4px] text-[#0a0a0a] placeholder:text-[#9a9a9a] text-sm font-[var(--font-ibmplex)] focus:outline-none focus:border-[#c8102e] transition-colors bg-white"
            aria-label="Buscar exame"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a9a9a] hover:text-[#0a0a0a] transition-colors"
              aria-label="Limpar busca"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Contador e resultados */}
        {hasQuery && (
          <div className="mt-4">
            {results.length === 0 ? (
              <p className="text-[#6b6b6b] text-sm font-[var(--font-ibmplex)] py-3">
                Nenhum exame encontrado para{" "}
                <span className="font-semibold text-[#0a0a0a]">"{query}"</span>.
                Entre em contato — realizamos uma ampla gama de análises.
              </p>
            ) : (
              <>
                <p className="text-[#9a9a9a] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
                  {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
                </p>
                <ul className="flex flex-col divide-y divide-[rgba(0,0,0,0.06)]">
                  {results.map((nome) => (
                    <li key={nome} className="flex items-center gap-3 py-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] shrink-0" aria-hidden="true" />
                      <span className="text-[#0a0a0a] text-sm font-[var(--font-ibmplex)]">{nome}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
