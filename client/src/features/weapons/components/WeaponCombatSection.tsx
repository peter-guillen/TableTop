import { LuSwords } from "react-icons/lu";

export const WeaponCombatSection = ({
  damage,
  damageType,
  range,
  properties,
  onInputChange,
  onPropertyChange,
}) => {
  const propertyOptions = [
    "ammunition",
    "finesse",
    "heavy",
    "light",
    "loading",
    "reach",
    "special",
    "thrown",
    "two-handed",
    "versatile",
    "silvered",
    "adamantine",
    "magical",
  ];

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuSwords size={20} />
        Combat Stats
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Damage *
            </label>
            <input
              type="text"
              placeholder="e.g., 1d8, 2d6"
              name="damage"
              onChange={onInputChange}
              value={damage}
              required
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Damage Type
            </label>
            <select
              name="damageType"
              onChange={onInputChange}
              value={damageType}
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="">Select Damage Type</option>
              <option value="slashing">Slashing</option>
              <option value="piercing">Piercing</option>
              <option value="bludgeoning">Bludgeoning</option>
              <option value="fire">Fire</option>
              <option value="cold">Cold</option>
              <option value="lightning">Lightning</option>
              <option value="acid">Acid</option>
              <option value="poison">Poison</option>
              <option value="radiant">Radiant</option>
              <option value="necrotic">Necrotic</option>
              <option value="force">Force</option>
              <option value="psychic">Psychic</option>
              <option value="thunder">Thunder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Range
            </label>
            <input
              type="text"
              placeholder="e.g., 5 ft, 20/60 ft"
              name="range"
              onChange={onInputChange}
              value={range}
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Weapon Properties
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {propertyOptions.map((property) => (
              <label
                key={property}
                className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-cyan-500/20 dark:border-orange-500/20 hover:border-cyan-500/40 dark:hover:border-orange-500/40 transition-all"
              >
                <input
                  type="checkbox"
                  value={property}
                  checked={properties.includes(property)}
                  onChange={onPropertyChange}
                  className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                />
                <span className="capitalize text-sm">{property}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
