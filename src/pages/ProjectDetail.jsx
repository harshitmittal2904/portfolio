import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import MobilePrototype from "../components/MobilePrototype";
import SimulatedMap from "../components/SimulatedMap";

// ─── SCHEMEWISE DETAIL PAGE ───
function SchemeWiseDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "tech", label: "Tech & Process" },
  ];
  const c = project.color;

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "7px 14px", color: "#aaa", fontSize: 11, fontWeight: 600, cursor: "pointer", marginBottom: 24, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = `${c}14`; e.currentTarget.style.color = c; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#aaa"; }}>← Back to Portfolio</button>

      {/* Hero */}
      <div style={{ position: "relative", marginBottom: 32 }}>
        <div style={{ position: "absolute", top: -60, right: -100, width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${c}10 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: `${c}14`, border: `1px solid ${c}20`, marginBottom: 16 }}>
          <span style={{ fontSize: 10, animation: "pulse 2s ease infinite" }}>●</span>
          <span style={{ color: c, fontSize: 11, fontWeight: 600 }}>Project {project.number} — {project.company}</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, maxWidth: 650, marginBottom: 12 }}>
          Scheme<span style={{ background: `linear-gradient(135deg, ${c}, #FF8C00)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Wise</span>
        </h1>
        <p style={{ fontSize: 15, color: "#888", maxWidth: 540, lineHeight: 1.7, marginBottom: 16 }}>AI-powered knowledge platform for every government investment scheme in India</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 10, background: c, color: "#000", fontSize: 12, fontWeight: 700, textDecoration: "none", transition: "transform 0.15s" }} onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>🔗 View Live App</a>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map(t => <span key={t} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "#999", fontWeight: 500 }}>{t}</span>)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, gap: 2, marginBottom: 28 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "7px 18px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", background: activeTab === t.id ? `${c}1A` : "transparent", color: activeTab === t.id ? c : "#777" }}>{t.label}</button>
        ))}
      </div>

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 36 }}>
        {project.metrics.map((m, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: c, letterSpacing: -1 }}>{m.value}</div>
            <div style={{ fontSize: 10, color: "#aaa", fontWeight: 600, marginTop: 2 }}>{m.label}</div>
            <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          {/* Problem */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <div style={{ color: "#ff6b6b", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>THE PROBLEM</div>
            <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.8 }}>{project.problem}</p>
            <p style={{ color: "#999", fontSize: 12, lineHeight: 1.8, marginTop: 10 }}>Groww does mutual funds. Zerodha does stocks. ClearTax does ITR. Nobody does government schemes.</p>
          </div>

          {/* Solution */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <div style={{ color: "#4ade80", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>WHAT I BUILT</div>
            <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.8 }}>SchemeWise is a free, AI-powered web app that answers any question about any Indian government investment scheme — in plain, simple language. It doesn't invest your money. It makes sure you understand what you're investing in.</p>
          </div>

          {/* How AI helped */}
          <div style={{ background: `linear-gradient(135deg, ${c}08, ${c}04)`, border: `1px solid ${c}14`, borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <div style={{ color: c, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>🤖 AI AT THE CORE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {[
                { s: "01", t: "Claude Sonnet API", d: "Powers the AI chat — answers any question about any scheme with accurate, sourced information" },
                { s: "02", t: "Fallback System", d: "Keyword-based pre-written answers ensure the app never errors, even if the API is down" },
                { s: "03", t: "Recommendation Engine", d: "Personalized scheme rankings based on user profile — age, employment, risk, and goals" },
                { s: "04", t: "Knowledge Base", d: "Comprehensive system prompt covering every scheme's rules, 2025 PFRDA/EPFO changes, and tax implications" },
              ].map(item => (
                <div key={item.s} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: c, fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{item.s}</div>
                  <div style={{ color: "#e8e8e8", fontWeight: 700, fontSize: 11, marginBottom: 4 }}>{item.t}</div>
                  <div style={{ color: "#888", fontSize: 10, lineHeight: 1.5 }}>{item.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interest Rates */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: c, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>CURRENT INTEREST RATES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 8 }}>
              {[
                { scheme: "PPF", rate: "7.1%" },
                { scheme: "EPF", rate: "8.25%" },
                { scheme: "SSY", rate: "8.2%" },
                { scheme: "SCSS", rate: "8.2%" },
                { scheme: "NSC", rate: "7.7%" },
                { scheme: "KVP", rate: "7.5%" },
                { scheme: "POMIS", rate: "7.4%" },
              ].map((r, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 800, color: c }}>{r.rate}</div>
                  <div style={{ fontSize: 9, color: "#aaa", fontWeight: 600, marginTop: 2 }}>{r.scheme}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FEATURES */}
      {activeTab === "features" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {project.features.map((f, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 18, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.border = `1px solid ${c}20`} onMouseLeave={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.05)"}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: c, background: `${c}14`, padding: "2px 7px", borderRadius: 5 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ color: "#e8e8e8", fontWeight: 700, fontSize: 12 }}>{f.title}</div>
                </div>
                <div style={{ color: "#888", fontSize: 11, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TECH & PROCESS */}
      {activeTab === "tech" && (
        <div style={{ animation: "fadeIn 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* Tech Stack */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: c, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>TECH STACK</div>
            {project.techStack.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < project.techStack.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: c, fontSize: 9, fontWeight: 700, minWidth: 60 }}>{t.category}</span>
                <span style={{ color: "#ccc", fontSize: 11 }}>{t.items}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: `${c}1A`, border: `1px solid ${c}30`, color: c, fontSize: 11, fontWeight: 700, textDecoration: "none" }}>🔗 View Live App →</a>
            </div>
          </div>

          {/* Process */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: "#4ade80", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>BUILD PROCESS</div>
            {project.process.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < project.process.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#555", fontSize: 9, fontWeight: 700, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "#ccc", fontSize: 11, lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LABDECODE DETAIL PAGE ───
function LabDecodeDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "tech", label: "Tech & Process" },
  ];
  const c = project.color;

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "7px 14px", color: "#aaa", fontSize: 11, fontWeight: 600, cursor: "pointer", marginBottom: 24, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = `${c}14`; e.currentTarget.style.color = c; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#aaa"; }}>← Back to Portfolio</button>

      {/* Hero */}
      <div style={{ position: "relative", marginBottom: 32 }}>
        <div style={{ position: "absolute", top: -60, right: -100, width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${c}10 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: `${c}14`, border: `1px solid ${c}20`, marginBottom: 16 }}>
          <span style={{ fontSize: 10, animation: "pulse 2s ease infinite" }}>●</span>
          <span style={{ color: c, fontSize: 11, fontWeight: 600 }}>Project {project.number} — {project.company}</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, maxWidth: 650, marginBottom: 12 }}>
          Lab<span style={{ background: `linear-gradient(135deg, ${c}, #10B981)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Decode</span>
        </h1>
        <p style={{ fontSize: 15, color: "#888", maxWidth: 540, lineHeight: 1.7, marginBottom: 16 }}>Your lab reports, finally understood. Upload any medical report — get instant, plain-language insights organized by body system.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 10, background: c, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none", transition: "transform 0.15s" }} onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>🔗 View Live App</a>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map(t => <span key={t} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "#999", fontWeight: 500 }}>{t}</span>)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, gap: 2, marginBottom: 28 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "7px 18px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", background: activeTab === t.id ? `${c}1A` : "transparent", color: activeTab === t.id ? c : "#777" }}>{t.label}</button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 36 }}>
        {project.metrics.map((m, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: c, letterSpacing: -1 }}>{m.value}</div>
            <div style={{ fontSize: 10, color: "#aaa", fontWeight: 600, marginTop: 2 }}>{m.label}</div>
            <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          {/* Problem */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <div style={{ color: "#ff6b6b", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>THE PROBLEM</div>
            <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.8 }}>{project.problem}</p>
          </div>

          {/* Solution */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <div style={{ color: "#10B981", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>WHAT I BUILT</div>
            <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.8 }}>LabDecode is a free, AI-powered web app that reads any medical lab report — blood tests, metabolic panels, organ function tests — and translates every parameter into plain, understandable language. Results are grouped by organ system with color-coded status indicators and evidence-based lifestyle suggestions.</p>
            <p style={{ color: "#999", fontSize: 12, lineHeight: 1.8, marginTop: 10 }}>It does NOT diagnose. It does NOT prescribe. It helps you understand your own health data — so you can have better conversations with your doctor.</p>
          </div>

          {/* How AI powers it */}
          <div style={{ background: `linear-gradient(135deg, ${c}08, ${c}04)`, border: `1px solid ${c}14`, borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <div style={{ color: c, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>🤖 AI AT THE CORE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {[
                { s: "01", t: "Claude Vision + Text", d: "Reads PDFs via text extraction and scanned/photo reports via Claude Vision API for OCR" },
                { s: "02", t: "Medical Knowledge Base", d: "Comprehensive system prompt covering CBC, CMP, LFT, KFT, thyroid, hormones, vitamins, cardiac markers, and coagulation" },
                { s: "03", t: "Smart Categorization", d: "Groups 100+ parameters into 10 organ systems with a 4-level status system: Excellent → Normal → Attention → Review" },
                { s: "04", t: "Evidence-Based Suggestions", d: "Lifestyle recommendations citing AHA, WHO, NIH, and peer-reviewed research — never vague, always actionable" },
              ].map(item => (
                <div key={item.s} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: c, fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{item.s}</div>
                  <div style={{ color: "#e8e8e8", fontWeight: 700, fontSize: 11, marginBottom: 4 }}>{item.t}</div>
                  <div style={{ color: "#888", fontSize: 10, lineHeight: 1.5 }}>{item.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Organ Systems */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22, marginBottom: 16 }}>
            <div style={{ color: c, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>ORGAN SYSTEM VIEWS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 8 }}>
              {[
                { icon: "❤️", name: "Heart" },
                { icon: "🫘", name: "Kidneys" },
                { icon: "🧬", name: "Liver" },
                { icon: "🩸", name: "Blood" },
                { icon: "🦋", name: "Thyroid" },
                { icon: "🔬", name: "Metabolism" },
                { icon: "💊", name: "Vitamins" },
                { icon: "🦴", name: "Bones" },
                { icon: "⚡", name: "Hormones" },
                { icon: "🛡️", name: "Inflammation" },
              ].map((o, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{o.icon}</div>
                  <div style={{ fontSize: 9, color: "#aaa", fontWeight: 600 }}>{o.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety */}
          <div style={{ background: "rgba(251,113,133,0.06)", border: "1px solid rgba(251,113,133,0.12)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: "#FB7185", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🛡️ SAFETY BY DESIGN</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {project.disclaimers.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#FB7185", fontSize: 10, marginTop: 1 }}>✓</span>
                  <span style={{ color: "#ccc", fontSize: 11, lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FEATURES */}
      {activeTab === "features" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {project.features.map((f, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: 18, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.border = `1px solid ${c}20`} onMouseLeave={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.05)"}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: c, background: `${c}14`, padding: "2px 7px", borderRadius: 5 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ color: "#e8e8e8", fontWeight: 700, fontSize: 12 }}>{f.title}</div>
                </div>
                <div style={{ color: "#888", fontSize: 11, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TECH & PROCESS */}
      {activeTab === "tech" && (
        <div style={{ animation: "fadeIn 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: c, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>TECH STACK</div>
            {project.techStack.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < project.techStack.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: c, fontSize: 9, fontWeight: 700, minWidth: 60 }}>{t.category}</span>
                <span style={{ color: "#ccc", fontSize: 11 }}>{t.items}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: `${c}1A`, border: `1px solid ${c}30`, color: c, fontSize: 11, fontWeight: 700, textDecoration: "none" }}>🔗 View Live App →</a>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: "#10B981", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>BUILD PROCESS</div>
            {project.process.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: i < project.process.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#555", fontSize: 9, fontWeight: 700, marginTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "#ccc", fontSize: 11, lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SMART COMMUTE DETAIL PAGE ───
function SmartCommuteDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "prototype", label: "Prototype" },
    { id: "metrics", label: "Metrics" },
  ];

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "7px 14px", color: "#aaa", fontSize: 11, fontWeight: 600, cursor: "pointer", marginBottom: 24, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,212,0,0.08)"; e.currentTarget.style.color = "#FFD400"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#aaa"; }}>← Back to Portfolio</button>

      {/* Hero */}
      <div style={{ position: "relative", marginBottom: 32 }}>
        <div style={{ position: "absolute", top: -60, right: -100, width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${project.color}10 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: `${project.color}14`, border: `1px solid ${project.color}20`, marginBottom: 16 }}>
          <span style={{ fontSize: 10, animation: "pulse 2s ease infinite" }}>●</span>
          <span style={{ color: project.color, fontSize: 11, fontWeight: 600 }}>Project {project.number} — {project.company}</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, maxWidth: 650, marginBottom: 12 }}>
          Predictive Smart <span style={{ background: `linear-gradient(135deg, ${project.color}, #FF8C00)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Commute Card</span>
        </h1>
        <p style={{ fontSize: 15, color: "#888", maxWidth: 500, lineHeight: 1.7 }}>{project.tagline}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
          {project.tags.map(t => <span key={t} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "#999", fontWeight: 500 }}>{t}</span>)}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, gap: 2, marginBottom: 28 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "7px 18px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", background: activeTab === t.id ? `${project.color}1A` : "transparent", color: activeTab === t.id ? project.color : "#777" }}>{t.label}</button>
        ))}
      </div>

      {/* Metrics bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 36 }}>
        {project.metrics.map((m, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color: project.color, letterSpacing: -1 }}>{m.value}</div>
            <div style={{ fontSize: 10, color: "#aaa", fontWeight: 600, marginTop: 2 }}>{m.label}</div>
            <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
              <div style={{ color: "#ff6b6b", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>THE PROBLEM</div>
              <p style={{ color: "#ccc", fontSize: 12, lineHeight: 1.7 }}>{project.problem}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
              <div style={{ color: "#4ade80", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>CURRENT → PROPOSED FLOW</div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ color: "#888", fontSize: 9, marginBottom: 4 }}>Before (4 steps)</div>
                <div style={{ display: "flex", gap: 3, alignItems: "center", flexWrap: "wrap" }}>
                  {["Open App", "Enter Dest", "Select Ride", "Book"].map((s, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={{ padding: "2px 6px", background: "rgba(255,107,107,0.08)", borderRadius: 4, fontSize: 9, color: "#aaa" }}>{s}</span>
                      {i < 3 && <span style={{ color: "#555", fontSize: 8 }}>→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ color: "#888", fontSize: 9, marginBottom: 4 }}>After (2 steps)</div>
                <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  {["Open App", "One-Tap Book"].map((s, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <span style={{ padding: "2px 6px", background: "rgba(74,222,128,0.08)", borderRadius: 4, fontSize: 9, color: "#4ade80" }}>{s}</span>
                      {i < 1 && <span style={{ color: "#555", fontSize: 8 }}>→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${project.color}08, ${project.color}04)`, border: `1px solid ${project.color}14`, borderRadius: 16, padding: 22, marginBottom: 24 }}>
            <div style={{ color: project.color, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>🤖 HOW AI ACCELERATED THIS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {[{ s: "01", t: "Idea → Problem Frame", d: "AI sharpened the user problem and validated behavioral assumptions" }, { s: "02", t: "PRD Generation", d: "Full PRD with segments, ML architecture, rollout, and risks" }, { s: "03", t: "Prototype Build", d: "Interactive React prototype with predictive booking flow" }, { s: "04", t: "Stakeholder Pitch", d: "Founder-level outreach with clear value proposition" }].map(item => (
                <div key={item.s} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: project.color, fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{item.s}</div>
                  <div style={{ color: "#e8e8e8", fontWeight: 700, fontSize: 11, marginBottom: 4 }}>{item.t}</div>
                  <div style={{ color: "#888", fontSize: 10, lineHeight: 1.5 }}>{item.d}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: "#aaa", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>FUTURE EXTENSIONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.futureExtensions.map((f, i) => <span key={i} style={{ padding: "5px 10px", borderRadius: 7, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 10, color: "#aaa" }}>{f}</span>)}
            </div>
          </div>
        </div>
      )}

      {/* PROTOTYPE */}
      {activeTab === "prototype" && (
        <div style={{ animation: "fadeIn 0.3s ease", display: "flex", gap: 40, alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ animation: "float 4s ease infinite" }}><MobilePrototype /></div>
          <div style={{ maxWidth: 360, flex: 1 }}>
            <div style={{ color: project.color, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>INTERACTIVE PROTOTYPE</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, letterSpacing: -0.5 }}>Try the Smart Card</h3>
            <p style={{ color: "#888", fontSize: 12, lineHeight: 1.7, marginBottom: 18 }}>Fully interactive prototype. It's 8:45 AM and you're at home — the card surfaces your daily commute to Huda City Centre Metro with a live map view on booking.</p>
            {[{ action: "Book Ride", result: "Live map → loading → driver approaching with animated route" }, { action: "See other options", result: "Modal with Bike / Auto / Mini Cab pricing" }, { action: "Select ride type", result: "Price updates dynamically on the card" }, { action: "Cancel ride", result: "Returns to home screen" }].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 12px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 6 }}>
                <span style={{ color: project.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, marginTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ color: "#e8e8e8", fontSize: 11, fontWeight: 600 }}>{item.action}</div>
                  <div style={{ color: "#666", fontSize: 10, marginTop: 2 }}>{item.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* METRICS */}
      {activeTab === "metrics" && (
        <div style={{ animation: "fadeIn 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: project.color, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>KEY PERFORMANCE INDICATORS</div>
            {project.kpis.map((kpi, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < project.kpis.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#555", fontSize: 9, fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "#ccc", fontSize: 11 }}>{kpi}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 22 }}>
            <div style={{ color: "#4ade80", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>EXPECTED IMPACT</div>
            {project.impact.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 6, alignItems: "center", padding: "7px 0", borderBottom: i < project.impact.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", fontSize: 10 }}>
                <span style={{ color: "#ccc" }}>{row.metric}</span>
                <span style={{ color: "#666", fontFamily: "'JetBrains Mono', monospace", fontSize: 9 }}>{row.before}</span>
                <span style={{ color: "#888" }}>→</span>
                <span style={{ color: "#4ade80", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 9 }}>{row.after} ({row.change})</span>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.08)" }}>
              <div style={{ color: "#4ade80", fontSize: 10, fontWeight: 700, marginBottom: 4 }}>A/B TEST DESIGN</div>
              <div style={{ color: "#888", fontSize: 10, lineHeight: 1.6 }}>Phase 1: 5% eligible users in Bengaluru. Control = standard flow. Test = Smart Card. Primary metric: TTB reduction. Significance: p {"<"} 0.05 over 4 weeks.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DEFAULT EXPORT: Router-wired page ───
export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id) || (id === "smart-commute" ? PROJECTS.find((p) => p.id === "rapido") : null);
  const handleBack = () => navigate("/");

  if (!project) {
    return (
      <main className="min-h-screen bg-bg text-text-1 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-text-3 text-sm mb-4">404 — project not found</p>
          <Link to="/" className="text-accent underline">Back to home</Link>
        </div>
      </main>
    );
  }

  const detailStyle = { minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 24px 80px", maxWidth: 1080, margin: "0 auto" };

  if (id === "schemewise") {
    return <main style={detailStyle}><SchemeWiseDetail project={project} onBack={handleBack} /></main>;
  }
  if (id === "labdecode") {
    return <main style={detailStyle}><LabDecodeDetail project={project} onBack={handleBack} /></main>;
  }
  if (id === "smart-commute" || id === "rapido") {
    return <main style={detailStyle}><SmartCommuteDetail project={project} onBack={handleBack} /></main>;
  }
  // Fallback for smc-stoxkart, nutrabay, or any other project
  return (
    <main style={detailStyle}>
      <button onClick={handleBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(244,237,228,0.04)", border: "1px solid rgba(244,237,228,0.06)", borderRadius: 10, padding: "7px 14px", color: "#a1a1aa", fontSize: 11, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}>← Back to Portfolio</button>
      <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, maxWidth: 650, marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>{project.title}</h1>
      <p style={{ fontSize: 15, color: "#a1a1aa", maxWidth: 540, lineHeight: 1.7, marginBottom: 24 }}>{project.summary}</p>
      <p style={{ fontSize: 13, color: "#71717a" }}>Full case study coming soon.</p>
    </main>
  );
}
