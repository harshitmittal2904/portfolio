import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const isLive = project.statusKind === "live";
  return (
    <article
      className={`group relative bg-surface border border-border rounded-[18px] overflow-hidden flex flex-col transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-lift ${project.hoverBorder || ""}`}
    >
      {/* Cover */}
      <Link
        to={`/projects/${project.id}`}
        className="relative h-[140px] overflow-hidden border-b border-border flex items-end p-5"
        style={{ backgroundColor: "#0e0e12" }}
      >
        {/* Top accent bar */}
        <span
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: project.accentBar }}
        />
        {/* Radial glow */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{ background: project.coverGlow }}
        />
        {/* Ghost numeral */}
        <span
          className="absolute font-mono font-bold pointer-events-none select-none text-white"
          style={{
            right: "-8px",
            bottom: "-20px",
            fontSize: "120px",
            lineHeight: 1,
            letterSpacing: "-6px",
            opacity: 0.055,
          }}
        >
          {project.number}
        </span>
        {/* Status badge */}
        <span
          className={`relative z-10 font-sans text-[9px] font-bold tracking-[0.5px] uppercase px-2.5 py-1 rounded-md border ${
            isLive
              ? "bg-green/10 text-green border-green/20"
              : "bg-accent/[0.08] text-accent border-accent/15"
          }`}
        >
          {project.statusLabel}
        </span>
      </Link>

      {/* Body */}
      <div className="px-5 pt-5 pb-[22px] flex-1 flex flex-col">
        <div className="font-sans text-[9px] font-bold text-text-3 tracking-[1.2px] uppercase mb-2.5">
          {project.cardCompany}
        </div>
        <Link to={`/projects/${project.id}`}>
          <h3 className="font-display text-[15px] font-extrabold text-text-1 tracking-[-0.5px] leading-[1.3] mb-1.5 group-hover:text-text-1">
            {project.title}
          </h3>
        </Link>
        <p className="font-sans text-[11px] text-text-2 leading-[1.65] mb-[18px]">
          {project.cardTagline}
        </p>

        {/* Metric trio */}
        <div className="flex gap-[18px] mb-[18px]">
          {project.cardMetrics?.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-[14px] font-bold text-text-1">{m.value}</div>
              <div className="font-sans text-[8px] text-text-3 mt-[3px] tracking-[0.2px]">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3.5 border-t border-border flex items-center justify-between gap-2">
          <div className="flex gap-1 flex-wrap">
            {project.cardTags?.map((t) => (
              <span
                key={t}
                className="font-sans text-[9px] text-text-3 px-2 py-0.5 rounded bg-white/[0.03] border border-border"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-1.5 items-center">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[9px] font-bold text-green bg-green/[0.08] border border-green/20 px-2 py-1 rounded uppercase tracking-[0.3px]"
              >
                Try Live ↗
              </a>
            )}
            <Link
              to={`/projects/${project.id}`}
              className="font-sans text-[10px] font-bold text-accent"
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
