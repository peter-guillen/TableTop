import { LuBookOpen } from "react-icons/lu";
import {
  formHeading,
  formHint,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

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
      <h2 className={formHeading}>
        <LuBookOpen size={20} />
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class Name */}
        <div className="md:col-span-2">
          <label className={`${formLabel} mb-2`}>
            Class Name
          </label>
          <input
            type="text"
            placeholder="e.g. Wizard, Fighter, Paladin..."
            name="title"
            onChange={onInputChange}
            value={title}
            className={formInput}
          />
        </div>

        {/* Hit Die */}
        <div>
          <label className={`${formLabel} mb-2`}>
            Hit Die
          </label>
          <select
            name="hitDie"
            onChange={onInputChange}
            value={hitDie}
            className={formInput}
          >
            <option value="">Select Hit Die</option>
            <option value={6}>d6</option>
            <option value={8}>d8</option>
            <option value={10}>d10</option>
            <option value={12}>d12</option>
          </select>
          <p className={formHint}>
            Hit points gained per level
          </p>
        </div>

        {/* Spellcasting Ability */}
        <div>
          <label className={`${formLabel} mb-2`}>
            Spellcasting Ability
          </label>
          <select
            name="spellcastingAbility"
            onChange={onInputChange}
            value={spellcastingAbility ?? ""}
            className={formInput}
          >
            <option value="">None (Non-caster)</option>
            {SPELLCASTING_ABILITIES.map((ability) => (
              <option key={ability} value={ability}>
                {ability.charAt(0).toUpperCase() + ability.slice(1)}
              </option>
            ))}
          </select>
          <p className={formHint}>
            Leave empty for martial classes
          </p>
        </div>

        {/* Source Book */}
        <div>
          <label className={`${formLabel} mb-2`}>
            Source Book
          </label>
          <input
            type="text"
            placeholder="e.g. Player's Handbook"
            name="sourceBook"
            onChange={onInputChange}
            value={sourceBook}
            className={formInput}
          />
        </div>

        {/* Is Playable */}
        <div className="flex items-center gap-4 mt-2">
          <label className={formLabel}>
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
              isPlayable ? "bg-emerald-500" : "bg-stone-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                isPlayable ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {isPlayable ? "Available to players" : "Hidden / WIP"}
          </span>
        </div>
      </div>
    </section>
  );
};
