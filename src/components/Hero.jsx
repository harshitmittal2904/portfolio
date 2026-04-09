import { PROFILE } from "../data/profile";

export default function Hero() {
  return (
    <section className="px-6 md:px-10 pt-20 md:pt-24 pb-16 md:pb-20">
      <div className="max-w-content mx-auto">
        <div className="max-w-[780px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-soft-pulse" />
            <span className="font-sans text-[10px] font-semibold tracking-[0.5px] uppercase text-text-3">
              {PROFILE.role} · UKG
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-extrabold text-text-1"
            style={{
              fontSize: "clamp(44px, 6vw, 74px)",
              lineHeight: 1.0,
              letterSpacing: "-2.5px",
            }}
          >
            I don't just write PRDs.
            <br />
            I ship{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #FFD400 20%, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              prototypes.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-[540px] font-sans text-base text-text-2 font-light leading-[1.75]">
            {PROFILE.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 bg-accent text-black font-sans text-[13px] font-extrabold px-5 py-3 rounded-[9px] hover:opacity-85 transition"
            >
              See my work →
            </a>
            <a
              href={PROFILE.cta.resumeUrl}
              className="inline-flex items-center gap-1.5 text-text-2 font-sans text-[13px] font-medium px-5 py-3 rounded-[9px] border border-border hover:border-border-2 hover:text-text-1 transition"
            >
              Resume ↓
            </a>
            <a
              href={PROFILE.cta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-text-2 font-sans text-[13px] font-medium px-5 py-3 rounded-[9px] border border-border hover:border-border-2 hover:text-text-1 transition"
            >
              ↗ LinkedIn
            </a>
          </div>

          {/* Stats with vertical separators */}
          <div className="mt-14 pt-7 border-t border-border flex flex-wrap items-start">
            {PROFILE.stats.map((s, i) => (
              <div
                key={s.label}
                className={`pr-9 ${i < PROFILE.stats.length - 1 ? "mr-9 border-r border-border" : ""}`}
              >
                <div className="font-mono text-[22px] font-bold text-text-1 tracking-[-1px]">
                  {s.value}
                </div>
                <div className="font-sans text-[10px] text-text-3 mt-1 font-medium tracking-[0.3px]">
                  {s.label}
                  {s.note ? ` · ${s.note}` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
