import { LuSparkles, LuSword, LuBookOpen, LuShield } from "react-icons/lu";

export function Header() {
  return (
    <header className="relative">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-cyan-600 to-orange-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-sm font-medium">
          <LuSparkles className="w-4 h-4 animate-pulse" />
          <span>Welcome to your custom tabletop RPG system!</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-lg p-2">
                <LuSword className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
                  RPG HUB
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Your Adventure Awaits
                </p>
              </div>
            </div>

            {/* Quick Stats/Features */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <LuBookOpen className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Content
                  </p>
                  <p className="text-sm font-semibold">6 Categories</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <LuShield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    System
                  </p>
                  <p className="text-sm font-semibold">Custom TTRPG</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <LuSparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Built With
                  </p>
                  <p className="text-sm font-semibold">MERN Stack</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="hidden sm:block bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />
    </header>
  );
}
