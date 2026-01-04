import { useContext, useState } from "react";
import { AdminRouter } from "../components/AdminRouter";

import { ArticleContext } from "../../../features/articles/context/ArticleContext";
import { SpellContext } from "../../../features/spells/context/SpellContext";
import { WeaponContext } from "../../../features/weapons/context/WeaponContext";
import { ArmorContext } from "../../../features/armors/context/ArmorContext";
import { AuthContext } from "../../auth/context/AuthContext";

import {
  LuUsers,
  LuSword,
  LuSparkles,
  LuShield,
  LuFileText,
  LuChartColumn,
  LuEye,
  LuSettings,
  LuHouse,
  LuChevronRight,
} from "react-icons/lu";

export const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the data and CRUD functions from contexts, contexts pull from API
  const { articleList, deleteArticle } = useContext(ArticleContext);
  const { spellList, deleteSpell } = useContext(SpellContext);
  const { weaponList, deleteWeapon } = useContext(WeaponContext);
  const { armorList, deleteArmor } = useContext(ArmorContext);
  const { userList, deleteUser } = useContext(AuthContext);

  // Provide a data and actions map that  AdminRouter consumes
  const sectionConfig = {
    articles: {
      data: articleList,
      deleteFn: deleteArticle,
    },
    spells: {
      data: spellList,
      deleteFn: deleteSpell,
    },
    weapons: {
      data: weaponList,
      deleteFn: deleteWeapon,
    },
    armors: {
      data: armorList,
      deleteFn: deleteArmor,
    },
    users: {
      data: userList,
      deleteFn: deleteUser,
    },
  };

  // Sidebar items
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LuHouse },
    { id: "users", label: "Users", icon: LuUsers },
    { id: "articles", label: "Articles", icon: LuFileText },
    { id: "spells", label: "Spells", icon: LuSparkles },
    { id: "abilities", label: "Abilities", icon: LuEye },
    { id: "weapons", label: "Weapons", icon: LuSword },
    { id: "armors", label: "Armors", icon: LuShield },
    { id: "analytics", label: "Analytics", icon: LuChartColumn },
    { id: "settings", label: "Settings", icon: LuSettings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-800 shadow-sm border-r border-gray-200 dark:border-slate-700">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg flex items-center justify-center">
              <LuSparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              D&D Admin
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 border-r-2 border-cyan-700 dark:border-cyan-400"
                    : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
                {activeSection === item.id && (
                  <LuChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <AdminRouter
            activeSection={activeSection}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sectionConfig={sectionConfig}
          />
        </div>
      </div>
    </div>
  );
};
