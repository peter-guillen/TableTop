import { LuBookOpen } from "react-icons/lu";

const SPELLCASTING_ABILITIES = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export const ProfessionBasicInfoSection = ({
  title,
  hitDie,
  spellcastingAbility,
  sourceBook,
  isPlayable,
  onInputChange,
}) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuBookOpen size={20} />
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Class Name
          </label>
          <input
            type="text"
            placeholder="e.g. Wizard, Fighter, Paladin..."
            name="title"
            onChange={onInputChange}
            value={title}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Hit Die */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Hit Die
          </label>
          <select
            name="hitDie"
            onChange={onInputChange}
            value={hitDie}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Select Hit Die</option>
            <option value={6}>d6</option>
            <option value={8}>d8</option>
            <option value={10}>d10</option>
            <option value={12}>d12</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">
            Hit points gained per level
          </p>
        </div>

        {/* Spellcasting Ability */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Spellcasting Ability
          </label>
          <select
            name="spellcastingAbility"
            onChange={onInputChange}
            value={spellcastingAbility ?? ""}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">None (Non-caster)</option>
            {SPELLCASTING_ABILITIES.map((ability) => (
              <option key={ability} value={ability}>
                {ability.charAt(0).toUpperCase() + ability.slice(1)}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">
            Leave empty for martial classes
          </p>
        </div>

        {/* Source Book */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Source Book
          </label>
          <input
            type="text"
            placeholder="e.g. Player's Handbook"
            name="sourceBook"
            onChange={onInputChange}
            value={sourceBook}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Is Playable */}
        <div className="flex items-center gap-4 mt-2">
          <label className="block text-sm font-medium text-slate-300">
            Playable Class
          </label>
          <button
            type="button"
            onClick={() =>
              onInputChange({
                target: { name: "isPlayable", value: !isPlayable },
              })
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
              isPlayable ? "bg-cyan-500" : "bg-slate-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                isPlayable ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-xs text-slate-400">
            {isPlayable ? "Available to players" : "Hidden / WIP"}
          </span>
        </div>
      </div>
    </section>
  );
};
