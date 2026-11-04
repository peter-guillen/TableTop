import { useState } from "react";

import { useGetAllProfessionsQuery } from "../../professions/api/professionApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import type {
  CharacterSectionProps,
  PassiveStatKey,
} from "../charactersTypes";
import type { PowerGroup } from "../../../shared/constants/constantTypes";

// Techniques are left out on purpose: they come from weapon properties
const KIND_TO_GROUP: Record<string, PowerGroup> = {
  spell: "spells",
  ability: "abilities",
  trait: "traits",
};

const GROUP_LABELS: Record<PowerGroup, string> = {
  spells: "Spells",
  abilities: "Abilities",
  traits: "Traits",
};

const STAT_LABELS: Record<string, string> = {
  hpMax: "HP Max",
  mpMax: "MP Max",
  momMax: "Momentum Max",
};

const PILL =
  "text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700";

const LABEL =
  "text-[10px] font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400";

export const CharacterProgression = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  const { data: professions = [] } = useGetAllProfessionsQuery();
  const { data: allPowers = [] } = useGetAllPowersQuery();
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [preview, setPreview] = useState<number | null>(null);

  const { mode, archetype, progression, powers, stats } = formData;
  const { level, claimedLevel, powerSlots } = progression;
  const maxLevel = constants.MAX_LEVEL;

  const profession = professions.find((p) => p._id === archetype.profession);
  const track =
    mode === "classless"
      ? constants.CLASSLESS_LEVEL_REWARDS
      : (profession?.levelRewards ?? []);
  const hasTrack = mode === "classless" || Boolean(profession);

  const nextLevel = claimedLevel + 1;
  const pending = hasTrack && claimedLevel < level;
  const reward = track.find((r) => r.level === nextLevel);
  const grants = reward?.grants ?? [];

  // Slot increases land before picks, so this level's picks can use the new slots
  const slotsAfter = { ...powerSlots };
  (reward?.slotIncreases ?? []).forEach(({ group, value }) => {
    slotsAfter[group] += value;
  });

  const owned = [...powers.spells, ...powers.abilities, ...powers.traits];
  const autoIds = grants
    .filter((g) => g.type === "auto" && g.trait)
    .map((g) => g.trait as string);

  const choices = grants
    .map((grant, index) => ({ grant, index }))
    .filter(({ grant }) => grant.type !== "auto")
    .map(({ grant, index }) => {
      const otherIds = [
        ...autoIds,
        ...Object.entries(picks)
          .filter(([i]) => Number(i) !== index)
          .map(([, id]) => id),
      ];
      const candidates =
        grant.type === "professionChoice"
          ? allPowers.filter((p) => grant.options?.includes(p._id ?? ""))
          : allPowers.filter((p) => KIND_TO_GROUP[p.kind]);
      const options = candidates.filter((p) => {
        const group = KIND_TO_GROUP[p.kind];
        if (!p._id || !group) return false;
        if (owned.includes(p._id) || otherIds.includes(p._id)) return false;
        if ((p.requirements?.minLevel ?? 1) > nextLevel) return false;
        const used =
          powers[group].length +
          otherIds.filter(
            (id) =>
              KIND_TO_GROUP[allPowers.find((o) => o._id === id)?.kind ?? ""] ===
              group,
          ).length;
        return used < slotsAfter[group];
      });
      const picked = options.some((o) => o._id === picks[index])
        ? picks[index]
        : "";
      return { grant, index, options, picked };
    });

  const canClaim = choices.every((c) => c.picked || c.options.length === 0);

  function claimRewards() {
    const gained = [...autoIds, ...choices.map((c) => c.picked)].filter(
      (id) => id && !owned.includes(id),
    );
    const nextPowers = { ...powers };
    gained.forEach((id) => {
      const group = KIND_TO_GROUP[allPowers.find((p) => p._id === id)?.kind ?? ""];
      if (group) nextPowers[group] = [...nextPowers[group], id];
    });

    const passive = { ...stats.passive };
    const resources = { ...stats.resources };
    (reward?.statIncreases ?? []).forEach(({ stat, value }) => {
      // Raising a max also raises the current value by the same amount
      if (stat === "hpMax") {
        resources.hpMax = (resources.hpMax ?? 0) + value;
        resources.hp = (resources.hp ?? 0) + value;
      } else if (stat === "mpMax") {
        resources.mpMax = (resources.mpMax ?? 0) + value;
        resources.mp = (resources.mp ?? 0) + value;
      } else if (stat === "momMax") {
        resources.momMax += value;
        resources.mom += value;
      } else if (stat in passive) {
        passive[stat as PassiveStatKey] += value;
      }
    });

    patchForm({
      powers: nextPowers,
      stats: { passive, resources },
      progression: {
        ...progression,
        claimedLevel: nextLevel,
        powerSlots: slotsAfter,
      },
    });
    setPicks({});
    setPreview(null);
  }

  // The rewards box shows a previewed level, or else the level waiting to be claimed
  const shownLevel = preview ?? (pending ? nextLevel : null);
  const claiming = pending && shownLevel === nextLevel;
  const shown = track.find((r) => r.level === shownLevel);
  const shownGrants = shown?.grants ?? [];
  const shownAutoIds = shownGrants
    .filter((g) => g.type === "auto" && g.trait)
    .map((g) => g.trait as string);
  const shownEmpty =
    shownGrants.length === 0 &&
    (shown?.statIncreases ?? []).length === 0 &&
    (shown?.slotIncreases ?? []).length === 0;

  const levelUpHint = !hasTrack
    ? "Choose a class to start leveling."
    : pending
      ? `Claim level ${nextLevel} rewards first.`
      : "";

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={LABEL}>Progression</p>
          <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
            Level {level} of {maxLevel}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            patchForm({ progression: { ...progression, level: level + 1 } });
            setPreview(null);
          }}
          disabled={!hasTrack || pending || level >= maxLevel}
          title={levelUpHint}
          className="text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:border-emerald-500 dark:text-stone-950 dark:hover:bg-emerald-400 disabled:bg-white disabled:dark:bg-stone-800 disabled:border-stone-200 disabled:dark:border-stone-700 disabled:text-stone-400 disabled:dark:text-stone-500 disabled:hover:bg-white disabled:dark:hover:bg-stone-800 disabled:cursor-not-allowed cursor-pointer"
        >
          {level >= maxLevel ? "Max Level" : "Level Up"}
        </button>
      </div>
      {levelUpHint && level < maxLevel && (
        <p className="text-[10px] italic text-stone-400 dark:text-stone-500 mt-1">
          {levelUpHint}
        </p>
      )}

      {/* Level track: filled = claimed, ringed = waiting to claim, hollow = upcoming */}
      <div className="grid grid-cols-10 gap-0.5 mt-3">
        {Array.from({ length: maxLevel }, (_, i) => i + 1).map((lvl) => {
          const r = track.find((t) => t.level === lvl);
          const icons = [
            ...(r?.grants ?? []).map((g) => (g.type === "auto" ? "◆" : "★")),
            ...(r?.statIncreases ?? []).map(({ stat }) =>
              stat === "hpMax" ? "♥" : stat === "mpMax" ? "●" : "▲",
            ),
            ...(r?.slotIncreases ?? []).map(() => "+"),
          ];
          const claimed = lvl <= claimedLevel;
          const waiting = pending && lvl === nextLevel;
          const active = shownLevel === lvl;
          return (
            <button
              key={lvl}
              type="button"
              disabled={!hasTrack}
              onClick={() => setPreview(preview === lvl ? null : lvl)}
              title={`Level ${lvl}`}
              className="flex flex-col items-center gap-0.5 cursor-pointer disabled:cursor-default group"
            >
              <span
                className={`w-5 h-5 rounded-full border-2 text-[9px] font-bold flex items-center justify-center transition-all ${
                  claimed
                    ? "bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-stone-950"
                    : waiting
                      ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 animate-pulse"
                      : "bg-white dark:bg-stone-950 border-stone-300 dark:border-stone-700 text-stone-400 group-hover:border-emerald-600 dark:group-hover:border-emerald-500"
                } ${active ? "ring-2 ring-offset-1 ring-emerald-400 dark:ring-offset-stone-900" : ""}`}
              >
                {lvl}
              </span>
              <span className="text-[7px] leading-none text-stone-400 dark:text-stone-500 break-all text-center min-h-[7px]">
                {icons.join("")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Slot meters */}
      <div className="flex flex-col gap-1 mt-3">
        {(Object.keys(GROUP_LABELS) as PowerGroup[]).map((group) => {
          const used = powers[group].length;
          const cap = powerSlots[group];
          return (
            <div key={group} className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 w-14">
                {GROUP_LABELS[group]}
              </span>
              <div className="flex gap-0.5 flex-1">
                {Array.from({ length: Math.max(cap, used) }, (_, i) => (
                  <span
                    key={i}
                    className={`h-2 flex-1 max-w-4 rounded-sm ${
                      i >= cap
                        ? "bg-red-400"
                        : i < used
                          ? "bg-emerald-500"
                          : "bg-stone-200 dark:bg-stone-700"
                    }`}
                  />
                ))}
              </div>
              <span
                className={`text-[10px] font-bold ${used > cap ? "text-red-500" : "text-stone-500 dark:text-stone-400"}`}
              >
                {used}/{cap}
              </span>
            </div>
          );
        })}
      </div>

      {shownLevel !== null && (
        <div
          className={`mt-3 rounded-lg border p-3 ${
            claiming
              ? "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10"
              : "border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p
              className={`text-[10px] font-semibold uppercase tracking-widest ${
                claiming
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-stone-500 dark:text-stone-400"
              }`}
            >
              Level {shownLevel}{" "}
              {claiming
                ? "Rewards"
                : shownLevel <= claimedLevel
                  ? "· Claimed"
                  : "· Preview"}
            </p>
            {preview !== null && (
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="text-[10px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                {pending && !claiming ? "Back to rewards" : "Close"}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {shownAutoIds.map((id) => {
              const power = allPowers.find((p) => p._id === id);
              return (
                <span
                  key={id}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700"
                >
                  ◆ {power?.name ?? id}
                  <span className="font-normal opacity-70"> · {power?.kind}</span>
                </span>
              );
            })}
            {(shown?.statIncreases ?? []).map(({ stat, value }) => (
              <span key={stat} className={PILL}>
                {value > 0 ? "+" : ""}
                {value} {STAT_LABELS[stat] ?? stat}
              </span>
            ))}
            {(shown?.slotIncreases ?? []).map(({ group, value }) => (
              <span key={group} className={PILL}>
                +{value} {GROUP_LABELS[group].toLowerCase()} slot
                {value === 1 ? "" : "s"}
              </span>
            ))}
          </div>

          {shownEmpty && (
            <p className="text-xs italic text-stone-400 dark:text-stone-500">
              No rewards at this level.
            </p>
          )}

          {/* Read-only choices when previewing another level */}
          {!claiming &&
            shownGrants
              .filter((g) => g.type !== "auto")
              .map((g, i) => (
                <p
                  key={i}
                  className="text-xs text-stone-600 dark:text-stone-300 mt-2"
                >
                  <span className="font-bold">
                    ★{" "}
                    {g.type === "professionChoice"
                      ? "Class choice"
                      : "Free choice"}
                  </span>
                  {g.type === "professionChoice" &&
                    `: ${(g.options ?? [])
                      .map((id) => allPowers.find((p) => p._id === id)?.name ?? id)
                      .join(" or ")}`}
                </p>
              ))}

          {claiming &&
            choices.map(({ grant, index, options, picked }) => (
              <div key={index} className="mt-3">
                <p className={`${LABEL} mb-1`}>
                  ★{" "}
                  {grant.type === "professionChoice"
                    ? "Class Choice"
                    : "Free Choice"}
                </p>
                {options.length === 0 ? (
                  <p className="text-xs italic text-stone-400 dark:text-stone-500">
                    No eligible powers.
                  </p>
                ) : grant.type === "professionChoice" ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    {options.map((p) => {
                      const sel = picked === p._id;
                      return (
                        <button
                          key={p._id}
                          type="button"
                          onClick={() =>
                            setPicks({ ...picks, [index]: p._id ?? "" })
                          }
                          className={`text-left rounded-lg border p-2 transition-all duration-150 cursor-pointer ${
                            sel
                              ? "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-500"
                              : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-500/40"
                          }`}
                        >
                          <p className="text-xs font-bold text-stone-900 dark:text-white">
                            {p.name}
                          </p>
                          <span
                            className="inline-block text-[8px] font-bold uppercase tracking-wide px-1.5 rounded-full border mt-0.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700"
                          >
                            {p.kind}
                          </span>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                            {p.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <select
                    value={picked}
                    onChange={(e) =>
                      setPicks({ ...picks, [index]: e.target.value })
                    }
                    className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-md text-xs px-2 py-1.5 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400"
                  >
                    <option value="">Choose a power</option>
                    {(Object.keys(GROUP_LABELS) as PowerGroup[]).map(
                      (group) => {
                        const inGroup = options.filter(
                          (p) => KIND_TO_GROUP[p.kind] === group,
                        );
                        return (
                          inGroup.length > 0 && (
                            <optgroup key={group} label={GROUP_LABELS[group]}>
                              {inGroup.map((p) => (
                                <option key={p._id} value={p._id}>
                                  {p.name}
                                </option>
                              ))}
                            </optgroup>
                          )
                        );
                      },
                    )}
                  </select>
                )}
              </div>
            ))}

          {claiming && (
            <button
              type="button"
              onClick={claimRewards}
              disabled={!canClaim}
              className="w-full mt-3 text-xs font-bold px-3 py-2 rounded-lg border transition-all duration-150 bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:border-emerald-500 dark:text-stone-950 dark:hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {canClaim ? "Claim Rewards" : "Make your choices to claim"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
