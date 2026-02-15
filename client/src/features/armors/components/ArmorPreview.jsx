import { useContext } from "react";
import { ArmorContext } from "../context/ArmorContext";
import { twMerge } from "tailwind-merge";

import {
  GiBroadsword,
  GiBroadDagger,
  GiWarhammer,
  GiBattleAxe,
  GiBowArrow,
  GiCrossbow,
  GiSpearHook,
  GiSwordSmithing,
  GiRoundStar,
} from "react-icons/gi";

export function ArmorPreview() {
  const { armorList } = useContext(ArmorContext);

  const getItemIcon = (category) => {
    const iconMap = {
      sword: GiBroadsword,
      dagger: GiBroadDagger,
      hammer: GiWarhammer,
      axe: GiBattleAxe,
      longbow: GiBowArrow,
      crossbow: GiCrossbow,
      spear: GiSpearHook,
    };
    return iconMap[category] || GiSwordSmithing;
  };

  // Rarity drives ALL color styling (shared with armor/items later)
  const rarityBaseColors = {
    common: "slate",
    uncommon: "green",
    rare: "blue",
    elite: "purple",
    heroic: "yellow",
    legendary: "orange",
    mythic: "red",
    default: "slate",
  };

  // Same template system you used in SpellPreview
  const armorStyleContexts = {
    border: `border-{color}-300 dark:border-{color}-600`,
    bg: `bg-{color}-50 dark:bg-{color}-900/20`,
    text: `text-{color}-700 dark:text-{color}-400`,
    badge: `bg-{color}-500 text-{color}-100`,
    hover: `group-hover:border-{color}-400 dark:group-hover:border-{color}-500`,
  };

  function getColorScheme(rarity, context = "border", extra = "") {
    const color =
      rarityBaseColors[rarity?.toLowerCase()] || rarityBaseColors.default;
    const template = armorStyleContexts[context] || "";
    const resolved = template.replaceAll("{color}", color);

    return twMerge(resolved, extra);
  }

  return (
    <>
      {armorList.map((armor) => {
        const IconComponent = getItemIcon(armor.category);
        const rarity = armor.rarity?.toLowerCase() || "common";
        const isArmor =
          armor.type?.toLowerCase()?.includes("armor") || armor.damage;

        return (
          <div
            key={armor._id}
            className={getColorScheme(
              rarity,
              "border",
              "group bg-white dark:bg-slate-800/50 rounded-xl border-2 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer",
            )}
          >
            {/* Image Section */}
            <div
              className={getColorScheme(
                rarity,
                "bg",
                "relative h-44 overflow-hidden",
              )}
            >
              {armor.image ? (
                <img
                  src={armor.image}
                  alt={armor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IconComponent className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                </div>
              )}

              {/* Rarity Badge */}
              <div
                className={getColorScheme(
                  rarity,
                  "badge",
                  "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase bg-opacity-90 dark:bg-opacity-30 backdrop-blur-sm flex items-center space-x-1",
                )}
              >
                <GiRoundStar className="w-3 h-3" />
                <span>{armor.rarity || "Common"}</span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-slate-900/80 dark:bg-slate-800/80 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase backdrop-blur-sm">
                {armor.category || "Armor"}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              {/* Title */}
              <h3
                className={twMerge(
                  "text-xl font-bold mb-2 transition-colors duration-200",
                  getColorScheme(rarity, "text"),
                  "group-hover:opacity-90",
                )}
              >
                {armor.name}
              </h3>

              {/* Description */}
              <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                {armor.description || "A mysterious item awaiting discovery..."}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {isArmor && armor.damage && (
                  <div className="flex items-center space-x-2 rounded-lg p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20">
                    <GiBroadsword className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                        Damage
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {armor.damage}
                      </div>
                    </div>
                  </div>
                )}

                {armor.weight !== undefined && (
                  <div className="flex items-center space-x-2 rounded-lg p-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-600/20">
                    <GiSwordSmithing className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                        Weight
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {armor.weight} lbs
                      </div>
                    </div>
                  </div>
                )}

                {armor.price !== undefined && (
                  <div className="flex items-center space-x-2 rounded-lg p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/20">
                    <GiCrossbow className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                        Value
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {armor.price} gp
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Button */}
              <button className="w-full bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 transform group-hover:scale-[1.02] shadow-md hover:shadow-lg">
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
