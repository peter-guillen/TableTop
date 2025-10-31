import { Link } from "react-router-dom";
import { LuHouse, LuSearch, LuLockKeyhole, LuSkull } from "react-icons/lu";

export function Forbidden() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Skull Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 dark:bg-orange-500 blur-3xl opacity-30 animate-pulse"></div>
            <LuSkull
              className="relative text-cyan-400 dark:text-orange-400 animate-bounce"
              size={120}
            />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-500 dark:from-cyan-300 dark:via-orange-300 dark:to-cyan-400 mb-4">
            403
          </h1>
          <h2 className="text-3xl font-bold text-white mb-2">Forbidden</h2>
          <p className="text-xl text-slate-400 dark:text-slate-500">
            You've wandered into a resistriced area, adventurer.
          </p>
        </div>

        {/* Flavor Text */}
        <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-8">
          <p className="text-slate-300 leading-relaxed mb-4">
            The path you seek requires Authorization you don't have. Return back
            or be placed in confinement.
          </p>
          <div className="flex items-center justify-center gap-2 text-cyan-400 dark:text-orange-400">
            <LuLockKeyhole size={20} />
            <span className="font-semibold">Location: Restricted Area</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white shadow-lg shadow-cyan-500/50 dark:shadow-orange-500/50 hover:shadow-xl hover:shadow-cyan-500/60 dark:hover:shadow-orange-500/60 transition-all duration-300">
              <LuHouse size={20} />
              Return Home
            </button>
          </Link>
          <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium text-slate-300 hover:text-white bg-slate-800/50 dark:bg-slate-900/50 hover:bg-slate-800 dark:hover:bg-slate-900 border border-cyan-500/30 dark:border-orange-500/30 transition-all duration-300">
            <LuSearch size={20} />
            Search Site
          </button>
        </div>

        {/* Optional Stats Display */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-4 border border-cyan-500/20 dark:border-orange-500/20">
            <p className="text-2xl font-bold text-cyan-400 dark:text-orange-400">
              403
            </p>
            <p className="text-sm text-slate-400">Error Code</p>
          </div>
          <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-4 border border-cyan-500/20 dark:border-orange-500/20">
            <p className="text-2xl font-bold text-cyan-400 dark:text-orange-400">
              0%
            </p>
            <p className="text-sm text-slate-400">Success Rate</p>
          </div>
          <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-4 border border-cyan-500/20 dark:border-orange-500/20">
            <p className="text-2xl font-bold text-cyan-400 dark:text-orange-400">
              ∞
            </p>
            <p className="text-sm text-slate-400">Void Level</p>
          </div>
        </div>
      </div>
    </div>
  );
}
