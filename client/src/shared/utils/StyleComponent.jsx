import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SpellContext } from "../../features/spells/context/SpellContext";
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

export const StyleComponent = () => {
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
    return iconMap[type] || LuGem;
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

  // Format properties array for display
  const formatProperties = (properties) => {
    if (!properties || properties.length === 0) return "";
    return (
      properties.slice(0, 3).join(", ") + (properties.length > 3 ? "..." : "")
    );
  };

  // Mock data for demonstration
  const mockItems = [
    {
      id: 1,
      name: "Flametongue Longsword",
      type: "weapon",
      rarity: "rare",
      damage: "1d8 + 1d6 fire",
      range: "5 ft",
      properties: ["versatile", "magical", "fire damage"],
    },
    {
      id: 2,
      name: "Plate Armor of Resistance",
      type: "armor",
      rarity: "legendary",
      armorClass: "18",
      resistance: "Fire",
      properties: ["heavy", "magical", "resistance"],
    },
    {
      id: 3,
      name: "Healing Potion",
      type: "consumable",
      rarity: "common",
      healing: "2d4 + 2",
      duration: "Instant",
      properties: ["consumable", "magical healing"],
    },
    {
      id: 4,
      name: "Mithril Ingot",
      type: "metal",
      rarity: "epic",
      weight: "1 lb",
      value: "500 gp",
      properties: ["lightweight", "magical", "crafting material"],
    },
    {
      id: 5,
      name: "Moonshade Herb",
      type: "herb",
      rarity: "uncommon",
      effect: "Night Vision",
      duration: "8 hours",
      properties: ["alchemical", "natural", "enhancement"],
    },
    {
      id: 6,
      name: "Great Weapon Master",
      type: "feat",
      rarity: "common",
      prerequisite: "Str 13+",
      benefit: "Heavy weapon mastery",
      properties: ["combat", "strength-based"],
    },
    {
      id: 7,
      name: "Time Sword",
      type: "spell",
      rarity: "mythic",
      prerequisite: "Str 13+",
      benefit: "Heavy weapon mastery",
      properties: ["combat", "strength-based"],
    },
    {
      id: 8,
      name: "Aim",
      type: "skill",
      rarity: "rare",
      prerequisite: "Str 13+",
      benefit: "Heavy weapon mastery",
      properties: ["combat", "strength-based"],
    },
  ];

  const displayItems = spellList || mockItems;

  return (
    <>
      <div className="space-y-2">
        {displayItems.map((item) => {
          const IconComponent = getItemIcon(item.type);
          const rarityColors = getRarityColors(item.rarity);

          return (
            <NavLink
              key={item.id}
              to={`/items/${item.type}/${item.id}`}
              className="block"
            >
              <div
                className={`
              group bg-white dark:bg-gray-800 rounded-lg border-l-4 border shadow-sm 
              hover:shadow-md transition-all duration-200 p-4
              hover:bg-gray-50 dark:hover:bg-gray-750
              ${rarityColors}
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
                      <IconComponent
                        className={`w-5 h-5 ${rarityColors.split(" ")[0]} ${
                          rarityColors.split(" ")[1]
                        }`}
                      />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      {/* Name and Type */}
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                          {item.name}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 capitalize">
                          {item.type}
                        </span>
                      </div>

                      {/* Primary Stats Row */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {item.damage && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              Damage:
                            </span>
                            <span>{item.damage}</span>
                          </div>
                        )}
                        {item.armorClass && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              AC:
                            </span>
                            <span>{item.armorClass}</span>
                          </div>
                        )}
                        {item.healing && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              Healing:
                            </span>
                            <span>{item.healing}</span>
                          </div>
                        )}
                        {item.weight && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              Weight:
                            </span>
                            <span>{item.weight}</span>
                          </div>
                        )}
                        {item.effect && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              Effect:
                            </span>
                            <span>{item.effect}</span>
                          </div>
                        )}
                        {item.prerequisite && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium text-gray-900 dark:text-gray-300">
                              Req:
                            </span>
                            <span>{item.prerequisite}</span>
                          </div>
                        )}
                      </div>

                      {/* Secondary Stats Row */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                        {item.range && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">Range:</span>
                            <span>{item.range}</span>
                          </div>
                        )}
                        {item.resistance && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">Resistance:</span>
                            <span>{item.resistance}</span>
                          </div>
                        )}
                        {item.duration && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">Duration:</span>
                            <span>{item.duration}</span>
                          </div>
                        )}
                        {item.value && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">Value:</span>
                            <span>{item.value}</span>
                          </div>
                        )}
                        {item.benefit && (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium">Benefit:</span>
                            <span className="truncate">{item.benefit}</span>
                          </div>
                        )}
                      </div>

                      {/* Properties Tags */}
                      {item.properties && item.properties.length > 0 && (
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500 mr-2">
                            Properties:
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {formatProperties(item.properties)}
                          </span>
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
                      item.rarity === "common" &&
                      "bg-gray-500 text-gray-700 dark:text-gray-300"
                    }
                    ${
                      item.rarity === "uncommon" &&
                      "bg-green-500 text-green-700 dark:text-green-300"
                    }
                    ${
                      item.rarity === "rare" &&
                      "bg-blue-500 text-blue-700 dark:text-blue-300"
                    }
                    ${
                      item.rarity === "epic" &&
                      "bg-purple-500 text-purple-700 dark:text-purple-300"
                    }
                    ${
                      item.rarity === "legendary" &&
                      "bg-orange-500 text-orange-700 dark:text-orange-300"
                    }
                    ${
                      item.rarity === "mythic" &&
                      "bg-red-500 text-red-700 dark:text-red-300"
                    }
                  `}
                    >
                      {item.rarity}
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
