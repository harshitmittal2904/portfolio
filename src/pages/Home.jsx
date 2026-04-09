import Nav from "../components/Nav";
import Hero from "../components/Hero";
import BuiltWithStrip from "../components/BuiltWithStrip";
import ProjectCard from "../components/ProjectCard";
import RecruiterCTA from "../components/RecruiterCTA";
import Footer from "../components/Footer";
import { PROJECTS } from "../data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text-1">
      <Nav />
      <Hero />
      <BuiltWithStrip />

      <section id="projects" className="px-6 md:px-10 py-16">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="font-sans text-[10px] font-bold text-text-3 tracking-[1.5px] uppercase mb-2">
                AI Product Portfolio
              </div>
              <h2 className="font-display font-extrabold text-[28px] text-text-1 tracking-[-1px]">
                Projects
              </h2>
            </div>
            <span className="font-mono text-[11px] text-text-3 pb-1">
              03 projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <RecruiterCTA />
      <Footer />
    </main>
  );
}
