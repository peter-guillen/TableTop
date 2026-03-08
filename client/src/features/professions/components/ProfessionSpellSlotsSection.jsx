import { LuSparkles, LuPlus, LuTrash2 } from "react-icons/lu";

const SPELL_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const emptySlotRow = (characterLevel) => ({
  level: characterLevel,
  slots: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
});

export const ProfessionSpellSlotsSection = ({
  spellSlots = [],
  onSpellSlotsChange,
  spellcastingAbility,
}) => {
  // Only show if the class has a spellcasting ability
  if (!spellcastingAbility) {
    return (
      <section>
        <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
          <LuSparkles size={20} />
          Spell Slots
        </h2>
        <div className="text-center py-8 border border-dashed border-slate-700 rounded-xl text-slate-500 text-sm">
          <LuSparkles size={24} className="mx-auto mb-2 opacity-20" />
          Set a Spellcasting Ability in Basic Info to unlock the spell slot
          table.
        </div>
      </section>
    );
  }

  const addRow = () => {
    const usedLevels = spellSlots.map((r) => r.level);
    const nextLevel =
      Array.from({ length: 20 }, (_, i) => i + 1).find(
        (l) => !usedLevels.includes(l),
      ) || 1;
    onSpellSlotsChange([...spellSlots, emptySlotRow(nextLevel)]);
  };

  const removeRow = (index) => {
    onSpellSlotsChange(spellSlots.filter((_, i) => i !== index));
  };

  const updateSlot = (rowIndex, spellLevel, value) => {
    const updated = spellSlots.map((row, i) =>
      i === rowIndex
        ? { ...row, slots: { ...row.slots, [spellLevel]: Number(value) } }
        : row,
    );
    onSpellSlotsChange(updated);
  };

  const updateRowLevel = (rowIndex, value) => {
    const updated = spellSlots.map((row, i) =>
      i === rowIndex ? { ...row, level: Number(value) } : row,
    );
    onSpellSlotsChange(updated);
  };

  const sorted = [...spellSlots].sort((a, b) => a.level - b.level);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 flex items-center gap-2">
          <LuSparkles size={20} />
          Spell Slots
        </h2>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/30 transition-all text-sm font-medium"
        >
          <LuPlus size={14} />
          Add Level Row
        </button>
      </div>

      {spellSlots.length === 0 ? (
        <div className="text-center py-10 text-slate-500 border border-dashed border-slate-700 rounded-xl">
          <p className="text-sm">
            No spell slot rows yet. Add your first level.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-cyan-500/15">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/60 border-b border-cyan-500/20">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  Char Lvl
                </th>
                {SPELL_LEVELS.map((sl) => (
                  <th
                    key={sl}
                    className="px-3 py-3 text-[10px] uppercase tracking-widest text-slate-400 font-semibold text-center"
                  >
                    {sl}
                  </th>
                ))}
                <th className="px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, sortedIndex) => {
                const originalIndex = spellSlots.indexOf(row);
                return (
                  <tr
                    key={sortedIndex}
                    className="border-b border-slate-700/30 hover:bg-slate-700/10 transition-colors"
                  >
                    {/* Character Level */}
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={row.level}
                        onChange={(e) =>
                          updateRowLevel(originalIndex, e.target.value)
                        }
                        className="w-14 text-center px-2 py-1.5 bg-slate-900/60 border border-cyan-500/20 rounded text-cyan-300 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </td>

                    {/* Slot counts per spell level */}
                    {SPELL_LEVELS.map((sl) => (
                      <td key={sl} className="px-3 py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          max={9}
                          value={row.slots?.[sl] ?? 0}
                          onChange={(e) =>
                            updateSlot(originalIndex, sl, e.target.value)
                          }
                          className={`w-10 text-center px-1 py-1.5 rounded border text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all ${
                            row.slots?.[sl] > 0
                              ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300"
                              : "bg-slate-900/40 border-slate-700/30 text-slate-600"
                          }`}
                        />
                      </td>
                    ))}

                    {/* Delete row */}
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => removeRow(originalIndex)}
                        className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded transition-all"
                      >
                        <LuTrash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-slate-500 mt-2">
        Column headers = spell level (1–9). Each cell = number of slots at that
        character level.
      </p>
    </section>
  );
};
