import { PROFILE } from "../data/profile";

export default function Timeline() {
  return (
    <section className="timeline-section">
      <h2>The <em>condensed</em> resume.</h2>
      <div className="tline">
        {PROFILE.timeline.map((item, i) => (
          <div key={i} className={`tline-item${item.now ? " now" : ""}`}>
            <div className="tline-period">{item.period}</div>
            <div className="tline-content">
              <h4>
                {item.title} <em>{item.company}</em>
              </h4>
              <div className="tline-company">{item.subtitle}</div>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
