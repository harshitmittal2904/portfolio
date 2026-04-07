import { PROFILE } from "../data/profile";

export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-border">
      <div className="max-w-content mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="font-mono text-xs text-text-3">
          © {new Date().getFullYear()} {PROFILE.name}
        </div>
        <div className="flex gap-5 font-mono text-xs">
          <a href={PROFILE.cta.email} className="text-text-2 hover:text-accent transition">Email</a>
          <a href={PROFILE.cta.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-accent transition">LinkedIn ↗</a>
          <a href={PROFILE.cta.github} target="_blank" rel="noopener noreferrer" className="text-text-2 hover:text-accent transition">GitHub ↗</a>
        </div>
      </div>
    </footer>
  );
}
