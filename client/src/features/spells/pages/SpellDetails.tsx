import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuSparkles,
  LuBookOpen,
  LuClock,
  LuTarget,
  LuFlame,
  LuZap,
  LuShield,
  LuUsers,
} from "react-icons/lu";

import { useGetAllConditionsQuery } from "../../conditions/api/conditionApi.ts";
import { useGetSpellByIdQuery } from "../api/spellApi";

export function SpellDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: spell, isLoading, isError } = useGetSpellByIdQuery(id!);
  const { data: conditions = [] } = useGetAllConditionsQuery();
  const conditionsById = Object.fromEntries(conditions.map((c) => [c._id, c]));

  const navigate = useNavigate();
  const handleReturn = () => navigate(-1);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  if (!spell) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 dark:text-slate-300">
        <p>Spell not found or still loading...</p>
      </div>
    );
  }

  const damageEffect = spell.healthEffects.find(
    (e) => e.direction === "damage",
  );
  const healingEffect = spell.healthEffects.find(
    (e) => e.direction === "healing",
  );

  function getEffectDisplay(
    effect:
      | {
          flat?: number | null;
          diceCount?: number | null;
          diceSize?: number | null;
        }
      | null
      | undefined,
  ): string | null {
    if (!effect) return null;
    if (effect.flat != null) {
      return `${effect.flat}`;
    }
    if (effect.diceCount != null && effect.diceSize != null) {
      return `${effect.diceCount}d${effect.diceSize}`;
    }
    return null;
  }

  const damageDisplay = getEffectDisplay(damageEffect);
  const healingDisplay = getEffectDisplay(healingEffect);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleReturn}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6 transition-all group"
        >
          <LuArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Spell List</span>
        </button>

        {/* Header Card */}
        <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <LuSparkles
                  className="text-cyan-600 dark:text-orange-400"
                  size={36}
                />
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-orange-500 to-cyan-600 dark:from-cyan-300 dark:via-orange-300 dark:to-cyan-400">
                  {spell.name}
                </h1>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-300 italic">
                Tier {spell.tier} &bull; {spell.school}
              </p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-orange-600 shadow-lg">
              <p className="text-white font-bold text-lg">{spell.school}</p>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuClock
                  className="text-cyan-600 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Casting Time
                </p>
              </div>
              <p className="text-xl text-slate-900 dark:text-white font-semibold">
                {spell.casting.action
                  .split("_")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
              {spell.casting.castTime > 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  +{spell.casting.castTime} cast time
                </p>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuTarget
                  className="text-cyan-600 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Range
                </p>
              </div>
              <p className="text-xl text-slate-900 dark:text-white font-semibold">
                {spell.targeting.range === 0
                  ? "Self"
                  : `${spell.targeting.range} ft`}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuZap
                  className="text-cyan-600 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Duration
                </p>
              </div>
              <p className="text-xl text-slate-900 dark:text-white font-semibold">
                {spell.casting.duration === 0
                  ? "Instant"
                  : `${spell.casting.duration} turn${spell.casting.duration === 1 ? "" : "s"}`}
              </p>
            </div>
          </div>
        </div>

        {/* Combat Properties Section */}
        <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-6 flex items-center gap-2">
            <LuFlame size={24} />
            Combat Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {damageDisplay && (
              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-6 border border-slate-200 dark:border-orange-500/20">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Damage
                </p>
                <p className="text-3xl font-bold text-cyan-600 dark:text-orange-400">
                  {damageDisplay}
                </p>
                {damageEffect?.persistent && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Persistent for{" "}
                    {(damageEffect.durationType ?? "turns") === "permanent"
                      ? "Permanent"
                      : (damageEffect.durationType ?? "turns") ===
                          "until_broken"
                        ? "Until Broken"
                        : `${damageEffect.duration ?? 0} turn${damageEffect.duration === 1 ? "" : "s"}`}
                  </p>
                )}
              </div>
            )}

            {healingDisplay && (
              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-6 border border-slate-200 dark:border-orange-500/20">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Healing
                </p>
                <p className="text-3xl font-bold text-cyan-600 dark:text-orange-400">
                  {healingDisplay}
                </p>
              </div>
            )}

            {spell.offensiveStat && (
              <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-6 border border-slate-200 dark:border-orange-500/20">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Offensive Stat
                </p>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {spell.offensiveStat}
                </p>
              </div>
            )}

            <div className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-6 border border-slate-200 dark:border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <LuUsers
                  size={16}
                  className="text-slate-500 dark:text-slate-400"
                />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Area of Effect
                </p>
              </div>
              <p className="text-xl font-semibold text-slate-900 dark:text-white">
                {spell.targeting.shape
                  ? `${spell.targeting.size ? `${spell.targeting.size} ft ` : ""}${spell.targeting.shape
                      .split("_")
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(" ")}`
                  : spell.targeting.targetCount > 1
                    ? `${spell.targeting.targetCount} Targets`
                    : "Single Target"}
              </p>
            </div>
          </div>

          {/* Effect Type / Damage Type Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {spell.effectType.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 dark:bg-orange-500/20 dark:text-orange-300 capitalize"
              >
                {tag}
              </span>
            ))}
            {spell.damageType.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300 capitalize"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Casting Flags */}
          <div className="flex flex-wrap gap-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
            <span>
              Recharge:{" "}
              {spell.recharge
                .split("_")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
            {spell.casting.stamina != null && (
              <span>&bull; Stamina: {spell.casting.stamina}</span>
            )}
            {spell.casting.ritual && <span>&bull; Ritual</span>}
            {spell.casting.concentration && <span>&bull; Concentration</span>}
            {spell.casting.channel && <span>&bull; Channel</span>}
          </div>
        </div>

        {/* Stat Modifiers Section */}
        {spell.statModifiers.length > 0 && (
          <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-6 flex items-center gap-2">
              <LuShield size={24} />
              Stat Modifiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {spell.statModifiers.map((modifier, index) => (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-4 border border-slate-200 dark:border-orange-500/20"
                >
                  <p className="text-slate-900 dark:text-white font-semibold">
                    {modifier.stat} {modifier.value > 0 ? "+" : ""}
                    {modifier.value}
                  </p>
                  {modifier.durationType && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {modifier.durationType === "permanent"
                        ? "Permanent"
                        : modifier.durationType === "until_broken"
                          ? "Until Broken"
                          : `${modifier.duration ?? 0} turn${modifier.duration === 1 ? "" : "s"}`}
                    </p>
                  )}
                  {modifier.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {modifier.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conditions Inflicted Section */}
        {spell.conditions.length > 0 && (
          <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-6 flex items-center gap-2">
              <LuUsers size={24} />
              Conditions Inflicted
            </h2>
            <div className="flex flex-wrap gap-3">
              {spell.conditions.map((spellCondition, idx) => {
                const condition = conditionsById[spellCondition.condition];
                if (!condition) return null;

                return (
                  <div
                    key={`${spellCondition.condition}-${idx}`}
                    className="bg-slate-50 dark:bg-slate-900/30 rounded-lg px-4 py-2 border border-slate-200 dark:border-orange-500/20"
                  >
                    <p className="text-slate-900 dark:text-white font-semibold capitalize">
                      {condition.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {spellCondition.durationType === "permanent"
                        ? "Permanent"
                        : spellCondition.durationType === "until_broken"
                          ? "Until Broken"
                          : `${spellCondition.duration ?? 0} turn${spellCondition.duration === 1 ? "" : "s"}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-4 flex items-center gap-2">
            <LuBookOpen size={24} />
            Description
          </h2>
          <div className="prose max-w-none">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {spell.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
