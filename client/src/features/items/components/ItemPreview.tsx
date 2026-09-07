import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import {
  GiBroadsword,
  GiShield,
  GiRing,
  GiHealthPotion,
  GiGemPendant,
} from "react-icons/gi";

import { Item, ItemCategory } from "../itemTypes.ts";

interface ItemPreviewProps {
  items: Item[];
}

// Icon by category — no more school override, Item has no school concept
const categoryIconMap: Record<ItemCategory, typeof GiBroadsword> = {
  weapon: GiBroadsword,
  armor: GiShield,
  accessory: GiRing,
  consumable: GiHealthPotion,
  trinket: GiGemPendant,
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
  gray: {
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-600",
    badgeBg: "bg-gray-500 bg-opacity-10 dark:bg-opacity-20",
    badgeText: "text-gray-700 dark:text-gray-300",
  },
};

const categoryColors: Record<ItemCategory, string> = {
  weapon: "orange",
  armor: "blue",
  accessory: "purple",
  consumable: "green",
  trinket: "magenta",
};

export const ItemPreview = ({ items }: ItemPreviewProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const IconComponent =
          categoryIconMap[item.category as ItemCategory] ?? GiGemPendant;
        const colorKey = categoryColors[item.category as ItemCategory];
        const scheme = colorSchemes[colorKey] ?? colorSchemes.gray;

        const damageEffect = item.healthEffects.find(
          (e) => e.direction === "damage",
        );
        const healingEffect = item.healthEffects.find(
          (e) => e.direction === "healing",
        );

        // Damage display: flat value takes priority, then dice notation
        let damageDisplay: string | null = null;
        if (damageEffect?.flat != null && damageEffect.flat !== 0) {
          damageDisplay = `${damageEffect.flat}`;
        } else if (
          damageEffect?.diceCount != null &&
          damageEffect?.diceSize != null &&
          damageEffect.diceCount > 0
        ) {
          damageDisplay = `${damageEffect.diceCount}d${damageEffect.diceSize}`;
        }

        // Healing display: same priority as damage
        let healingDisplay: string | null = null;
        if (healingEffect?.flat != null && healingEffect.flat !== 0) {
          healingDisplay = `${healingEffect.flat}`;
        } else if (
          healingEffect?.diceCount != null &&
          healingEffect?.diceSize != null &&
          healingEffect.diceCount > 0
        ) {
          healingDisplay = `${healingEffect.diceCount}d${healingEffect.diceSize}`;
        }

        const resistedTypes = Array.from(
          new Set(item.resistances.map((r) => r.damageType).filter(Boolean)),
        );

        return (
          <NavLink
            key={item._id ?? item.name}
            to={`/items/${item._id}`}
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
                        {item.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                      {item.description}
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
                      {item.rarity && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Rarity:</span>
                          <span className="capitalize">{item.rarity}</span>
                        </div>
                      )}
                      {!!item.value && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Value:</span>
                          <span>{item.value}</span>
                        </div>
                      )}
                      {item.category === "trinket" &&
                        item.selfCharges?.recharge && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">Recharge:</span>
                            <span className="capitalize">
                              {item.selfCharges.recharge.replace("_", " ")}
                            </span>
                          </div>
                        )}
                    </div>

                    {/* Weapon Properties */}
                    {item.category === "weapon" &&
                      item.properties.length > 0 && (
                        <div className="flex items-center flex-wrap mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                            Properties:
                          </span>
                          {item.properties.map((property) => (
                            <span
                              key={property}
                              className="text-xs text-gray-600 dark:text-gray-400 mr-2 capitalize"
                            >
                              {property}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Armor Resistances */}
                    {item.category === "armor" && resistedTypes.length > 0 && (
                      <div className="flex items-center flex-wrap mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                          Resists:
                        </span>
                        {resistedTypes.map((type) => (
                          <span
                            key={type}
                            className="text-xs text-gray-600 dark:text-gray-400 mr-2 capitalize"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Accessory Stat Modifiers */}
                    {item.category === "accessory" &&
                      item.statModifiers.length > 0 && (
                        <div className="flex items-center flex-wrap mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                            Boosts:
                          </span>
                          {item.statModifiers.map((modifier, idx) => (
                            <span
                              key={`${modifier.stat}-${idx}`}
                              className="text-xs text-gray-600 dark:text-gray-400 mr-2 capitalize"
                            >
                              {modifier.stat} {modifier.value > 0 ? "+" : ""}
                              {modifier.value}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Granted Powers — any category can grant (weapon → technique, enchanted item → spell) */}
                    {item.grantedPowers.length > 0 && (
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                          Grants:
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {item.grantedPowers.length} power
                          {item.grantedPowers.length === 1 ? "" : "s"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Section - Category Badge */}
                <div className="flex flex-col items-end space-y-2">
                  <div
                    className={twMerge(
                      scheme.badgeBg,
                      scheme.badgeText,
                      "px-3 py-1 rounded-full text-xs font-medium capitalize",
                    )}
                  >
                    {item.category}
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
