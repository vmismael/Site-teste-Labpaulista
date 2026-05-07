"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export function StickyLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("video-hero");
    if (!hero || !logoRef.current) return;

    const logo = logoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const belowViewport = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;

        if (belowViewport) {
          // Hero saiu pelo topo — mostrar logo fixo
          logo.style.opacity = "1";
          logo.style.pointerEvents = "auto";
        } else {
          // Hero ainda visível — esconder logo fixo
          logo.style.opacity = "0";
          logo.style.pointerEvents = "none";
        }
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={logoRef}
      className="fixed z-40 transition-opacity duration-500"
      style={{
        top: "1.25rem",
        right: "1.5rem",
        opacity: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Link href="/" tabIndex={-1}>
        <Image
          src="/logo-colorido.png"
          alt="Laboratório Paulista"
          width={96}
          height={44}
          className="object-contain"
          draggable={false}
        />
      </Link>
    </div>
  );
}
