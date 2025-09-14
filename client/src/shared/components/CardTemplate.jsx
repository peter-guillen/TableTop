// Classes Cards Component
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

export const CardTemplate = ({ classes }) => {
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
