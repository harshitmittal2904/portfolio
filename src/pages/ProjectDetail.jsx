import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import MobilePrototype from "../components/MobilePrototype";

const SC_ACCENT = "#E8590C";
const SC_STYLE = {
  "--pd-accent": SC_ACCENT,
  "--pd-accent-soft": "rgba(232, 89, 12, 0.07)",
  "--pd-accent-border": "rgba(232, 89, 12, 0.18)",
};

// ─── SMART COMMUTE DETAIL PAGE ───
function SmartCommuteDetail({ project }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "prototype", label: "Prototype" },
    { id: "metrics", label: "Metrics" },
  ];

  return (
    <main className="pd" style={SC_STYLE}>
      <div className="pd-inner">
        <button className="pd-back" onClick={() => navigate("/")}>
          &larr; Back to Portfolio
        </button>

        <div className="pd-badge">
          Project {project.number} &mdash; {project.company}
        </div>

        <h1 className="pd-title">
          Predictive Smart{" "}
          <span className="pd-title-accent">Commute Card</span>
        </h1>
        <p className="pd-desc">{project.tagline}</p>

        <div className="pd-tags-row">
          {project.tags.map((t) => (
            <span key={t} className="pd-tag">{t}</span>
          ))}
        </div>

        {/* Tabs */}
        <div className="pd-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`pd-tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="pd-stats">
          {project.metrics.map((m, i) => (
            <div key={i} className="pd-stat">
              <div className="pd-stat-num">{m.value}</div>
              <div className="pd-stat-label">{m.label}</div>
              <div className="pd-stat-sub">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="pd-section">
            <div className="pd-grid-2">
              <div className="pd-card">
                <div className="pd-section-label red">THE PROBLEM</div>
                <p>{project.problem}</p>
              </div>
              <div className="pd-card">
                <div className="pd-section-label green">
                  CURRENT &rarr; PROPOSED FLOW
                </div>
                <div className="pd-flow">
                  <div className="pd-flow-label">Before (4 steps)</div>
                  <div className="pd-flow-steps">
                    {["Open App", "Enter Dest", "Select Ride", "Book"].map(
                      (s, i) => (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <span className="pd-flow-step before">{s}</span>
                          {i < 3 && <span className="pd-flow-arrow">&rarr;</span>}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="pd-flow">
                  <div className="pd-flow-label">After (2 steps)</div>
                  <div className="pd-flow-steps">
                    {["Open App", "One-Tap Book"].map((s, i) => (
                      <span key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <span className="pd-flow-step after">{s}</span>
                        {i < 1 && <span className="pd-flow-arrow">&rarr;</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI */}
            <div className="pd-card pd-card-accent">
              <div className="pd-section-label">HOW AI ACCELERATED THIS</div>
              <div className="pd-grid-auto">
                {[
                  { n: "01", t: "Idea \u2192 Problem Frame", d: "AI sharpened the user problem and validated behavioral assumptions" },
                  { n: "02", t: "PRD Generation", d: "Full PRD with segments, ML architecture, rollout, and risks" },
                  { n: "03", t: "Prototype Build", d: "Interactive React prototype with predictive booking flow" },
                  { n: "04", t: "Stakeholder Pitch", d: "Founder-level outreach with clear value proposition" },
                ].map((item) => (
                  <div key={item.n} className="pd-ai-card">
                    <div className="pd-ai-num">{item.n}</div>
                    <div className="pd-ai-title">{item.t}</div>
                    <div className="pd-ai-desc">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Future */}
            <div className="pd-card">
              <div className="pd-section-label muted">FUTURE EXTENSIONS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.futureExtensions.map((f, i) => (
                  <span key={i} className="pd-chip">{f}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROTOTYPE */}
        {activeTab === "prototype" && (
          <div className="pd-section">
            <div className="pd-proto-layout">
              <div style={{ animation: "float 4s ease infinite" }}>
                <MobilePrototype />
              </div>
              <div className="pd-proto-info">
                <div className="pd-section-label">INTERACTIVE PROTOTYPE</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, letterSpacing: -0.5 }}>
                  Try the Smart Card
                </h3>
                <p style={{ fontSize: 12, lineHeight: 1.7, marginBottom: 18, color: "var(--text-secondary)" }}>
                  Fully interactive prototype. It&apos;s 8:45 AM and
                  you&apos;re at home &mdash; the card surfaces your daily
                  commute to Huda City Centre Metro with a live map view on
                  booking.
                </p>
                {[
                  { action: "Book Ride", result: "Live map \u2192 loading \u2192 driver approaching with animated route" },
                  { action: "See other options", result: "Modal with Bike / Auto / Mini Cab pricing" },
                  { action: "Select ride type", result: "Price updates dynamically on the card" },
                  { action: "Cancel ride", result: "Returns to home screen" },
                ].map((item, i) => (
                  <div key={i} className="pd-proto-step">
                    <span className="pd-proto-step-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="pd-proto-step-action">{item.action}</div>
                      <div className="pd-proto-step-result">{item.result}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* METRICS */}
        {activeTab === "metrics" && (
          <div className="pd-section">
            <div className="pd-grid-2">
              <div className="pd-card">
                <div className="pd-section-label">
                  KEY PERFORMANCE INDICATORS
                </div>
                {project.kpis.map((kpi, i) => (
                  <div key={i} className="pd-numbered">
                    <span className="pd-numbered-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pd-numbered-text">{kpi}</span>
                  </div>
                ))}
              </div>
              <div className="pd-card">
                <div className="pd-section-label green">EXPECTED IMPACT</div>
                {project.impact.map((row, i) => (
                  <div key={i} className="pd-impact-row">
                    <span className="pd-impact-metric">{row.metric}</span>
                    <span className="pd-impact-before">{row.before}</span>
                    <span className="pd-impact-arrow">&rarr;</span>
                    <span className="pd-impact-after">
                      {row.after} ({row.change})
                    </span>
                  </div>
                ))}
                <div className="pd-ab">
                  <div className="pd-ab-title">A/B TEST DESIGN</div>
                  <div className="pd-ab-desc">
                    Phase 1: 5% eligible users in Bengaluru. Control = standard
                    flow. Test = Smart Card. Primary metric: TTB reduction.
                    Significance: p &lt; 0.05 over 4 weeks.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ─── DEFAULT EXPORT: Router-wired page ───
export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project =
    PROJECTS.find((p) => p.id === id) ||
    (id === "smart-commute" ? PROJECTS.find((p) => p.id === "rapido") : null);

  if (!project) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", color: "var(--text-muted)", fontSize: 14, marginBottom: 16 }}>
            404 &mdash; project not found
          </p>
          <Link to="/" style={{ color: "var(--accent-text)", textDecoration: "underline" }}>
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  if (id === "smart-commute" || id === "rapido") {
    return <SmartCommuteDetail project={project} />;
  }

  // Fallback
  return (
    <main className="pd" style={{ "--pd-accent": project.color || "#ea580c" }}>
      <div className="pd-inner">
        <button className="pd-back" onClick={() => navigate("/")}>
          &larr; Back to Portfolio
        </button>
        <h1 className="pd-title">{project.title}</h1>
        <p className="pd-desc">{project.summary}</p>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Full case study coming soon.
        </p>
      </div>
    </main>
  );
}
