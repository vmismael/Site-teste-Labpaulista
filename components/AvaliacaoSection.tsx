"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import { RatingInteraction } from "@/components/ui/emoji-rating"
import { WHATSAPP_URL } from "@/lib/constants"

export default function AvaliacaoSection() {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    gsap.set(sectionRef.current, { opacity: 0, y: 20 })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(sectionRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionRef.current!)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = () => {
    if (rating === 0) return
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      className="bg-[#f7f7f7] border-t border-[rgba(0,0,0,0.06)] py-24"
      aria-labelledby="avaliacao-heading"
    >
      <div className="container-content max-w-xl text-center">

        {!submitted ? (
          <>
            <p className="text-[#c8102e] text-xs font-semibold tracking-widest uppercase mb-4 font-[var(--font-ibmplex)]">
              Opinião dos pacientes
            </p>
            <h2
              id="avaliacao-heading"
              className="text-[#0a0a0a] text-3xl sm:text-4xl font-extrabold leading-tight mb-3 font-[var(--font-playfair)]"
            >
              Já foi nosso cliente?
            </h2>
            <p className="text-[#6b6b6b] text-base mb-10 font-[var(--font-ibmplex)]">
              Conta pra gente como foi a sua experiência. Sua opinião nos ajuda
              a melhorar cada vez mais.
            </p>

            <RatingInteraction onChange={setRating} className="mb-10" />

            <div className="mt-2 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.12)] to-transparent mb-10" />

            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="px-8 py-3 bg-[#0a0a0a] hover:bg-[#222] disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-[4px] transition-colors text-sm font-[var(--font-ibmplex)]"
            >
              Enviar avaliação
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-6" aria-hidden="true">
              {["😔","😕","😐","🙂","😍"][rating - 1]}
            </div>
            <h2
              id="avaliacao-heading"
              className="text-[#0a0a0a] text-3xl font-extrabold leading-tight mb-3 font-[var(--font-playfair)]"
            >
              Obrigado pelo seu feedback!
            </h2>
            <p className="text-[#6b6b6b] text-base mb-8 font-[var(--font-ibmplex)]">
              {rating >= 4
                ? "Fico muito feliz que tenha tido uma boa experiência. Esperamos te ver em breve."
                : "Lamentamos que sua experiência não tenha sido ideal. Entre em contato — queremos melhorar."}
            </p>

            {rating < 4 && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c8102e] hover:bg-[#a00e25] text-white font-semibold rounded-[4px] transition-colors text-sm font-[var(--font-ibmplex)]"
              >
                Falar pelo WhatsApp
              </a>
            )}
          </>
        )}

      </div>
    </section>
  )
}
