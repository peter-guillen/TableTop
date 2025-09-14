import { useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ArticleContext } from "../../../features/articles/context/ArticleContext";
import { SpellContext } from "../../../features/spells/context/SpellContext";
import {
  LuUsers,
  LuSword,
  LuSparkles,
  LuShield,
  LuFileText,
  LuBarChart3,
  LuSearch,
  LuPlus,
  LuPen,
  LuTrash2,
  LuEye,
  LuTrendingUp,
  LuActivity,
  LuDollarSign,
  LuSettings,
  LuHome,
  LuChevronRight,
} from "react-icons/lu";

export const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const { spellList } = useContext(SpellContext);
  const { articleList } = useContext(ArticleContext);
  const { id } = useParams();
  const dataMap = { articles: articleList, spells: spellList };
  const getData = dataMap[activeSection]?.map((item) => item);
  console.log(getData || new Error("No data"));

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LuHome },
    { id: "users", label: "Users", icon: LuUsers },
    { id: "articles", label: "Articles", icon: LuFileText },
    { id: "spells", label: "Spells", icon: LuSparkles },
    { id: "abilities", label: "Abilities", icon: LuEye },
    { id: "weapons", label: "Weapons", icon: LuSword },
    { id: "armors", label: "Armors", icon: LuShield },
    { id: "analytics", label: "Analytics", icon: LuBarChart3 },
    { id: "settings", label: "Settings", icon: LuSettings },
  ];

  // Sample data for different sections
  const sampleData = {
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Player",
        lastActive: "2 hours ago",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "DM",
        lastActive: "1 day ago",
        status: "Active",
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "Player",
        lastActive: "3 days ago",
        status: "Inactive",
      },
    ],
    spells: [
      {
        id: 1,
        name: "Fireball",
        level: "3rd",
        school: "Evocation",
        range: "150 feet",
        duration: "Instantaneous",
      },
      {
        id: 2,
        name: "Healing Word",
        level: "1st",
        school: "Evocation",
        range: "60 feet",
        duration: "Instantaneous",
      },
      {
        id: 3,
        name: "Shield",
        level: "1st",
        school: "Abjuration",
        range: "Self",
        duration: "1 round",
      },
    ],
    weapons: [
      {
        id: 1,
        name: "Longsword",
        type: "Martial Melee",
        damage: "1d8 slashing",
        weight: "3 lb",
        cost: "15 gp",
      },
      {
        id: 2,
        name: "Shortbow",
        type: "Simple Ranged",
        damage: "1d6 piercing",
        weight: "2 lb",
        cost: "25 gp",
      },
      {
        id: 3,
        name: "Greataxe",
        type: "Martial Melee",
        damage: "1d12 slashing",
        weight: "7 lb",
        cost: "30 gp",
      },
    ],
    abilities: [
      {
        id: 1,
        name: "Action Surge",
        class: "Fighter",
        level: "2nd",
        type: "Class Feature",
        recharge: "Short Rest",
      },
      {
        id: 2,
        name: "Rage",
        class: "Barbarian",
        level: "1st",
        type: "Class Feature",
        recharge: "Long Rest",
      },
      {
        id: 3,
        name: "Sneak Attack",
        class: "Rogue",
        level: "1st",
        type: "Class Feature",
        recharge: "Per Turn",
      },
    ],
    articles: [
      {
        id: 1,
        title: "Getting Started with D&D 5e",
        author: "Admin",
        category: "Guide",
        published: "2024-01-15",
        status: "Published",
      },
      {
        id: 2,
        title: "Advanced Combat Tactics",
        author: "DM Mike",
        category: "Strategy",
        published: "2024-01-10",
        status: "Draft",
      },
      {
        id: 3,
        title: "Character Building Tips",
        author: "Jane Smith",
        category: "Guide",
        published: "2024-01-08",
        status: "Published",
      },
    ],
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1,234
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <LuUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <LuTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 dark:text-green-400">+12%</span>
            <span className="text-gray-600 dark:text-slate-400 ml-1">
              from last month
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Active Sessions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                87
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <LuActivity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <LuTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 dark:text-green-400">+5%</span>
            <span className="text-gray-600 dark:text-slate-400 ml-1">
              from last week
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Total Content
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                2,456
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <LuFileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <LuTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 dark:text-green-400">+18%</span>
            <span className="text-gray-600 dark:text-slate-400 ml-1">
              from last month
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $12,345
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <LuDollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <LuTrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 dark:text-green-400">+8%</span>
            <span className="text-gray-600 dark:text-slate-400 ml-1">
              from last month
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <LuUsers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New user registered
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <LuFileText className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Article published
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  15 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <LuSparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New spell added
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  1 hour ago
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <LuPlus className="w-6 h-6 text-gray-400 dark:text-slate-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Add User
              </span>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
              <LuSparkles className="w-6 h-6 text-gray-400 dark:text-slate-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Add Spell
              </span>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-400 transition-colors">
              <LuSword className="w-6 h-6 text-gray-400 dark:text-slate-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Add Weapon
              </span>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors">
              <LuFileText className="w-6 h-6 text-gray-400 dark:text-slate-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Add Article
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTable = (data, columns, title) => (
    <div className="space-y-6">
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
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  {Object.values(item)
                    .slice(1)
                    .map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                      >
                        {typeof value === "string" &&
                        value.includes("Active") ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                            {value}
                          </span>
                        ) : typeof value === "string" &&
                          value.includes("Inactive") ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
                            {value}
                          </span>
                        ) : typeof value === "string" &&
                          value.includes("Published") ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
                            {value}
                          </span>
                        ) : typeof value === "string" &&
                          value.includes("Draft") ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        <LuEye className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300">
                        <LuPen className="w-4 h-4" />
                      </button>
                      {/* <NavLink
                        to={`/${activeSection}/${activeSection}List.${id}`}
                      > */}
                      <button
                        onClick={() => {
                          console.log(`/${activeSection}/${id}`);
                        }}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <LuTrash2 className="w-4 h-4" />
                      </button>
                      {/* </NavLink> */}
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

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return renderTable(
          sampleData.users,
          ["Name", "Email", "Role", "Last Active", "Status"],
          "Users"
        );
      case "spells":
        return renderTable(
          sampleData.spells,
          ["Name", "Level", "School", "Range", "Duration"],
          "Spells"
        );
      case "weapons":
        return renderTable(
          sampleData.weapons,
          ["Name", "Type", "Damage", "Weight", "Cost"],
          "Weapons"
        );
      case "abilities":
        return renderTable(
          sampleData.abilities,
          ["Name", "Class", "Level", "Type", "Recharge"],
          "Abilities"
        );
      case "articles":
        return renderTable(
          sampleData.articles,
          ["Title", "Author", "Category", "Published", "Status"],
          "Articles"
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  User Growth
                </h3>
                <div className="h-64 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <LuBarChart3 className="w-16 h-16 text-gray-400 dark:text-slate-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Content Engagement
                </h3>
                <div className="h-64 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <LuActivity className="w-16 h-16 text-gray-400 dark:text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Configuration
              </h3>
              <p className="text-gray-600 dark:text-slate-400">
                Configure your application settings here.
              </p>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};
