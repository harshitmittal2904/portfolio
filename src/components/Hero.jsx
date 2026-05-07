import { PROFILE } from "../data/profile";

const PROOF = [
  { num: "06", label: "Products" },
  { num: "03", label: "Live now" },
  { num: "45%", label: "Revenue lift" },
];

const SIGNAL_TILES = [
  { label: "SchemeWise", meta: "Live", accent: "#FF6B2B" },
  { label: "LabDecode", meta: "Live", accent: "#0F766E" },
  { label: "StoxKart eKYC", meta: "Case Study", accent: "#ffc629" },
  { label: "Find My Teardown", meta: "Case Study", accent: "#1d1d1f" },
  { label: "Smart Commute", meta: "Prototype", accent: "#E8590C" },
  { label: "Ecommerce Marketplace", meta: "Career", accent: "#ea580c" },
];

export default function Hero() {
  return (
    <section className="hero">
      {/* Warm gradient wash */}
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-eyebrow">Senior Product Manager</div>

          <h1>
            I ship the<br />
            <em>thing,</em> not<br />
            the deck.
          </h1>

          <p className="hero-deck">{PROFILE.heroDesc}</p>

          {/* Proof strip */}
          <div className="hero-proof">
            {PROOF.map((p, i) => (
              <div key={i} className="hero-proof-item">
                <span className="hero-proof-num">{p.num}</span>
                <span className="hero-proof-label">{p.label}</span>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="hero-actions">
            <a href="#projects" className="hero-cta-primary">
              See my work
            </a>
            <a href={PROFILE.cta.email} className="hero-cta-secondary">
              {PROFILE.cta.emailRaw}
            </a>
          </div>
        </div>

        {/* Right side — signal tiles */}
        <div className="hero-tiles" aria-hidden="true">
          {SIGNAL_TILES.map((t, i) => (
            <div
              key={i}
              className="hero-tile"
              style={{ "--tile-accent": t.accent, animationDelay: `${i * 120}ms` }}
            >
              <span className="hero-tile-dot" />
              <span className="hero-tile-label">{t.label}</span>
              <span className="hero-tile-meta">{t.meta}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track">
          {PROFILE.ticker.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
          {PROFILE.ticker.map((t, i) => (
            <span key={`dup-${i}`}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
