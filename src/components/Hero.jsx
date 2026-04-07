import { PROFILE } from "../data/profile";

export default function Hero() {
  return (
    <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="max-w-content mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
          <span className="font-mono text-xs tracking-wider text-text-2 uppercase">
            {PROFILE.role} · Available for select roles
          </span>
        </div>

        {/* Tagline */}
        <h1 className="font-display font-bold text-text-1 leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          {PROFILE.tagline}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-text-2 text-base md:text-lg leading-relaxed">
          {PROFILE.subtitle}
        </p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
          {PROFILE.stats.map((s) => (
            <div key={s.label} className="border-l-2 border-border pl-4">
              <div className="font-mono text-3xl md:text-4xl text-accent font-bold">{s.value}</div>
              <div className="font-sans text-sm text-text-1 mt-1">{s.label}</div>
              <div className="font-mono text-xs text-text-3 mt-0.5">{s.note}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href={PROFILE.cta.email}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-bg font-sans font-semibold text-sm hover:brightness-110 transition"
          >
            Email me
          </a>
          <a
            href={PROFILE.cta.resumeUrl}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-text-1 font-sans font-semibold text-sm hover:bg-surface transition"
          >
            Resume ↓
          </a>
          <a
            href={PROFILE.cta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-text-1 font-sans font-semibold text-sm hover:bg-surface transition"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
