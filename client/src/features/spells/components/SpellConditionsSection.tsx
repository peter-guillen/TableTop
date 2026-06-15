import { useGetConstantsQuery } from "../../../shared/constants/constantsApi";
import { LuFlame, LuPlus, LuTrash2 } from "react-icons/lu";
import { StatModifier } from "../spellTypes";

interface SpellConditionsProps {
  statModifiers: StatModifier[];
  conditions: string[];
  onStatModifiersChange: (newModifiers: StatModifier[]) => void;
  onConditionsChange: (newModifiers: string[]) => void;
}

export const SpellConditionsSection = ({
  statModifiers,
  conditions,
  onStatModifiersChange,
  onConditionsChange,
}: SpellConditionsProps) => {
  const { data: constants } = useGetConstantsQuery();
  const afflictions = constants?.CONDITIONS ?? [];

  const handleConditionChange = (condition: string) => {
    const updated = conditions.includes(condition)
      ? conditions.filter((c) => c !== condition)
      : [...conditions, condition];
    onConditionsChange(updated);
  };

  const handleAddModifier = () => {
    onStatModifiersChange([
      ...statModifiers,
      { stat: "", value: 0, duration: "", target: "", description: "" },
    ]);
  };

  const handleModifierChange = (
    index: number,
    field: keyof StatModifier,
    value: string,
  ) => {
    const updated = [...statModifiers];
    updated[index] = { ...updated[index], [field]: value };
    onStatModifiersChange(updated);
  };

  const handleRemoveModifier = (index: number) => {
    onStatModifiersChange(statModifiers.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuFlame size={20} />
        Effects & Conditions
      </h2>
      <div className="space-y-6">
        {/* Buffs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-slate-300">
              Buffs & Debuffs
            </label>
            <button
              type="button"
              onClick={handleAddModifier}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
            >
              <LuPlus size={16} />
              Add Buff/Debuff
            </button>
          </div>
          <div className="space-y-4">
            {statModifiers &&
              statModifiers.map((modifier, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Stat
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., armor, damage"
                      value={modifier.stat || ""}
                      onChange={(e) =>
                        handleModifierChange(index, "stat", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Value
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., +2, +1d4"
                      value={modifier.value || 0}
                      onChange={(e) =>
                        handleModifierChange(index, "value", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 1 hour, concentration"
                      value={modifier.duration || ""}
                      onChange={(e) =>
                        handleModifierChange(index, "duration", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Target
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., self, enemy"
                      value={modifier.target}
                      onChange={(e) =>
                        handleModifierChange(index, "target", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="double damage"
                      value={modifier.description}
                      onChange={(e) =>
                        handleModifierChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveModifier(index)}
                    className="px-4 py-3 bg-red-600/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all flex items-center justify-center"
                  >
                    <LuTrash2 size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Conditions */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Conditions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {afflictions.map((condition) => (
              <label
                key={condition}
                className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-800/30 dark:bg-slate-900/30 p-2 rounded-lg border border-cyan-500/20 dark:border-orange-500/20 hover:border-cyan-500/40 dark:hover:border-orange-500/40 transition-all"
              >
                <input
                  type="checkbox"
                  value="conditions"
                  checked={conditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                  className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                />
                <span className="capitalize text-sm">{condition}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
