import { PROFILE } from "../data/profile";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="nav-brand">{PROFILE.name}</a>
        <div className="nav-links">
          <a href="#projects" className="nav-hide-mobile">Work</a>
          <a href="#about" className="nav-hide-mobile">About</a>
          <a href="#contact" className="nav-cta">Contact</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
