import React from "react";
import { LuSparkles } from "react-icons/lu";

export const Header = () => {
  return (
    <header className={""}>
      <div className="bg-gradient-to-r from-cyan-600 to-orange-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-sm font-medium">
          <LuSparkles className="w-4 h-4 animate-pulse" />
          <span>New Subscribers: 10% off first purchase!</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">RPG HUB</div>
        </div>
      </div>

      {/* Optional gradient overlay for visual depth */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />
    </header>
  );
};
