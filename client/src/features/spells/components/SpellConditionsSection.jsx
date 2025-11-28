import { useState } from "react";
import { LuFlame, LuPlus, LuTrash2 } from "react-icons/lu";
export const SpellConditionsSection = () => {
  const [conditions, setConditions] = useState([]);
  const [buffs, setBuffs] = useState([]);
  const [debuffs, setDebuffs] = useState([]);

  const conditionOptions = [
    "blinded",
    "charmed",
    "deafened",
    "frightened",
    "grappled",
    "incapacitated",
    "invisible",
    "paralyzed",
    "petrified",
    "poisoned",
    "prone",
    "restrained",
    "stunned",
    "unconscious",
  ];
  const handleConditionChange = (condition) => {
    if (conditions.includes(condition)) {
      setConditions(conditions.filter((c) => c !== condition));
    } else {
      setConditions([...conditions, condition]);
    }
  };

  const handleAddBuff = () => {
    setBuffs([...buffs, { stat: "", value: "", duration: "" }]);
  };

  const handleBuffChange = (index, field, value) => {
    const newBuffs = [...buffs];
    newBuffs[index] = { ...newBuffs[index], [field]: value };
    setBuffs(newBuffs);
  };

  const handleRemoveBuff = (index) => {
    setBuffs(buffs.filter((_, i) => i !== index));
  };

  const handleAddDebuff = () => {
    setDebuffs([...debuffs, { stat: "", value: "", duration: "" }]);
  };

  const handleDebuffChange = (index, field, value) => {
    const newDebuffs = [...debuffs];
    newDebuffs[index] = { ...newDebuffs[index], [field]: value };
    setDebuffs(newDebuffs);
  };

  const handleRemoveDebuff = (index) => {
    setDebuffs(debuffs.filter((_, i) => i !== index));
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
              Buffs
            </label>
            <button
              type="button"
              onClick={handleAddBuff}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
            >
              <LuPlus size={16} />
              Add Buff
            </button>
          </div>
          <div className="space-y-4">
            {buffs.map((buff, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Stat
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., armor, damage"
                    value={buff.stat || ""}
                    onChange={(e) =>
                      handleBuffChange(index, "stat", e.target.value)
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
                    value={buff.value || ""}
                    onChange={(e) =>
                      handleBuffChange(index, "value", e.target.value)
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
                    value={buff.duration || ""}
                    onChange={(e) =>
                      handleBuffChange(index, "duration", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveBuff(index)}
                  className="px-4 py-3 bg-red-600/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all flex items-center justify-center"
                >
                  <LuTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Debuffs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-slate-300">
              Debuffs
            </label>
            <button
              type="button"
              onClick={handleAddDebuff}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
            >
              <LuPlus size={16} />
              Add Debuff
            </button>
          </div>
          <div className="space-y-4">
            {debuffs.map((debuff, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Stat
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., armor, damage"
                    value={debuff.stat || ""}
                    onChange={(e) =>
                      handleDebuffChange(index, "stat", e.target.value)
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
                    value={debuff.value || ""}
                    onChange={(e) =>
                      handleDebuffChange(index, "value", e.target.value)
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
                    value={debuff.duration || ""}
                    onChange={(e) =>
                      handleDebuffChange(index, "duration", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDebuff(index)}
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
            {conditionOptions.map((condition) => (
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
