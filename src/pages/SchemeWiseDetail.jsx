import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/projects";

const ACCENT = "#FF6B2B";
const ACCENT_SOFT = "rgba(255, 107, 43, 0.07)";
const ACCENT_BORDER = "rgba(255, 107, 43, 0.18)";

const AI_BLOCKS = [
  { n: "01", t: "Claude Sonnet API", d: "Powers the AI chat — answers any question about any scheme with accurate, sourced information" },
  { n: "02", t: "Fallback System", d: "Keyword-based pre-written answers ensure the app never errors, even if the API is down" },
  { n: "03", t: "Recommendation Engine", d: "Personalized scheme rankings based on user profile — age, employment, risk, and goals" },
  { n: "04", t: "Knowledge Base", d: "Comprehensive system prompt covering every scheme's rules, 2025 PFRDA/EPFO changes, and tax implications" },
];

const INTEREST_RATES = [
  { scheme: "PPF", rate: "7.1%" },
  { scheme: "EPF", rate: "8.25%" },
  { scheme: "SSY", rate: "8.2%" },
  { scheme: "SCSS", rate: "8.2%" },
  { scheme: "NSC", rate: "7.7%" },
  { scheme: "KVP", rate: "7.5%" },
  { scheme: "POMIS", rate: "7.4%" },
];

const PAGES = [
  { name: "Dashboard", desc: "At-a-glance view of all schemes with current interest rates" },
  { name: "AI Chat", desc: "Ask any question about any scheme in plain language" },
  { name: "Scheme Explorer", desc: "Browse all 10+ schemes with detailed breakdowns" },
  { name: "Compare", desc: "Side-by-side comparison of up to 4 schemes" },
  { name: "Calculators", desc: "PPF, NPS, EPF maturity and tax benefit calculators" },
  { name: "Eligibility Quiz", desc: "Answer questions to find which schemes you qualify for" },
  { name: "Withdrawal Guides", desc: "Step-by-step guides for EPF, PPF, NPS withdrawal" },
  { name: "Troubleshoot", desc: "UAN, PRAN, KYC mismatch, claim rejection resolution" },
  { name: "Document Checklists", desc: "Interactive checklists with progress tracking" },
  { name: "Glossary", desc: "50+ financial terms in plain English with Hindi translations" },
];

export default function SchemeWiseDetail() {
  const project = PROJECTS.find((p) => p.id === "schemewise");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "tech", label: "Tech & Process" },
  ];

  const style = {
    "--pd-accent": ACCENT,
    "--pd-accent-soft": ACCENT_SOFT,
    "--pd-accent-border": ACCENT_BORDER,
  };

  return (
    <main className="pd" style={style}>
      <div className="pd-inner">
        <button className="pd-back" onClick={() => navigate("/")}>
          &larr; Back to Portfolio
        </button>

        {/* Badge */}
        <div className="pd-badge">
          Project {project.number} &mdash; {project.company}
        </div>

        {/* Title */}
        <h1 className="pd-title">
          Scheme<span className="pd-title-accent">Wise</span>
        </h1>
        <p className="pd-desc">
          AI-powered knowledge platform for every government investment scheme
          in India. Free, no signup, in plain English.
        </p>

        {/* Tags row */}
        <div className="pd-tags-row">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pd-live-btn"
          >
            View Live App &rarr;
          </a>
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
            {/* Problem */}
            <div className="pd-card">
              <div className="pd-section-label red">THE PROBLEM</div>
              <p>{project.problem}</p>
              <p style={{ marginTop: 10, opacity: 0.7 }}>
                Groww does mutual funds. Zerodha does stocks. ClearTax does ITR.
                Nobody does government schemes.
              </p>
            </div>

            {/* Solution */}
            <div className="pd-card">
              <div className="pd-section-label green">WHAT I BUILT</div>
              <p>
                SchemeWise is a free, AI-powered web app that answers any
                question about any Indian government investment scheme &mdash; in
                plain, simple language. It doesn&apos;t invest your money. It
                makes sure you understand what you&apos;re investing in.
              </p>
            </div>

            {/* AI at the core */}
            <div className="pd-card pd-card-accent">
              <div className="pd-section-label">AI AT THE CORE</div>
              <div className="pd-grid-auto">
                {AI_BLOCKS.map((item) => (
                  <div key={item.n} className="pd-ai-card">
                    <div className="pd-ai-num">{item.n}</div>
                    <div className="pd-ai-title">{item.t}</div>
                    <div className="pd-ai-desc">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interest Rates */}
            <div className="pd-card">
              <div className="pd-section-label">CURRENT INTEREST RATES</div>
              <div className="pd-grid-small">
                {INTEREST_RATES.map((r, i) => (
                  <div key={i} className="pd-icon-card">
                    <div className="pd-stat-num" style={{ fontSize: 16 }}>
                      {r.rate}
                    </div>
                    <div className="pd-icon-card-label">{r.scheme}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEATURES */}
        {activeTab === "features" && (
          <div className="pd-section">
            <div className="pd-grid-auto">
              {project.features.map((f, i) => (
                <div key={i} className="pd-feature">
                  <div className="pd-feature-head">
                    <span className="pd-feature-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pd-feature-title">{f.title}</div>
                  </div>
                  <div className="pd-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>

            {/* App Pages */}
            <div className="pd-card" style={{ marginTop: 20 }}>
              <div className="pd-section-label">APP PAGES ({PAGES.length})</div>
              {PAGES.map((p, i) => (
                <div key={i} className="pd-numbered">
                  <span className="pd-numbered-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pd-numbered-text">
                    <strong>{p.name}</strong> &mdash; {p.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TECH & PROCESS */}
        {activeTab === "tech" && (
          <div className="pd-section">
            <div className="pd-grid-2">
              {/* Tech Stack */}
              <div className="pd-card">
                <div className="pd-section-label">TECH STACK</div>
                {project.techStack.map((t, i) => (
                  <div key={i} className="pd-tech-row">
                    <span className="pd-tech-cat">{t.category}</span>
                    <span className="pd-tech-items">{t.items}</span>
                  </div>
                ))}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-cta"
                >
                  View Live App &rarr;
                </a>
              </div>

              {/* Process */}
              <div className="pd-card">
                <div className="pd-section-label green">BUILD PROCESS</div>
                {project.process.map((step, i) => (
                  <div key={i} className="pd-numbered">
                    <span className="pd-numbered-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pd-numbered-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
