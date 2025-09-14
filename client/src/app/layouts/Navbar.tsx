import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../../features/auth/context/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import {
  FaMoon,
  FaRegUser,
  FaSun,
  FaUser,
  FaHouse,
  FaDiceD20,
  FaUsers,
} from "react-icons/fa6";
import {
  LuScroll,
  LuSwords,
  LuChevronDown,
  LuSettings,
  LuLogOut,
  LuLogIn,
} from "react-icons/lu";

export const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const { currentUser, logout, message } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenNavbar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`
      px-6 py-4 shadow-lg border-b transition-colors duration-200
      bg-white dark:bg-gray-900 
      border-gray-200 dark:border-gray-700
    `}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Section - Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <NavLink to="/">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-purple-600 dark:bg-purple-500">
                  <FaDiceD20 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  RPG Hub
                </span>
              </div>
            </NavLink>

            {/* Main Navigation Links */}
            <div className="flex items-center space-x-6">
              <NavLink
                to="/"
                className={
                  "flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              >
                <FaHouse className="w-4 h-4" />
                <span>Home</span>
              </NavLink>

              {/* Dropdown Menu - Stays open on hover */}
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>Player Tools</span>
                  <LuChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Content */}
                <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                    {/* Category 1: Rules & Mechanics */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                        <LuScroll className="w-4 h-4" />
                        <span>Collections</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        <NavLink
                          to="/articles/newForm"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Characters
                        </NavLink>
                        <NavLink
                          to="/rules/advanced"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Character Builder
                        </NavLink>
                        <NavLink
                          to="/rules/house"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          House Rules
                        </NavLink>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    {/* Category 2: Equipment & Items */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                        <LuSwords className="w-4 h-4" />
                        <span>Campaigns</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        <NavLink
                          to="weapons"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Weapons & Armors
                        </NavLink>
                        <NavLink
                          to="armors"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Special Items
                        </NavLink>
                        <NavLink
                          to="spells"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Spells & Abilities
                        </NavLink>
                        <NavLink
                          to="professions"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Classes
                        </NavLink>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    {/* Category 3: Community */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        <FaUsers className="w-4 h-4" />
                        <span>Community</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        <NavLink
                          to="/articles"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Articles
                        </NavLink>
                        <NavLink
                          to="/guides"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Player Guides
                        </NavLink>
                        <NavLink
                          to="/forums"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Forums
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <span>Game Resources</span>
                  <LuChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Content */}
                <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                    {/* Category 1: Rules & Mechanics */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                        <LuScroll className="w-4 h-4" />
                        <span>Rules & Mechanics</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        <NavLink
                          to="rules"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Basic Rules
                        </NavLink>
                        <NavLink
                          to="/rules/advanced"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Advanced Mechanics
                        </NavLink>
                        <NavLink
                          to="/rules/house"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          House Rules
                        </NavLink>
                        <NavLink
                          to="/professions"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Classes
                        </NavLink>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    {/* Category 2: Equipment & Items */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                        <LuSwords className="w-4 h-4" />
                        <span>Equipment & Items</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        <NavLink
                          to="weapons"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Weapons
                        </NavLink>
                        <NavLink
                          to="armors"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Armors
                        </NavLink>
                        <NavLink
                          to="items"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Items
                        </NavLink>
                        <NavLink
                          to="specialItems"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Special Items
                        </NavLink>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    {/* Category 3: Community */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        <FaUsers className="w-4 h-4" />
                        <span>Skills and Talents</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        <NavLink
                          to="/spells"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Spells
                        </NavLink>
                        <NavLink
                          to="/spells/spellPreview"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Abilities
                        </NavLink>
                        <NavLink
                          to="/forums"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Weapon Skills
                        </NavLink>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    {/* Category 4: Community */}
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2 text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                        <FaUsers className="w-4 h-4" />
                        <span>Skills and Talents</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        <NavLink
                          to="/spells"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Spells
                        </NavLink>
                        <NavLink
                          to="/spells/spellPreview"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Abilities
                        </NavLink>
                        <NavLink
                          to="/forums"
                          className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          Weapon Skills
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {currentUser && currentUser.role === "ADMIN" ? (
                <NavLink
                  to="admin"
                  className="px-3 py-2 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Admin
                </NavLink>
              ) : null}
              {currentUser && currentUser.role === "ADMIN" ? (
                <NavLink
                  to="users"
                  className="px-3 py-2 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Users
                </NavLink>
              ) : null}
            </div>
          </div>

          {/* Right Section - User Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Context */}
            {darkMode ? (
              <FaSun
                style={{ color: "gold" }}
                onClick={() => {
                  toggleTheme();
                }}
              />
            ) : (
              <FaMoon
                style={{ color: "black" }}
                onClick={() => {
                  toggleTheme();
                }}
              />
            )}
            {/* User Profile Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center">
                    <FaUser className="w-5 h-5 text-white" />
                  </div>

                  <LuChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-900 dark:text-white font-medium"></p>
                      {currentUser.username}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {currentUser.email}
                      </p>
                    </div>
                    <NavLink
                      to="register"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaUser className="w-4 h-4" />
                      <span>Profile</span>
                    </NavLink>

                    <NavLink
                      to="register"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LuSettings className="w-4 h-4" />
                      <span>Settings</span>
                    </NavLink>
                    <NavLink
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        handleLogout();
                      }}
                      to="/"
                    >
                      <LuLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </NavLink>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="register">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center">
                  <FaRegUser className="w-5 h-5 text-white" />
                </div>
                {/* <span className="hidden md:block">Guest</span> */}
              </NavLink>
            )}
            {/* Logout Button */}
            {currentUser ? null : (
              <NavLink to="login">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LuLogIn className="w-4 h-4" />
                  <span className="hidden md:block">LogIn</span>
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
