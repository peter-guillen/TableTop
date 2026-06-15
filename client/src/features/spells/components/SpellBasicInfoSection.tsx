import { Spell, SpellSchool } from "../spellTypes";
import { LuBookOpen } from "react-icons/lu";

/**
 * Props for the SpellBasicInfoSection component.
 * In TypeScript, documenting the interface fields is the most efficient approach,
 * as modern IDEs automatically map these descriptions directly to the component usage.
 */
interface SpellBasicInfoProps {
  /** The user-defined name of the custom spell. */
  name: string;
  /** The magical discipline group (e.g., Evocation, Necromancy) from `spellTypes`. */
  school: SpellSchool;
  /** The power scaling classification (currently numerical Tiers 1 through 5). */
  tier: string;
  /** The elemental alignment forcing damage/resistance calculations. */
  element: string;
  /** An array of descriptive flags indicating the spell's combat application. */
  tags: string[];
  /** Standard change handler tracking text inputs and dropdown select events. */
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  /**
   * Curried handler explicitly managing structural object checkbox states.
   * Uses a generic `<T>` to safely type-lock checkbox assignments to valid state keys.
   */
  onCheckedChange: (
    fieldName: keyof Spell,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Form sub-section component capturing core metadata for a spell creation workflow.
 * Renders name inputs, systemic dropdown categorization, and checkbox tagging matrices.
 * * Part of the broader `Spells` domain view state tracking.
 */
export const SpellBasicInfoSection = ({
  name,
  school,
  tier,
  element,
  tags,
  onInputChange,
  onCheckedChange,
}: SpellBasicInfoProps) => {
  // NOTE: If these tags expand significantly, consider migrating this array
  // out of the rendering tree or importing it from a shared constant config file.
  const tagOptions = [
    "damage",
    "healing",
    "buff",
    "debuff",
    "control",
    "utility",
  ];

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Spell Name
          </label>
          <input
            type="text"
            placeholder="Enter spell name"
            name="name"
            onChange={onInputChange}
            value={name}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            School of Magic
          </label>
          <select
            name="school"
            onChange={onInputChange}
            value={school}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Select School</option>
            <option value="abjuration">Abjuration</option>
            <option value="conjuration">Conjuration</option>
            <option value="divination">Divination</option>
            <option value="enchantment">Enchantment</option>
            <option value="evocation">Evocation</option>
            <option value="illusion">Illusion</option>
            <option value="necromancy">Necromancy</option>
            <option value="transmutation">Transmutation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tier
          </label>
          <select
            name="tier"
            onChange={onInputChange}
            value={tier}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value={""}>Select Tier</option>
            <option value={1}>Tier 1</option>
            <option value={2}>Tier 2</option>
            <option value={3}>Tier 3</option>
            <option value={4}>Tier 4</option>
            <option value={5}>Tier 5</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Element
          </label>
          <select
            name="element"
            onChange={onInputChange}
            value={element}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Select Element</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="earth">Earth</option>
            <option value="air">Air</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tags
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {tagOptions.map((tag) => (
            <label
              key={tag}
              className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-cyan-500/20 dark:border-orange-500/20 hover:border-cyan-500/40 dark:hover:border-orange-500/40 transition-all"
            >
              <input
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                // Hardcoding "tags" here is perfectly fine since this section
                // is highly specialized for assigning the tags collection array.
                onChange={onCheckedChange("tags")}
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span className="capitalize">{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};
