import { PROFILE } from "../data/profile";

export default function BuiltWithStrip() {
  return (
    <section className="px-6 py-10 border-y border-border">
      <div className="max-w-content mx-auto flex flex-wrap items-center gap-x-8 gap-y-4">
        <span className="font-mono text-xs uppercase tracking-wider text-text-3">
          Built with
        </span>
        {PROFILE.builtWith.map((tool) => (
          <div key={tool.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: tool.color }}
            />
            <span className="font-mono text-sm text-text-2">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
