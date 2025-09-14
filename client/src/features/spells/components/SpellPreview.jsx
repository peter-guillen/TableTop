import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SpellContext } from "../context/SpellContext";

import {
  LuSword,
  LuShield,
  LuPill,
  LuGem,
  LuLeaf,
  LuStar,
  LuTarget,
  LuZap,
} from "react-icons/lu";

const rarityStyles = {
  common:
    "text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600",
  uncommon:
    "text-green-600 dark:text-green-400 border-green-200 dark:border-green-600",
  rare: "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-600",
  epic: "text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-600",
  legendary:
    "text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-600",
  mythic:
    "text-red-600 dark:text-red-400 border-red-200 dark:border-red-600 shadow-red-100 dark:shadow-red-900/20",
};

// export const SpellPreview = ({ spell, onDelete }) => {
//   const handleDelete = () => {
//     onDelete(spell._id);
//   };

//   return (
//     <div className="flex flex-row justify-between items-center text-white bg-gray-500 m-4 p-2">
//       <h2 className="p-2">{spell.title}</h2>
//       <div className="flex flex-row space-x-2">
//         <Link to={`/spells/customSpell/${spell._id}`}>
//           <Button primary>Details</Button>
//         </Link>
//         <Button danger onClick={handleDelete}>
//           Delete
//         </Button>
//       </div>
//     </div>
//   );
// };

export const SpellPreview = ({ items }) => {
  const { spellList } = useContext(SpellContext);
  // Icon mapping for different item types
  const getItemIcon = (type) => {
    const iconMap = {
      weapon: LuSword,
      armor: LuShield,
      consumable: LuPill,
      metal: LuGem,
      herb: LuLeaf,
      feat: LuStar,
      skill: LuTarget,
      spell: LuZap,
    };
    return iconMap[type] || Gem;
  };

  // Rarity color mapping
  const getRarityColors = (rarity) => {
    const colorMap = {
      common:
        "text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600",
      uncommon:
        "text-green-600 dark:text-green-400 border-green-200 dark:border-green-600",
      rare: "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-600",
      epic: "text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-600",
      legendary:
        "text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-600",
      mythic:
        "text-red-600 dark:text-red-400 border-red-200 dark:border-red-600 shadow-red-100 dark:shadow-red-900/20",
    };
    return colorMap[rarity?.toLowerCase()] || colorMap.common;
  };
  console.log(spellList);
  return (
    <div className="space-y-2">
      {spellList.map((spell) => {
        return (
          <NavLink
            key={spell._id}
            to={`/spells/customSpell/${spell._id}`}
            className="block"
            rarity={rarityStyles.legendary}
          >
            <div
              className={`
              group bg-white dark:bg-gray-800 rounded-lg border-l-4 border shadow-sm 
              hover:shadow-md transition-all duration-200 p-4
              hover:bg-gray-50 dark:hover:bg-gray-750
            `}
            >
              <div className="flex items-start justify-between">
                {/* Left Section - Icon and Main Info */}
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div
                    className={`
                    p-2 rounded-lg transition-colors duration-200
                    bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600
                  `}
                  >
                    {/* <IconComponent
                      className={`w-5 h-5 ${rarityColors.split(" ")[0]} ${
                        rarityColors.split(" ")[1]
                      }`}
                    /> */}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name and Type */}
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                        {spell.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
                        {spell.description}
                      </span>
                    </div>

                    {/* Primary Stats Row */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Damage:
                          </span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            AC:
                          </span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Healing:
                          </span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Weight:
                          </span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Effect:
                          </span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium text-gray-900 dark:text-gray-300">
                            Req:
                          </span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                    </div>

                    {/* Secondary Stats Row */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Range:</span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Resistance:</span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Duration:</span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Value:</span>
                          <span>{spell.category}</span>
                        </div>
                      )}
                      {spell.category && (
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">Benefit:</span>
                          <span className="truncate">{spell.category}</span>
                        </div>
                      )}
                    </div>

                    {/* Properties Tags */}
                    {spell.category && spell.category.length > 0 && (
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                          Properties:
                        </span>
                        {/* <span className="text-xs text-gray-600 dark:text-gray-400">
                          {formatProperties(spell.category)}
                        </span> */}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Section - Rarity Badge */}
                <div className="flex flex-col items-end space-y-2">
                  <div
                    className={`
                    px-3 py-1 rounded-full text-xs font-medium capitalize
                    bg-opacity-10 dark:bg-opacity-20
                    ${
                      spell.rarity === "common" &&
                      "bg-gray-500 text-gray-700 dark:text-gray-300"
                    }
                    ${
                      spell.rarity === "uncommon" &&
                      "bg-green-500 text-green-700 dark:text-green-300"
                    }
                    ${
                      spell.rarity === "rare" &&
                      "bg-blue-500 text-blue-700 dark:text-blue-300"
                    }
                    ${
                      spell.rarity === "epic" &&
                      "bg-purple-500 text-purple-700 dark:text-purple-300"
                    }
                    ${
                      spell.rarity === "legendary" &&
                      "bg-orange-500 text-orange-700 dark:text-orange-300"
                    }
                    ${
                      spell.rarity === "mythic" &&
                      "bg-red-500 text-red-700 dark:text-red-300"
                    }
                  `}
                  >
                    {spell.rarity}
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
