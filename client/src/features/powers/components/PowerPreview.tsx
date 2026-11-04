import { NavLink } from "react-router-dom";
import {
  GiIceBolt,
  GiFireball,
  GiLightningHelix,
  GiSunbeams,
  GiSparkSpirit,
  GiBlood,
  GiWarlockEye,
  GiBroadsword,
  GiStarSwirl,
  GiFamilyTree,
} from "react-icons/gi";

import { Condition } from "../../conditions/conditionTypes.ts";
import { Power, SpellSchool, PowerKind } from "../powerTypes.ts";

interface PowerPreviewProps {
  powers: Power[];
  conditionsById?: Record<string, Condition>;
}

// Icon fallback by kind — used when there's no school (technique/ability/trait)
const kindIconMap: Record<PowerKind, typeof GiIceBolt> = {
  spell: GiSparkSpirit,
  technique: GiBroadsword,
  ability: GiStarSwirl,
  trait: GiFamilyTree,
};

// Icon override by school — spells only. The icon carries the school's
// identity, so the card itself stays in the stone/emerald palette.
const schoolIconMap: Record<SpellSchool, typeof GiIceBolt> = {
  abjuration: GiFireball,
  evocation: GiLightningHelix,
  transmutation: GiSunbeams,
  divination: GiBlood,
  necromancy: GiWarlockEye,
  conjuration: GiSparkSpirit,
  enchantment: GiSparkSpirit,
  illusion: GiSparkSpirit,
};

export const PowerPreview = ({
  powers,
  conditionsById = {},
}: PowerPreviewProps) => {
  return (
    <div className="space-y-3">
      {powers.map((power) => {
        const isSpell = power.kind === "spell" && power.school;

        const IconComponent = isSpell
          ? (schoolIconMap[power.school as SpellSchool] ??
            kindIconMap[power.kind])
          : kindIconMap[power.kind];

        const damageEffect = power.healthEffects.find(
          (e) => e.direction === "damage",
        );
        const healingEffect = power.healthEffects.find(
          (e) => e.direction === "healing",
        );

        // Damage display: flat value takes priority, then dice notation
        let damageDisplay: string | null = null;
        if (damageEffect?.flat != null) {
          damageDisplay = `${damageEffect.flat}`;
        } else if (
          damageEffect?.diceCount != null &&
          damageEffect?.diceSize != null
        ) {
          damageDisplay = `${damageEffect.diceCount}d${damageEffect.diceSize}`;
        }

        // Healing display: same priority as damage
        let healingDisplay: string | null = null;
        if (healingEffect?.flat != null) {
          healingDisplay = `${healingEffect.flat}`;
        } else if (
          healingEffect?.diceCount != null &&
          healingEffect?.diceSize != null
        ) {
          healingDisplay = `${healingEffect.diceCount}d${healingEffect.diceSize}`;
        }

        return (
          <NavLink
            key={power._id ?? power.name}
            to={`/powers/${power._id}`}
            className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400"
          >
            <div className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-emerald-600 dark:hover:border-emerald-500">
              <div className="flex items-start justify-between">
                {/* Left Section - Icon and Main Info */}
                <div className="flex flex-1 min-w-0 items-start space-x-3">
                  <div className="shrink-0 rounded-lg bg-emerald-700 p-2 text-white dark:bg-emerald-500 dark:text-stone-950">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold break-words text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                        {power.name}
                      </h3>
                      {/* Mobile badges sit under the name instead of squeezing the text column */}
                      <div className="flex flex-wrap gap-1.5 sm:hidden">
                        <span className="px-2 py-0.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-xs font-medium capitalize whitespace-nowrap text-stone-700 dark:text-stone-300">
                          {power.kind}
                        </span>
                        {isSpell && (
                          <span className="px-2 py-0.5 rounded-full border border-stone-200 dark:border-stone-700 text-xs font-medium capitalize whitespace-nowrap text-stone-500 dark:text-stone-400">
                            {power.school}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-3">
                      {power.description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {damageDisplay && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Damage
                          </p>
                          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                            {damageDisplay}
                          </p>
                        </div>
                      )}
                      {healingDisplay && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Healing
                          </p>
                          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                            {healingDisplay}
                          </p>
                        </div>
                      )}
                      {power.targeting?.range != null && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Range
                          </p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {power.targeting.range === 0
                              ? "Self"
                              : `${power.targeting.range} ft`}
                          </p>
                        </div>
                      )}
                      {power.activation?.action && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Casting
                          </p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {power.activation.action
                              .split("_")
                              .map(
                                (word) => word[0].toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </p>
                        </div>
                      )}
                      {!!power.activation?.duration && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Duration
                          </p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {power.activation.duration} turn
                            {power.activation.duration === 1 ? "" : "s"}
                          </p>
                        </div>
                      )}
                      {power.recharge && power.recharge !== "unlimited" && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Recharge
                          </p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {power.recharge
                              .split("_")
                              .map(
                                (word) => word[0].toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </p>
                        </div>
                      )}
                      {/* Trait grants */}
                      {power.kind === "trait" &&
                        power.grantedPowers &&
                        power.grantedPowers.length > 0 && (
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                              Grants
                            </p>
                            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                              {power.grantedPowers.length} power
                              {power.grantedPowers.length === 1 ? "" : "s"}
                            </p>
                          </div>
                        )}
                    </div>

                    {/* Technique weapon requirements */}
                    {power.kind === "technique" &&
                      power.requirements?.properties &&
                      power.requirements.properties.length > 0 && (
                        <div className="flex items-center flex-wrap gap-1.5 mt-3">
                          <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mr-1">
                            Weapon Tags
                          </span>
                          {power.requirements.properties.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Condition Tags */}
                    {power.conditions.length > 0 && (
                      <div className="flex items-center flex-wrap gap-1.5 mt-3">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mr-1">
                          Conditions
                        </span>
                        {power.conditions.map((powerCondition, idx) => {
                          const condition =
                            conditionsById[
                              powerCondition.condition as unknown as string
                            ];
                          if (!condition) return null;

                          return (
                            <span
                              key={`${powerCondition.condition}-${idx}`}
                              className="rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 capitalize"
                            >
                              {condition.name} (
                              {powerCondition.durationType === "permanent"
                                ? "Permanent"
                                : powerCondition.durationType === "until_broken"
                                  ? "Until Broken"
                                  : `${powerCondition.duration ?? 0} turn${powerCondition.duration === 1 ? "" : "s"}`}
                              )
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Section - Kind / School Badges */}
                <div className="hidden sm:flex shrink-0 ml-3 flex-col items-end space-y-2">
                  <div className="px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-xs font-medium capitalize whitespace-nowrap text-stone-700 dark:text-stone-300">
                    {power.kind}
                  </div>
                  {isSpell && (
                    <div className="px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 text-xs font-medium capitalize whitespace-nowrap text-stone-500 dark:text-stone-400">
                      {power.school}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
