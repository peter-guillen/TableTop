import { LuStar, LuPlus, LuTrash2 } from "react-icons/lu";

export const ProfessionLevelsSection = ({ levels = [], onLevelsChange }) => {
  const addFeature = () => {
    const nextLevel =
      levels.length > 0
        ? Math.min(10, Math.max(...levels.map((l) => l.level)) + 1)
        : 1;
    onLevelsChange([
      ...levels,
      { level: nextLevel, name: "", description: "" },
    ]);
  };

  const updateFeature = (index, field, value) => {
    const updated = levels.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onLevelsChange(updated);
  };

  const removeFeature = (index) => {
    onLevelsChange(levels.filter((_, i) => i !== index));
  };

  // Sort by level for display
  const sorted = [...levels].sort((a, b) => a.level - b.level);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 flex items-center gap-2">
          <LuStar size={20} />
          Level Features
        </h2>
        <button
          type="button"
          onClick={addFeature}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/30 transition-all text-sm font-medium"
        >
          <LuPlus size={14} />
          Add Feature
        </button>
      </div>

      {levels.length === 0 ? (
        <div className="text-center py-10 text-slate-500 border border-dashed border-slate-700 rounded-xl">
          <LuStar size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No level features yet. Add your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((feature, index) => {
            const originalIndex = levels.indexOf(feature);
            return (
              <div
                key={index}
                className="grid grid-cols-[64px_1fr_1fr_36px] gap-3 items-start bg-slate-800/30 border border-cyan-500/15 rounded-xl p-4 hover:border-cyan-500/30 transition-all"
              >
                {/* Level badge */}
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                    Lvl
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={feature.level}
                    onChange={(e) =>
                      updateFeature(
                        originalIndex,
                        "level",
                        Number(e.target.value),
                      )
                    }
                    className="w-full text-center px-2 py-2 bg-slate-900/60 border border-cyan-500/20 rounded-lg text-cyan-300 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                {/* Feature name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                    Feature Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra Attack"
                    value={feature.name}
                    onChange={(e) =>
                      updateFeature(originalIndex, "name", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-slate-900/60 border border-cyan-500/20 rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="What does this feature do?"
                    value={feature.description}
                    onChange={(e) =>
                      updateFeature(
                        originalIndex,
                        "description",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 bg-slate-900/60 border border-cyan-500/20 rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => removeFeature(originalIndex)}
                  className="mt-5 p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <LuTrash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
