import { PROFILE } from "../data/profile";

const PROOF = [
  { num: "06", label: "Products" },
  { num: "03", label: "Live now" },
  { num: "01", label: "Apple teardown" },
  { num: "45%", label: "Revenue lift" },
];

export default function Hero() {
  return (
    <section className="hero">
      {/* Warm gradient wash */}
      <div className="hero-glow" aria-hidden="true" />

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
