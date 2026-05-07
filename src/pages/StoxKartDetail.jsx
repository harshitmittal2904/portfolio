import { useNavigate } from "react-router-dom";

/* ─── DATA ─── */

const FACTSHEET = [
  { label: "Company", value: "SMC Global Securities" },
  { label: "Arm", value: "StoxKart (discount broking)" },
  { label: "Market position", value: "#1 sub-broker network in India" },
  { label: "Core problem", value: "24-72 hr account activation vs. Zerodha's 15 min" },
  { label: "Format", value: "Self-initiated product proposal" },
  { label: "Research depth", value: "3 days, public sources only" },
];

const FUNNEL = [
  { stage: "Landing + Mobile", step: "Step 01", users: 1000, pct: 100, drop: 12 },
  { stage: "PAN + KRA lookup", step: "Step 02", users: 880, pct: 88, drop: 10 },
  { stage: "DigiLocker / Aadhaar", step: "Step 03", users: 616, pct: 62, drop: 28, critical: true },
  { stage: "Bank + Penny Drop", step: "Step 04", users: 578, pct: 58, drop: 6 },
  { stage: "eSign + Activate", step: "Step 05-06", users: 552, pct: 55, drop: 26 },
];

const COMPARISON = [
  { what: "DigiLocker offered, but flow still asks for separate uploads 'just in case'", competitor: "If DigiLocker succeeds, no further uploads. Conditional UI.", cost: "+3 min, ~15% drop" },
  { what: "Hard auto-approve threshold; most apps go to a human ops queue", competitor: "Confidence-scored auto-approval; humans only see edge cases", cost: "Hours-to-days vs minutes" },
  { what: "Sequential API calls — PAN, then Aadhaar, then bank, then video", competitor: "Parallelised where independent (penny drop fires while video uploads)", cost: "+30-90s perceived wait" },
  { what: "Mobile flow is a responsive desktop form", competitor: "Native-feeling stepped flow; one decision per screen", cost: "~20% of total funnel loss is pure UX" },
  { what: "If Aadhaar OTP fails, 'please try again later'", competitor: "Branch fallback, alternate OVD, scheduled callback", cost: "100% of these users go to a competitor" },
  { what: "Video KYC with no preview, no instructions", competitor: "Real-time guidance, 'great, hold for 3 seconds'", cost: "Higher retake rate, drop-off" },
];

const ARCH_STEPS = [
  { num: "01", time: "30s", label: "PAN + Email", api: "PAN/NSDL API", drop: "~12%", dropColor: "green" },
  { num: "02", time: "60s", label: "DigiLocker", api: "UIDAI / DigiLocker", drop: "~28%", dropColor: "red", critical: true },
  { num: "03", time: "5s", label: "Cross-verify", api: "PAN <> Aadhaar match", drop: "invisible", dropColor: "green", invisible: true },
  { num: "04", time: "30s", label: "Bank + Penny", api: "IMPS API", drop: "~9%", dropColor: "green" },
  { num: "05", time: "90s", label: "Video IPV", api: "In-app liveness", drop: "~18%", dropColor: "red", critical: true },
  { num: "06", time: "45s", label: "eSign", api: "Digio / NSDL", drop: "~7%", dropColor: "green" },
];

const AI_LAYER = [
  { tag: "SK COACH - STAGE 02", title: "DigiLocker recovery", desc: "If OTP fails: branch fallback, alternate OVD, scheduled callback" },
  { tag: "SK COACH - STAGE 05", title: "Video KYC live coaching", desc: "Lighting, framing, OTP visibility — real-time, contextual nudges" },
  { tag: "SK REVIEWER - BACKEND", title: "Confidence-scored auto-approval", desc: "Surfaces 1-line summary + recommendation. Reviewer becomes checker, not decider" },
];

const MOCKUPS = [
  {
    num: "01", stage: "Welcome", title: "Set the value upfront",
    caption: "Lead with the 5-minute promise. SMC parent-brand trust signals sit in the background.",
    elements: [
      { type: "brand", text: "stoxkart." },
      { type: "hero-card", headline: "A demat account in 5 min flat.", sub: "From SMC Group · Trusted since 1990", badge: "SmartTrader · Zero brokerage" },
      { type: "features", items: ["Instant activation", "Zero brokerage", "SEBI regulated"] },
      { type: "cta", text: "Get started — free" },
    ],
  },
  {
    num: "02", stage: "PAN + KRA magic", title: "'You're already KYC'd'",
    caption: "Single highest-leverage screen. Most users have CKYC'd before — turn it into delight.",
    elements: [
      { type: "progress", active: 2 },
      { type: "label", text: "Step 02 · PAN + KRA" },
      { type: "input", placeholder: "ABCPM1234D" },
      { type: "match-card", name: "Harshit", dob: "29 Apr 96", address: "Delhi", source: "CVL KRA" },
      { type: "cta", text: "Confirm & continue" },
    ],
  },
  {
    num: "03", stage: "DigiLocker", title: "Government rails do the work",
    caption: "Single tap. No upload, no OCR, no forgery risk. Trust badge front and center.",
    elements: [
      { type: "progress", active: 3 },
      { type: "label", text: "Step 03 · DigiLocker" },
      { type: "gov-card", items: ["Aadhaar (signed)", "Full name", "Photograph", "Address"] },
      { type: "security", text: "We never see your Aadhaar number. SEBI-mandated, encrypted." },
      { type: "cta-alt", text: "Continue with DigiLocker" },
    ],
  },
  {
    num: "04", stage: "Video KYC + AI Coach", title: "The agentic differentiator",
    caption: "Real-time coaching nudge. The one screen defensibly new vs Zerodha.",
    elements: [
      { type: "progress", active: 4 },
      { type: "label", text: "Step 04 · Video KYC" },
      { type: "vkyc", otp: "7429", coach: "Perfect lighting. A bit higher — yes, like that." },
      { type: "checks", items: ["Light", "Match", "Live"] },
      { type: "cta", text: "Capture & continue" },
    ],
  },
  {
    num: "05", stage: "Auto-verification", title: "The 30s wait, transparent",
    caption: "Behind the scenes: PAN-Aadhaar match, IMPS, sanctions, KRA. Visible builds trust.",
    elements: [
      { type: "progress", active: 5 },
      { type: "verify-list", items: [
        { text: "PAN <> Aadhaar", time: "2.1s", done: true },
        { text: "Bank verified", time: "3.8s", done: true },
        { text: "Sanctions check", time: "1.4s", done: true },
        { text: "KRA registry", time: "...", done: false, active: true },
        { text: "eSign", time: "—", done: false },
      ]},
    ],
  },
  {
    num: "06", stage: "Welcome aboard", title: "Activate the next moment",
    caption: "Don't end at 'account opened.' End at 'place your first trade.'",
    elements: [
      { type: "progress", active: 6 },
      { type: "success", id: "SK·482·9134" },
      { type: "next-steps", items: ["Add Rs.500 to start", "Build watchlist", "First trade"] },
      { type: "cta", text: "Add money · Start" },
    ],
  },
];

const OPS_STATS = [
  { num: "81%", label: "Auto-approval rate", desc: "on clean applications, with human review reserved for genuine edge cases", source: "Target · industry benchmark" },
  { num: "11m", label: "Time to active", desc: "down from 24-72 hours via threshold lifts and parallelised API calls", source: "Target · clean applications" },
  { num: "4-5x", label: "Reviewer throughput", desc: "by surfacing AI summaries first, replacing primary review with checking", source: "Target · throughput estimate" },
];

const NINETY_DAY = [
  {
    period: "Days 0-30", phase: "Diagnose",
    title: "Instrument first, change nothing",
    desc: "Instrument the existing eKYC funnel end-to-end in Mixpanel or Amplitude. Pull the last 90 days of failed onboardings, cluster the failure modes, shadow five sub-brokers and five ops agents to map the real workflow vs the documented one. Ship: a single funnel dashboard plus the top three friction hypotheses, ranked by recoverable revenue.",
  },
  {
    period: "Days 30-60", phase: "Ship the Coach",
    title: "Lift thresholds. Kill redundancies. Coach Stage 1.",
    desc: "Lift auto-approval confidence thresholds (a free win — most slowness is conservative defaults, not real risk). Audit every screen against 'if DigiLocker just gave us this data, why are we asking for it again?' Stage 1 of the AI Coach goes live on the highest friction point — likely Aadhaar OTP or Video KYC.",
  },
  {
    period: "Days 60-90", phase: "Scale + partner",
    title: "Roll the Coach. Ship the Reviewer. Partner cockpit MVP.",
    desc: "Roll the Coach to all stages. Ship the Ops KYC Reviewer to deflect ~40% of the manual review queue. Partner cockpit MVP for top 200 sub-brokers — live lead status, AI nudges, near-real-time commission visibility. By day 90, the lead-to-active pipeline goes from 'weeks of friction' to 'hand the phone to the customer.'",
  },
];

const TAKEAWAYS = [
  {
    title: "Acquisition and conversion are one problem.",
    text: "Fixing onboarding without fixing acquisition wastes leads, and fixing acquisition without fixing onboarding has nothing to convert. SMC's shape is that both are broken — the sub-broker channel brings hot leads, then 24-72 hour activation kills intent. A PM with both fixes can move the needle in a single quarter.",
  },
  {
    title: "Domain fluency > domain experience.",
    text: "The closest pattern in my background is the Nutrabay marketplace seller platform — automated KYC, commission engine, NLP compliance, seller scoring. Different regulator, identical architecture. The vocabulary changes; the product problem doesn't.",
  },
  {
    title: "The artefact IS the work sample.",
    text: "For PM roles especially, traditional resumes tell hiring managers almost nothing about how you actually think. A small artefact built specifically for a problem domain tells them everything. The resume becomes corroboration. The proposal becomes the actual evaluation surface.",
  },
];

/* ─── PHONE MOCKUP ─── */
function SkPhone({ mockup }) {
  return (
    <div className="sk-mockup-card">
      <div className="sk-phone">
        <div className="sk-phone-screen">
          <div className="sk-phone-status">
            <span>9:41</span>
            <span>...</span>
          </div>
          <div className="sk-phone-body">
            {mockup.elements.map((el, i) => {
              switch (el.type) {
                case "brand":
                  return <div key={i} className="sk-ph-brand">{el.text}</div>;
                case "hero-card":
                  return (
                    <div key={i} className="sk-ph-hero-card">
                      <div className="sk-ph-badge">{el.badge}</div>
                      <div className="sk-ph-headline">{el.headline}</div>
                      <div className="sk-ph-sub">{el.sub}</div>
                    </div>
                  );
                case "features":
                  return (
                    <div key={i} className="sk-ph-features">
                      {el.items.map((f, j) => (
                        <div key={j} className="sk-ph-feature-row">{f}</div>
                      ))}
                    </div>
                  );
                case "cta":
                  return <div key={i} className="sk-ph-cta">{el.text}</div>;
                case "cta-alt":
                  return <div key={i} className="sk-ph-cta sk-ph-cta--alt">{el.text}</div>;
                case "progress":
                  return (
                    <div key={i} className="sk-ph-progress">
                      {[1, 2, 3, 4, 5, 6].map((s) => (
                        <div
                          key={s}
                          className={`sk-ph-step ${s < el.active ? "done" : ""} ${s === el.active ? "active" : ""}`}
                        />
                      ))}
                    </div>
                  );
                case "label":
                  return <div key={i} className="sk-ph-label">{el.text}</div>;
                case "input":
                  return <div key={i} className="sk-ph-input">{el.placeholder}</div>;
                case "match-card":
                  return (
                    <div key={i} className="sk-ph-match">
                      <div className="sk-ph-match-tag">Found · CKYC matched</div>
                      <div className="sk-ph-match-name">Welcome back, {el.name}</div>
                      <div className="sk-ph-match-row"><span>DOB</span><span>{el.dob}</span></div>
                      <div className="sk-ph-match-row"><span>Address</span><span>{el.address}</span></div>
                      <div className="sk-ph-match-row"><span>Source</span><span>{el.source}</span></div>
                    </div>
                  );
                case "gov-card":
                  return (
                    <div key={i} className="sk-ph-gov">
                      {el.items.map((item, j) => (
                        <div key={j} className="sk-ph-gov-item done">{item}</div>
                      ))}
                    </div>
                  );
                case "security":
                  return <div key={i} className="sk-ph-security">{el.text}</div>;
                case "vkyc":
                  return (
                    <div key={i} className="sk-ph-vkyc">
                      <div className="sk-ph-vkyc-viewfinder">
                        <span className="sk-ph-rec">REC · 00:04</span>
                        <div className="sk-ph-otp">
                          <span className="sk-ph-otp-label">Show OTP</span>
                          <span className="sk-ph-otp-num">{el.otp}</span>
                        </div>
                        <div className="sk-ph-coach">
                          <span className="sk-ph-coach-tag">SK Coach · Live</span>
                          {el.coach}
                        </div>
                      </div>
                    </div>
                  );
                case "checks":
                  return (
                    <div key={i} className="sk-ph-checks">
                      {el.items.map((c, j) => (
                        <div key={j} className="sk-ph-check">{c}</div>
                      ))}
                    </div>
                  );
                case "verify-list":
                  return (
                    <div key={i} className="sk-ph-verify">
                      {el.items.map((v, j) => (
                        <div key={j} className={`sk-ph-verify-row ${v.done ? "done" : ""} ${v.active ? "active" : ""}`}>
                          <span>{v.done ? "✓" : v.active ? "⟳" : "○"} {v.text}</span>
                          <span className="sk-ph-verify-time">{v.time}</span>
                        </div>
                      ))}
                    </div>
                  );
                case "success":
                  return (
                    <div key={i} className="sk-ph-success">
                      <div className="sk-ph-success-check">✓</div>
                      <div className="sk-ph-success-title">You're in.</div>
                      <div className="sk-ph-success-id">{el.id}</div>
                    </div>
                  );
                case "next-steps":
                  return (
                    <div key={i} className="sk-ph-nextsteps">
                      {el.items.map((s, j) => (
                        <div key={j} className="sk-ph-nextstep">
                          <span className="sk-ph-nextstep-num">{j + 1}</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
      <div className="sk-mockup-caption">
        <div className="sk-mockup-stage">{mockup.num} · {mockup.stage}</div>
        <h5>{mockup.title}</h5>
        <p>{mockup.caption}</p>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function StoxKartDetail() {
  const navigate = useNavigate();

  return (
    <main className="sk-page">
      <div className="sk-wrap">
        <button className="sk-back" onClick={() => navigate("/")}>
          ← Back to Portfolio
        </button>

        {/* ── Hero ── */}
        <header className="sk-hero">
          <div className="sk-eyebrow">Product Proposal · 2026</div>
          <h1>
            StoxKart eKYC: closing the <em>15-minute gap</em> with Zerodha.
          </h1>
          <p className="sk-sub">
            A complete product proposal for SMC Global's discount broking arm —
            six mobile screens, an ops cockpit, AI coaching layer, and a
            sequenced 90-day shipping plan. Three days of research, public
            sources only.
          </p>
          <div className="sk-disclaimer-badge">
            Self-initiated PM exercise · Not affiliated with SMC Global Securities
          </div>
        </header>

        {/* ── 01 Brief ── */}
        <section className="sk-section" id="brief">
          <div className="sk-section-eyebrow">/ 01 · The brief</div>
          <h2>SMC has the distribution. It doesn't have the <em>conversion.</em></h2>
          <p>
            SMC Global Securities owns India's largest sub-broker network — over
            2,500 partners who bring in leads through direct, in-person
            relationships. StoxKart is the discount arm. The pitch to
            customers: a Zerodha-class trading experience backed by SMC's
            institutional credibility.
          </p>
          <p>
            The problem is downstream. A lead who walks into an SMC partner
            office at 10 AM doesn't have a trading account by 10:15. They have
            one in 24 to 72 hours — after a form-heavy eKYC flow, a manual
            review queue, and a backend that was built for compliance, not
            speed. In that gap, Zerodha and Groww activate accounts in under
            15 minutes.
          </p>

          <div className="sk-factsheet">
            {FACTSHEET.map((f, i) => (
              <div key={i} className="sk-fact-row">
                <span className="sk-fact-label">{f.label}</span>
                <span className="sk-fact-value">{f.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 02 Research ── */}
        <section className="sk-section" id="research">
          <div className="sk-section-eyebrow">/ 02 · The research</div>
          <h2>Where the funnel <em>bleeds.</em></h2>
          <p>
            Every SEBI-regulated broker runs the same eKYC rails: PAN, Aadhaar
            via DigiLocker, bank verification, Video IPV, eSign. The
            infrastructure is commoditised. The difference between 15 minutes
            and 72 hours is orchestration, UX, and decision thresholds.
          </p>

          {/* Funnel */}
          <div className="sk-funnel">
            <div className="sk-funnel-header">
              <span>Stage</span>
              <span>Conversion</span>
              <span>Drop</span>
            </div>
            {FUNNEL.map((f, i) => (
              <div key={i} className={`sk-funnel-row ${f.critical ? "sk-funnel-row--critical" : ""}`}>
                <div className="sk-funnel-stage">
                  {f.stage}
                  <span className="sk-funnel-step">{f.step}</span>
                </div>
                <div className="sk-funnel-bar-wrap">
                  <div
                    className="sk-funnel-bar"
                    style={{ width: `${f.pct}%` }}
                  >
                    {f.users}
                  </div>
                </div>
                <div className="sk-funnel-conv">{f.pct}%</div>
                <div className="sk-funnel-drop">{f.drop > 0 ? `↓ ${f.drop}` : ""}</div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <h3>Where SMC almost certainly bleeds vs Zerodha</h3>
          <p className="sk-table-note">
            Hypotheses, not accusations — based on public evidence, site
            advertising, and user reviews.
          </p>
          <div className="sk-table-wrap">
            <table className="sk-table">
              <thead>
                <tr>
                  <th>What SMC probably does</th>
                  <th>What Zerodha/Groww do</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((c, i) => (
                  <tr key={i}>
                    <td>{c.what}</td>
                    <td>{c.competitor}</td>
                    <td className="sk-table-cost">{c.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sk-insight">
            <div className="sk-insight-tag">The opportunity, restated</div>
            <p>
              None of these gaps require new infrastructure. They're all{" "}
              <strong>orchestration, UX, and decision-threshold problems.</strong>{" "}
              A good PM with a focused engineering team can move the needle
              materially in a quarter.
            </p>
          </div>
        </section>

        {/* ── 03 Architecture ── */}
        <section className="sk-section" id="architecture">
          <div className="sk-section-eyebrow">/ 03 · Architecture</div>
          <h2>The 7-step <em>reference flow.</em></h2>
          <p>
            This is how a clean Zerodha-class onboarding works — reconstructed
            from public documentation. The infrastructure is commodity.
            The differentiation is the AI Coach layer.
          </p>

          {/* Architecture steps */}
          <div className="sk-arch">
            <div className="sk-arch-label">Customer-facing (~10 min)</div>
            <div className="sk-arch-steps">
              {ARCH_STEPS.map((s, i) => (
                <div key={i} className={`sk-arch-step ${s.critical ? "sk-arch-step--critical" : ""} ${s.invisible ? "sk-arch-step--invisible" : ""}`}>
                  <div className="sk-arch-num">{s.num} · {s.time}{s.critical ? " · CRITICAL" : ""}{s.invisible ? " · INVISIBLE" : ""}</div>
                  <div className="sk-arch-name">{s.label}</div>
                  <div className="sk-arch-api">{s.api}</div>
                  <div className={`sk-arch-drop sk-arch-drop--${s.dropColor}`}>Drop: {s.drop}</div>
                </div>
              ))}
            </div>

            <div className="sk-arch-label" style={{ marginTop: 24 }}>AI Intervention Layer</div>
            <div className="sk-ai-layer">
              {AI_LAYER.map((a, i) => (
                <div key={i} className="sk-ai-card">
                  <div className="sk-ai-tag">{a.tag}</div>
                  <div className="sk-ai-title">{a.title}</div>
                  <div className="sk-ai-desc">{a.desc}</div>
                </div>
              ))}
            </div>

            <div className="sk-insight" style={{ marginTop: 24 }}>
              <div className="sk-insight-tag">What's actually new here</div>
              <p>
                Steps 01-06 and the government rails are the same as Zerodha's.{" "}
                <strong>The differentiator is the AI Intervention Layer</strong> — the
                SK Coach on stages 02 and 05, and the SK Reviewer in backend.
                Each is a small, scoped piece of agentic UX. None require new
                infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* ── 04 Mockups ── */}
        <section className="sk-section sk-section--wide" id="mockups">
          <div className="sk-section-eyebrow">/ 04 · The mockups</div>
          <h2>Six screens. Under <em>five minutes.</em></h2>
          <p>
            The customer-facing artefact: a redesigned onboarding flow native to
            StoxKart's brand language (deep navy + signature yellow). Each screen
            does one thing well.
          </p>
          <div className="sk-mockup-grid">
            {MOCKUPS.map((m, i) => (
              <SkPhone key={i} mockup={m} />
            ))}
          </div>
        </section>

        {/* ── 05 Ops Cockpit ── */}
        <section className="sk-section" id="ops">
          <div className="sk-section-eyebrow">/ 05 · The ops cockpit</div>
          <h2>
            External polish is half the work. The other half is what the{" "}
            <em>ops team</em> uses every day.
          </h2>
          <p>
            The redesign flips the model: the AI does the cross-referencing
            first. It surfaces a one-paragraph summary, a confidence score, and a
            recommendation. The reviewer becomes a checker on the AI's work,
            not a primary decider.
          </p>

          <div className="sk-ops-stats">
            {OPS_STATS.map((s, i) => (
              <div key={i} className="sk-ops-stat">
                <div className="sk-ops-num">{s.num}</div>
                <div className="sk-ops-label">
                  <strong>{s.label}</strong> {s.desc}
                </div>
                <div className="sk-ops-source">{s.source}</div>
              </div>
            ))}
          </div>

          <div className="sk-insight">
            <div className="sk-insight-tag">Honest framing</div>
            <p>
              These targets are <em>illustrative, not measured.</em> They reflect
              what's plausibly recoverable from current StoxKart funnel benchmarks
              within two quarters. The first job is to instrument and find out the
              real numbers.
            </p>
          </div>
        </section>

        {/* ── 06 90-Day Plan ── */}
        <section className="sk-section" id="plan">
          <div className="sk-section-eyebrow">/ 06 · The plan</div>
          <h2>What to ship in <em>90 days.</em></h2>
          <p>
            The principle: ship a measurable win in the first month before
            redesigning anything. Most people rush to mockups; the right answer
            is to instrument first, lift the obvious thresholds, and let the data
            point at the redesign priorities.
          </p>

          <div className="sk-ninety">
            {NINETY_DAY.map((n, i) => (
              <div key={i} className="sk-ninety-item">
                <div className="sk-ninety-period">
                  {n.period}<br />
                  <span>{n.phase}</span>
                </div>
                <div className="sk-ninety-content">
                  <h4>{n.title}</h4>
                  <p>{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 07 Takeaways ── */}
        <section className="sk-section" id="takeaways">
          <div className="sk-section-eyebrow">/ 07 · Takeaways</div>
          <h2>What this exercise <em>actually</em> taught me.</h2>

          {TAKEAWAYS.map((t, i) => (
            <div key={i} className="sk-takeaway">
              <h3>{i + 1}. {t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}

          <blockquote className="sk-pullquote">
            "Don't claim experience you can't defend. Don't pretend insider
            knowledge you don't have. Demonstrate the rigour of your thinking,
            not the depth of your access."
          </blockquote>
        </section>

        {/* ── Closer ── */}
        <section className="sk-closer">
          <p>
            Self-initiated PM exercise · 2026<br />
            Not affiliated with SMC Global Securities
          </p>
          <p className="sk-closer-author">
            Harshit Mittal · Senior Product Manager
          </p>
        </section>
      </div>
    </main>
  );
}
