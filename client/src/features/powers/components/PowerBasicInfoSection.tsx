import { SpellSchool, PowerKind } from "../powerTypes";
import { LuBookOpen } from "react-icons/lu";
import { OffensiveStat } from "../../../shared/constants/constantTypes";
import {
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface PowerBasicInfoProps {
  name: string;
  kind: PowerKind;
  school: SpellSchool | "";
  offensiveStat: OffensiveStat;
  offensiveStatOptions: OffensiveStat[];

  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const PowerBasicInfoSection = ({
  name,
  kind,
  school,
  offensiveStat,
  offensiveStatOptions,
  onInputChange,
}: PowerBasicInfoProps) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className={`${formLabel} mb-2`}>
            Power Name
          </label>
          <input
            type="text"
            placeholder="Enter power name"
            name="name"
            onChange={onInputChange}
            value={name}
            required
            className={formInput}
          />
        </div>

        <div>
          <label className={`${formLabel} mb-2`}>
            Kind
          </label>
          <select
            name="kind"
            onChange={onInputChange}
            value={kind}
            required
            className={`${formInput} capitalize`}
          >
            <option value="" disabled>
              Select Kind
            </option>
            <option value="spell">Spell</option>
            <option value="technique">Technique</option>
            <option value="ability">Ability</option>
            <option value="trait">Trait</option>
          </select>
        </div>

        {/* School only applies to spells — hook throws if a non-spell declares one */}
        {kind === "spell" && (
          <div>
            <label className={`${formLabel} mb-2`}>
              School of Magic
            </label>
            <select
              name="school"
              onChange={onInputChange}
              value={school}
              required
              className={formInput}
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
        )}

        <div>
          <label className={`${formLabel} mb-2`}>
            Offensive Stat
          </label>
          <select
            name="offensiveStat"
            onChange={onInputChange}
            value={offensiveStat}
            required
            className={formInput}
          >
            {offensiveStatOptions.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
