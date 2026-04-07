import Hero from "../components/Hero";
import BuiltWithStrip from "../components/BuiltWithStrip";
import ProjectCard from "../components/ProjectCard";
import RecruiterCTA from "../components/RecruiterCTA";
import Footer from "../components/Footer";
import { PROJECTS } from "../data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text-1">
      <Hero />
      <BuiltWithStrip />

      <section id="projects" className="px-6 py-20">
        <div className="max-w-content mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-text-1">
              Selected Work
            </h2>
            <span className="font-mono text-xs text-text-3 uppercase tracking-wider">
              03 projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
