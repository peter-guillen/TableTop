import { useState } from "react";
import { LuZap, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import {
  GrantedPower,
  SelfCharges,
  GrantedPowerRecharge,
  Recharge,
} from "../itemTypes";
import {
  formChipButton,
  formHeading,
  formInput,
  formLabel,
  formRemoveButton,
} from "../../../shared/styles/theme.ts";

// The subset of a Power that ItemSpecialSection needs to render its picker
interface PowerOption {
  _id: string;
  name: string;
  kind: string;
}

interface ItemSpecialSectionProps {
  grantedPowers: GrantedPower[];
  selfCharges: SelfCharges;
  uniqueSkills: string[];
  allPowers: PowerOption[];
  onGrantedPowersChange: (newData: GrantedPower[]) => void;
  onSelfChargesChange: <K extends keyof SelfCharges>(
    field: K,
    value: SelfCharges[K],
  ) => void;
  onUniqueSkillsChange: (newData: string[]) => void;
}

const GRANTED_POWER_RECHARGE_OPTIONS: GrantedPowerRecharge[] = [
  "unlimited",
  "none",
  "short_rest",
  "long_rest",
  "daily",
];

const SELF_CHARGES_RECHARGE_OPTIONS: Recharge[] = [
  "none",
  "short_rest",
  "long_rest",
  "daily",
];

export const ItemSpecialSection = ({
  grantedPowers = [],
  selfCharges,
  uniqueSkills = [],
  allPowers,
  onGrantedPowersChange,
  onSelfChargesChange,
  onUniqueSkillsChange,
}: ItemSpecialSectionProps) => {
  const [skillDraft, setSkillDraft] = useState("");

  // Granted Powers
  const addGrantedPower = () => {
    onGrantedPowersChange([
      ...grantedPowers,
      { power: "", recharge: "unlimited", usesPerRecharge: 0 },
    ]);
  };

  const updateGrantedPower = (
    grant: GrantedPower,
    field: keyof GrantedPower,
    value: string | number,
  ) => {
    onGrantedPowersChange(
      grantedPowers.map((g) => (g === grant ? { ...g, [field]: value } : g)),
    );
  };

  const removeGrantedPower = (grant: GrantedPower) => {
    onGrantedPowersChange(grantedPowers.filter((g) => g !== grant));
  };

  // Unique Skills (free-text chips)
  const addSkill = () => {
    const trimmed = skillDraft.trim();
    if (!trimmed || uniqueSkills.includes(trimmed)) return;
    onUniqueSkillsChange([...uniqueSkills, trimmed]);
    setSkillDraft("");
  };

  const removeSkill = (skill: string) => {
    onUniqueSkillsChange(uniqueSkills.filter((s) => s !== skill));
  };

  return (
    <section>
      <h2 className={formHeading}>
        <LuZap size={20} />
        Special
      </h2>

      {/* Granted Powers */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className={formLabel}>
            Granted Powers
          </label>
          <button
            type="button"
            onClick={addGrantedPower}
            className={formChipButton}
          >
            <LuPlus size={16} />
            Add Granted Power
          </button>
        </div>
        <div className="space-y-4">
          {grantedPowers.map((grant, index) => (
            <div
              key={index}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end"
            >
              <div className="col-span-2 md:col-span-1">
                <label className={`${formLabel} mb-2`}>
                  Power
                </label>
                <select
                  value={grant.power}
                  onChange={(e) =>
                    updateGrantedPower(grant, "power", e.target.value)
                  }
                  className={formInput}
                >
                  <option value="">Select power</option>
                  {allPowers.map((power) => (
                    <option key={power._id} value={power._id}>
                      {power.name} ({power.kind})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`${formLabel} mb-2`}>
                  Recharge
                </label>
                <select
                  value={grant.recharge}
                  onChange={(e) =>
                    updateGrantedPower(grant, "recharge", e.target.value)
                  }
                  className={`${formInput} capitalize`}
                >
                  {GRANTED_POWER_RECHARGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`${formLabel} mb-2`}>
                  Uses / Recharge
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={grant.usesPerRecharge || 0}
                  onChange={(e) =>
                    updateGrantedPower(
                      grant,
                      "usesPerRecharge",
                      Number(e.target.value),
                    )
                  }
                  min="0"
                  disabled={grant.recharge === "unlimited"}
                  className={formInput}
                />
              </div>
              <button
                type="button"
                onClick={() => removeGrantedPower(grant)}
                className={formRemoveButton}
              >
                <LuTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Self Charges */}
      <div className="mb-8">
        <label className={`${formLabel} mb-3`}>
          Self Charges
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`${formLabel} mb-2`}>
              Uses Remaining
            </label>
            <input
              type="number"
              placeholder="0"
              value={selfCharges.usesRemaining || 0}
              onChange={(e) =>
                onSelfChargesChange("usesRemaining", Number(e.target.value))
              }
              min="0"
              className={formInput}
            />
          </div>
          <div>
            <label className={`${formLabel} mb-2`}>
              Recharge
            </label>
            <select
              value={selfCharges.recharge}
              onChange={(e) =>
                onSelfChargesChange("recharge", e.target.value as Recharge)
              }
              className={`${formInput} capitalize`}
            >
              {SELF_CHARGES_RECHARGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Unique Skills */}
      <div>
        <label className={`${formLabel} mb-3`}>
          Unique Skills
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter a unique skill and press Add"
            value={skillDraft}
            onChange={(e) => setSkillDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            className="flex-1 px-4 py-3 bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400 focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={addSkill}
            className="flex items-center gap-1 px-4 py-3 text-sm bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 rounded-lg border border-emerald-300 dark:border-emerald-500/40 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all"
          >
            <LuPlus size={16} />
            Add
          </button>
        </div>
        {uniqueSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {uniqueSkills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-500/40"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  <LuX size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
