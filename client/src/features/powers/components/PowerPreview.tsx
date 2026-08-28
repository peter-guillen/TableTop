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
} from "react-icons/gi";

import { Condition } from "../../conditions/conditionTypes.ts";
import { Power, PowerSchool } from "../powerTypes.ts";

interface PowerPreviewProps {
  powers: Power[];
  conditionsById?: Record<string, Condition>;
}

const iconMap: Record<PowerSchool, typeof GiIceBolt> = {
  abjuration: GiFireball,
  evocation: GiLightningHelix,
  transmutation: GiSunbeams,
  divination: GiBlood,
  necromancy: GiWarlockEye,
  conjuration: GiSparkSpirit,
  enchantment: GiSparkSpirit,
  illusion: GiSparkSpirit,
};

const powerBaseColors: Record<string, string> = {
  abjuration: "red",
  evocation: "blue",
  transmutation: "yellow",
  divination: "orange",
  necromancy: "purple",
  conjuration: "green",
  enchantment: "magenta",
  illusion: "cyan",
  default: "gray",
};

export const PowerPreview = ({
  powers,
  conditionsById = {},
}: PowerPreviewProps) => {
  return (
    <div className="space-y-2">
      {powers.map((power) => {
        const IconComponent = iconMap[power.school] ?? GiIceBolt;
        const color = powerBaseColors[power.school] ?? "gray";

        const damageEffect = power.healthEffects.find(
          (e) => e.direction === "damage",
        );
        const healingEffect = power.healthEffects.find(
          (e) => e.direction === "healing",
        );

        // Helper function to format effect display strings
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
          // Guard clause: If there is no effect object, there's nothing to display
          if (!effect) return null;
          // Priority 1: Check for flat numerical value
          if (effect.flat != null) {
            return `${effect.flat}`;
          }
          // Priority 2: Check for dice notation (requires both count and size)
          if (effect.diceCount != null && effect.diceSize != null) {
            return `${effect.diceCount}d${effect.diceSize}`;
          }
          // Fallback: Neither condition was met
          return null;
        }

        // Clean usage in your component or service:
        const damageDisplay = getEffectDisplay(damageEffect);
        const healingDisplay = getEffectDisplay(healingEffect);

        return (
          <NavLink
            key={power._id ?? power.name}
            to={`/powers/${power._id}`}
            className="block"
          >
            <div
              className={`
              
              ${twMerge(
                "capitalize",
                `text-${color}-600 dark:text-${color}-400 border-${color}-200 dark:border-${color}-600`,
                "group bg-white dark:bg-gray-800 rounded-lg border-l-4 border shadow-sm hover:shadow-md transition-all duration-200 p-4 hover:bg-gray-50 dark:hover:bg-gray-750",
              )}
            `}
            >
              <div className="flex items-start justify-between">
                {/* Left Section - Icon and Main Info */}
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div
                    className={
                      "p-2 rounded-lg transition-colors duration-200 bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600    "
                    }
                  >
                    <IconComponent
                      className={twMerge("capitalize", "w-5 h-5")}
                    />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name and Tier */}
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                        {power.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        Tier {power.tier}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                      {power.description}
                    </p>

                    {/* Primary Stats Row */}
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

                    {/* Secondary Stats Row */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Range:</span>
                        <span>
                          {power.targeting.range === 0
                            ? "Self"
                            : `${power.targeting.range} ft`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Casting:</span>
                        <span>
                          {power.casting.action
                            .split("_")
                            .map(
                              (word) => word[0].toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Duration:</span>
                        <span>
                          {power.casting.duration === 0
                            ? "Instant"
                            : `${power.casting.duration} turn${power.casting.duration === 1 ? "" : "s"}`}
                        </span>
                      </div>
                    </div>

                    {/* Properties Tags */}
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                        Properties:
                      </span>

                      {power.effectType.map((tag) => (
                        <div key={tag}>
                          <span className="text-xs text-gray-600 dark:text-gray-400 mr-2 capitalize">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Damage Type Tags */}
                    {power.damageType.length > 0 && (
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                          Damage Type:
                        </span>

                        {power.damageType.map((tag) => (
                          <div key={tag}>
                            <span className="text-xs text-gray-600 dark:text-gray-400 mr-2 capitalize">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Condition Tags */}
                    {power.conditions.length > 0 && (
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                          Conditions:
                        </span>

                        {power.conditions.map((powerCondition, idx) => {
                          const condition =
                            conditionsById[powerCondition.condition];
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

                {/* Right Section - School Badge */}
                <div className="flex flex-col items-end space-y-2">
                  <div
                    className={`${twMerge(
                      "capitalize",
                      `bg-${color}-500 text-${color}-700 dark:text-${color}-300`,
                      "px-3 py-1 rounded-full text-xs font-medium capitalize bg-opacity-10 dark:bg-opacity-20",
                    )}
                      `}
                  >
                    {power.school}
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
