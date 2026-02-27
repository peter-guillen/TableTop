import { LuClock } from "react-icons/lu";

export const ArmorCombatSection = ({
  onInputChange,
  onCheckboxChange,
  requirement,
  material,
  penalty,
  defense,
  weight,
  value,
  onCheckedChange,
  tags,
}) => {
  return (
    <>
      <section>
        <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
          <LuClock size={20} />
          Combat Stats
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Defense *
              </label>
              <input
                type="text"
                placeholder="e.g., 14"
                name="defense"
                onChange={onInputChange}
                value={defense}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Weight *
              </label>
              <input
                type="text"
                placeholder="e.g., 20lbs"
                name="weight"
                onChange={onInputChange}
                value={weight}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Requirements *
              </label>
              <input
                type="text"
                placeholder="e.g., Heavy Armor Proficiency"
                name="requirement"
                onChange={onInputChange}
                value={requirement}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Penalty *
              </label>
              <input
                type="text"
                placeholder="e.g., -5 Movement"
                name="penalty"
                onChange={onInputChange}
                value={penalty}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Value *
              </label>
              <input
                type="number"
                placeholder="Cost in mana"
                name="value"
                onChange={onInputChange}
                value={value}
                min="0"
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Material
              </label>
              <select
                name="material"
                onChange={onInputChange}
                value={material}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">Select Material</option>
                <option value="cloth">Cloth</option>
                <option value="leather">Leather</option>
                <option value="hide">Hide</option>
                <option value="chainmail">Chainmail</option>
                <option value="scale">Scale</option>
                <option value="plate">Plate</option>
                <option value="steel">Steel</option>
                <option value="iron">Iron</option>
                <option value="mithral">Mithral</option>
                <option value="adamantine">Adamantine</option>
                <option value="silver">Silver</option>
                <option value="orichalcum">Orichalcum</option>
                <option value="dragonscale">Dragonscale</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="block text-sm font-medium text-slate-300 mb-2">
              Shield
            </div>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="radio"
                name="true"
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="radio"
                name="false"
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </section>
    </>
  );
};
