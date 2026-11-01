import {
  LuUsers,
  LuSword,
  LuSparkles,
  LuFileText,
  LuPlus,
  LuShield,
  LuTrendingUp,
  LuActivity,
  LuDollarSign,
  LuChartColumn,
  LuBookOpen,
} from "react-icons/lu";

export const DashboardExample = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">
                1,234
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-full">
              <LuUsers className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <LuTrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-600 dark:text-emerald-400">+12%</span>
            <span className="text-stone-600 dark:text-stone-400 ml-1">
              from last month
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Active Sessions
              </p>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">
                87
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-full">
              <LuActivity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <LuTrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-600 dark:text-emerald-400">+5%</span>
            <span className="text-stone-600 dark:text-stone-400 ml-1">
              from last week
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Total Content
              </p>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">
                2,456
              </p>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-full">
              <LuFileText className="w-6 h-6 text-amber-700 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <LuTrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-600 dark:text-emerald-400">+18%</span>
            <span className="text-stone-600 dark:text-stone-400 ml-1">
              from last month
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Revenue
              </p>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">
                $12,345
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
              <LuDollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <LuTrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-600 dark:text-emerald-400">+8%</span>
            <span className="text-stone-600 dark:text-stone-400 ml-1">
              from last month
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
                <LuUsers className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900 dark:text-white">
                  New user registered
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center">
                <LuFileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900 dark:text-white">
                  Article published
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  15 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                <LuSparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-900 dark:text-white">
                  New spell added
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  1 hour ago
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* <button className="p-4 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors">
              <LuPlus className="w-6 h-6 text-stone-400 dark:text-stone-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Add User
              </span>
            </button> */}
            <button
              onClick={() => setCurrentModal("class")}
              className="p-6 bg-stone-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all duration-300 hover:scale-105"
            >
              <LuSparkles className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
              <span className="text-white font-medium">Create Spell</span>
            </button>
            {/* <button className="p-4 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg hover:border-amber-500 dark:hover:border-amber-400 transition-colors">
              <LuSparkles className="w-6 h-6 text-stone-400 dark:text-stone-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Add Spell
              </span>
            </button> */}
            <button
              onClick={() => setCurrentModal("spell")}
              className="p-6 bg-stone-800/50 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 transition-all duration-300 hover:scale-105"
            >
              <LuBookOpen className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <span className="text-white font-medium">Create Ability</span>
            </button>
            {/* <button className="p-4 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg hover:border-amber-500 dark:hover:border-amber-400 transition-colors">
              <LuSword className="w-6 h-6 text-stone-400 dark:text-stone-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Add Weapon
              </span>
            </button> */}
            <button
              onClick={() => setCurrentModal("weapon")}
              className="p-6 bg-stone-800/50 border border-amber-500/20 rounded-xl hover:border-amber-500/40 transition-all duration-300 hover:scale-105"
            >
              <LuSword className="w-8 h-8 text-amber-700 mx-auto mb-2" />
              <span className="text-white font-medium">Create Weapon</span>
            </button>
            {/* <button className="p-4 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors">
              <LuFileText className="w-6 h-6 text-stone-400 dark:text-stone-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Add Article
              </span>
            </button> */}
            <button
              onClick={() => setCurrentModal("article")}
              className="p-6 bg-stone-800/50 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all duration-300 hover:scale-105"
            >
              <LuShield className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <span className="text-white font-medium">Create Armor</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const AnalyticsExample = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
        Analytics
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">
            User Growth
          </h3>
          <div className="h-64 bg-stone-100 dark:bg-stone-700 rounded-lg flex items-center justify-center">
            <LuChartColumn className="w-16 h-16 text-stone-400 dark:text-stone-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-6">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">
            Content Engagement
          </h3>
          <div className="h-64 bg-stone-100 dark:bg-stone-700 rounded-lg flex items-center justify-center">
            <LuActivity className="w-16 h-16 text-stone-400 dark:text-stone-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
