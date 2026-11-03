import { LuShield, LuPlus, LuTrash2 } from "react-icons/lu";
import { Resistance, ResistanceRule } from "../speciesTypes";
import {
  DamageType,
  StatModifier,
} from "../../../shared/constants/constantTypes";
import {
  formChipButton,
  formHeading,
  formInput,
  formLabel,
  formRemoveButton,
} from "../../../shared/styles/theme.ts";

interface SpeciesStatsProps {
  statModifiers: StatModifier[];
  resistances: Resistance[];
  statOptions: string[];
  damageTypeOptions: DamageType[];
  onStatModifiersChange: (newModifiers: StatModifier[]) => void;
  onResistancesChange: (newResistances: Resistance[]) => void;
}

const RESISTANCE_RULE_OPTIONS: ResistanceRule[] = [
  "resistance",
  "vulnerability",
  "immunity",
  "absorption",
];

export const SpeciesStatsSection = ({
  statModifiers,
  resistances,
  statOptions,
  damageTypeOptions,
  onStatModifiersChange,
  onResistancesChange,
}: SpeciesStatsProps) => {
  // Stat Modifiers — a species bonus is always permanent and applies to self
  const handleAddModifier = () => {
    onStatModifiersChange([
      ...statModifiers,
      {
        stat: "",
        value: 0,
        durationType: "permanent",
        target: "self",
        description: "",
      },
    ]);
  };

  const handleModifierChange = (
    index: number,
    field: keyof StatModifier,
    value: string | number,
  ) => {
    const updated = [...statModifiers];
    updated[index] = { ...updated[index], [field]: value };
    onStatModifiersChange(updated);
  };

  const handleRemoveModifier = (index: number) => {
    onStatModifiersChange(statModifiers.filter((_, i) => i !== index));
  };

  // Resistances
  const handleAddResistance = () => {
    onResistancesChange([...resistances, { damageType: "", rule: "" }]);
  };

  const handleResistanceChange = (
    index: number,
    field: keyof Resistance,
    value: string,
  ) => {
    const updated = [...resistances];
    updated[index] = { ...updated[index], [field]: value };
    onResistancesChange(updated);
  };

  const handleRemoveResistance = (index: number) => {
    onResistancesChange(resistances.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h2 className={formHeading}>
        <LuShield size={20} />
        Stats & Resistances
      </h2>
      <div className="space-y-6">
        {/* Stat Modifiers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className={formLabel}>Stat Modifiers</label>
            <button
              type="button"
              onClick={handleAddModifier}
              className={formChipButton}
            >
              <LuPlus size={16} />
              Add Modifier
            </button>
          </div>
          <div className="space-y-4">
            {statModifiers.map((modifier, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_120px_2fr_auto] gap-4 items-end"
              >
                <div>
                  <label className={`${formLabel} mb-2`}>Stat</label>
                  <select
                    value={modifier.stat}
                    onChange={(e) =>
                      handleModifierChange(index, "stat", e.target.value)
                    }
                    required
                    className={`${formInput} capitalize`}
                  >
                    <option value="" disabled>
                      Select Stat
                    </option>
                    {statOptions.map((stat) => (
                      <option key={stat} value={stat}>
                        {stat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`${formLabel} mb-2`}>Value</label>
                  <input
                    type="number"
                    placeholder="e.g., 1, -1"
                    value={modifier.value}
                    onChange={(e) =>
                      handleModifierChange(
                        index,
                        "value",
                        Number(e.target.value),
                      )
                    }
                    className={formInput}
                  />
                </div>
                <div>
                  <label className={`${formLabel} mb-2`}>Description</label>
                  <input
                    type="text"
                    placeholder="e.g., Dwarven toughness"
                    value={modifier.description}
                    onChange={(e) =>
                      handleModifierChange(index, "description", e.target.value)
                    }
                    className={formInput}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveModifier(index)}
                  className={formRemoveButton}
                >
                  <LuTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resistances */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className={formLabel}>Resistances</label>
            <button
              type="button"
              onClick={handleAddResistance}
              className={formChipButton}
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
                  <label className={`${formLabel} mb-2`}>Damage Type</label>
                  <select
                    value={resistance.damageType}
                    onChange={(e) =>
                      handleResistanceChange(
                        index,
                        "damageType",
                        e.target.value,
                      )
                    }
                    required
                    className={`${formInput} capitalize`}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {damageTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`${formLabel} mb-2`}>Rule</label>
                  <select
                    value={resistance.rule}
                    onChange={(e) =>
                      handleResistanceChange(index, "rule", e.target.value)
                    }
                    required
                    className={`${formInput} capitalize`}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {RESISTANCE_RULE_OPTIONS.map((rule) => (
                      <option key={rule} value={rule}>
                        {rule}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveResistance(index)}
                  className={formRemoveButton}
                >
                  <LuTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
