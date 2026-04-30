import { VALORES } from "@/lib/constants";

export default function ValoresSection() {
  return (
    <section className="bg-white py-28" aria-labelledby="valores-heading">
      <div className="container-content">
        <div className="mb-14">
          <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-3 font-[var(--font-ibmplex)]">
            Nossos valores
          </p>
          <h2
            id="valores-heading"
            className="text-[#111111] text-4xl sm:text-5xl font-extrabold leading-tight font-[var(--font-playfair)]"
          >
            O que guia tudo que fazemos
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALORES.map(({ titulo, descricao, Icon }) => (
            <li
              key={titulo}
              className="border border-[rgba(0,0,0,0.08)] p-7 rounded-[4px] flex flex-col gap-4 hover:border-[rgba(200,16,46,0.25)] hover:shadow-sm transition-all duration-200 bg-white"
            >
              <div
                className="w-10 h-10 flex items-center justify-center bg-[rgba(200,16,46,0.07)] rounded-[4px]"
                aria-hidden="true"
              >
                <Icon size={20} className="text-[#c8102e]" />
              </div>
              <div>
                <h3 className="text-[#111111] font-bold text-lg mb-2 font-[var(--font-playfair)]">
                  {titulo}
                </h3>
                <p className="text-[#6b6b6b] text-sm leading-relaxed font-[var(--font-ibmplex)]">
                  {descricao}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
