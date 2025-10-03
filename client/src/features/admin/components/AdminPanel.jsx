import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardExample,
  AnalyticsExample,
  SettingExample,
} from "./DashboardExample";
import {
  LuUsers,
  LuSword,
  LuSparkles,
  LuShield,
  LuFileText,
  LuChartColumn,
  LuSearch,
  LuPlus,
  LuPen,
  LuTrash2,
  LuEye,
  LuSettings,
  LuHouse,
  LuChevronRight,
} from "react-icons/lu";

// Feature contexts (real data sources)
import { ArticleContext } from "../../../features/articles/context/ArticleContext";
import { SpellContext } from "../../../features/spells/context/SpellContext";
import { WeaponContext } from "../../../features/weapons/context/WeaponContext";
import { ArmorContext } from "../../../features/armors/context/ArmorContext";
import { AuthContext } from "../../../features/auth/context/AuthContext";

export const AdminPanel = () => {
  // Local UI state for navigation + search
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Context hooks (each provides list + CRUD actions)
  const { articleList, deleteArticle } = useContext(ArticleContext);
  const { spellList, deleteSpell } = useContext(SpellContext);
  const { weaponList, deleteWeapon } = useContext(WeaponContext);
  const { armorList, deleteArmor } = useContext(ArmorContext);
  const { userList, deleteUser } = useContext(AuthContext);

  // Map section IDs to real context data + delete handlers
  const sectionConfig = {
    articles: { data: articleList, deleteFn: deleteArticle },
    spells: { data: spellList, deleteFn: deleteSpell },
    weapons: { data: weaponList, deleteFn: deleteWeapon },
    armors: { data: armorList, deleteFn: deleteArmor },
    users: { data: userList, deleteFn: deleteUser },
  };

  // Navigation items for sidebar
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

  // Dashboard view (summary + quick actions)
  const renderDashboard = () => (
    <div className="space-y-6">
      <DashboardExample />
    </div>
  );

  // Generic table renderer — takes data + column headers + section title
  const renderTable = (data, columns, title, deleteFn) => (
    <div className="space-y-6">
      {/* Header with title + add button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Manage your {title.toLowerCase()}
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <LuPlus className="w-4 h-4" />
          <span>Add {title.slice(0, -1)}</span>
        </button>
      </div>

      {/* Search box */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
          />
        </div>
      </div>

      {/* Data table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {data?.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {/* Example row cells (customize per entity schema) */}
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {item.name || item.title || item.username || ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {item.damage ||
                      item.defense ||
                      item.category ||
                      item.email ||
                      ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {item.school ||
                      item.type ||
                      item.category ||
                      item.role ||
                      ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {item.range || item.weight || item.type || ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {item.duration || item.cost || item.penalty || ""}
                  </td>

                  {/* Row actions */}
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400">
                    <div className="flex space-x-2">
                      <NavLink to={`/${activeSection}/${item._id}`}>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          <LuEye className="w-4 h-4" />
                        </button>
                      </NavLink>
                      <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300">
                        <LuPen className="w-4 h-4" />
                      </button>
                      {deleteFn && (
                        <button
                          onClick={() => deleteFn(item._id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                        >
                          <LuTrash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Switch which section to render
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return renderTable(
          sectionConfig.users.data,
          ["Name", "Email", "Role", "Last Active", "Status"],
          "Users",
          sectionConfig.users.deleteFn
        );
      case "spells":
        return renderTable(
          sectionConfig.spells.data,
          ["Name", "Level", "School", "Range", "Duration"],
          "Spells",
          sectionConfig.spells.deleteFn
        );
      case "abilities":
        return <div>Coming Soon...</div>;
      case "weapons":
        return renderTable(
          sectionConfig.weapons.data,
          ["Name", "Damage", "Category", "Weight", "Range"],
          "Weapons",
          sectionConfig.weapons.deleteFn
        );
      case "armors":
        return renderTable(
          sectionConfig.armors.data,
          ["Name", "Defense", "Category", "Type", "Penalty"],
          "Armors",
          sectionConfig.armors.deleteFn
        );
      case "articles":
        return renderTable(
          sectionConfig.articles.data,
          ["Title", "Author", "Category", "Published", "Status"],
          "Articles",
          sectionConfig.articles.deleteFn
        );
      case "analytics":
        return <AnalyticsExample />;
      case "settings":
        return <SettingExample />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Sidebar navigation */}
      <div className="w-64 bg-white dark:bg-slate-800 shadow-sm border-r border-gray-200 dark:border-slate-700">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <LuSparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              D&D Admin
            </h1>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-2 border-blue-700 dark:border-blue-400"
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
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};
