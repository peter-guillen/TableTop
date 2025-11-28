import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SpellContext } from "../context/SpellContext";
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

export const SpellPreview = () => {
  const { spellList } = useContext(SpellContext);

  const getItemIcon = (category) => {
    const iconMap = {
      abjuration: GiFireball,
      evocation: GiLightningHelix,
      transmutation: GiSunbeams,
      divination: GiBlood,
      necromancy: GiWarlockEye,
      conjuration: GiSparkSpirit,
      enchantment: GiSparkSpirit,
      illusion: GiSparkSpirit,
    };
    return iconMap[category] || GiIceBolt;
  };

  const spellBaseColors = {
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

  const spellStyleContexts = {
    border: `text-{color}-600 dark:text-{color}-400 border-{color}-200 dark:border-{color}-600`,
    badge: `bg-{color}-500 text-{color}-700 dark:text-{color}-300`,
    hover: `group-hover:text-{color}-600 dark:group-hover:text-{color}-400`,
    bg: `group-hover:bg-{color}-600 dark:group-hover:bg-{color}-400`,
  };

  function getColorScheme(category, context = "border", extra = "") {
    const color = spellBaseColors[category] || "gray";
    const template = spellStyleContexts[context] || "";
    const resolved = template.replaceAll("{color}", color);

    return twMerge("capitalize", resolved, extra);
  }

  return (
    <>
      <div className="space-y-2">
        {spellList.map((spell) => {
          const IconComponent = getItemIcon(spell.school);
          return (
            <NavLink
              key={spell._id}
              to={`/spells/${spell._id}`}
              className="block"
            >
              <div
                className={`
              
              ${getColorScheme(
                spell.school,
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
                        className={getColorScheme(spell.school, "", "w-5 h-5")}
                      />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      {/* Name and Type */}
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                          {spell.name}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
                          {spell.element}
                        </span>
                      </div>

                      {/* Primary Stats Row */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Damage:
                          </span>
                          <span>
                            {spell.damage[0]
                              ? `${spell.damage[0]?.diceCount ?? 0}d${
                                  spell.damage[0]?.diceSize ?? 0
                                }`
                              : "n/a"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Healing:
                          </span>
                          <span>
                            {spell.healing[0]
                              ? `${spell.healing[0]?.diceCount ?? 0}d${
                                  spell.healing[0]?.diceSize ?? 0
                                }`
                              : "n/a"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Effect:
                          </span>
                          <span>{spell.effect}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Prerequisite:
                          </span>
                          <span>{spell.category}</span>
                        </div>
                      </div>

                      {/* Secondary Stats Row */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Range:</span>
                          <span>{spell.range}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Casting:</span>
                          <span>{spell.castingTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Duration:</span>
                          <span>{spell.duration}</span>
                        </div>
                      </div>

                      {/* Properties Tags */}
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                          Properties:
                        </span>

                        {spell.tags.map((tag) => (
                          <div key={tag}>
                            <span className="text-xs text-gray-600 dark:text-gray-400 mr-2">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Section - School Badge */}
                  {/* Uses the getColorScheme helper function to get the current color */}
                  <div className="flex flex-col items-end space-y-2">
                    <div
                      className={`${getColorScheme(
                        spell.school,
                        "badge",
                        "px-3 py-1 rounded-full text-xs font-medium capitalize bg-opacity-10 dark:bg-opacity-20"
                      )}
                      `}
                    >
                      {spell.school}
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
