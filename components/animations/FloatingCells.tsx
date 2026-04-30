export default function FloatingCells({ opacity }: { opacity: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <filter id="cBlurMed">  <feGaussianBlur stdDeviation="1.0" /></filter>
        <filter id="cBlurSoft"> <feGaussianBlur stdDeviation="0.4" /></filter>
        <filter id="cGlow">
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="cGlowStrong">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="gWhite" cx="35%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.30)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id="gRed" cx="35%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="rgba(200,16,46,0.45)" />
          <stop offset="100%" stopColor="rgba(200,16,46,0)" />
        </radialGradient>
      </defs>

      {/* ── Célula grande — topo esquerdo ── */}
      <g style={{ animation: "cellDrift1 9s ease-in-out infinite" }}>
        <circle cx="15" cy="22" r="8"   fill="url(#gWhite)" filter="url(#cBlurSoft)" />
        <circle cx="15" cy="22" r="8"   fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" />
        <circle cx="15" cy="22" r="6"   fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.4" />
        <circle cx="13" cy="20" r="2"   fill="rgba(255,255,255,0.28)" filter="url(#cBlurSoft)" />
      </g>

      {/* ── Célula vermelha — topo direito ── */}
      <g style={{ animation: "cellDrift2 8s ease-in-out infinite", animationDelay: "-3s" }}>
        <circle cx="82" cy="18" r="7"   fill="url(#gRed)" filter="url(#cBlurSoft)" />
        <circle cx="82" cy="18" r="7"   fill="none" stroke="rgba(200,16,46,0.38)" strokeWidth="0.7" />
        <circle cx="82" cy="18" r="5.2" fill="none" stroke="rgba(200,16,46,0.15)" strokeWidth="0.4" />
        <circle cx="80" cy="16" r="1.8" fill="rgba(200,16,46,0.55)" filter="url(#cBlurSoft)" />
      </g>

      {/* ── Célula branca — centro esquerdo ── */}
      <g style={{ animation: "cellDrift3 7s ease-in-out infinite", animationDelay: "-1.5s" }}>
        <circle cx="25" cy="55" r="6"   fill="url(#gWhite)" filter="url(#cBlurSoft)" />
        <circle cx="25" cy="55" r="6"   fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="0.6" />
        <circle cx="25" cy="55" r="4.4" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.4" />
        <circle cx="23" cy="53" r="1.5" fill="rgba(255,255,255,0.32)" filter="url(#cBlurSoft)" />
      </g>

      {/* ── Célula vermelha — centro ── */}
      <g style={{ animation: "cellDrift1 10s ease-in-out infinite", animationDelay: "-5s" }}>
        <circle cx="55" cy="48" r="8.5" fill="url(#gRed)" filter="url(#cBlurSoft)" />
        <circle cx="55" cy="48" r="8.5" fill="none" stroke="rgba(200,16,46,0.32)" strokeWidth="0.8" />
        <circle cx="55" cy="48" r="6.5" fill="none" stroke="rgba(200,16,46,0.13)" strokeWidth="0.4" />
        <circle cx="52.5" cy="45.5" r="2.2" fill="rgba(200,16,46,0.50)" filter="url(#cBlurSoft)" />
      </g>

      {/* ── Célula branca — centro direito ── */}
      <g style={{ animation: "cellDrift2 11s ease-in-out infinite", animationDelay: "-7s" }}>
        <circle cx="75" cy="50" r="5.5" fill="url(#gWhite)" filter="url(#cBlurSoft)" />
        <circle cx="75" cy="50" r="5.5" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="0.6" />
        <circle cx="75" cy="50" r="4"   fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.35" />
        <circle cx="73.5" cy="48.5" r="1.3" fill="rgba(255,255,255,0.28)" filter="url(#cBlurSoft)" />
      </g>

      {/* ── Célula vermelha — rodapé centro ── */}
      <g style={{ animation: "cellDrift3 8s ease-in-out infinite", animationDelay: "-2s" }}>
        <circle cx="42" cy="82" r="7"   fill="url(#gRed)" filter="url(#cBlurSoft)" />
        <circle cx="42" cy="82" r="7"   fill="none" stroke="rgba(200,16,46,0.34)" strokeWidth="0.7" />
        <circle cx="42" cy="82" r="5.3" fill="none" stroke="rgba(200,16,46,0.14)" strokeWidth="0.4" />
        <circle cx="40" cy="80" r="1.7" fill="rgba(200,16,46,0.48)" filter="url(#cBlurSoft)" />
      </g>

      {/* ── Célula branca — rodapé direita ── */}
      <g style={{ animation: "cellDrift1 9s ease-in-out infinite", animationDelay: "-4s" }}>
        <circle cx="85" cy="78" r="6"   fill="url(#gWhite)" filter="url(#cBlurSoft)" />
        <circle cx="85" cy="78" r="6"   fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="0.6" />
        <circle cx="85" cy="78" r="4.5" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.35" />
        <circle cx="83.5" cy="76.5" r="1.5" fill="rgba(255,255,255,0.28)" filter="url(#cBlurSoft)" />
      </g>

      {/* ── Célula pequena — topo centro ── */}
      <g style={{ animation: "cellDrift2 6s ease-in-out infinite", animationDelay: "-0.8s" }}>
        <circle cx="48" cy="12" r="4"   fill="url(#gWhite)" filter="url(#cBlurSoft)" />
        <circle cx="48" cy="12" r="4"   fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
        <circle cx="48" cy="12" r="2.8" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.3" />
        <circle cx="46.8" cy="10.8" r="1" fill="rgba(255,255,255,0.30)" filter="url(#cBlurSoft)" />
      </g>

      {/* ── Anéis de textura em movimento ── */}
      <circle cx="35" cy="35" r="10"
        fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" filter="url(#cBlurMed)"
        style={{ animation: "cellDrift3 13s ease-in-out infinite", animationDelay: "-6s" }} />
      <circle cx="70" cy="72" r="9"
        fill="none" stroke="rgba(200,16,46,0.10)" strokeWidth="0.6" filter="url(#cBlurMed)"
        style={{ animation: "cellDrift1 11s ease-in-out infinite", animationDelay: "-9s" }} />
      <circle cx="8"  cy="70" r="7"
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" filter="url(#cBlurMed)"
        style={{ animation: "cellDrift2 10s ease-in-out infinite", animationDelay: "-5s" }} />

      {/* ── Partículas brilhantes — espalhadas por todo o frame ── */}
      {[
        { cx: 30, cy: 38, r: 1.5, c: "rgba(255,255,255,0.85)", d: "-1s",   dur: "4s" },
        { cx: 62, cy: 25, r: 1.8, c: "rgba(200,16,46,0.95)",  d: "-3s",   dur: "6s" },
        { cx: 90, cy: 42, r: 1.3, c: "rgba(255,255,255,0.75)", d: "-2s",   dur: "5s" },
        { cx: 18, cy: 88, r: 1.6, c: "rgba(200,16,46,0.85)",  d: "-4.5s", dur: "7s" },
        { cx: 72, cy: 88, r: 1.4, c: "rgba(255,255,255,0.70)", d: "-0.5s", dur: "5s" },
        { cx: 50, cy: 68, r: 1.9, c: "rgba(200,16,46,0.90)",  d: "-5s",   dur: "6s" },
        { cx: 93, cy: 15, r: 1.2, c: "rgba(255,255,255,0.65)", d: "-2.5s", dur: "4s" },
        { cx: 8,  cy: 40, r: 1.5, c: "rgba(200,16,46,0.80)",  d: "-6s",   dur: "7s" },
      ].map(({ cx, cy, r, c, d, dur }) => (
        <g key={`${cx}-${cy}`}>
          {/* pulso 1 */}
          <circle cx={cx} cy={cy} r={r * 1.1} fill={c}
            style={{
              animation: `glowPulse ${dur} ease-out infinite`,
              animationDelay: d,
              transformBox: "fill-box",
              transformOrigin: "center",
            }} />
          {/* pulso 2 — defasado em metade do período */}
          <circle cx={cx} cy={cy} r={r * 1.1} fill={c}
            style={{
              animation: `glowPulse ${dur} ease-out infinite`,
              animationDelay: `calc(${d} - ${parseFloat(dur) / 2}s)`,
              transformBox: "fill-box",
              transformOrigin: "center",
            }} />
          {/* núcleo sólido */}
          <circle cx={cx} cy={cy} r={r} fill={c}
            style={{ animation: `cellShimmer ${dur} ease-in-out infinite`, animationDelay: d }} />
        </g>
      ))}
    </svg>
  );
}
