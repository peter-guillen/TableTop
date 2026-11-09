import { LuStar, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import {
  LevelGrant,
  LevelReward,
  PowerGroup,
  Stats,
} from "../../../shared/constants/constantTypes";
import {
  formChipButton,
  formInput,
  formHeading,
  formLabel,
  formRemoveButton,
  inkDanger,
  inkSubtle,
  line,
} from "../../../shared/styles/theme.ts";

// Spells, abilities and traits can be granted (techniques come from weapons)
interface PowerOption {
  _id: string;
  name: string;
  kind: string;
}

interface ProfessionLevelsProps {
  levelRewards: LevelReward[];
  maxLevel: number;
  statOptions: Stats[];
  powerOptions: PowerOption[];
  onLevelRewardsChange: (newRewards: LevelReward[]) => void;
}

const GRANT_TYPE_LABELS: Record<LevelGrant["type"], string> = {
  auto: "Auto (always granted)",
  professionChoice: "Profession choice (pick 1 of 2+)",
  playerChoice: "Free pick (any power)",
};

const POWER_GROUPS: PowerGroup[] = ["spells", "abilities", "traits"];

export const ProfessionLevelsSection = ({
  levelRewards,
  maxLevel,
  statOptions,
  powerOptions,
  onLevelRewardsChange,
}: ProfessionLevelsProps) => {
  // Every level from 1 to maxLevel gets a card, saved or not
  const levels = Array.from({ length: maxLevel }, (_, i) => i + 1);

  // Replace this level's reward, or add it if it isn't saved yet
  const updateLevel = (updated: LevelReward) => {
    const exists = levelRewards.some((r) => r.level === updated.level);
    onLevelRewardsChange(
      exists
        ? levelRewards.map((r) => (r.level === updated.level ? updated : r))
        : [...levelRewards, updated],
    );
  };

  return (
    <section>
      <h2 className={formHeading}>
        <LuStar size={20} />
        Level Rewards
      </h2>
      <p className={`text-sm mb-4 ${inkSubtle}`}>
        What a character gains on reaching each level.
      </p>

      <div className="space-y-4">
        {levels.map((level) => {
          const reward: LevelReward = levelRewards.find(
            (r) => r.level === level,
          ) ?? { level, grants: [], statIncreases: [], slotIncreases: [] };
          const grants = reward.grants;
          const statIncreases = reward.statIncreases ?? [];
          const slotIncreases = reward.slotIncreases ?? [];
          const isEmpty =
            grants.length === 0 &&
            statIncreases.length === 0 &&
            slotIncreases.length === 0;

          const setGrants = (next: LevelGrant[]) =>
            updateLevel({ ...reward, grants: next });
          const setStatIncreases = (next: LevelReward["statIncreases"]) =>
            updateLevel({ ...reward, statIncreases: next });
          const setSlotIncreases = (next: LevelReward["slotIncreases"]) =>
            updateLevel({ ...reward, slotIncreases: next });

          return (
            <div key={level} className={`rounded-xl border p-4 ${line}`}>
              {/* Level header + add buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-300">
                  Level {level}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setGrants([...grants, { type: "auto", trait: "" }])
                    }
                    className={formChipButton}
                  >
                    <LuPlus size={14} />
                    Grant
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setStatIncreases([
                        ...statIncreases,
                        { stat: statOptions[0] ?? "hpMax", value: 1 },
                      ])
                    }
                    className={formChipButton}
                  >
                    <LuPlus size={14} />
                    Stat
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSlotIncreases([
                        ...slotIncreases,
                        { group: "spells", value: 1 },
                      ])
                    }
                    className={formChipButton}
                  >
                    <LuPlus size={14} />
                    Slot
                  </button>
                </div>
              </div>

              {isEmpty && (
                <p className={`text-sm italic ${inkSubtle}`}>
                  Nothing at this level.
                </p>
              )}

              <div className="space-y-3">
                {/* Grants */}
                {grants.map((grant, gi) => {
                  const updateGrant = (next: LevelGrant) =>
                    setGrants(grants.map((g, i) => (i === gi ? next : g)));
                  const options = grant.options ?? [];
                  // Same rules the form checks before saving
                  const error =
                    grant.type === "auto" && !grant.trait
                      ? "Pick the power this level grants."
                      : grant.type === "professionChoice" && options.length < 2
                        ? "Pick at least 2 powers to choose from."
                        : "";

                  return (
                    <div key={`grant-${gi}`}>
                      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] gap-3 items-start">
                        <div>
                          <label className={`${formLabel} mb-1`}>Grant</label>
                          <select
                            value={grant.type}
                            onChange={(e) => {
                              const type = e.target.value as LevelGrant["type"];
                              // Each type carries different fields, so start fresh
                              updateGrant(
                                type === "auto"
                                  ? { type, trait: "" }
                                  : type === "professionChoice"
                                    ? { type, options: [] }
                                    : { type },
                              );
                            }}
                            className={formInput}
                          >
                            {(
                              Object.keys(GRANT_TYPE_LABELS) as LevelGrant["type"][]
                            ).map((type) => (
                              <option key={type} value={type}>
                                {GRANT_TYPE_LABELS[type]}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          {grant.type === "auto" && (
                            <>
                              <label className={`${formLabel} mb-1`}>
                                Power
                              </label>
                              <select
                                value={grant.trait ?? ""}
                                onChange={(e) =>
                                  updateGrant({ ...grant, trait: e.target.value })
                                }
                                className={formInput}
                              >
                                <option value="" disabled>
                                  Select Power
                                </option>
                                {powerOptions.map((power) => (
                                  <option key={power._id} value={power._id}>
                                    {power.name} ({power.kind})
                                  </option>
                                ))}
                              </select>
                            </>
                          )}

                          {grant.type === "professionChoice" && (
                            <>
                              <label className={`${formLabel} mb-1`}>
                                Options
                              </label>
                              {options.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {options.map((id) => (
                                    <span
                                      key={id}
                                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm ${line}`}
                                    >
                                      {powerOptions.find((p) => p._id === id)
                                        ?.name ?? id}
                                      <button
                                        type="button"
                                        aria-label="Remove option"
                                        onClick={() =>
                                          updateGrant({
                                            ...grant,
                                            options: options.filter(
                                              (o) => o !== id,
                                            ),
                                          })
                                        }
                                        className="hover:text-red-500"
                                      >
                                        <LuX size={12} />
                                      </button>
                                    </span>
                                  ))}
                                </div>
                              )}
                              <select
                                value=""
                                onChange={(e) =>
                                  updateGrant({
                                    ...grant,
                                    options: [...options, e.target.value],
                                  })
                                }
                                className={formInput}
                              >
                                <option value="" disabled>
                                  Add an option
                                </option>
                                {powerOptions
                                  .filter((p) => !options.includes(p._id))
                                  .map((power) => (
                                    <option key={power._id} value={power._id}>
                                      {power.name} ({power.kind})
                                    </option>
                                  ))}
                              </select>
                            </>
                          )}

                          {grant.type === "playerChoice" && (
                            <p className={`text-sm md:mt-8 ${inkSubtle}`}>
                              The player picks any spell, ability or trait.
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          aria-label="Remove grant"
                          onClick={() =>
                            setGrants(grants.filter((_, i) => i !== gi))
                          }
                          className={`${formRemoveButton} md:mt-6`}
                        >
                          <LuTrash2 size={16} />
                        </button>
                      </div>
                      {error && (
                        <p role="alert" className={`mt-1 text-sm ${inkDanger}`}>
                          {error}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Stat increases */}
                {statIncreases.map((increase, si) => (
                  <div
                    key={`stat-${si}`}
                    className="grid grid-cols-[minmax(0,1fr)_100px_auto] gap-3 items-end"
                  >
                    <div>
                      <label className={`${formLabel} mb-1`}>Stat</label>
                      <select
                        value={increase.stat}
                        onChange={(e) =>
                          setStatIncreases(
                            statIncreases.map((s, i) =>
                              i === si
                                ? { ...s, stat: e.target.value as Stats }
                                : s,
                            ),
                          )
                        }
                        className={formInput}
                      >
                        {statOptions.map((stat) => (
                          <option key={stat} value={stat}>
                            {stat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`${formLabel} mb-1`}>Increase</label>
                      <input
                        type="number"
                        value={increase.value}
                        onChange={(e) =>
                          setStatIncreases(
                            statIncreases.map((s, i) =>
                              i === si
                                ? { ...s, value: Number(e.target.value) }
                                : s,
                            ),
                          )
                        }
                        className={formInput}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Remove stat increase"
                      onClick={() =>
                        setStatIncreases(
                          statIncreases.filter((_, i) => i !== si),
                        )
                      }
                      className={formRemoveButton}
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </div>
                ))}

                {/* Slot increases */}
                {slotIncreases.map((increase, si) => (
                  <div
                    key={`slot-${si}`}
                    className="grid grid-cols-[minmax(0,1fr)_100px_auto] gap-3 items-end"
                  >
                    <div>
                      <label className={`${formLabel} mb-1`}>Power slots</label>
                      <select
                        value={increase.group}
                        onChange={(e) =>
                          setSlotIncreases(
                            slotIncreases.map((s, i) =>
                              i === si
                                ? { ...s, group: e.target.value as PowerGroup }
                                : s,
                            ),
                          )
                        }
                        className={`${formInput} capitalize`}
                      >
                        {POWER_GROUPS.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`${formLabel} mb-1`}>Increase</label>
                      <input
                        type="number"
                        min={1}
                        value={increase.value}
                        onChange={(e) =>
                          setSlotIncreases(
                            slotIncreases.map((s, i) =>
                              i === si
                                ? { ...s, value: Number(e.target.value) }
                                : s,
                            ),
                          )
                        }
                        className={formInput}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Remove slot increase"
                      onClick={() =>
                        setSlotIncreases(
                          slotIncreases.filter((_, i) => i !== si),
                        )
                      }
                      className={formRemoveButton}
                    >
                      <LuTrash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
