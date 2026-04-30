import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="bg-dark-deep bg-dot-grid min-h-[92vh] flex items-center relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Decorative line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(200,16,46,0.4)] to-transparent"
        aria-hidden="true"
      />

      <div className="container-content py-28 md:py-36 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-[rgba(255,255,255,0.12)] rounded-[2px]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#c8102e]"
              aria-hidden="true"
            />
            <span className="font-[var(--font-ibmplex)] text-[#6b6b6b] text-xs font-medium tracking-widest uppercase">
              Desde 2003 · ONA III · Platina PNCQ
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="animate-fade-up delay-100 text-white font-[var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Excelência em{" "}
            <em className="not-italic text-[#c8102e]">análises clínicas</em>
            <br />
            ao seu alcance.
          </h1>

          {/* Sub */}
          <p className="animate-fade-up delay-200 text-[#6b6b6b] text-lg sm:text-xl leading-relaxed mb-10 max-w-xl font-[var(--font-ibmplex)]">
            Resultados precisos, estrutura humanizada e equipe multidisciplinar.
            Unidades em Rio Claro e Santa Gertrudes, SP.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-wrap gap-4">
            <a
              href="https://wa.me/551935335656"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#c8102e] hover:bg-[#a00e25] text-white font-semibold rounded-[4px] transition-colors duration-150 text-base"
            >
              Agendar Exame
            </a>
            <Link
              href="/unidades"
              className="px-7 py-3.5 border border-[rgba(255,255,255,0.2)] hover:border-white hover:bg-[rgba(255,255,255,0.04)] text-white font-medium rounded-[4px] transition-colors duration-150 text-base"
            >
              Nossas Unidades
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-500 mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[rgba(255,255,255,0.08)] pt-12">
          {[
            { valor: "+20", label: "Anos de operação" },
            { valor: "ONA III", label: "Nível máximo de acreditação" },
            { valor: "Platina", label: "PNCQ — 15 anos consecutivos" },
            { valor: "2", label: "Unidades no interior de SP" },
          ].map(({ valor, label }) => (
            <div key={label}>
              <p className="text-white text-2xl sm:text-3xl font-extrabold mb-1 font-[var(--font-playfair)]">
                {valor}
              </p>
              <p className="text-[#6b6b6b] text-sm font-[var(--font-ibmplex)]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
