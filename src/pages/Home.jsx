import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import ProjectCard from "../components/ProjectCard";
import Manifesto from "../components/Manifesto";
import Timeline from "../components/Timeline";
import Footer from "../components/Footer";
import { PROJECTS } from "../data/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Intro />

      <section className="projects-section" id="projects">
        <div className="ps-header">
          <h2>Selected <em>work.</em></h2>
          <div className="ps-counter">
            <b>06</b>
            Projects
          </div>
        </div>

        <div className="pc-grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
      <Manifesto />
      <Timeline />
      <Footer />
    </>
  );
}
