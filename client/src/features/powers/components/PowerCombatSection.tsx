// import { HealthEffect } from "../../../shared/constants/constantTypes";
import { LuFlame, LuPlus, LuTrash2 } from "react-icons/lu";
import {
  Targeting,
  TargetCategory,
  TargetShape,
  DamageType,
  HealthEffect,
} from "../powerTypes";
import {
  formChipButton,
  formHeading,
  formInput,
  formLabel,
  formRemoveButton,
} from "../../../shared/styles/theme.ts";

interface PowerCombatSectionProps {
  targeting: Targeting;
  healthEffects: HealthEffect[];
  damageTypeOptions: DamageType[];
  onTargetingChange: <K extends keyof Targeting>(
    field: K,
    value: Targeting[K],
  ) => void;
  onHealthChange: (newData: HealthEffect[]) => void;
}

export const PowerCombatSection = ({
  targeting,
  healthEffects = [],
  damageTypeOptions,
  onTargetingChange,
  onHealthChange,
}: PowerCombatSectionProps) => {
  const damage = healthEffects.filter((e) => e.direction === "damage");
  const healing = healthEffects.filter((e) => e.direction === "healing");

  const addEffect = (direction: HealthEffect["direction"]) => {
    onHealthChange([
      ...healthEffects,
      {
        direction,
        diceCount: 0,
        diceSize: 0,
        flat: 0,
        persistent: false,
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

  return (
    <section>
      <h2 className={formHeading}>
        <LuFlame size={20} />
        Combat Properties
      </h2>

      {/* Targeting */}
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`${formLabel} mb-2`}>Target Category *</label>
            <select
              name="targetCategory"
              onChange={(e) =>
                onTargetingChange(
                  "targetCategory",
                  e.target.value as TargetCategory,
                )
              }
              value={targeting.targetCategory}
              required
              className={`${formInput} capitalize`}
            >
              <option value="creature">Creature</option>
              <option value="object">Object</option>
              <option value="point">Point</option>
            </select>
          </div>

          <div>
            <label className={`${formLabel} mb-2`}>Target Count *</label>
            <input
              type="number"
              placeholder="1"
              name="targetCount"
              onChange={(e) =>
                onTargetingChange("targetCount", Number(e.target.value))
              }
              value={targeting.targetCount}
              min="0"
              required
              className={formInput}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`${formLabel} mb-2`}>Range (ft) *</label>
            <input
              type="number"
              placeholder="0"
              name="range"
              onChange={(e) =>
                onTargetingChange("range", Number(e.target.value))
              }
              value={targeting.range}
              min="0"
              required
              className={formInput}
            />
          </div>

          <div>
            <label className={`${formLabel} mb-2`}>Area Shape</label>
            <select
              name="shape"
              onChange={(e) =>
                onTargetingChange(
                  "shape",
                  (e.target.value || undefined) as TargetShape | undefined,
                )
              }
              value={targeting.shape ?? ""}
              className={`${formInput} capitalize`}
            >
              <option value="">None</option>
              <option value="sphere">Sphere</option>
              <option value="cone">Cone</option>
              <option value="line">Line</option>
              <option value="cube">Cube</option>
              <option value="wall">Wall</option>
              <option value="cylinder">Cylinder</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`${formLabel} mb-2`}>Area Size (ft)</label>
            <input
              type="number"
              placeholder="0"
              name="size"
              onChange={(e) =>
                onTargetingChange("size", Number(e.target.value))
              }
              value={targeting.size ?? 0}
              min="0"
              disabled={!targeting.shape}
              className={formInput}
            />
          </div>
        </div>
      </div>

      {/* Damage Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className={formLabel}>Damage</label>
          <button
            type="button"
            onClick={() => addEffect("damage")}
            className={formChipButton}
          >
            <LuPlus size={16} />
            Add Damage
          </button>
        </div>

        <div className="space-y-4">
          {damage.map((dmg, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end"
            >
              <div>
                <label className={`${formLabel} mb-2`}>Damage Type</label>
                <select
                  value={dmg.damageType || ""}
                  onChange={(e) =>
                    updateEffect(dmg, "damageType", e.target.value)
                  }
                  className={`${formInput} capitalize`}
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
                <label className={`${formLabel} mb-2`}>Dice Count</label>
                <input
                  type="number"
                  placeholder="2"
                  value={dmg.diceCount || ""}
                  onChange={(e) =>
                    updateEffect(dmg, "diceCount", Number(e.target.value))
                  }
                  className={formInput}
                />
              </div>
              <div>
                <label className={`${formLabel} mb-2`}>Type</label>
                <select
                  value={dmg.diceSize || ""}
                  onChange={(e) =>
                    updateEffect(dmg, "diceSize", Number(e.target.value))
                  }
                  className={`${formInput} capitalize`}
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
                <label className={`${formLabel} mb-2`}>Modifier</label>
                <input
                  type="number"
                  placeholder="0"
                  value={dmg.flat || 0}
                  onChange={(e) =>
                    updateEffect(dmg, "flat", Number(e.target.value))
                  }
                  className={formInput}
                />
              </div>
              <button
                type="button"
                onClick={() => removeEffect(dmg)}
                className={formRemoveButton}
              >
                <LuTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Healing Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className={formLabel}>Healing</label>
          <button
            type="button"
            onClick={() => addEffect("healing")}
            className={formChipButton}
          >
            <LuPlus size={16} />
            Add Healing
          </button>
        </div>

        <div className="space-y-4">
          {healing.map((heal, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end"
            >
              <div>
                <label className={`${formLabel} mb-2`}>Damage Type</label>
                <select
                  value={heal.damageType || ""}
                  onChange={(e) =>
                    updateEffect(heal, "damageType", e.target.value)
                  }
                  className={`${formInput} capitalize`}
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
                <label className={`${formLabel} mb-2`}>Dice Count</label>
                <input
                  type="number"
                  placeholder="2"
                  value={heal.diceCount || ""}
                  onChange={(e) =>
                    updateEffect(heal, "diceCount", Number(e.target.value))
                  }
                  className={formInput}
                />
              </div>
              <div>
                <label className={`${formLabel} mb-2`}>Type</label>
                <select
                  value={heal.diceSize || ""}
                  onChange={(e) =>
                    updateEffect(heal, "diceSize", Number(e.target.value))
                  }
                  className={`${formInput} capitalize`}
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
                <label className={`${formLabel} mb-2`}>Modifier</label>
                <input
                  type="number"
                  placeholder="0"
                  value={heal.flat || 0}
                  onChange={(e) =>
                    updateEffect(heal, "flat", Number(e.target.value))
                  }
                  className={formInput}
                />
              </div>
              <button
                type="button"
                onClick={() => removeEffect(heal)}
                className={formRemoveButton}
              >
                <LuTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
