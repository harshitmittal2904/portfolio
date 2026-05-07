import { PROFILE } from "../data/profile";

export default function Intro() {
  const parts = PROFILE.thesis.split("compresses execution.");
  return (
    <section className="intro">
      <div className="intro-eyebrow">/ The thesis</div>
      <p>
        {parts[0]}<em>compresses execution.</em>{parts[1]}
      </p>
    </section>
  );
}
