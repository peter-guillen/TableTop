import { Power, PowerSchool } from "../powerTypes";
import { LuBookOpen } from "react-icons/lu";
import {
  EffectType,
  DamageType,
  OffensiveStat,
} from "../../../shared/constants/constantTypes";

interface PowerBasicInfoProps {
  name: string;
  school: PowerSchool | "";
  tier: number;
  offensiveStat: OffensiveStat;
  offensiveStatOptions: OffensiveStat[];
  damageType: DamageType[];
  damageTypeOptions: DamageType[];
  effectType: EffectType[];
  effectTypeOptions: EffectType[];

  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onTierChange: (value: number) => void;
  onCheckedChange: (
    fieldName: keyof Power,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const PowerBasicInfoSection = ({
  name,
  school,
  tier,
  offensiveStat,
  offensiveStatOptions,
  damageType,
  damageTypeOptions,
  effectType,
  effectTypeOptions,
  onInputChange,
  onTierChange,
  onCheckedChange,
}: PowerBasicInfoProps) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Power Name
          </label>
          <input
            type="text"
            placeholder="Enter power name"
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
            <option value="" disabled>
              Select School
            </option>
            <option value="evocation">Evocation</option>
            <option value="abjuration">Abjuration</option>
            <option value="conjuration">Conjuration</option>
            <option value="divination">Divination</option>
            <option value="enchantment">Enchantment</option>
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
            onChange={(e) => onTierChange(Number(e.target.value))}
            value={tier}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value={1}>Tier 1</option>
            <option value={2}>Tier 2</option>
            <option value={3}>Tier 3</option>
            <option value={4}>Tier 4</option>
            <option value={5}>Tier 5</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Offensive Stat
          </label>
          <select
            name="offensiveStat"
            onChange={onInputChange}
            value={offensiveStat}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            {offensiveStatOptions.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Element
        </label>
        {damageTypeOptions.length === 0 ? (
          <p className="text-sm text-slate-500">Loading options…</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {damageTypeOptions.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-cyan-500/20 dark:border-orange-500/20 hover:border-cyan-500/40 dark:hover:border-orange-500/40 transition-all"
              >
                <input
                  type="checkbox"
                  value={tag}
                  checked={damageType.includes(tag)}
                  onChange={onCheckedChange("damageType")}
                  className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                />
                <span className="capitalize">{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tags
        </label>
        {effectTypeOptions.length === 0 ? (
          <p className="text-sm text-slate-500">Loading options…</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {effectTypeOptions.map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-cyan-500/20 dark:border-orange-500/20 hover:border-cyan-500/40 dark:hover:border-orange-500/40 transition-all"
              >
                <input
                  type="checkbox"
                  value={tag}
                  checked={effectType.includes(tag)}
                  onChange={onCheckedChange("effectType")}
                  className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                />
                <span className="capitalize">{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
