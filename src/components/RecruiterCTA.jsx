import { PROFILE } from "../data/profile";

export default function RecruiterCTA() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-content mx-auto bg-surface border border-border rounded-2xl px-8 py-14 md:px-14 md:py-20 text-center">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-text-1">
          Looking for a PM who ships?
        </h2>
        <p className="mt-4 text-text-2 max-w-xl mx-auto">
          I'm open to senior PM roles where the bar is shipping working software, not slide decks.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={PROFILE.cta.email}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-accent text-bg font-semibold text-sm hover:brightness-110 transition"
          >
            Email me
          </a>
          <a
            href={PROFILE.cta.resumeUrl}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-text-1 font-semibold text-sm hover:bg-bg transition"
          >
            Resume ↓
          </a>
          <a
            href={PROFILE.cta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border text-text-1 font-semibold text-sm hover:bg-bg transition"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
