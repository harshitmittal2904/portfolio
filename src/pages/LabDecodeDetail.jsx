import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../data/projects";

const ACCENT = "#0F766E";
const ACCENT_SOFT = "rgba(15, 118, 110, 0.07)";
const ACCENT_BORDER = "rgba(15, 118, 110, 0.18)";

const ORGAN_SYSTEMS = [
  { icon: "\u2764\uFE0F", name: "Heart" },
  { icon: "\uD83E\uDED8", name: "Kidneys" },
  { icon: "\uD83E\uDDEC", name: "Liver" },
  { icon: "\uD83E\uDE78", name: "Blood" },
  { icon: "\uD83E\uDD8B", name: "Thyroid" },
  { icon: "\uD83D\uDD2C", name: "Metabolism" },
  { icon: "\uD83D\uDC8A", name: "Vitamins" },
  { icon: "\uD83E\uDDB4", name: "Bones" },
  { icon: "\u26A1", name: "Hormones" },
  { icon: "\uD83D\uDEE1\uFE0F", name: "Inflammation" },
];

const AI_BLOCKS = [
  { n: "01", t: "Gemini 2.5 Flash", d: "Reads PDFs via text extraction and scanned/photo reports via Vision API for OCR" },
  { n: "02", t: "Medical Knowledge Base", d: "Comprehensive system prompt covering CBC, CMP, LFT, KFT, thyroid, hormones, vitamins, cardiac markers, and coagulation" },
  { n: "03", t: "Smart Categorization", d: "Groups 100+ parameters into 10 organ systems with a 4-level status: Excellent, Normal, Attention, Review" },
  { n: "04", t: "Evidence-Based Suggestions", d: "Lifestyle recommendations citing AHA, WHO, NIH, and peer-reviewed research" },
];

const DISCLAIMERS = [
  "LabDecode is an educational health literacy tool",
  "It does not diagnose, prescribe, or replace professional medical advice",
  "Every analysis includes 7 strategically placed disclaimers",
  "No user data is stored on any server",
];

export default function LabDecodeDetail() {
  const project = PROJECTS.find((p) => p.id === "labdecode");
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
          Lab<span className="pd-title-accent">Decode</span>
        </h1>
        <p className="pd-desc">
          Your lab reports, finally understood. Upload any medical report &mdash;
          get instant, plain-language insights organized by body system.
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
            </div>

            {/* Solution */}
            <div className="pd-card">
              <div className="pd-section-label green">WHAT I BUILT</div>
              <p>
                LabDecode is a free, AI-powered web app that reads any medical
                lab report &mdash; blood tests, metabolic panels, organ function
                tests &mdash; and translates every parameter into plain,
                understandable language. Results are grouped by organ system with
                color-coded status indicators and evidence-based lifestyle
                suggestions.
              </p>
              <p style={{ marginTop: 10, opacity: 0.7 }}>
                It does NOT diagnose. It does NOT prescribe. It helps you
                understand your own health data &mdash; so you can have better
                conversations with your doctor.
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

            {/* Organ Systems */}
            <div className="pd-card">
              <div className="pd-section-label">ORGAN SYSTEM VIEWS</div>
              <div className="pd-grid-small">
                {ORGAN_SYSTEMS.map((o, i) => (
                  <div key={i} className="pd-icon-card">
                    <div className="pd-icon-card-icon">{o.icon}</div>
                    <div className="pd-icon-card-label">{o.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety */}
            <div className="pd-safety">
              <div className="pd-section-label red">SAFETY BY DESIGN</div>
              <div className="pd-safety-grid">
                {DISCLAIMERS.map((d, i) => (
                  <div key={i} className="pd-safety-item">
                    <span className="pd-safety-check">&#10003;</span>
                    <span className="pd-safety-text">{d}</span>
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
