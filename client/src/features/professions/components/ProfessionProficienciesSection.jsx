import { useState } from "react";
import { LuShield, LuPlus, LuX } from "react-icons/lu";
import {
  formHeading,
  formLabel,
} from "../../../shared/styles/theme.ts";

const SAVING_THROWS = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

const ARMOR_OPTIONS = ["none", "light", "medium", "heavy", "shields"];
const WEAPON_OPTIONS = [
  "simple",
  "martial",
  "hand crossbows",
  "longswords",
  "rapiers",
  "shortswords",
];
const SKILL_POOL = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
];

export const ProfessionProficienciesSection = ({
  armorProficiencies = [],
  weaponProficiencies = [],
  toolProficiencies = [],
  savingThrows = {},
  skillChoices = { choose: 2, from: [] },
  onArmorChange,
  onWeaponChange,
  onToolChange,
  onSavingThrowChange,
  onSkillChoicesChange,
}) => {
  const [toolInput, setToolInput] = useState("");

  const toggleArrayItem = (array, item, onChange) => {
    if (array.includes(item)) {
      onChange(array.filter((i) => i !== item));
    } else {
      onChange([...array, item]);
    }
  };

  const addTool = () => {
    const trimmed = toolInput.trim();
    if (trimmed && !toolProficiencies.includes(trimmed)) {
      onToolChange([...toolProficiencies, trimmed]);
      setToolInput("");
    }
  };

  const removeTool = (tool) => {
    onToolChange(toolProficiencies.filter((t) => t !== tool));
  };

  const toggleSkill = (skill) => {
    const current = skillChoices.from || [];
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    onSkillChoicesChange({ ...skillChoices, from: updated });
  };

  return (
    <section>
      <h2 className={formHeading}>
        <LuShield size={20} />
        Proficiencies
      </h2>

      <div className="space-y-6">
        {/* Saving Throws */}
        <div>
          <label className={`${formLabel} mb-3`}>
            Saving Throw Proficiencies
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SAVING_THROWS.map((stat) => (
              <label
                key={stat}
                className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                  savingThrows[stat]
                    ? "bg-emerald-50 dark:bg-emerald-500/20 border-emerald-400 dark:border-emerald-500/60 text-emerald-700 dark:text-emerald-300"
                    : "bg-stone-100 dark:bg-stone-800/30 border-stone-300 dark:border-emerald-500/20 text-stone-500 dark:text-stone-400 hover:border-emerald-400 dark:hover:border-emerald-500/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!savingThrows[stat]}
                  onChange={() =>
                    onSavingThrowChange({
                      ...savingThrows,
                      [stat]: !savingThrows[stat],
                    })
                  }
                  className="w-4 h-4 rounded border-stone-300 dark:border-emerald-500/30 bg-white dark:bg-stone-800/50 text-emerald-700 focus:ring-emerald-500"
                />
                <span className="capitalize text-sm">{stat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Armor Proficiencies */}
        <div>
          <label className={`${formLabel} mb-3`}>
            Armor Proficiencies
          </label>
          <div className="flex flex-wrap gap-2">
            {ARMOR_OPTIONS.map((armor) => (
              <button
                key={armor}
                type="button"
                onClick={() =>
                  toggleArrayItem(armorProficiencies, armor, onArmorChange)
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 border ${
                  armorProficiencies.includes(armor)
                    ? "bg-amber-50 dark:bg-amber-500/20 border-amber-400 dark:border-amber-500/60 text-amber-700 dark:text-amber-300"
                    : "bg-stone-100 dark:bg-stone-800/30 border-stone-300 dark:border-stone-600/30 text-stone-500 dark:text-stone-400 hover:border-amber-400 dark:hover:border-amber-500/30"
                }`}
              >
                {armor}
              </button>
            ))}
          </div>
        </div>

        {/* Weapon Proficiencies */}
        <div>
          <label className={`${formLabel} mb-3`}>
            Weapon Proficiencies
          </label>
          <div className="flex flex-wrap gap-2">
            {WEAPON_OPTIONS.map((weapon) => (
              <button
                key={weapon}
                type="button"
                onClick={() =>
                  toggleArrayItem(weaponProficiencies, weapon, onWeaponChange)
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 border ${
                  weaponProficiencies.includes(weapon)
                    ? "bg-amber-50 dark:bg-amber-500/20 border-amber-400 dark:border-amber-500/60 text-amber-700 dark:text-amber-300"
                    : "bg-stone-100 dark:bg-stone-800/30 border-stone-300 dark:border-stone-600/30 text-stone-500 dark:text-stone-400 hover:border-amber-400 dark:hover:border-amber-500/30"
                }`}
              >
                {weapon}
              </button>
            ))}
          </div>
        </div>

        {/* Tool Proficiencies */}
        <div>
          <label className={`${formLabel} mb-3`}>
            Tool Proficiencies
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTool())
              }
              placeholder="e.g. Thieves' tools, Herbalism kit..."
              className="flex-1 px-4 py-2 bg-white dark:bg-stone-800/50 border border-stone-300 dark:border-emerald-500/30 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
            <button
              type="button"
              onClick={addTool}
              className="px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-600/30 border border-emerald-400 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-600/50 transition-all"
            >
              <LuPlus size={16} />
            </button>
          </div>
          {toolProficiencies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {toolProficiencies.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white dark:bg-stone-700/50 border border-stone-300 dark:border-stone-600/40 text-stone-700 dark:text-stone-300 text-sm"
                >
                  {tool}
                  <button
                    type="button"
                    onClick={() => removeTool(tool)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <LuX size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Skill Choices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className={formLabel}>
              Skill Choices
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 dark:text-stone-400">Choose</span>
              <input
                type="number"
                min={1}
                max={6}
                value={skillChoices.choose}
                onChange={(e) =>
                  onSkillChoicesChange({
                    ...skillChoices,
                    choose: Number(e.target.value),
                  })
                }
                className="w-14 px-2 py-1 bg-white dark:bg-stone-800/50 border border-stone-300 dark:border-emerald-500/30 rounded text-stone-900 dark:text-white text-center text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <span className="text-xs text-stone-500 dark:text-stone-400">from pool below</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SKILL_POOL.map((skill) => (
              <label
                key={skill}
                className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border text-sm transition-all duration-200 ${
                  (skillChoices.from || []).includes(skill)
                    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-400 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-300"
                    : "bg-stone-100 dark:bg-stone-800/20 border-stone-300 dark:border-stone-700/30 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-emerald-500/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={(skillChoices.from || []).includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="w-3.5 h-3.5 rounded border-stone-300 dark:border-emerald-500/30 bg-white dark:bg-stone-800/50 text-emerald-700 focus:ring-emerald-500"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
