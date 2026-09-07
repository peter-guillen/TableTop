import { useState } from "react";
import { LuZap, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import {
  GrantedPower,
  SelfCharges,
  GrantedPowerRecharge,
  Recharge,
} from "../itemTypes";

// TODO: swap for the real Power type once its import path is confirmed —
// this is just the subset ItemSpecialSection actually needs to render a picker.
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
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuZap size={20} />
        Special
      </h2>

      {/* Granted Powers */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-slate-300">
            Granted Powers
          </label>
          <button
            type="button"
            onClick={addGrantedPower}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
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
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Power
                </label>
                <select
                  value={grant.power}
                  onChange={(e) =>
                    updateGrantedPower(grant, "power", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
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
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Recharge
                </label>
                <select
                  value={grant.recharge}
                  onChange={(e) =>
                    updateGrantedPower(grant, "recharge", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
                >
                  {GRANTED_POWER_RECHARGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
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
                  className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-40"
                />
              </div>
              <button
                type="button"
                onClick={() => removeGrantedPower(grant)}
                className="px-4 py-3 bg-red-600/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-600/30 transition-all flex items-center justify-center"
              >
                <LuTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Self Charges */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Self Charges
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
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
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Recharge
            </label>
            <select
              value={selfCharges.recharge}
              onChange={(e) =>
                onSelfChargesChange("recharge", e.target.value as Recharge)
              }
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
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
        <label className="block text-sm font-medium text-slate-300 mb-3">
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
            className="flex-1 px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={addSkill}
            className="flex items-center gap-1 px-4 py-3 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-lg border border-cyan-500/30 dark:border-orange-500/30 hover:bg-cyan-600/30 dark:hover:bg-orange-600/30 transition-all"
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
                className="flex items-center gap-1 px-3 py-1 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-full border border-cyan-500/30 dark:border-orange-500/30"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-white transition-all"
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
