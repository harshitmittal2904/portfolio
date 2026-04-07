import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="group relative bg-surface border border-border rounded-xl overflow-hidden hover:border-text-3 transition">
      {/* Top accent bar */}
      <div
        className="h-[2px] w-full"
        style={{ background: project.accentBar }}
      />

      {/* Cover area with ghost numeral */}
      <Link to={`/projects/${project.id}`} className="block relative h-[140px] overflow-hidden">
        <span
          className="absolute inset-0 flex items-center justify-center font-mono font-bold pointer-events-none select-none"
          style={{ fontSize: "120px", color: "rgba(255,255,255,0.055)" }}
        >
          {project.number}
        </span>
        <span className="absolute top-4 left-5 font-mono text-xs text-text-3 tracking-wider">
          {project.number} / {project.company}
        </span>
        {project.liveUrl && (
          <span className="absolute top-4 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green/10 border border-green/30 font-mono text-[10px] text-green uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
            Live
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="px-5 pt-5 pb-6">
        <Link to={`/projects/${project.id}`}>
          <h3 className="font-display font-bold text-xl text-text-1 group-hover:text-accent transition">
            {project.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-text-2 leading-relaxed">
          {project.outcome}
        </p>

        {/* CTA row */}
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border font-sans text-xs text-text-1 hover:bg-bg transition"
          >
            Read case →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-green/10 border border-green/30 font-sans text-xs text-green hover:bg-green/20 transition"
            >
              Try Live ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
