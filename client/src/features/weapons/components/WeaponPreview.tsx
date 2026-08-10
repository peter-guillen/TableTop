import { Link } from "react-router-dom";
import { useColorScheme } from "../../../shared/hooks/useColorScheme";
import {
  GiBroadsword,
  GiBowArrow,
  GiMagicSwirl,
  GiRoundStar,
} from "react-icons/gi";

import {
  rarityBaseColors,
  rarityContexts,
  rarityTierEffects,
} from "../../../shared/hooks/useColorScheme";

import { Weapon, Category } from "../weaponTypes";

interface WeaponPreviewProps {
  weapons: Weapon[];
}

const CATEGORY_ICONS: Record<Category, typeof GiBroadsword> = {
  melee: GiBroadsword,
  ranged: GiBowArrow,
  magic: GiMagicSwirl,
};

export function WeaponPreview({ weapons }: WeaponPreviewProps) {
  const { getColorScheme } = useColorScheme(
    rarityBaseColors,
    rarityContexts,
    rarityTierEffects,
  );

  return (
    <>
      {weapons.map((weapon) => {
        const rarity = weapon.rarity?.toLowerCase() || "common";
        const IconComponent = CATEGORY_ICONS[weapon.category] ?? GiBroadsword;

        return (
          <div
            key={weapon._id}
            className={getColorScheme(
              rarity,
              "border",
              `group rounded-xl border-2 overflow-hidden 
               bg-white dark:bg-slate-800/50 
               transition-all duration-300 
               hover:scale-[1.02] cursor-pointer 
               backdrop-blur-sm`,
            )}
          >
            <div
              className={getColorScheme(
                rarity,
                "bg",
                "relative h-44 overflow-hidden",
              )}
            >
              <div className="w-full h-full flex items-center justify-center">
                <IconComponent className="w-16 h-16 text-slate-300 dark:text-slate-600" />
              </div>

              <div
                className={getColorScheme(
                  rarity,
                  "badge",
                  "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm flex items-center space-x-1",
                )}
              >
                <GiRoundStar className="w-3 h-3" />
                <span>{weapon.rarity || "Common"}</span>
              </div>

              <div className="absolute top-3 left-3 bg-slate-900/80 dark:bg-slate-800/80 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase backdrop-blur-sm">
                {weapon.category || "Weapon"}
              </div>
            </div>

            <div
              className={getColorScheme(
                rarity,
                "glow",
                "p-5 transition-all duration-300",
              )}
            >
              <h3
                className={getColorScheme(
                  rarity,
                  "text",
                  "text-xl font-bold mb-2",
                )}
              >
                {weapon.name}
              </h3>

              <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                {weapon.description ||
                  "A mysterious item awaiting discovery..."}
              </p>

              {weapon.value !== undefined && (
                <div className="flex items-center justify-between rounded-lg p-2 mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/20">
                  <span className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                    Value
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {weapon.value} gp
                  </span>
                </div>
              )}

              <Link to={`/weapons/${weapon._id}`}>
                <button className="w-full bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 transform group-hover:scale-[1.02] shadow-md hover:shadow-lg">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
