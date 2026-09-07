import { LuFlame, LuPlus, LuTrash2 } from "react-icons/lu";
import {
  HealthEffect,
  StatModifier,
  Resistance,
  DurationType,
} from "../itemTypes";
import {
  DamageType,
  Property,
  Stat,
  Skill,
} from "../../../shared/constants/constantTypes";

interface ItemCombatSectionProps {
  healthEffects: HealthEffect[];
  statModifiers: StatModifier[];
  resistances: Resistance[];
  properties: Property[];
  damageTypeOptions: DamageType[];
  propertyOptions: Property[];
  statOptions: Stat[];
  skillOptions: Skill[];
  onHealthChange: (newData: HealthEffect[]) => void;
  onStatModifiersChange: (newData: StatModifier[]) => void;
  onResistancesChange: (newData: Resistance[]) => void;
  onPropertiesChange: (newData: Property[]) => void;
}

const DURATION_TYPE_OPTIONS: DurationType[] = [
  "turns",
  "until_broken",
  "permanent",
];

const RESISTANCE_RULE_OPTIONS: Resistance["rule"][] = [
  "resistance",
  "vulnerability",
  "immunity",
  "absorption",
];

export const ItemCombatSection = ({
  healthEffects = [],
  statModifiers = [],
  resistances = [],
  properties = [],
  damageTypeOptions,
  propertyOptions,
  statOptions,
  skillOptions,
  onHealthChange,
  onStatModifiersChange,
  onResistancesChange,
  onPropertiesChange,
}: ItemCombatSectionProps) => {
  const damage = healthEffects.filter((e) => e.direction === "damage");
  const healing = healthEffects.filter((e) => e.direction === "healing");
  const statOrSkillOptions: (Stat | Skill)[] = [
    ...statOptions,
    ...skillOptions,
  ];

  // Health Effects
  const addEffect = (direction: HealthEffect["direction"]) => {
    onHealthChange([
      ...healthEffects,
      {
        direction,
        damageType: "",
        diceCount: 0,
        diceSize: 0,
        flat: 0,
        persistent: false,
        durationType: "",
        duration: 0,
      },
    ]);
  };

  const updateEffect = (
    effect: HealthEffect,
    field: keyof HealthEffect,
    value: string | number | boolean,
  ) => {
    onHealthChange(
      healthEffects.map((e) => (e === effect ? { ...e, [field]: value } : e)),
    );
  };

  const removeEffect = (effect: HealthEffect) => {
    onHealthChange(healthEffects.filter((e) => e !== effect));
  };

  // Resistances
  const addResistance = () => {
    onResistancesChange([...resistances, { damageType: "", rule: "" }]);
  };

  const updateResistance = (
    resistance: Resistance,
    field: keyof Resistance,
    value: string,
  ) => {
    onResistancesChange(
      resistances.map((r) => (r === resistance ? { ...r, [field]: value } : r)),
    );
  };

  const removeResistance = (resistance: Resistance) => {
    onResistancesChange(resistances.filter((r) => r !== resistance));
  };

  // Properties (checkbox grid)
  const toggleProperty = (property: Property) => {
    if (properties.includes(property)) {
      onPropertiesChange(properties.filter((p) => p !== property));
    } else {
      onPropertiesChange([...properties, property]);
    }
  };

  // Stat Modifiers
  const addStatModifier = () => {
    onStatModifiersChange([
      ...statModifiers,
      {
        stat: "",
        value: 0,
        durationType: "",
        duration: 0,
        target: "",
        description: "",
      },
    ]);
  };

  const updateStatModifier = (
    modifier: StatModifier,
    field: keyof StatModifier,
    value: string | number,
  ) => {
    onStatModifiersChange(
      statModifiers.map((m) => (m === modifier ? { ...m, [field]: value } : m)),
    );
  };

  const removeStatModifier = (modifier: StatModifier) => {
    onStatModifiersChange(statModifiers.filter((m) => m !== modifier));
  };

  const renderEffectRow = (effect: HealthEffect, index: number) => (
    <div
      key={index}
      className="space-y-3 p-4 bg-slate-800/30 dark:bg-slate-900/30 rounded-lg border border-cyan-500/20 dark:border-orange-500/20"
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Damage Type
          </label>
          <select
            value={effect.damageType || ""}
            onChange={(e) => updateEffect(effect, "damageType", e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
          >
            <option value="">Select</option>
            {damageTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Dice Count
          </label>
          <input
            type="number"
            placeholder="2"
            value={effect.diceCount || ""}
            onChange={(e) =>
              updateEffect(effect, "diceCount", Number(e.target.value))
            }
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Die
          </label>
          <select
            value={effect.diceSize || ""}
            onChange={(e) =>
              updateEffect(effect, "diceSize", Number(e.target.value))
            }
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
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
            value={effect.flat || 0}
            onChange={(e) =>
              updateEffect(effect, "flat", Number(e.target.value))
            }
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          type="button"
          onClick={() => removeEffect(effect)}
          className="px-4 py-3 bg-red-600/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all flex items-center justify-center"
        >
          <LuTrash2 size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Duration Type
          </label>
          <select
            value={effect.durationType || ""}
            onChange={(e) =>
              updateEffect(effect, "durationType", e.target.value)
            }
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
          >
            <option value="">None (instant)</option>
            {DURATION_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Duration (turns)
          </label>
          <input
            type="number"
            placeholder="0"
            value={effect.duration || 0}
            onChange={(e) =>
              updateEffect(effect, "duration", Number(e.target.value))
            }
            min="0"
            disabled={effect.durationType !== "turns"}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-40"
          />
        </div>
        <label className="flex items-center gap-2 text-slate-300 cursor-pointer pb-3">
          <input
            type="checkbox"
            checked={effect.persistent}
            onChange={(e) =>
              updateEffect(effect, "persistent", e.target.checked)
            }
            className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
          />
          <span>Persistent</span>
        </label>
      </div>
    </div>
  );

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuFlame size={20} />
        Combat Properties
      </h2>

      {/* Damage */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-slate-300">
            Damage
          </label>
          <button
            type="button"
            onClick={() => addEffect("damage")}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
          >
            <LuPlus size={16} />
            Add Damage
          </button>
        </div>
        <div className="space-y-4">{damage.map(renderEffectRow)}</div>
      </div>

      {/* Healing */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-slate-300">
            Healing
          </label>
          <button
            type="button"
            onClick={() => addEffect("healing")}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
          >
            <LuPlus size={16} />
            Add Healing
          </button>
        </div>
        <div className="space-y-4">{healing.map(renderEffectRow)}</div>
      </div>

      {/* Resistances */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-slate-300">
            Resistances
          </label>
          <button
            type="button"
            onClick={addResistance}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
          >
            <LuPlus size={16} />
            Add Resistance
          </button>
        </div>
        <div className="space-y-4">
          {resistances.map((resistance, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Damage Type
                </label>
                <select
                  value={resistance.damageType || ""}
                  onChange={(e) =>
                    updateResistance(resistance, "damageType", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
                >
                  <option value="">Select</option>
                  {damageTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rule
                </label>
                <select
                  value={resistance.rule || ""}
                  onChange={(e) =>
                    updateResistance(resistance, "rule", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
                >
                  <option value="">Select</option>
                  {RESISTANCE_RULE_OPTIONS.map((rule) => (
                    <option key={rule} value={rule}>
                      {rule}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeResistance(resistance)}
                className="px-4 py-3 bg-red-600/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all flex items-center justify-center"
              >
                <LuTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Properties */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Properties
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {propertyOptions.map((property) => (
            <label
              key={property}
              className="flex items-center gap-2 text-slate-300 cursor-pointer capitalize"
            >
              <input
                type="checkbox"
                checked={properties.includes(property)}
                onChange={() => toggleProperty(property)}
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span>{property}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stat Modifiers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-slate-300">
            Stat Modifiers
          </label>
          <button
            type="button"
            onClick={addStatModifier}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
          >
            <LuPlus size={16} />
            Add Modifier
          </button>
        </div>
        <div className="space-y-4">
          {statModifiers.map((modifier, index) => (
            <div
              key={index}
              className="space-y-3 p-4 bg-slate-800/30 dark:bg-slate-900/30 rounded-lg border border-cyan-500/20 dark:border-orange-500/20"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Stat / Skill
                  </label>
                  <select
                    value={modifier.stat || ""}
                    onChange={(e) =>
                      updateStatModifier(modifier, "stat", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
                  >
                    <option value="">Select</option>
                    {statOrSkillOptions.map((stat) => (
                      <option key={stat} value={stat}>
                        {stat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Value
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={modifier.value || 0}
                    onChange={(e) =>
                      updateStatModifier(
                        modifier,
                        "value",
                        Number(e.target.value),
                      )
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration Type
                  </label>
                  <select
                    value={modifier.durationType || ""}
                    onChange={(e) =>
                      updateStatModifier(
                        modifier,
                        "durationType",
                        e.target.value,
                      )
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
                  >
                    <option value="">None (permanent while equipped)</option>
                    {DURATION_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration (turns)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={modifier.duration || 0}
                    onChange={(e) =>
                      updateStatModifier(
                        modifier,
                        "duration",
                        Number(e.target.value),
                      )
                    }
                    min="0"
                    disabled={modifier.durationType !== "turns"}
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-40"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Target
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. self, wearer"
                    value={modifier.target || ""}
                    onChange={(e) =>
                      updateStatModifier(modifier, "target", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Optional note"
                      value={modifier.description || ""}
                      onChange={(e) =>
                        updateStatModifier(
                          modifier,
                          "description",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStatModifier(modifier)}
                    className="px-4 py-3 bg-red-600/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all flex items-center justify-center"
                  >
                    <LuTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
