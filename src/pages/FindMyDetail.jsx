import { useNavigate } from "react-router-dom";

/* ─── DATA ─── */
const STATS = [
  { num: "40,000+", label: "Stalking reports", sub: "Filed with Apple between Apr 2021 and Apr 2024" },
  { num: "4-8 hr", label: "Detection lag", sub: "Typical delay before a stalking victim receives the alert" },
  { num: "~15 min", label: "Key rotation", sub: "How often the public key broadcast by an offline device changes" },
  { num: "30+", label: "Active lawsuits", sub: "Individual filings against Apple alleging AirTag-enabled stalking" },
  { num: "< 50%", label: "Households on iOS only", sub: "Most families are mixed-OS. Find My assumes they aren't." },
];

const PILLARS = [
  {
    id: "safety",
    num: "01",
    label: "Safety",
    color: "#c8102e",
    colorSoft: "#fdf2f4",
    title: "Close the stalking gap, without breaking the magic.",
    lede: "The hardest product problem at Apple right now isn't AI. It's that Find My works exactly as designed — and that's the problem. Any product capable of locating a $29 disc anywhere on Earth is, by definition, capable of locating a person. The question isn't whether to mitigate. It's how aggressively, how fast, and at what cost to ordinary use.",
    problem: 'Between April 2021 and April 2024, Apple received more than 40,000 stalking-related reports involving its devices. Internal documents disclosed in litigation acknowledge that Apple\'s safeguards were designed to "deter as opposed to prevent malicious use." The original notification window was 72 hours. It is now 4 to 8. In domestic-violence contexts, 4 hours is forever.',
    failures: [
      { title: "Latency", text: "The detection algorithm is conservative on purpose — it has to avoid false positives in scenarios like riding the subway with a stranger's tracker. The cost is a multi-hour window during which a victim is unaware they're being followed." },
      { title: "Comprehension", text: "Even when alerts fire, they read as ambiguous. A user who has never owned an AirTag receives a notification about an 'item moving with you' and has no schema for what that means." },
      { title: "Hardware tampering", text: "AirTags are sold with speakers removed on eBay. Researchers have demonstrated stealth trackers that emulate Find My beacons but rotate keys faster than the protocol expects, defeating Item Safety Alerts entirely." },
    ],
    quote: {
      text: '"Pamela Laun got a notification about an AirTag once, on her phone, but didn\'t understand what it meant, having never purchased an AirTag herself. It was two months before she discovered the unwanted AirTag in her car."',
      cite: "Hughes v. Apple, summarized by Judge Vince Chhabria, U.S. District Court for the Northern District of California, Nov 2024",
    },
    proposals: [
      { title: "Adaptive detection.", text: "The 4-8 hour window is a one-size-fits-all heuristic. It should be context-aware: shorter at night, shorter when the user is moving away from known locations, shorter when patterns match known stalking signatures. On-device ML, not cloud." },
      { title: "Rewritten alert UX, in partnership with domestic-violence organizations.", text: "The first thing a victim sees should not be '[Item] Found Moving With You.' It should be a calm, plain-language explanation of what's happening, what it means, and what to do." },
      { title: "Tamper-evident hardware in the next AirTag.", text: "Speaker removal should brick the tracker, not silence it. The sound chamber and battery contact can be re-engineered as a single tamper-detected assembly." },
      { title: "Adopt 'Blind My' or equivalent at the protocol layer.", text: "The PoPETs 2023 paper shows how to bind beacon keys to specific time intervals and validate them server-side, defeating the rotating-stealth-tracker attack permanently." },
    ],
    mockup: {
      title: "Mockup 01 — The redesigned unwanted-tracker alert",
      annotations: [
        { title: "Plain language, not product language.", text: '"Someone may be tracking your location" replaces "[Item] Found Moving With You." The threat is named.' },
        { title: "Adaptive trigger.", text: "30 minutes, not 4 hours — because the user has moved to an unusual location with the tracker still attached. On-device pattern detection." },
        { title: "Action, not information.", text: 'The primary CTA is "call a trusted contact," not "view tracker details." Designed in partnership with domestic-violence organizations.' },
        { title: '"What does this mean?"', text: "A persistent fallback for users who have no schema for what's happening. Plain explanation, no jargon." },
      ],
    },
    metrics: [
      { metric: "Median time-to-alert for confirmed unwanted tracking", target: "4-8 hr → < 60 min" },
      { metric: "Alert comprehension (qual + UXR survey, n=500)", target: "Baseline → +30 pp" },
      { metric: "Reported stalking incidents per million AirTags shipped (YoY)", target: "-40% over 18 months" },
      { metric: "Tampered-AirTag listings on secondary markets", target: "Track via partner crawl, target ↓ 80%" },
      { metric: "NPS among Find My users who never receive a stalking alert", target: "Hold or improve — the 99% case" },
    ],
    cost: "Faster alerts will produce more false positives. The right response is not to keep the threshold conservative — it's to invest in recovery from false positives: a one-tap 'this is mine / this is a neighbor's / I've already checked' that the system actually learns from. Apple has the on-device ML budget. Whether we choose to spend it here is a values question, not a technical one.",
  },
  {
    id: "reach",
    num: "02",
    label: "Reach",
    color: "#1d6fbf",
    colorSoft: "#f0f6fc",
    title: "Find My beyond the iPhone wall.",
    lede: "Most households are mixed-OS. Find My is designed as if they aren't. The DULT specification — Apple and Google's joint Detecting Unwanted Location Trackers standard — is a floor, not a ceiling.",
    problem: "Apple and Google co-authored DULT in May 2024 to ensure that an iPhone can detect a Tile and an Android can detect an AirTag. That's good. But it solves only one problem: unwanted tracking. It does not solve the more common problem: a family of four with two iPhones, an Android, and a Pixel Watch can't share location in a single app. They use Life360 instead.",
    failures: [
      { title: "Detection without sharing", text: "An Android user can be alerted to an unwanted AirTag, but cannot share their location to a family member's iPhone using Find My." },
      { title: "Item tracking without item ownership", text: "An iPhone can locate a Tile via DULT in adversarial mode, but cannot help a Tile owner find their Tile. The network is gated by manufacturer." },
      { title: "Family Sharing is iOS-only", text: "A parent on an iPhone cannot put a teenager with a Pixel into Family Sharing. Period." },
    ],
    quote: {
      text: '"Apple is structurally a hardware-and-services company that builds for its own users. Find My is the rare exception where the network is more valuable the more devices participate — including ones Apple doesn\'t sell."',
      cite: "Strategic analysis, not a quote",
    },
    proposals: [
      { title: "Find My for Android, location sharing only.", text: "A free app — narrow scope, no item tracking, no AirTag pairing — that lets an Android user share their location with iPhone family members and vice versa. End-to-end encrypted." },
      { title: "Open the Find My Network to certified third-party item trackers — for their owners.", text: "A Chipolo owner using the Find My app should have the same experience an AirTag owner does. The crowd-sourced network gets stronger with every device." },
      { title: "Cross-platform Family Sharing — opt-in, identity-bound.", text: "A Family Sharing group should be able to include up to two non-Apple participants via a federated identity model: invite by email, verify by SMS, share location only." },
    ],
    mockup: null,
    metrics: [
      { metric: "Mixed-OS households using Find My location sharing", target: "0 → 25M in Y2" },
      { metric: "Life360 weekly active users converted to Find My (US)", target: "Track via consumer panel" },
      { metric: "Third-party MFi trackers actively used in Find My", target: "+3x over 18 months" },
      { metric: "Cross-platform Family Sharing setup completion rate", target: "> 70%" },
      { metric: "Privacy incidents tied to cross-platform features", target: "Zero tolerance — kill switch ready" },
    ],
    cost: "Shipping software for Android dilutes the iPhone moat. The mitigation is data: show that Family Sharing households with at least one Android member churn faster from iCloud, not slower. Life360 has 80M+ MAU and a worse privacy story than what Apple could ship in six months.",
  },
  {
    id: "care",
    num: "03",
    label: "Care",
    color: "#2d6a4f",
    colorSoft: "#f0f6f3",
    title: "Location as a relationship layer.",
    lede: 'Find My\'s "People" tab is, fundamentally, a list of dots on a map. For most families, that\'s enough. For aging parents, dependents with cognitive impairments, and the adult children responsible for them, it\'s not even close.',
    problem: "The Apple Discussions forums are full of one specific story: a son or daughter setting up Find My on a parent's iPhone, having it work, having it stop working three weeks later because of a software update Terms-of-Service prompt the parent never tapped, or a passcode requirement the parent disabled because they 'hate it.'",
    failures: [
      { title: "Setup that doesn't survive", text: "A parent's Find My should not break because of a routine iOS update T&C prompt. There needs to be a caregiver-managed mode where the responsible adult child can complete delegated permissions." },
      { title: "Awareness, not surveillance", text: "A child of an aging parent doesn't want to watch a dot on a map all day. They want to be told only when something is unusual — Mom usually leaves at 9am; today she didn't, and it's 11am." },
      { title: "Graceful degradation", text: "When a senior's iPhone is in a state where Find My would fail (low battery, off, location services disabled), the caregiver should know that, not just see the absence of a dot." },
    ],
    quote: {
      text: '"Set the passcode. Unfortunately, my elderly Father hates a passcode and demands it be taken off his phone. Fortunately, if you remove passcode after successfully location sharing set to indefinite, it does not break the current established sharing."',
      cite: "A user on Apple Discussions, Aug 2024. This is documented as a workaround. It should not need to be one.",
    },
    proposals: [
      { title: "Caregiver Mode — a mutual, consent-based pairing.", text: "A senior pairs with a designated caregiver via a one-time, in-person, double-confirm flow. The caregiver gets the ability to: view location, receive routine-deviation alerts, see device-health status, and complete certain T&C prompts on the senior's behalf. Revocable from either side." },
      { title: "Routine-deviation alerts, on-device.", text: 'Learn the senior\'s daily rhythm and notify the caregiver only when today differs meaningfully. No raw location data leaves the device. The alert is "Mom hasn\'t left home today, and she usually does by 10am."' },
      { title: "Device-health visibility, scoped.", text: 'The caregiver should see "Battery low," "Location services off," "Phone hasn\'t moved in 6 hours" — without seeing texts, photos, or apps.' },
    ],
    mockup: {
      title: "Mockup 02 — The Caregiver Mode companion view",
      annotations: [
        { title: "Routine-deviation, not raw location.", text: "The caregiver isn't watching a map all day. The first thing they see is whether today is unusual — and only that." },
        { title: "Device health surfaced honestly.", text: 'Battery, last-moved, services status. The caregiver knows when "I can\'t see her" means "she\'s home" vs "her phone died."' },
        { title: "Approximate, not precise.", text: '"Home · 1.2km away" instead of an exact pin when the senior is at a known location. Reduces both privacy intrusion and caregiver anxiety.' },
        { title: "Both-sided control.", text: "Every field is something Mom explicitly opted into, can see, and can revoke. The caregiver's view is a mirror of what Mom granted — never more." },
      ],
    },
    metrics: [
      { metric: "Caregiver Mode pairings (Y1, US/India/UK pilot)", target: "0 → 2M" },
      { metric: "Setup completion rate (start → fully paired)", target: "> 80%" },
      { metric: "Routine-deviation alerts dismissed as 'not useful'", target: "< 15%" },
      { metric: "Senior NPS for the experience (their side)", target: "+50" },
      { metric: "Off-platform reductions in family-coordination tools", target: 'Track: WhatsApp "where are you" messages' },
    ],
    cost: "This is the most paternalism-adjacent feature in the teardown. The framing matters: this is not a surveillance product. It's a relationship product, and seniors are participants, not objects. Ship in partnership with AARP, accessibility advocates, and with a willingness to kill it if usability testing shows it's being weaponized.",
  },
];

const RISKS = [
  { title: "Regulatory drag", text: "Anything cross-platform invites scrutiny under the EU DMA. Anything caregiver-adjacent invites scrutiny under HIPAA-equivalents. Build with a regulatory affairs partner from kickoff, not from launch." },
  { title: "False-positive blowback", text: "Faster stalking alerts = more false positives. Without a great recovery flow, users will turn alerts off entirely. This is the single biggest UX risk in the Safety pillar." },
  { title: "Caregiver weaponization", text: "Domestic abusers may attempt to use Caregiver Mode against the people they're abusing. The mutual-visibility-and-revocation design must hold under adversarial conditions." },
  { title: "Android cannibalization narrative", text: "Internal pushback on shipping for Android will be real. The mitigation is data: show that mixed-device households churn faster from iCloud, not slower." },
];

const ROADMAP = [
  { when: "Q1-Q2 — Now", title: "Stop the bleeding on Safety", desc: "Adaptive detection threshold and rewritten alert UX, shipped in a point release of iOS. No new hardware, no new protocol — software-only fixes. Engagement with domestic-violence organizations starts in week one." },
  { when: "Q3-Q4", title: "Ship Find My for Android (location sharing only)", desc: "Narrow scope: location sharing with Find My users, and unwanted-tracker scanning. Free, no Apple ID required. Apple's privacy stance applies to everyone in your family." },
  { when: "Q1-Q2 next year", title: "Launch Caregiver Mode (regional pilot)", desc: "One region, one OS version, two-week mutual-consent pairing flow. Partner with AARP US. Treat it as a beta. Go global only after seeing real usage data from seniors themselves." },
  { when: "Q3 next year", title: "AirTag 2: tamper-evident + Blind My protocol", desc: "The hardware refresh forces the protocol upgrade. Speaker-removal bricking, sealed assembly, and server-side beacon-key validation." },
  { when: "Y2+", title: "Cross-platform Family Sharing (location only)", desc: "The hardest change. Ship last, ship narrow, ship reversible." },
];

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
        <div className="fmd-eyebrow">A product teardown · 2026</div>
        <h1>
          Find My is Apple's most-loved utility — and its{" "}
          <em>fastest-growing</em> liability.
        </h1>
        <p className="fmd-sub">
          Here's how to evolve it from "find your stuff" into a trust platform —
          across three pillars and one honest roadmap.
        </p>
        <div className="fmd-meta">
          <div><strong>Author</strong>Harshit Mittal</div>
          <div><strong>Format</strong>Public product teardown</div>
          <div><strong>Length</strong>~18 min read</div>
          <div><strong>Status</strong>Independent. Honest.</div>
        </div>
      </header>

      {/* ── Thesis ── */}
      <section className="fmd-section">
        <h2>The thesis, in one paragraph.</h2>
        <p className="fmd-lede">
          Find My is the rare Apple product that does the impossible quietly —
          billions of devices forming a privacy-preserving location mesh,
          end-to-end encrypted, that just works. But the same architecture that
          makes it magical for owners makes it dangerous for non-owners. The next
          chapter of Find My is not better maps or prettier pins. It's earning
          trust at three frontiers at once: <strong>safety</strong>,{" "}
          <strong>reach</strong>, and <strong>care</strong>.
        </p>

        <h3>The state of Find My, in five numbers</h3>
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
        <p className="fmd-source-note">
          Sources: U.S. District Court filings (Hughes v. Apple, 2022-2026);
          Apple Platform Security Guide; "Blind My" protocol analysis (PoPETs 2023).
        </p>

        <h3>What this teardown argues</h3>
        <div className="fmd-thesis-pillars">
          {PILLARS.map((p) => (
            <div key={p.id} className="fmd-pillar-card" data-pillar={p.id}>
              <span className="fmd-pillar-card-tag">{`Pillar ${p.num}`}</span>
              <h3>{p.label}</h3>
              <p>{p.lede.split(".")[0]}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pillar Deep Dives ── */}
      {PILLARS.map((p) => (
        <section key={p.id} className="fmd-section fmd-pillar" id={p.id} data-pillar={p.id}>
          <div className="fmd-pillar-header">
            <span className="fmd-pillar-label">{`Pillar ${p.num} — ${p.label}`}</span>
            <h2>{p.title}</h2>
          </div>
          <p className="fmd-lede">{p.lede}</p>

          <h3>The problem, plainly stated</h3>
          <p>{p.problem}</p>

          <blockquote className="fmd-evidence">
            {p.quote.text}
            <cite>— {p.quote.cite}</cite>
          </blockquote>

          {/* Failure modes */}
          {p.failures && (
            <>
              <h3>{p.id === "reach" ? "Three asymmetries to fix" : p.id === "care" ? "Three real needs, none of them met today" : "Three failure modes, three causes"}</h3>
              {p.failures.map((f, i) => (
                <p key={i}><strong>{p.id === "reach" ? `Asymmetry ${i+1}: ${f.title}.` : p.id === "care" ? `Need ${i+1}: ${f.title}.` : `Failure ${i+1}: ${f.title}.`}</strong> {f.text}</p>
              ))}
            </>
          )}

          <h3>What should ship</h3>
          {p.proposals.map((pr, i) => (
            <p key={i}><strong>{i + 1}. {pr.title}</strong> {pr.text}</p>
          ))}

          {/* Mockup */}
          {p.mockup && (
            <div className="fmd-mockup-wrap">
              <h4>{p.mockup.title}</h4>
              <div className="fmd-annotated">
                <div className="fmd-phone">
                  <div className="fmd-phone-notch" />
                  <div className="fmd-phone-screen">
                    <div className="fmd-phone-time">
                      <span>9:41</span>
                      <span>●●● ▾</span>
                    </div>
                    {p.id === "safety" ? (
                      <div className="fmd-alert-screen">
                        <div className="fmd-alert-icon">⚠</div>
                        <h5>Someone may be tracking your location.</h5>
                        <p className="fmd-alert-body">
                          An unknown tracker has been moving with you for over 30
                          minutes — including to a place you don't usually go.
                          This is unusual.
                        </p>
                        <div className="fmd-alert-map" />
                        <div className="fmd-alert-cta">Call a trusted contact</div>
                        <div className="fmd-alert-cta-2">Make the tracker beep</div>
                        <div className="fmd-alert-cta-3">More options · What does this mean?</div>
                      </div>
                    ) : (
                      <div className="fmd-care-screen">
                        <div className="fmd-care-h">
                          <h5>Mom</h5>
                          <div className="fmd-care-sub">Caregiver Mode · Updated 6 min ago</div>
                        </div>
                        <div className="fmd-care-banner">
                          <strong>Heads up — different from her usual day</strong>
                          Mom usually leaves home by 10:00. It's 11:24 and she's still home. Battery is at 18%.
                        </div>
                        <div className="fmd-care-status">
                          <div className="fmd-care-person">
                            <div className="fmd-care-avatar">M</div>
                            <div>
                              <div className="fmd-care-name">Home</div>
                              <div className="fmd-care-where">42 Connaught Place · 1.2km away</div>
                            </div>
                          </div>
                          <div className="fmd-care-row"><strong>Battery</strong><span>18% (low)</span></div>
                          <div className="fmd-care-row"><strong>Last moved</strong><span>9:14 AM</span></div>
                          <div className="fmd-care-row"><strong>Location services</strong><span className="fmd-care-ok">On</span></div>
                          <div className="fmd-care-row"><strong>Find My</strong><span className="fmd-care-ok">Active</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="fmd-annotations">
                  {p.mockup.annotations.map((a, i) => (
                    <div key={i} className="fmd-annotation">
                      <div className="fmd-annotation-num">{i + 1}</div>
                      <div>
                        <strong>{a.title}</strong>
                        <span>{a.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="fmd-mockup-caption">
                Illustrative only. Designed to provoke discussion, not pixel-match Apple's HIG.
              </p>
            </div>
          )}

          <div className="fmd-metric-panel">
            <h4>How to measure success</h4>
            <ul>
              {p.metrics.map((m, i) => (
                <li key={i}>
                  <strong>{m.metric}</strong>
                  <span>{m.target}</span>
                </li>
              ))}
            </ul>
          </div>

          {p.cost && (
            <>
              <h3>What this would cost — honestly</h3>
              <p>{p.cost}</p>
            </>
          )}
        </section>
      ))}

      {/* ── Roadmap ── */}
      <section className="fmd-section">
        <h2>An honest rollout, not a moonshot.</h2>
        <p className="fmd-lede">
          A teardown that proposes everything at once is a wishlist, not a
          roadmap. Here's a sequence that respects engineering reality,
          regulatory exposure, and Apple's annual cadence.
        </p>
        <div className="fmd-roadmap">
          {ROADMAP.map((r, i) => (
            <div key={i} className="fmd-phase">
              <div className="fmd-when">{r.when}</div>
              <div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3>Risks to track from day one</h3>
        <div className="fmd-risk-grid">
          {RISKS.map((r, i) => (
            <div key={i} className="fmd-risk-card">
              <h4>{r.title}</h4>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section className="fmd-section fmd-about">
        <h2>About this teardown.</h2>
        <p>
          This is a public product analysis — not affiliated with, endorsed by,
          or commissioned by Apple Inc. All proposals are built from public
          sources: court filings, IETF drafts, academic papers, support forums,
          and competitive analysis. The opinions are the author's own.
        </p>
        <p className="fmd-disclaimer">
          Find My, Refound · An independent product teardown by Harshit Mittal · 2026
        </p>
      </section>
    </main>
  );
}
