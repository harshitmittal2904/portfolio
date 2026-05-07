import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const isExternal = project.external;
  const Wrapper = isExternal ? "a" : Link;
  const wrapperProps = isExternal
    ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
    : { to: project.href };

  return (
    <Wrapper {...wrapperProps} className="pc" style={{ textDecoration: "none" }}>
      <div className="pc-top">
        <span className="pc-num">{project.number}</span>
        <div className="pc-tags">
          {project.isLive && <span className="pc-tag live">Live</span>}
          {project.isCaseStudy && <span className="pc-tag cs">Case Study</span>}
          {project.tags.slice(0, 2).map((t) => (
            <span key={t} className="pc-tag">{t}</span>
          ))}
        </div>
      </div>
      <h3 className="pc-title">{project.title}</h3>
      <p className="pc-subtitle">{project.subtitle}</p>
      <p className="pc-summary">{project.summary}</p>
      <div className="pc-stats">
        {project.stats.slice(0, 3).map((s, i) => (
          <div key={i} className="pc-stat">
            <span className="pc-stat-num">
              {s.num}{s.unit && <small>{s.unit}</small>}
            </span>
            <span className="pc-stat-lbl">{s.label.split("\n")[0]}</span>
          </div>
        ))}
      </div>
      <span className="pc-link">{project.linkLabel}</span>
    </Wrapper>
  );
}
