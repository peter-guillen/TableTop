import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
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
import { Power, PowerSchool, PowerKind } from "../powerTypes.ts";

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

// Icon override by school — spells only
const schoolIconMap: Record<PowerSchool, typeof GiIceBolt> = {
  abjuration: GiFireball,
  evocation: GiLightningHelix,
  transmutation: GiSunbeams,
  divination: GiBlood,
  necromancy: GiWarlockEye,
  conjuration: GiSparkSpirit,
  enchantment: GiSparkSpirit,
  illusion: GiSparkSpirit,
};

// Static class map instead of interpolated `text-${color}-600` (JIT-safe)
interface ColorScheme {
  text: string;
  border: string;
  badgeBg: string;
  badgeText: string;
}

const colorSchemes: Record<string, ColorScheme> = {
  red: {
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-600",
    badgeBg: "bg-red-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-red-700 dark:text-red-300",
  },
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-600",
    badgeBg: "bg-blue-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-blue-700 dark:text-blue-300",
  },
  yellow: {
    text: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-200 dark:border-yellow-600",
    badgeBg: "bg-yellow-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-yellow-700 dark:text-yellow-300",
  },
  orange: {
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-600",
    badgeBg: "bg-orange-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-orange-700 dark:text-orange-300",
  },
  purple: {
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-600",
    badgeBg: "bg-purple-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-purple-700 dark:text-purple-300",
  },
  green: {
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-600",
    badgeBg: "bg-green-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-green-700 dark:text-green-300",
  },
  magenta: {
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-200 dark:border-pink-600",
    badgeBg: "bg-pink-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-pink-700 dark:text-pink-300",
  },
  cyan: {
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-600",
    badgeBg: "bg-cyan-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-cyan-700 dark:text-cyan-300",
  },
  gray: {
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-600",
    badgeBg: "bg-gray-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-gray-700 dark:text-gray-300",
  },
};

const schoolColors: Record<PowerSchool, string> = {
  abjuration: "red",
  evocation: "blue",
  transmutation: "yellow",
  divination: "orange",
  necromancy: "purple",
  conjuration: "green",
  enchantment: "magenta",
  illusion: "cyan",
};

const kindColors: Record<PowerKind, string> = {
  spell: "blue",
  technique: "orange",
  ability: "green",
  trait: "purple",
};

export const PowerPreview = ({
  powers,
  conditionsById = {},
}: PowerPreviewProps) => {
  return (
    <div className="space-y-2">
      {powers.map((power) => {
        const isSpell = power.kind === "spell" && power.school;

        const IconComponent = isSpell
          ? (schoolIconMap[power.school as PowerSchool] ??
            kindIconMap[power.kind])
          : kindIconMap[power.kind];

        const colorKey = isSpell
          ? schoolColors[power.school as PowerSchool]
          : kindColors[power.kind];
        const scheme = colorSchemes[colorKey] ?? colorSchemes.gray;

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
            className="block"
          >
            <div
              className={twMerge(
                scheme.text,
                scheme.border,
                "group bg-white dark:bg-gray-800 rounded-lg border-l-4 border shadow-sm hover:shadow-md transition-all duration-200 p-4 hover:bg-gray-50 dark:hover:bg-gray-750",
              )}
            >
              <div className="flex items-start justify-between">
                {/* Left Section - Icon and Main Info */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg transition-colors duration-200 bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name */}
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                        {power.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                      {power.description}
                    </p>

                    {/* Primary Stats Row */}
                    {(damageDisplay || healingDisplay) && (
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {damageDisplay && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              Damage:
                            </span>
                            <span>{damageDisplay}</span>
                          </div>
                        )}
                        {healingDisplay && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              Healing:
                            </span>
                            <span>{healingDisplay}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Secondary Stats Row */}
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-500">
                      {power.targeting?.range != null && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Range:</span>
                          <span>
                            {power.targeting.range === 0
                              ? "Self"
                              : `${power.targeting.range} ft`}
                          </span>
                        </div>
                      )}
                      {power.activation?.action && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Casting:</span>
                          <span>
                            {power.activation.action
                              .split("_")
                              .map(
                                (word) => word[0].toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </span>
                        </div>
                      )}
                      {!!power.activation?.duration && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Duration:</span>
                          <span>
                            {power.activation.duration} turn
                            {power.activation.duration === 1 ? "" : "s"}
                          </span>
                        </div>
                      )}
                      {power.recharge && power.recharge !== "unlimited" && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Recharge:</span>
                          <span>
                            {power.recharge
                              .split("_")
                              .map(
                                (word) => word[0].toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Technique weapon requirements */}
                    {power.kind === "technique" &&
                      power.requirements?.weaponTags &&
                      power.requirements.weaponTags.length > 0 && (
                        <div className="flex items-center flex-wrap mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                            Weapon Tags:
                          </span>
                          {power.requirements.weaponTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-600 dark:text-gray-400 mr-2 capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Trait grants */}
                    {power.kind === "trait" &&
                      power.grantedPowers &&
                      power.grantedPowers.length > 0 && (
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                            Grants:
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {power.grantedPowers.length} power
                            {power.grantedPowers.length === 1 ? "" : "s"}
                          </span>
                        </div>
                      )}

                    {/* Condition Tags */}
                    {power.conditions.length > 0 && (
                      <div className="flex items-center flex-wrap mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                          Conditions:
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
                              className="text-xs text-gray-600 dark:text-gray-400 mr-2 capitalize"
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
                <div className="flex flex-col items-end space-y-2">
                  <div
                    className={twMerge(
                      scheme.badgeBg,
                      scheme.badgeText,
                      "px-3 py-1 rounded-full text-xs font-medium capitalize",
                    )}
                  >
                    {power.kind}
                  </div>
                  {isSpell && (
                    <div className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
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
