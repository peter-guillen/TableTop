import React from "react";
import {
  LuSparkles,
  LuCrown,
  LuWand2,
  LuShield,
  LuSword,
  LuUser,
  LuUsers,
  LuZap,
  LuStar,
} from "react-icons/lu";

// Magic Items Cards Component
export const NewCardComponents = ({ items }) => {
  const getRarityStyle = (rarity) => {
    const styles = {
      common: {
        border: "border-gray-300 dark:border-gray-600",
        glow: "",
        bg: "bg-white dark:bg-gray-800",
        text: "text-gray-600 dark:text-gray-400",
      },
      uncommon: {
        border: "border-green-400 dark:border-green-500",
        glow: "shadow-lg shadow-green-500/20 hover:shadow-green-500/40",
        bg: "bg-white dark:bg-gray-800",
        text: "text-green-600 dark:text-green-400",
      },
      rare: {
        border: "border-blue-400 dark:border-blue-500",
        glow: "shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50",
        bg: "bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20",
        text: "text-blue-600 dark:text-blue-400",
      },
      epic: {
        border: "border-purple-400 dark:border-purple-500",
        glow: "shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50",
        bg: "bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20",
        text: "text-purple-600 dark:text-purple-400",
      },
      legendary: {
        border: "border-orange-400 dark:border-orange-500",
        glow: "shadow-xl shadow-orange-500/40 hover:shadow-orange-500/60",
        bg: "bg-gradient-to-br from-white to-orange-50/50 dark:from-gray-800 dark:to-orange-900/20",
        text: "text-orange-600 dark:text-orange-400",
      },
      mythic: {
        border: "border-red-500 dark:border-red-400",
        glow: "shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 animate-pulse",
        bg: "bg-gradient-to-br from-white to-red-50/50 dark:from-gray-800 dark:to-red-900/20",
        text: "text-red-600 dark:text-red-400",
      },
    };
    return styles[rarity?.toLowerCase()] || styles.common;
  };

  const mockMagicItems = [
    {
      id: 1,
      name: "Staff of Arcane Mastery",
      type: "staff",
      rarity: "legendary",
      description:
        "A crystalline staff that pulses with raw magical energy, amplifying the wielder's spellcasting abilities.",
      properties: ["Spell Attack +3", "Spell Save DC +2", "Extra Spell Slot"],
    },
    {
      id: 2,
      name: "Cloak of Elvenkind",
      type: "cloak",
      rarity: "uncommon",
      description:
        "This cloak shifts color and texture to blend with surroundings.",
      properties: ["Advantage on Stealth", "Darkvision", "Elven Perception"],
    },
    {
      id: 3,
      name: "Vorpal Blade",
      type: "sword",
      rarity: "mythic",
      description:
        "A legendary weapon that gleams with an otherworldly sharpness, capable of severing the connection between body and soul.",
      properties: ["Vorpal", "+3 Enhancement", "Legendary Actions"],
    },
  ];

  const displayItems = items || mockMagicItems;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayItems.map((item) => {
        const rarityStyle = getRarityStyle(item.rarity);

        return (
          <div
            key={item.id}
            className="block group cursor-pointer"
            onClick={() => (window.location.href = `/magic-items/${item.id}`)}
          >
            <div
              className={`
              relative p-6 rounded-xl border-2 transition-all duration-300
              hover:scale-105 hover:-translate-y-1
              ${rarityStyle.border} ${rarityStyle.glow} ${rarityStyle.bg}
            `}
            >
              {/* Rarity Badge */}
              <div
                className={`
                absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${rarityStyle.text} ${rarityStyle.bg} border-2 ${
                  rarityStyle.border
                }
                ${item.rarity === "mythic" ? "animate-pulse" : ""}
              `}
              >
                {item.rarity}
              </div>

              {/* Icon */}
              <div
                className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-4
                ${rarityStyle.bg} ${rarityStyle.border} border-2
              `}
              >
                <LuSparkles className={`w-6 h-6 ${rarityStyle.text}`} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-2 ${rarityStyle.text}`}>
                {item.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* Properties */}
              <div className="space-y-1">
                {item.properties?.slice(0, 3).map((property, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <LuStar className={`w-3 h-3 ${rarityStyle.text}`} />
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {property}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Classes Cards Component
export const ClassCards = ({ classes }) => {
  const getClassIcon = (className) => {
    const iconMap = {
      fighter: LuSword,
      wizard: LuWand2,
      knight: LuShield,
      rogue: LuUser,
      cleric: LuStar,
      ranger: LuUsers,
    };
    return iconMap[className.toLowerCase()] || User;
  };

  const mockClasses = [
    {
      id: 1,
      name: "Fighter",
      description:
        "Masters of martial combat, skilled with a variety of weapons and armor.",
      hitDie: "d10",
      primaryAbility: "Strength or Dexterity",
      savingThrows: ["Strength", "Constitution"],
    },
    {
      id: 2,
      name: "Wizard",
      description:
        "Scholarly magic-users capable of manipulating the structures of spells.",
      hitDie: "d6",
      primaryAbility: "Intelligence",
      savingThrows: ["Intelligence", "Wisdom"],
    },
    {
      id: 3,
      name: "Knight",
      description:
        "Noble warriors bound by oath, combining martial prowess with divine favor.",
      hitDie: "d10",
      primaryAbility: "Strength",
      savingThrows: ["Wisdom", "Charisma"],
    },
  ];

  const displayClasses = classes || mockClasses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayClasses.map((classItem) => {
        const IconComponent = getClassIcon(classItem.name);

        return (
          <div
            key={classItem.id}
            className="block group cursor-pointer"
            onClick={() => (window.location.href = `/classes/${classItem.id}`)}
          >
            <div
              className="
              bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6
              hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 
              hover:shadow-purple-500/10 transition-all duration-300
              hover:scale-105 hover:-translate-y-1
            "
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                {classItem.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {classItem.description}
              </p>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-500">
                    Hit Die:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-300">
                    {classItem.hitDie}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-500">
                    Primary:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-300">
                    {classItem.primaryAbility}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Player Characters Cards Component
export const CharacterCards = ({ characters }) => {
  const mockCharacters = [
    {
      id: 1,
      name: "Billy the Blue Knight",
      className: "Knight",
      level: 8,
      race: "Human",
      background: "Noble",
      avatar: "👤",
      hitPoints: "68/72",
      armorClass: 18,
    },
    {
      id: 2,
      name: "Zapzar Thundun",
      className: "Wizard",
      level: 7,
      race: "Gnome",
      background: "Sage",
      avatar: "🧙‍♂️",
      hitPoints: "45/45",
      armorClass: 12,
    },
  ];

  const displayCharacters = characters || mockCharacters;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayCharacters.map((character) => {
        return (
          <div
            key={character.id}
            className="block group cursor-pointer"
            onClick={() =>
              (window.location.href = `/characters/${character.id}`)
            }
          >
            <div
              className="
              bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6
              hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-600 
              hover:shadow-emerald-500/10 transition-all duration-300
              hover:scale-105 hover:-translate-y-1
            "
            >
              {/* Avatar and Level */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-2xl">
                  {character.avatar}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    Level
                  </div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {character.level}
                  </div>
                </div>
              </div>

              {/* Character Info */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                {character.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {character.race} {character.className}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    HP
                  </div>
                  <div className="font-bold text-red-600 dark:text-red-400">
                    {character.hitPoints}
                  </div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    AC
                  </div>
                  <div className="font-bold text-blue-600 dark:text-blue-400">
                    {character.armorClass}
                  </div>
                </div>
              </div>

              {/* Background */}
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Background:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {character.background}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
