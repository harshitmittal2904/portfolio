import { PROFILE } from "../data/profile";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 h-14 px-6 md:px-10 flex items-center justify-between bg-bg/85 backdrop-blur-xl border-b border-border">
      <a href="/" className="flex items-center gap-2.5">
        <span className="h-7 w-7 rounded-[7px] bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center font-mono text-[9px] font-bold text-black">
          HM
        </span>
        <span className="font-sans text-[13px] font-semibold text-text-1 tracking-tight">
          {PROFILE.name}
        </span>
      </a>
      <div className="flex items-center gap-1.5">
        <a
          href={PROFILE.cta.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-block font-sans text-[11px] text-text-3 hover:text-text-2 px-2.5 py-1.5 rounded-md transition"
        >
          LinkedIn
        </a>
        <a
          href={PROFILE.cta.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-block font-sans text-[11px] text-text-3 hover:text-text-2 px-2.5 py-1.5 rounded-md transition"
        >
          GitHub
        </a>
        <a
          href={PROFILE.cta.resumeUrl}
          className="font-sans text-[11px] font-bold text-black bg-accent px-3.5 py-1.5 rounded-md hover:opacity-85 transition"
        >
          Resume ↓
        </a>
      </div>
    </nav>
  );
}
