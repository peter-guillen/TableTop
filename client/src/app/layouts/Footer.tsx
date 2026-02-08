import { Link } from "react-router-dom";
import {
  LuSparkles,
  LuSword,
  LuBookOpen,
  LuShield,
  LuGithub,
  LuGlobe,
  LuMail,
} from "react-icons/lu";

export function Footer() {
  return (
    <footer className="relative mt-20 bg-gradient-to-b from-slate-50 via-cyan-50 to-orange-50 dark:from-slate-900 dark:via-cyan-900/20 dark:to-orange-900/10 text-slate-900 dark:text-white border-t border-cyan-500/20">
      {/* decorative floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-12 right-20 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-50 animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* top section */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* branding */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <LuSparkles className="w-6 h-6 text-cyan-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
                Epic Adventures
              </h3>
            </div>
            <p className="text-slate-600 dark:text-gray-300">
              Tools, rules, and resources for building legendary tabletop RPG
              campaigns.
            </p>
          </div>

          {/* navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-cyan-400">Explore</h4>
            <ul className="space-y-3 text-slate-600 dark:text-gray-300">
              <li className="hover:text-cyan-400 transition">
                <Link to="/spells" className="flex items-center space-x-2">
                  <LuBookOpen className="w-4 h-4" /> <span>Spell Library</span>
                </Link>
              </li>
              <li className="hover:text-cyan-400 transition">
                <Link to="/weapons" className="flex items-center space-x-2">
                  <LuSword className="w-4 h-4" /> <span>Weapons & Armor</span>
                </Link>
              </li>
              <li className="hover:text-cyan-400 transition">
                <Link to="/professions" className="flex items-center space-x-2">
                  <LuShield className="w-4 h-4" />{" "}
                  <span>Classes & Abilities</span>
                </Link>
              </li>
              <li className="hover:text-cyan-400 transition">
                <Link to="/articles" className="flex items-center space-x-2">
                  <LuBookOpen className="w-4 h-4" />{" "}
                  <span>Articles & Guides</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* account */}
          <div>
            <h4 className="font-semibold mb-4 text-cyan-400">Account</h4>
            <ul className="space-y-3 text-slate-600 dark:text-gray-300">
              <li className="hover:text-cyan-400 transition">
                <Link to="/login">Sign In</Link>
              </li>
              <li className="hover:text-cyan-400 transition">
                <Link to="/register">Create Account</Link>
              </li>
            </ul>
          </div>

          {/* social / external */}
          <div>
            <h4 className="font-semibold mb-4 text-cyan-400">Connect</h4>
            <ul className="space-y-3 text-slate-600 dark:text-gray-300">
              <li className="flex items-center space-x-2 hover:text-cyan-400 transition">
                <LuGithub className="w-4 h-4" />
                <span>GitHub</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-cyan-400 transition">
                <LuGlobe className="w-4 h-4" />
                <span>Portfolio</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-cyan-400 transition">
                <LuMail className="w-4 h-4" />
                <span>Contact</span>
              </li>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="my-10 border-t border-cyan-500/20" />

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 dark:text-gray-400 gap-4">
          <span>
            © {new Date().getFullYear()} Epic Adventures — All Rights Reserved
          </span>

          <div className="flex items-center space-x-4">
            <Link to="/privacy" className="hover:text-cyan-400 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-cyan-400 transition">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
