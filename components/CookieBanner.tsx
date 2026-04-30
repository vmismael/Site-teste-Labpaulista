"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#111111] border-t border-[rgba(255,255,255,0.08)] px-4 py-4"
    >
      <div className="container-content flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[#6b6b6b] text-sm leading-relaxed font-[var(--font-ibmplex)]">
          Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando,
          você concorda com nossa{" "}
          <Link
            href="/privacidade"
            className="text-white underline underline-offset-2 hover:text-[#c8102e] transition-colors"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2 bg-[#c8102e] hover:bg-[#a00e25] text-white text-sm font-medium rounded-[4px] transition-colors duration-150 font-[var(--font-ibmplex)]"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
