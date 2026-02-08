import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { WeaponContext } from "../context/WeaponContext";
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

export const WeaponPreview = () => {
  const { weaponList } = useContext(WeaponContext);

  const getItemIcon = (category) => {
    const iconMap = {
      Axe: GiFireball,
      Hammer: GiLightningHelix,
      Sword: GiSunbeams,
      Soma: GiBlood,
      Psionic: GiWarlockEye,
      Pnuema: GiSparkSpirit,
    };
    return iconMap[category] || GiIceBolt;
  };

  const weaponBaseColors = {
    Axe: "red",
    Hammer: "blue",
    Sword: "yellow",
    Soma: "purple",
    Psionic: "orange",
    Pnuema: "green",
    Default: "gray",
  };

  const weaponStyleContexts = {
    border: `text-{color}-600 dark:text-{color}-400 border-{color}-200 dark:border-{color}-600`,
    badge: `bg-{color}-500 text-{color}-700 dark:text-{color}-300`,
    hover: `group-hover:text-{color}-600 dark:group-hover:text-{color}-400`,
    bg: `group-hover:bg-{color}-600 dark:group-hover:bg-{color}-400`,
  };

  function getColorScheme(category, context = "border", extra = "") {
    const color = weaponBaseColors[category] || "gray";
    const template = weaponStyleContexts[context] || "";
    const resolved = template.replaceAll("{color}", color);

    return twMerge("capitalize", resolved, extra);
  }

  return (
    <>
      <div className="space-y-2">
        {weaponList.map((weapon) => {
          const IconComponent = getItemIcon(weapon.category);
          return (
            <NavLink
              key={weapon._id}
              to={`/weapons/${weapon._id}`}
              className="block"
            >
              <div
                className={`
              
              ${getColorScheme(
                weapon.category,
                "border",
                "group bg-white dark:bg-gray-800 rounded-lg border-l-4 border shadow-sm hover:shadow-md transition-all duration-200 p-4 hover:bg-gray-50 dark:hover:bg-gray-750"
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
                        className={getColorScheme(
                          weapon.category,
                          "",
                          "w-5 h-5"
                        )}
                      />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      {/* Name and Type */}
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                          {weapon.name}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
                          {weapon.category}
                        </span>
                      </div>

                      {/* Primary Stats Row */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Damage:
                          </span>
                          <span>{weapon.damage}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Weight:
                          </span>
                          <span>{weapon.weight}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Penalty:
                          </span>
                          <span>{weapon.penalty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Prerequisite:
                          </span>
                          <span>{weapon.requirement}</span>
                        </div>
                      </div>

                      {/* Secondary Stats Row */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Range:</span>
                          <span>{weapon.range}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Weight:</span>
                          <span>{weapon.weight}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Material:</span>
                          <span>{weapon.material}</span>
                        </div>
                      </div>

                      {/* Properties Tags */}
                      {weapon.category && weapon.category.length > 0 && (
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                            Properties:
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {weapon.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section - School Badge */}
                  {/* Uses the getColorScheme helper function to get the current color */}
                  <div className="flex flex-col items-end space-y-2">
                    <div
                      className={`${getColorScheme(
                        weapon.category,
                        "badge",
                        "px-3 py-1 rounded-full text-xs font-medium capitalize bg-opacity-10 dark:bg-opacity-20"
                      )}
                      `}
                    >
                      {weapon.category}
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
