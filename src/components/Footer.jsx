import { PROFILE } from "../data/profile";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>
            Building something<br />
            that needs <em>shipping?</em>
          </h3>
          <p>
            I'm currently a Senior PM at UKG, and open to conversations about
            Senior / Lead PM roles in fintech, marketplace, AI products, and
            regulated platforms.
          </p>
          <a href={PROFILE.cta.email} className="footer-cta">
            Send me a note
          </a>
        </div>
        <div className="footer-col">
          <h5>Reach</h5>
          <ul>
            <li><a href={PROFILE.cta.email}>Email</a></li>
            <li>
              <a href={PROFILE.cta.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={PROFILE.cta.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Live work</h5>
          <ul>
            <li><a href="https://schemewise-one.vercel.app/" target="_blank" rel="noopener noreferrer">SchemeWise</a></li>
            <li><a href="https://read-my-report.vercel.app/" target="_blank" rel="noopener noreferrer">LabDecode</a></li>
            <li><a href="/projects/smc-stoxkart">StoxKart Case Study</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-base">
        <span>&copy; 2026 Harshit Mittal &middot; Built with AI</span>
        <span>Last updated &middot; 2026</span>
      </div>
    </footer>
  );
}
