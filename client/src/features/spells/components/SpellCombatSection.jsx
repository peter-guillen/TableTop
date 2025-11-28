import { LuFlame, LuPlus, LuTrash2 } from "react-icons/lu";

export const SpellCombatSection = ({
  damage,
  healing,
  onDamageChange,
  onHealingChange,
}) => {
  const updateDamage = (index, field, value) => {
    const newDamage = [...damage];
    newDamage[index] = { ...newDamage[index], [field]: value };
    onDamageChange(newDamage);
  };

  const handleAddDamage = () => {
    onDamageChange([...damage, { diceCount: "", diceSize: "", modifier: 0 }]);
  };

  const handleRemoveDamage = (index) => {
    onDamageChange(damage.filter((_, i) => i !== index));
  };

  const updateHealing = (index, field, value) => {
    const newHealing = [...healing];
    newHealing[index] = { ...newHealing[index], [field]: value };
    onHealingChange(newHealing);
  };

  const handleAddHealing = () => {
    onHealingChange([...healing, { diceCount: "", diceSize: "", modifier: 0 }]);
  };

  const handleRemoveHealing = (index) => {
    onHealingChange(healing.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuFlame size={20} />
        Combat Properties
      </h2>
      {/* Damage Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-slate-300">
            Damage
          </label>
          <button
            type="button"
            onClick={handleAddDamage}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
          >
            <LuPlus size={16} />
            Add Damage
          </button>
        </div>

        <div className="space-y-4">
          {damage &&
            damage.map((dmg, index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Dice Count
                  </label>
                  <input
                    type="number"
                    placeholder="2"
                    value={dmg.diceCount || ""}
                    onChange={(e) =>
                      updateDamage(index, "diceCount", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Type
                  </label>
                  <select
                    value={dmg.diceSize || ""}
                    onChange={(e) =>
                      updateDamage(index, "diceSize", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
                  >
                    <option value="0">Select</option>
                    <option value="4">d4</option>
                    <option value="6">d6</option>
                    <option value="8">d8</option>
                    <option value="10">d10</option>
                    <option value="12">d12</option>
                    <option value="20">d20</option>
                    <option value="100">d100</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Modifier
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={dmg.modifier || 0}
                    onChange={(e) =>
                      updateDamage(index, "modifier", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDamage(index)}
                  className="px-4 py-3 bg-red-600/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all flex items-center justify-center"
                >
                  <LuTrash2 size={16} />
                </button>
              </div>
            ))}
        </div>
      </div>

      <br className="p-8 m-8" />

      {/* Healing Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-slate-300">
            Healing
          </label>
          <button
            type="button"
            onClick={handleAddHealing}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
          >
            <LuPlus size={16} />
            Add Healing
          </button>
        </div>

        <div className="space-y-4">
          {healing &&
            healing.map((heal, index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Dice Count
                  </label>
                  <input
                    type="number"
                    placeholder="2"
                    value={heal?.diceCount || ""}
                    onChange={(e) =>
                      updateHealing(index, "diceCount", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Type
                  </label>
                  <select
                    value={heal?.diceSize || ""}
                    onChange={(e) =>
                      updateHealing(index, "diceSize", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
                  >
                    <option value="0">Select</option>
                    <option value="4">d4</option>
                    <option value="6">d6</option>
                    <option value="8">d8</option>
                    <option value="10">d10</option>
                    <option value="12">d12</option>
                    <option value="20">d20</option>
                    <option value="100">d100</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Modifier
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={heal?.modifier || 0}
                    onChange={(e) =>
                      updateHealing(index, "modifier", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveHealing(index)}
                  className="px-4 py-3 bg-red-600/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all flex items-center justify-center"
                >
                  <LuTrash2 size={16} />
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
