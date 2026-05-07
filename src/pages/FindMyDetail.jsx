import { useNavigate } from "react-router-dom";

/* ─── DATA ─── */
const STATS = [
  { num: "40,000+", label: "Stalking reports", sub: "Filed with Apple, Apr 2021 — Apr 2024" },
  { num: "4-8 hr", label: "Detection lag", sub: "Before victim receives an alert" },
  { num: "30+", label: "Active lawsuits", sub: "Alleging AirTag-enabled stalking" },
  { num: "< 50%", label: "iOS-only households", sub: "Most families are mixed-OS" },
  { num: "1B+", label: "Active devices", sub: "In the Find My network today" },
];

const PILLARS = [
  {
    id: "safety",
    num: "01",
    label: "Safety",
    color: "#c8102e",
    colorSoft: "rgba(200,16,46,0.08)",
    title: "Close the stalking gap — without breaking the magic.",
    lede: "The hardest product problem at Apple right now isn't AI. It's that Find My works exactly as designed — and that's the problem.",
    problem: "Between April 2021 and April 2024, Apple received more than 40,000 stalking-related reports involving its devices. The original notification window was 72 hours. It is now 4 to 8. In domestic-violence contexts, 4 hours is forever.",
    evidence: [
      "Hughes v. Apple (Nov 2024) — 30+ plaintiffs allege AirTag-enabled stalking. Apple's defense hinges on detection improvements that victims say arrived too late.",
      "DULT spec (draft-detecting-unwanted-location-trackers) — Apple co-authored cross-platform detection with Google. The spec is live but has no teeth for non-participating manufacturers.",
      "PoPETs 2023 research — 'Blind My: a privacy-preserving approach' demonstrates that detection accuracy can be maintained without revealing owner identity.",
    ],
    quote: {
      text: '"Pamela Laun got a notification about an AirTag once, on her phone, but didn\'t understand what it meant. It was two months before she discovered the unwanted AirTag in her car."',
      cite: "Hughes v. Apple, U.S. District Court for the Northern District of California, Nov 2024",
    },
    proposals: [
      "Adaptive detection — context-aware thresholds (shorter at night, at unfamiliar locations, when device owner is not nearby)",
      "Rewritten alert UX in partnership with domestic-violence organizations — explain what's happening, not just that something is",
      "Tamper-evident hardware in next AirTag — speaker removal bricks the tracker, sealed assembly",
      "Adopt 'Blind My' protocol at the protocol layer (PoPETs 2023) — privacy-preserving detection without revealing owner identity",
    ],
    metrics: [
      { metric: "Median time-to-alert", target: "4-8 hr → < 60 min" },
      { metric: "Alert comprehension rate", target: "+30 pp (UXR survey)" },
      { metric: "Stalking incidents per M AirTags (YoY)", target: "-40% over 18 months" },
    ],
    mockup: {
      title: "Safety Alert Redesign",
      subtitle: "From cryptic to actionable",
      screens: [
        {
          label: "Current",
          caption: "Generic system alert. No context. No next step.",
          content: [
            { type: "alert", style: "old", text: "AirTag Found Moving With You", subtext: "An AirTag that belongs to someone else has been detected moving with you." },
          ],
        },
        {
          label: "Proposed",
          caption: "Explains the risk. Offers clear actions. Links to help.",
          content: [
            { type: "alert", style: "new", text: "Unknown Tracker Detected", subtext: "A tracking device has been following your location for the past 45 minutes. This may be someone monitoring your movements." },
            { type: "actions", items: ["Play Sound on Tracker", "See Tracker on Map", "Get Help from Support", "Learn About Stalking Resources"] },
          ],
        },
      ],
    },
  },
  {
    id: "reach",
    num: "02",
    label: "Reach",
    color: "#1d6fbf",
    colorSoft: "rgba(29,111,191,0.08)",
    title: "Find My beyond the iPhone wall.",
    lede: "Most households are mixed-OS. Find My is designed as if they aren't. The DULT spec is a floor, not a ceiling.",
    problem: "A family of four with two iPhones, an Android, and a Pixel Watch can't share location in a single app. They use Life360 instead. Apple's network effect works against it: the more mixed the household, the less useful Find My becomes.",
    evidence: [
      "Life360 has 66M MAUs — most of them in mixed-OS households that Find My can't serve.",
      "Google's Find My Device network launched May 2024 with ~1B Android devices. Cross-platform detection works. Cross-platform sharing doesn't.",
      "The DULT spec proves Apple can cooperate at the protocol layer without surrendering the ecosystem. The question is whether they'll extend that to features, not just safety.",
    ],
    quote: {
      text: '"Apple is structurally a hardware-and-services company that builds for its own users. Find My is the rare exception where the network is more valuable the more devices participate — including ones Apple doesn\'t sell."',
      cite: "Strategic analysis — not a quote",
    },
    proposals: [
      "Find My for Android — location sharing only, free, no Apple ID required",
      "Open Find My Network to certified third-party item trackers with full parity",
      "Cross-platform Family Sharing — opt-in, identity-bound, location only",
    ],
    metrics: [
      { metric: "Mixed-OS households using Find My", target: "0 → 25M in Y2" },
      { metric: "Third-party MFi trackers in Find My", target: "+3x over 18 months" },
      { metric: "Cross-platform setup completion", target: "> 70%" },
    ],
    mockup: null,
  },
  {
    id: "care",
    num: "03",
    label: "Care",
    color: "#2d6a4f",
    colorSoft: "rgba(45,106,79,0.08)",
    title: "Location as a relationship layer.",
    lede: "Find My's 'People' tab is a list of dots on a map. For aging parents and the adult children responsible for them, it's not even close.",
    problem: "A son sets up Find My on a parent's iPhone. It stops working three weeks later because of a software update T&C prompt the parent never tapped. No notification to the caregiver. No way to fix it remotely.",
    evidence: [
      "Apple Discussions: 'Set the passcode. Unfortunately, my elderly Father hates a passcode and demands it be taken off his phone.' — documented as a workaround, Aug 2024.",
      "AARP: 53M Americans are informal caregivers. Apple Watch has fall detection but no caregiver dashboard.",
      "Samsung SmartThings and Google Home both offer 'household presence' features. Apple has none.",
    ],
    quote: {
      text: '"Set the passcode. Unfortunately, my elderly Father hates a passcode and demands it be taken off his phone."',
      cite: "A user on Apple Discussions, Aug 2024. This is documented as a workaround.",
    },
    proposals: [
      "Caregiver Mode — mutual, consent-based pairing with delegated permissions",
      "Routine-deviation alerts — on-device, pattern-aware, opt-in (e.g., 'Mom hasn't left home today')",
      "Device-health visibility — battery, location services, last moved — without seeing texts or photos",
    ],
    metrics: [
      { metric: "Caregiver Mode pairings (Y1 pilot)", target: "0 → 2M" },
      { metric: "Setup completion rate", target: "> 80%" },
      { metric: "Senior NPS for the experience", target: "+50" },
    ],
    mockup: {
      title: "Caregiver Companion View",
      subtitle: "What a daughter sees about her parent's device",
      screens: [
        {
          label: "Dashboard",
          caption: "Device health without surveillance. Battery, location services, last check-in.",
          content: [
            { type: "status", items: [
              { label: "Last seen", value: "Home · 12 min ago", status: "ok" },
              { label: "Battery", value: "67%", status: "ok" },
              { label: "Location Services", value: "On", status: "ok" },
              { label: "Routine", value: "Normal pattern", status: "ok" },
            ]},
          ],
        },
        {
          label: "Alert",
          caption: "Pattern-aware, not GPS-stalking. Only fires on meaningful deviations.",
          content: [
            { type: "alert", style: "care", text: "Routine Change", subtext: "Dad hasn't left home today. He usually leaves by 9 AM. This is the first time in 14 days." },
            { type: "actions", items: ["Call Dad", "Check Location", "Dismiss — he mentioned staying in"] },
          ],
        },
      ],
    },
  },
];

const RISKS = [
  { title: "Privacy backlash on Caregiver Mode", severity: "High", mitigation: "Consent-based, mutual pairing. Both parties can revoke anytime. No data leaves device." },
  { title: "Android app cannibalizes iPhone sales", severity: "Medium", mitigation: "Location sharing only — no device finding. The moat is hardware, not the map." },
  { title: "Stalking detection false positives", severity: "High", mitigation: "Adaptive thresholds tune down in known-safe contexts. User feedback loop improves model." },
  { title: "Regulatory exposure in EU (DMA)", severity: "Medium", mitigation: "Proactive cross-platform support reduces antitrust surface area. Better to lead than be compelled." },
];

const ROADMAP = [
  { when: "Q1-Q2", period: "Now", title: "Stop the bleeding on Safety", desc: "Adaptive detection + rewritten alert UX. Software-only fixes. Engagement with DV organizations from week one. Ship tamper-evident hardware spec to AirTag team." },
  { when: "Q3-Q4", period: "This year", title: "Ship Find My for Android", desc: "Location sharing only. Free, no Apple ID required. Apple's privacy stance — available to everyone in your family, not just the ones with iPhones." },
  { when: "Q1-Q2", period: "Next year", title: "Launch Caregiver Mode (pilot)", desc: "One region, mutual-consent pairing. Partner with AARP. Beta in expectations. Go global only after real senior feedback." },
  { when: "Q3", period: "Next year", title: "AirTag 2: tamper-evident + Blind My", desc: "Hardware refresh forces the protocol upgrade. Speaker-removal bricking, sealed assembly. Blind My protocol at the network layer." },
  { when: "Y2+", period: "Long-term", title: "Cross-platform Family Sharing", desc: "The hardest change. Ship last, ship narrow, ship reversible. Identity-bound, opt-in, location only." },
];

/* ─── PHONE MOCKUP COMPONENT ─── */
function PhoneMockup({ screen }) {
  return (
    <div className="fmd-phone">
      <div className="fmd-phone-screen">
        <div className="fmd-phone-status">
          <span>9:41</span>
          <span className="fmd-phone-notch" />
          <span>...</span>
        </div>
        <div className="fmd-phone-body">
          {screen.content.map((block, i) => {
            if (block.type === "alert") {
              return (
                <div key={i} className={`fmd-mock-alert fmd-mock-alert--${block.style}`}>
                  <div className="fmd-mock-alert-title">{block.text}</div>
                  <div className="fmd-mock-alert-sub">{block.subtext}</div>
                </div>
              );
            }
            if (block.type === "actions") {
              return (
                <div key={i} className="fmd-mock-actions">
                  {block.items.map((a, j) => (
                    <div key={j} className="fmd-mock-action">{a}</div>
                  ))}
                </div>
              );
            }
            if (block.type === "status") {
              return (
                <div key={i} className="fmd-mock-status-grid">
                  {block.items.map((s, j) => (
                    <div key={j} className="fmd-mock-status-item">
                      <span className="fmd-mock-status-label">{s.label}</span>
                      <span className="fmd-mock-status-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="fmd-phone-caption">{screen.caption}</div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function FindMyDetail() {
  const navigate = useNavigate();

  return (
    <main className="fmd">
      <button className="fmd-back" onClick={() => navigate("/")}>
        ← Back to Portfolio
      </button>

      {/* ── Hero ── */}
      <header className="fmd-hero">
        <div className="fmd-eyebrow">Product Teardown · 2026</div>
        <h1>
          Find My is Apple's most-loved utility — and its{" "}
          <em>fastest-growing</em> liability.
        </h1>
        <p className="fmd-sub">
          A deep product teardown across three pillars — Safety, Reach, and Care —
          with mockups, metrics frameworks, and an honest rollout roadmap.
          Built entirely from public sources.
        </p>
        <div className="fmd-meta">
          <div><strong>Author</strong>Harshit Mittal</div>
          <div><strong>Format</strong>Public product teardown</div>
          <div><strong>Length</strong>~18 min read</div>
        </div>
      </header>

      {/* ── Thesis ── */}
      <section className="fmd-section">
        <h2>The thesis.</h2>
        <p className="fmd-lede">
          Find My sits at the intersection of Apple's most powerful assets — the
          billion-device mesh network, the privacy brand, and the trust of
          families who rely on it for safety. But the product is stuck in 2019.
          The network grew; the intelligence didn't. Three problems are now
          urgent enough to be strategic.
        </p>
        <div className="fmd-thesis-pillars">
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className="fmd-thesis-card"
              style={{ borderTopColor: p.color }}
            >
              <span className="fmd-thesis-num" style={{ color: p.color }}>
                {p.num}
              </span>
              <h3>{p.label}</h3>
              <p>{p.lede}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="fmd-section">
        <h2>The state of Find My, in five numbers.</h2>
        <div className="fmd-stats">
          {STATS.map((s, i) => (
            <div key={i} className="fmd-stat">
              <div className="fmd-stat-num">{s.num}</div>
              <div className="fmd-stat-label">
                <strong>{s.label}</strong>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pillar Deep Dives ── */}
      {PILLARS.map((p) => (
        <section key={p.id} className="fmd-section fmd-pillar" id={p.id}>
          <span
            className="fmd-pillar-tag"
            style={{ background: p.colorSoft, color: p.color }}
          >
            Pillar {p.num} — {p.label}
          </span>
          <h2>{p.title}</h2>
          <p className="fmd-lede">{p.lede}</p>

          <h3>The problem</h3>
          <p>{p.problem}</p>

          {/* Evidence */}
          <div className="fmd-evidence">
            <h4>Evidence</h4>
            <ul>
              {p.evidence.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>

          <blockquote className="fmd-quote" style={{ borderColor: p.color }}>
            {p.quote.text}
            <cite>— {p.quote.cite}</cite>
          </blockquote>

          <h3>What should ship</h3>
          <ul className="fmd-proposals">
            {p.proposals.map((pr, i) => (
              <li key={i}>
                <span
                  className="fmd-proposal-num"
                  style={{ background: p.color }}
                >
                  {i + 1}
                </span>
                {pr}
              </li>
            ))}
          </ul>

          {/* Mockups */}
          {p.mockup && (
            <div className="fmd-mockup-section">
              <h4>{p.mockup.title}</h4>
              <p className="fmd-mockup-sub">{p.mockup.subtitle}</p>
              <div className="fmd-mockup-row">
                {p.mockup.screens.map((screen, i) => (
                  <div key={i} className="fmd-mockup-col">
                    <div className="fmd-mockup-label" style={{ color: p.color }}>
                      {screen.label}
                    </div>
                    <PhoneMockup screen={screen} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="fmd-metric-panel">
            <h4>How to measure success</h4>
            {p.metrics.map((m, i) => (
              <div key={i} className="fmd-metric-row">
                <span>{m.metric}</span>
                <span className="fmd-metric-target">{m.target}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── Risks ── */}
      <section className="fmd-section">
        <h2>The risks, honestly.</h2>
        <p className="fmd-lede">
          Every proposal above has a failure mode. Here are the ones worth naming.
        </p>
        <div className="fmd-risk-grid">
          {RISKS.map((r, i) => (
            <div key={i} className="fmd-risk-card">
              <div className="fmd-risk-header">
                <h4>{r.title}</h4>
                <span className={`fmd-risk-severity fmd-risk-severity--${r.severity.toLowerCase()}`}>
                  {r.severity}
                </span>
              </div>
              <p>{r.mitigation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="fmd-section">
        <h2>An honest rollout.</h2>
        <p className="fmd-lede">
          A teardown that proposes everything at once is a wishlist, not a
          roadmap. Here's a sequence that respects engineering reality and
          ships the most urgent fix first.
        </p>
        <div className="fmd-roadmap">
          {ROADMAP.map((r, i) => (
            <div key={i} className="fmd-phase">
              <div className="fmd-when">
                {r.when}<br />
                <span className="fmd-when-period">{r.period}</span>
              </div>
              <div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Closing ── */}
      <section className="fmd-section fmd-about">
        <h2>About this teardown.</h2>
        <p>
          This is a public product analysis — not affiliated with, endorsed by,
          or commissioned by Apple Inc. All proposals are built from public
          sources: court filings, IETF drafts, academic papers, support forums,
          and competitive analysis. The opinions are the author's own.
        </p>
        <p>
          The best product thinking happens in public. If the reasoning is
          wrong, it should be falsifiable. If it's right, it should be useful
          to anyone building in this space.
        </p>
        <p className="fmd-disclaimer">
          Harshit Mittal · Senior Product Manager · 2026
        </p>
      </section>
    </main>
  );
}
