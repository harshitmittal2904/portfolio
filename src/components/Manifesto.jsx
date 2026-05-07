import { PROFILE } from "../data/profile";

export default function Manifesto() {
  return (
    <section className="manifesto" id="about">
      <div className="manifesto-inner">
        <div className="manifesto-eyebrow">/ How I work</div>
        <h2>
          Three principles that<br />
          govern <em>every project.</em>
        </h2>

        <div className="manifesto-grid">
          {PROFILE.manifesto.map((m) => (
            <div key={m.num} className="manifesto-card">
              <div className="num">{m.num}</div>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
