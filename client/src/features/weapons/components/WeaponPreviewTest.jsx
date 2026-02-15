import { useContext } from "react";
import { WeaponContext } from "../context/WeaponContext";
import { useColorScheme } from "../../../shared/hooks/useColorScheme";

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

import {
  rarityBaseColors,
  rarityContexts,
  rarityTierEffects,
} from "../../../shared/hooks/useColorScheme";

export function WeaponPreviewTest() {
  const { weaponList } = useContext(WeaponContext);

  const { getColorScheme } = useColorScheme(
    rarityBaseColors,
    rarityContexts,
    rarityTierEffects,
  );

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

  return (
    <>
      {weaponList.map((weapon) => {
        const rarity = weapon.rarity?.toLowerCase() || "common";
        const IconComponent = getItemIcon(weapon.category);
        const isWeapon =
          weapon.type?.toLowerCase()?.includes("weapon") || weapon.damage;

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
            {/* Image Section */}
            <div
              className={getColorScheme(
                rarity,
                "bg",
                "relative h-44 overflow-hidden",
              )}
            >
              {weapon.image ? (
                <img
                  src={weapon.image}
                  alt={weapon.name}
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
                  "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm flex items-center space-x-1",
                )}
              >
                <GiRoundStar className="w-3 h-3" />
                <span>{weapon.rarity || "Common"}</span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-slate-900/80 dark:bg-slate-800/80 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase backdrop-blur-sm">
                {weapon.category || "Weapon"}
              </div>
            </div>

            {/* Content */}
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

              <div className="grid grid-cols-2 gap-3 mb-4">
                {isWeapon && weapon.damage && (
                  <div className="flex items-center space-x-2 rounded-lg p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20">
                    <GiBroadsword className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                        Damage
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {weapon.damage}
                      </div>
                    </div>
                  </div>
                )}

                {weapon.weight !== undefined && (
                  <div className="flex items-center space-x-2 rounded-lg p-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-600/20">
                    <GiSwordSmithing className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                        Weight
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {weapon.weight} lbs
                      </div>
                    </div>
                  </div>
                )}

                {weapon.price !== undefined && (
                  <div className="flex items-center space-x-2 rounded-lg p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-500/20">
                    <GiCrossbow className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                        Value
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {weapon.price} gp
                      </div>
                    </div>
                  </div>
                )}
              </div>

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
