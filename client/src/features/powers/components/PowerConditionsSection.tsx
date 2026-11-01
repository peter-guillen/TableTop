import { LuFlame, LuPlus, LuTrash2 } from "react-icons/lu";
import { Condition } from "../powerTypes";
import { StatModifier } from "../../../shared/constants/constantTypes";
import { useGetAllConditionsQuery } from "../../conditions/api/conditionApi";
import {
  formCheckbox,
  formChipButton,
  formHeading,
  formInput,
  formLabel,
  formRemoveButton,
} from "../../../shared/styles/theme.ts";

interface PowerConditionsProps {
  statModifiers: StatModifier[];
  conditions: Condition[];
  onStatModifiersChange: (newModifiers: StatModifier[]) => void;
  onConditionsChange: (newConditions: Condition[]) => void;
}

export const PowerConditionsSection = ({
  statModifiers,
  conditions,
  onStatModifiersChange,
  onConditionsChange,
}: PowerConditionsProps) => {
  const {
    data: allConditions = [],
    isLoading,
    isError,
  } = useGetAllConditionsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const isConditionSelected = (conditionId: string) =>
    conditions.some((c) => c.condition === conditionId);

  const getSelectedCondition = (conditionId: string) =>
    conditions.find((c) => c.condition === conditionId);

  const handleConditionToggle = (conditionId: string) => {
    if (isConditionSelected(conditionId)) {
      onConditionsChange(conditions.filter((c) => c.condition !== conditionId));
    } else {
      onConditionsChange([
        ...conditions,
        { condition: conditionId, durationType: "turns", duration: 1 },
      ]);
    }
  };

  const handleConditionFieldChange = (
    conditionId: string,
    field: keyof Condition,
    value: string | number,
  ) => {
    onConditionsChange(
      conditions.map((c) =>
        c.condition === conditionId ? { ...c, [field]: value } : c,
      ),
    );
  };

  const handleAddModifier = () => {
    onStatModifiersChange([
      ...statModifiers,
      {
        stat: "",
        value: 0,
        durationType: "turns",
        duration: 0,
        target: "",
        description: "",
      },
    ]);
  };

  const handleModifierChange = (
    index: number,
    field: keyof StatModifier,
    value: string,
  ) => {
    const updated = [...statModifiers];
    updated[index] = { ...updated[index], [field]: value };
    onStatModifiersChange(updated);
  };

  const handleRemoveModifier = (index: number) => {
    onStatModifiersChange(statModifiers.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h2 className={formHeading}>
        <LuFlame size={20} />
        Effects & Conditions
      </h2>
      <div className="space-y-6">
        {/* Buffs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className={formLabel}>
              Buffs & Debuffs
            </label>
            <button
              type="button"
              onClick={handleAddModifier}
              className={formChipButton}
            >
              <LuPlus size={16} />
              Add Buff/Debuff
            </button>
          </div>
          <div className="space-y-4">
            {statModifiers &&
              statModifiers.map((modifier, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                >
                  <div>
                    <label className={`${formLabel} mb-2`}>
                      Stat
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., armor, damage"
                      value={modifier.stat || ""}
                      onChange={(e) =>
                        handleModifierChange(index, "stat", e.target.value)
                      }
                      className={formInput}
                    />
                  </div>
                  <div>
                    <label className={`${formLabel} mb-2`}>
                      Value
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., +2, +1d4"
                      value={modifier.value || 0}
                      onChange={(e) =>
                        handleModifierChange(index, "value", e.target.value)
                      }
                      className={formInput}
                    />
                  </div>
                  <div>
                    <label className={`${formLabel} mb-2`}>
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 1 hour, concentration"
                      value={modifier.duration || ""}
                      onChange={(e) =>
                        handleModifierChange(index, "duration", e.target.value)
                      }
                      className={formInput}
                    />
                  </div>
                  <div>
                    <label className={`${formLabel} mb-2`}>
                      Target
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., self, enemy"
                      value={modifier.target}
                      onChange={(e) =>
                        handleModifierChange(index, "target", e.target.value)
                      }
                      className={formInput}
                    />
                  </div>
                  <div>
                    <label className={`${formLabel} mb-2`}>
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="double damage"
                      value={modifier.description}
                      onChange={(e) =>
                        handleModifierChange(
                          index,
                          "description",
                          e.target.value,
                        )
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

        {/* Conditions */}
        <div>
          <label className={`${formLabel} mb-2`}>
            Conditions
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allConditions.map((condition) => (
              <div
                key={condition._id}
                className="bg-stone-100 dark:bg-stone-900/30 p-3 rounded-lg border border-stone-300 dark:border-emerald-500/20"
              >
                <label className="flex items-center gap-2 text-stone-700 dark:text-stone-300 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={isConditionSelected(condition._id)}
                    onChange={() => handleConditionToggle(condition._id)}
                    className={formCheckbox}
                  />
                  <span className="capitalize text-sm">{condition.name}</span>
                </label>

                {isConditionSelected(condition._id) && (
                  <div className="grid grid-cols-2 gap-2 pl-6">
                    <select
                      value={getSelectedCondition(condition._id)?.durationType}
                      onChange={(e) =>
                        handleConditionFieldChange(
                          condition._id,
                          "durationType",
                          e.target.value,
                        )
                      }
                      className="px-2 py-2 text-sm bg-white dark:bg-stone-900/50 border border-stone-300 dark:border-emerald-500/30 rounded-lg text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-500"
                    >
                      <option value="turns">Turns</option>
                      <option value="until_broken">Until broken</option>
                      <option value="permanent">Permanent</option>
                    </select>

                    {getSelectedCondition(condition._id)?.durationType ===
                      "turns" && (
                      <input
                        type="number"
                        min={1}
                        placeholder="Duration (turns)"
                        value={
                          getSelectedCondition(condition._id)?.duration ?? ""
                        }
                        onChange={(e) =>
                          handleConditionFieldChange(
                            condition._id,
                            "duration",
                            Number(e.target.value),
                          )
                        }
                        className="px-2 py-2 text-sm bg-white dark:bg-stone-900/50 border border-stone-300 dark:border-emerald-500/30 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-500"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
