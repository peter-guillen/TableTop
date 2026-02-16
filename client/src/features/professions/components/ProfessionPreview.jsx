import { useContext } from "react";
import { ProfessionContext } from "../context/ProfessionContext";
// Classes Cards Component
import {
  LuSparkles,
  LuCrown,
  LuWandSparkles,
  LuShield,
  LuSword,
  LuUser,
  LuUsers,
  LuZap,
  LuStar,
} from "react-icons/lu";

export const ProfessionPreview = () => {
  const { professionList } = useContext(ProfessionContext);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {professionList.map((profession) => (
        <div
          key={profession._id}
          className="block group cursor-pointer"
          onClick={() => (window.location.href = `/classes/${profession.id}`)}
        >
          <div
            className="
              bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6
              hover:shadow-xl hover:border-cyan-300 dark:hover:border-cyan-600 
              hover:shadow-cyan-500/10 transition-all duration-300
              hover:scale-105 hover:-translate-y-1
            "
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <LuCrown className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-200">
              {profession.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {/* {profession.description} */} Descript
            </p>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-500">
                  Hit Die:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-300">
                  {/* {profession.armor} */} Armor
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-500">
                  Primary:
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-300">
                  {/* {profession.weapon} */} Weapon
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
