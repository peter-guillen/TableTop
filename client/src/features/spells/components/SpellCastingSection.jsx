import { LuClock } from "react-icons/lu";

export const SpellCastingSection = ({
  castingTime,
  range,
  duration,
  area,
  stamina,
  usesPerDay,
  onInputChange,
  onCheckboxChange,
}) => {
  return (
    <>
      <section>
        <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
          <LuClock size={20} />
          Casting & Duration
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Casting Time *
              </label>
              <input
                type="text"
                placeholder="e.g., 1 action, 10 minutes"
                name="castingTime"
                onChange={onInputChange}
                value={castingTime}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration *
              </label>
              <input
                type="text"
                placeholder="e.g., Instantaneous, 1 minute"
                name="duration"
                onChange={onInputChange}
                value={duration}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Range *
              </label>
              <input
                type="text"
                placeholder="e.g., 1 action, 10 minutes"
                name="range"
                onChange={onInputChange}
                value={range}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Area *
              </label>
              <input
                type="text"
                placeholder="e.g., 20ft sphere, 30ft cone"
                name="area"
                onChange={onInputChange}
                value={area}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Mana Cost *
              </label>
              <input
                type="number"
                placeholder="Cost in mana"
                name="stamina"
                onChange={onInputChange}
                value={stamina}
                min="0"
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Uses Per Day
              </label>
              <select
                name="usesPerDay"
                onChange={onInputChange}
                value={usesPerDay}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="">Select Usage</option>
                <option value="daily">Daily</option>
                <option value="unlimited">Unlimited</option>
                <option value="short_rest">Short Rest</option>
                <option value="long_rest">Long Rest</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="isRitual"
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span>Ritual Spell</span>
            </label>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="requiresConcentration"
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span>Requires Concentration</span>
            </label>
          </div>
        </div>
      </section>
    </>
  );
};
