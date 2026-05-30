"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { RESULTADOS_URL } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/sobre",          label: "Sobre" },
  { href: "/exames",         label: "Exames" },
  { href: "/qualidade",      label: "Qualidade" },
  { href: "/compliance",     label: "Compliance" },
  { href: "/transparencia",  label: "Transparência" },
  { href: "/unidades",       label: "Unidades" },
  { href: "/contato",        label: "Contato" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    let lastY = 0;
    let hidden = false;

    ScrollTrigger.create({
      start: "top top",
      onUpdate: (self) => {
        const scrollY = self.scroll();
        if (scrollY < 80) {
          if (hidden) {
            gsap.to(headerRef.current, { yPercent: 0, duration: 0.3, ease: "power2.out" });
            hidden = false;
          }
          lastY = scrollY;
          return;
        }

        const direction = scrollY > lastY ? 1 : -1;
        lastY = scrollY;

        if (direction === 1 && !hidden) {
          gsap.to(headerRef.current, { yPercent: -100, duration: 0.3, ease: "power2.in" });
          hidden = true;
        } else if (direction === -1 && hidden) {
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.3, ease: "power2.out" });
          hidden = false;
        }
      },
    });
  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.08)]"
    >
      <div className="container-content flex items-center justify-between h-16">
        {/* Logo — esquerda */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Laboratório Paulista — página inicial"
        >
          <span className="w-2.5 h-2.5 bg-[#c8102e] rounded-[1px]" aria-hidden="true" />
          <span className="text-[#111111] font-semibold text-base tracking-tight font-[var(--font-ibmplex)]">
            Lab<span className="text-[#c8102e]">Paulista</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-[var(--font-ibmplex)] transition-colors duration-150",
                pathname === href
                  ? "text-[#111111] font-medium"
                  : "text-[#6b6b6b] hover:text-[#111111]"
              )}
            >
              {label}
            </Link>
          ))}
          <a
            href={RESULTADOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 bg-[#c8102e] hover:bg-[#a00e25] text-white text-sm font-medium transition-colors duration-150 rounded-[4px] font-[var(--font-ibmplex)]"
          >
            Resultados
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-[#111111] p-2 -mr-2"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menu mobile"
          className="md:hidden border-t border-[rgba(0,0,0,0.08)] bg-white"
        >
          <div className="container-content py-4 flex flex-col gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "text-base py-1 transition-colors duration-150 font-[var(--font-ibmplex)]",
                  pathname === href
                    ? "text-[#111111] font-medium"
                    : "text-[#6b6b6b] hover:text-[#111111]"
                )}
              >
                {label}
              </Link>
            ))}
            <a
              href={RESULTADOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-2 bg-[#c8102e] hover:bg-[#a00e25] text-white text-sm font-medium transition-colors duration-150 rounded-[4px] text-center font-[var(--font-ibmplex)]"
            >
              Resultados
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
