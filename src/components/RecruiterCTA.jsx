import { PROFILE } from "../data/profile";

export default function RecruiterCTA() {
  return (
    <section className="px-6 md:px-10 mt-16 mb-10">
      <div className="max-w-content mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl border border-accent/[0.12] px-8 py-14 md:px-12 md:py-[56px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,212,0,0.03), rgba(255,140,0,0.01))",
          }}
        >
          {/* Radial glow */}
          <span
            className="absolute pointer-events-none rounded-full"
            style={{
              top: "-100px",
              right: "-100px",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(255,212,0,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-[560px]">
            <div className="font-sans text-[10px] font-bold text-accent tracking-[1.5px] uppercase mb-3.5">
              For recruiters & hiring managers
            </div>
            <h2
              className="font-display font-extrabold text-text-1 mb-3.5"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
              }}
            >
              Looking for a PM
              <br />
              who ships?
            </h2>
            <p className="font-sans text-sm text-text-2 leading-[1.7] mb-7 max-w-[480px]">
              I'm open to senior PM roles — AI, fintech, mobility, SaaS. If you
              want a PM who prototypes before writing specs, let's talk.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={PROFILE.cta.email}
                className="inline-flex items-center gap-1.5 bg-accent text-black font-sans text-[13px] font-extrabold px-5 py-3 rounded-[9px] hover:opacity-85 transition"
              >
                ✉ Email me
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
          </div>
        </div>
      </div>
    </section>
  );
}
