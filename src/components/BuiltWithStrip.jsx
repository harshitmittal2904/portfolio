import { PROFILE } from "../data/profile";

export default function BuiltWithStrip() {
  return (
    <section className="px-6 md:px-10">
      <div className="max-w-content mx-auto py-9 border-y border-border flex flex-wrap items-center gap-x-8 gap-y-4">
        <span className="font-sans text-[10px] font-bold text-text-3 tracking-[1.5px] uppercase pr-6 border-r border-border">
          Built with
        </span>
        <div className="flex items-center gap-6 flex-wrap">
          {PROFILE.builtWith.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-[7px] font-sans text-xs font-semibold text-text-2 tracking-[-0.2px] hover:text-text-1 transition"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: tool.color }}
              />
              {tool.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
