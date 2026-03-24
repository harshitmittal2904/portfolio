import { useState, useEffect, useRef } from "react";

// ─── PROFILE DATA ───
const PROFILE = {
  name: "Harshit Mittal",
  title: "Senior Product Manager",
  tagline: "I turn ideas into functioning products — with AI as my co-pilot.",
  about:
    "Product manager passionate about AI-augmented product development. I use AI to compress execution — from ideation to PRDs to working prototypes — without outsourcing the thinking.",
  skills: [
    "Product Strategy",
    "AI/ML Products",
    "UX Research",
    "Data-Driven Decisions",
    "Behavioral Design",
    "Growth & Retention",
    "Ride-Hailing / Mobility",
    "0→1 Product Builds",
  ],
  stats: [
    { label: "AI Projects", value: "02", note: "and counting" },
    { label: "Focus", value: "AI PM", note: "product management" },
    { label: "Approach", value: "Idea→Ship", note: "end to end" },
  ],
};

// ─── PROJECT DATA ───
const PROJECTS = [
  {
    id: "smart-commute",
    title: "Predictive Smart Commute Card",
    company: "Rapido / Ride-Hailing",
    number: "#1",
    status: "Concept → PRD → Prototype",
    tagline: "One card. One tap. The app already knows where you're going.",
    cover: "🚀",
    color: "#FFD400",
    tags: ["AI/ML", "UX Design", "Ride-Hailing", "Behavioral Science"],
    problem:
      "High-frequency commuters (15+ rides/month) re-enter predictable destinations every single day. That's unnecessary friction — and a retention leak.",
    metrics: [
      { label: "Target Accuracy", value: "95%", sub: "for daily commuters" },
      { label: "TTB Reduction", value: "40%", sub: "time to booking" },
      { label: "Eligible Users", value: "15+", sub: "rides per month" },
      { label: "Confidence Gate", value: "65%", sub: "minimum threshold" },
    ],
    kpis: [
      "Time To Booking (TTB)",
      "Smart Card Booking Rate",
      "Prediction Accuracy %",
      "30-day Retention Delta",
      "Subscription Conversion Rate",
      "Override Rate",
      "Cancellation Rate",
    ],
    impact: [
      { metric: "Time To Booking", before: "~12 sec", after: "~3 sec", change: "-75%" },
      { metric: "Weekday Retention", before: "62%", after: "78%", change: "+26%" },
      { metric: "Subscription Attach", before: "8%", after: "18%", change: "+125%" },
      { metric: "App Opens to Book", before: "4 taps", after: "1 tap", change: "-75%" },
    ],
    futureExtensions: [
      "Auto-book scheduling",
      "Corporate commuter plans",
      "Metro card integration",
      "Loyalty multiplier",
      "Predictive driver pre-matching",
    ],
  },
  {
    id: "schemewise",
    title: "SchemeWise",
    company: "Fintech / Government",
    number: "#2",
    status: "Live on Vercel",
    tagline: "AI-powered knowledge platform for every government investment scheme in India.",
    cover: "🏛️",
    color: "#FF6B2B",
    tags: ["AI Agent", "Fintech", "React", "Claude API", "Gov Schemes"],
    liveUrl: "https://schemewise-one.vercel.app/",
    problem:
      "India has some of the best government savings schemes — NPS, PPF, EPF, Sukanya Samriddhi, SCSS, APY, and more. Over ₹18 lakh crore sits in these accounts. But information is scattered across outdated portals, withdrawal rules contradict each other, and tax implications change based on your regime. Nobody does government schemes.",
    metrics: [
      { label: "Schemes Covered", value: "10+", sub: "NPS, PPF, EPF & more" },
      { label: "Jargon Terms", value: "50+", sub: "plain English + Hindi" },
      { label: "Guides", value: "8", sub: "withdrawal & troubleshooting" },
      { label: "Signup Required", value: "0", sub: "completely free" },
    ],
    features: [
      { title: "AI Chat Assistant", desc: "Ask any question about any scheme. Powered by Claude Sonnet with suggested question chips." },
      { title: "Scheme Comparison", desc: "Side-by-side comparison of up to 4 schemes — interest rates, lock-in, tax status, eligibility." },
      { title: "Personalized Recs", desc: "Answer questions about age, employment, risk appetite → get ranked scheme recommendations." },
      { title: "Withdrawal Guides", desc: "Step-by-step for EPF, PPF, NPS withdrawal with prerequisites, pro tips, and rejection reasons." },
      { title: "Document Checklists", desc: "Interactive checklists with progress tracking. Never make two trips to the bank." },
      { title: "Jargon Buster", desc: "50+ financial terms explained in plain English with Hindi translations. Filterable by category." },
      { title: "Troubleshooting", desc: "Resolution guides for UAN, PRAN, KYC mismatch, claim rejections, and grievance filing." },
      { title: "Interest Rate Dashboard", desc: "Live-updated rates for all small savings schemes — PPF 7.1%, EPF 8.25%, SSY 8.2%, and more." },
      { title: "Eligibility Checker", desc: "Quick quiz to determine which schemes you qualify for based on age, status, and family." },
    ],
    techStack: [
      { category: "Frontend", items: "React, Tailwind CSS" },
      { category: "AI", items: "Claude Sonnet API with fallback system" },
      { category: "Deploy", items: "Vercel" },
      { category: "Data", items: "Structured JSON, quarterly rate updates" },
      { category: "Design", items: "Cream backgrounds, navy + saffron palette" },
    ],
    process: [
      "Researched common problems with NPS, PPF, EPF — claim rejections, Aadhaar mismatches, tax regime confusion",
      "Analyzed Groww, Zerodha Varsity, ClearTax to understand financial literacy UX patterns",
      "Built comprehensive AI system prompt covering every scheme's rules, rates, and 2025 PFRDA/EPFO changes",
      "Designed keyword-based fallback so the app never errors — pre-written answers for common queries",
      "Covered 10+ schemes: NPS, PPF, EPF, SSY, SCSS, APY, NSC, KVP, POMIS, SGB, NPS Vatsalya",
    ],
  },
];

const RIDE_OPTIONS = [
  { type: "Bike", price: 74, icon: "🏍️", eta: "3 min" },
  { type: "Auto", price: 110, icon: "🛺", eta: "5 min" },
  { type: "Mini Cab", price: 182, icon: "🚗", eta: "7 min" },
];

// ─── ANIMATED MAP (Canvas) ───
function SimulatedMap({ driverMoving }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const driverPosRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    driverPosRef.current = 0;

    const route = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const x = 28 + t * (w - 56) + Math.sin(t * Math.PI * 2.8) * 16;
      const y = h - 36 - t * (h - 72) + Math.cos(t * Math.PI * 3.2) * 14;
      route.push({ x, y });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 18) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 18) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Roads
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      [55, 110, 170, 230].forEach(y => {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      });
      [45, 125, 195].forEach(x => {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      });

      // Buildings
      ctx.fillStyle = "rgba(255,255,255,0.025)";
      [[8,8,22,22],[155,28,28,18],[75,135,18,28],[195,195,22,14],[35,225,14,22],[165,135,18,18]].forEach(([bx,by,bw,bh]) => {
        ctx.fillRect(bx, by, bw, bh);
      });

      // Route dotted
      ctx.strokeStyle = "rgba(255,212,0,0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      route.forEach((p, i) => { i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
      ctx.stroke();
      ctx.setLineDash([]);

      // Active route
      if (driverMoving) {
        const end = Math.floor(driverPosRef.current);
        if (end > 0) {
          ctx.strokeStyle = "#FFD400";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          for (let i = 0; i <= Math.min(end, route.length - 1); i++) {
            i === 0 ? ctx.moveTo(route[i].x, route[i].y) : ctx.lineTo(route[i].x, route[i].y);
          }
          ctx.stroke();
        }
      }

      // Destination
      const dest = route[route.length - 1];
      ctx.fillStyle = "rgba(255,212,0,0.12)";
      ctx.beginPath(); ctx.arc(dest.x, dest.y, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#FFD400";
      ctx.beginPath(); ctx.arc(dest.x, dest.y, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.font = "bold 7px sans-serif";
      ctx.fillStyle = "#FFD400";
      ctx.fillText("METRO", dest.x - 14, dest.y - 15);

      // Home
      const home = route[0];
      ctx.fillStyle = "rgba(74,222,128,0.12)";
      ctx.beginPath(); ctx.arc(home.x, home.y, 11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#4ade80";
      ctx.beginPath(); ctx.arc(home.x, home.y, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.font = "bold 7px sans-serif";
      ctx.fillStyle = "#4ade80";
      ctx.fillText("YOU", home.x - 8, home.y + 19);

      // Driver
      if (driverMoving) {
        const idx = Math.min(Math.floor(driverPosRef.current), route.length - 1);
        const dp = route[idx];
        ctx.fillStyle = "rgba(255,212,0,0.18)";
        ctx.beginPath(); ctx.arc(dp.x, dp.y, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#FFD400";
        ctx.beginPath(); ctx.arc(dp.x, dp.y, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "5px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("●", dp.x, dp.y + 2);
        ctx.textAlign = "start";
        driverPosRef.current += 0.12;
        if (driverPosRef.current > route.length - 1) driverPosRef.current = route.length - 1;
      }

      frameRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [driverMoving]);

  return <canvas ref={canvasRef} width={248} height={300} style={{ width: "100%", height: "100%" }} />;
}

// ─── MOBILE PROTOTYPE ───
function MobilePrototype() {
  const [screen, setScreen] = useState("home");
  const [selectedRide, setSelectedRide] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleBook = () => {
    setScreen("loading");
    setTimeout(() => setScreen("assigned"), 2200);
  };
  const handleCancel = () => { setScreen("home"); setSelectedRide(0); setShowModal(false); };
  const ride = RIDE_OPTIONS[selectedRide];

  return (
    <div style={{ width: 280, height: 560, borderRadius: 32, overflow: "hidden", background: "#111", position: "relative", boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.08)", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 100, height: 22, background: "#111", borderRadius: "0 0 16px 16px", zIndex: 50 }} />
      <div style={{ height: 40, background: "#111", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 20px 4px", fontSize: 10, color: "#fff", fontWeight: 600 }}>
        <span>8:45</span><span style={{ fontSize: 9, letterSpacing: 1 }}>●●●</span>
      </div>
      <div style={{ height: "calc(100% - 40px)", overflow: "hidden", position: "relative" }}>

        {/* HOME */}
        {screen === "home" && (
          <div style={{ height: "100%", background: "linear-gradient(180deg, #1a1a1a, #0d0d0d)", padding: 16, display: "flex", flexDirection: "column", gap: 12, animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#FFD400", fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>RAPIDO</div>
                <div style={{ color: "#888", fontSize: 9, marginTop: 1 }}>📍 Home • Sector 56, Gurgaon</div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FFD400", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>H</div>
            </div>
            <div style={{ background: "#1e1e1e", borderRadius: 16, padding: 16, border: "1px solid rgba(255,212,0,0.15)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #FFD400, #FF8C00)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ background: "rgba(255,212,0,0.15)", color: "#FFD400", fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 4, letterSpacing: 0.5 }}>SMART PREDICTION</span>
                <span style={{ color: "#666", fontSize: 8 }}>95% match</span>
              </div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 2 }}>🚇 Huda City Centre Metro</div>
              <div style={{ color: "#aaa", fontSize: 10, marginBottom: 12 }}>{ride.eta} away • {ride.icon} {ride.type} (Preferred)</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ color: "#FFD400", fontSize: 22, fontWeight: 800 }}>₹{ride.price}</div>
                <div style={{ color: "#666", fontSize: 9, background: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: 8 }}>💰 Lowest today</div>
              </div>
              <button onClick={handleBook} style={{ width: "100%", padding: "12px 0", background: "#FFD400", color: "#111", fontWeight: 800, fontSize: 13, border: "none", borderRadius: 12, cursor: "pointer", transition: "transform 0.1s" }} onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>Book Ride →</button>
              <div onClick={() => setShowModal(true)} style={{ textAlign: "center", color: "#888", fontSize: 10, marginTop: 8, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }}>See other ride options</div>
            </div>
            <div style={{ background: "#1e1e1e", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color: "#666", fontSize: 12 }}>🔍</span>
              <span style={{ color: "#555", fontSize: 11 }}>Where to?</span>
            </div>
            <div style={{ color: "#555", fontSize: 9, fontWeight: 600, marginTop: 4, letterSpacing: 0.5 }}>RECENT</div>
            {["Cyber Hub, DLF Phase 2", "MG Road Metro Station"].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#555", fontSize: 10 }}>⏱️</span>
                <span style={{ color: "#aaa", fontSize: 10 }}>{p}</span>
              </div>
            ))}
            {showModal && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#1a1a1a", borderRadius: "20px 20px 0 0", padding: 20, border: "1px solid rgba(255,255,255,0.08)", animation: "slideUp 0.25s ease", zIndex: 10 }}>
                <div style={{ width: 32, height: 3, background: "#444", borderRadius: 2, margin: "0 auto 14px" }} />
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Choose ride type</div>
                {RIDE_OPTIONS.map((r, i) => (
                  <div key={i} onClick={() => { setSelectedRide(i); setShowModal(false); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 12, marginBottom: 6, cursor: "pointer", background: selectedRide === i ? "rgba(255,212,0,0.1)" : "rgba(255,255,255,0.03)", border: selectedRide === i ? "1px solid rgba(255,212,0,0.3)" : "1px solid transparent", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{r.icon}</span>
                      <div><div style={{ color: "#fff", fontWeight: 600, fontSize: 12 }}>{r.type}</div><div style={{ color: "#888", fontSize: 9 }}>{r.eta}</div></div>
                    </div>
                    <div style={{ color: "#FFD400", fontWeight: 800, fontSize: 14 }}>₹{r.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LOADING WITH MAP */}
        {screen === "loading" && (
          <div style={{ height: "100%", background: "#111", display: "flex", flexDirection: "column", animation: "fadeIn 0.3s ease" }}>
            <div style={{ flex: 1, position: "relative", background: "#0d0d0d" }}>
              <SimulatedMap driverMoving={false} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)", gap: 10 }}>
                <div style={{ width: 40, height: 40, border: "3px solid #333", borderTopColor: "#FFD400", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 12 }}>Finding your ride...</div>
              </div>
            </div>
            <div style={{ padding: "14px 16px", background: "#1a1a1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>🚇 Huda City Centre Metro</div>
                  <div style={{ color: "#888", fontSize: 9, marginTop: 2 }}>{ride.icon} {ride.type} • {ride.eta}</div>
                </div>
                <div style={{ color: "#FFD400", fontWeight: 800, fontSize: 16 }}>₹{ride.price}</div>
              </div>
            </div>
          </div>
        )}

        {/* DRIVER ASSIGNED WITH MAP */}
        {screen === "assigned" && (
          <div style={{ height: "100%", background: "#111", display: "flex", flexDirection: "column", animation: "fadeIn 0.4s ease" }}>
            <div style={{ flex: 1, position: "relative", background: "#0d0d0d" }}>
              <SimulatedMap driverMoving={true} />
              <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(255,212,0,0.2)" }}>
                <span style={{ color: "#FFD400", fontSize: 10, fontWeight: 700 }}>Driver arriving in 2 min</span>
              </div>
            </div>
            <div style={{ padding: "14px 16px", background: "#1a1a1a", borderTop: "1px solid rgba(255,212,0,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FFD400", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>R</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>Rajesh K.</div>
                    <div style={{ color: "#888", fontSize: 9 }}>⭐ 4.8 • DL 4S AB 1234</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#FFD400", fontWeight: 800, fontSize: 15 }}>₹{ride.price}</div>
                  <div style={{ color: "#888", fontSize: 8 }}>{ride.icon} {ride.type}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleCancel} style={{ flex: 1, padding: "9px 0", background: "transparent", color: "#ff4444", border: "1px solid rgba(255,68,68,0.25)", borderRadius: 10, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button style={{ flex: 2, padding: "9px 0", background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>📞 Call Driver</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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

// ─── PROJECT DETAIL PAGE ───
function ProjectDetail({ project, onBack }) {
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

// ─── MAIN APP ───
export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 50);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const openProject = (p) => { setSelectedProject(p); setCurrentView("project"); containerRef.current && (containerRef.current.scrollTop = 0); };
  const goHome = () => { setCurrentView("home"); setSelectedProject(null); containerRef.current && (containerRef.current.scrollTop = 0); };

  return (
    <div style={{ minHeight: "100vh", background: "#08080a", color: "#e8e8e8", fontFamily: "'DM Sans', 'Manrope', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,300&family=JetBrains+Mono:wght@400;600&family=Sora:wght@300;400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
      `}</style>

      {/* NAV */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "12px 24px", display: "flex", justifyContent: "center", background: scrolled ? "rgba(8,8,10,0.85)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent", transition: "all 0.3s ease" }}>
        <div style={{ width: "100%", maxWidth: 1080, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #FFD400, #FF8C00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: "#000", fontFamily: "'JetBrains Mono', monospace" }}>HM</div>
            <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: -0.3 }}>Harshit Mittal</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[{ label: "LinkedIn", url: "https://www.linkedin.com/in/harshitmittal2904" }, { label: "GitHub", url: "https://github.com/harshitmittal2904" }].map(l => <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: "#666", fontSize: 11, fontWeight: 500, cursor: "pointer", transition: "color 0.2s", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#FFD400"} onMouseLeave={e => e.target.style.color = "#666"}>{l.label}</a>)}
          </div>
        </div>
      </div>

      <div ref={containerRef} style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: "100vh", overflowY: "auto", paddingTop: 56 }}>

        {/* ═══ HOME ═══ */}
        {currentView === "home" && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            {/* HERO */}
            <section style={{ padding: "80px 0 60px", position: "relative", display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "absolute", top: -40, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,212,0,0.05) 0%, transparent 60%)", filter: "blur(80px)", pointerEvents: "none" }} />
              <div style={{ flex: 1, minWidth: 320 }}>
                <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 16 }}>
                  Harshit<br />
                  <span style={{ background: "linear-gradient(135deg, #FFD400, #FF8C00, #FFD400)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientShift 4s ease infinite" }}>Mittal</span>
                </h1>
                <p style={{ fontSize: 18, color: "#aaa", fontWeight: 300, lineHeight: 1.6, maxWidth: 480, marginBottom: 8 }}>{PROFILE.title}</p>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 440, marginBottom: 28 }}>{PROFILE.tagline}</p>
                <div style={{ display: "flex", gap: 20 }}>
                  {PROFILE.stats.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 800, color: "#FFD400", letterSpacing: -0.5 }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: "#888", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </section>

            {/* ABOUT */}
            <section style={{ padding: "20px 0 40px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <p style={{ fontSize: 14, color: "#999", lineHeight: 1.8, maxWidth: 640, marginBottom: 20 }}>{PROFILE.about}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {PROFILE.skills.map(s => <span key={s} style={{ padding: "5px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontSize: 11, color: "#aaa", fontWeight: 500 }}>{s}</span>)}
              </div>
            </section>

            {/* PROJECTS */}
            <section style={{ padding: "20px 0 80px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <div style={{ color: "#FFD400", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6 }}>AI PRODUCT PORTFOLIO</div>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>Projects</h2>
                </div>
                <div style={{ color: "#555", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{PROJECTS.length} projects</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                {PROJECTS.map(project => (
                  <div key={project.id} onClick={() => openProject(project)} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, cursor: "pointer", transition: "all 0.3s ease", overflow: "hidden" }} onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${project.color}30`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 60px ${project.color}10`; }} onMouseLeave={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ height: 100, background: `linear-gradient(135deg, ${project.color}0A, ${project.color}04)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${project.color}06 1px, transparent 1px), linear-gradient(90deg, ${project.color}06 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
                      <span style={{ fontSize: 40, position: "relative" }}>{project.cover}</span>
                      <div style={{ position: "absolute", top: 12, right: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: project.color, opacity: 0.6 }}>{project.number}</div>
                    </div>
                    <div style={{ padding: "18px 22px 22px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ padding: "2px 8px", borderRadius: 5, background: `${project.color}12`, color: project.color, fontSize: 9, fontWeight: 700 }}>{project.company}</span>
                        <span style={{ color: "#555", fontSize: 9 }}>{project.status}</span>
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>{project.title}</h3>
                      <p style={{ color: "#888", fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>{project.tagline}</p>
                      <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                        {project.metrics.slice(0, 3).map((m, i) => (
                          <div key={i}>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 800, color: project.color }}>{m.value}</div>
                            <div style={{ fontSize: 9, color: "#666" }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {project.tags.slice(0, 3).map(t => <span key={t} style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", fontSize: 9, color: "#888" }}>{t}</span>)}
                        </div>
                        <span style={{ color: project.color, fontSize: 11, fontWeight: 700 }}>View →</span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Coming soon */}
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 10 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#555" }}>+</div>
                  <div style={{ color: "#555", fontSize: 13, fontWeight: 600 }}>Project #3</div>
                  <div style={{ color: "#444", fontSize: 11 }}>Coming soon</div>
                </div>
              </div>
            </section>

            <footer style={{ padding: "24px 0 40px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
              <div style={{ color: "#444", fontSize: 11 }}>Built with AI • Harshit Mittal • 2026 • <a href="mailto:harshitmittal@zohomail.in" style={{ color: "#666", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#FFD400"} onMouseLeave={e => e.target.style.color = "#666"}>harshitmittal@zohomail.in</a></div>
            </footer>
          </div>
        )}

        {/* ═══ PROJECT DETAIL ═══ */}
        {currentView === "project" && selectedProject && (
          <div style={{ padding: "24px 0 80px" }}>
            {selectedProject.id === "schemewise"
              ? <SchemeWiseDetail project={selectedProject} onBack={goHome} />
              : <ProjectDetail project={selectedProject} onBack={goHome} />
            }
          </div>
        )}
      </div>
    </div>
  );
}
