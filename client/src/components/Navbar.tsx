import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../hooks/authFastRefreshHook";
import { ThemeContext } from "../hooks/themeFastRefreshHook";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { FaRegUser, FaUser, FaSun, FaMoon } from "react-icons/fa6";

const navLinks = twMerge(
  classNames("dark:hover:text-cyan-400 dark:text-white font-bold p-2")
);
const userLinks = twMerge(classNames("text-gray-400 font-bold p-2"));

export const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const { currentUser, logout, message } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

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
      <header>
        <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700  fixed top-0 left-0 right-0 w-full">
          <div className="flex items-center space-x-4">
            <NavLink className={navLinks} to="/">
              Home
            </NavLink>
            <NavLink className={navLinks} to="rules">
              Rules
            </NavLink>
            <NavLink className={navLinks} to="articles">
              Articles
            </NavLink>
            <div className="relative" ref={dropdownRef}>
              <div
                className={navLinks}
                onClick={() => setOpenNavbar(!openNavbar)}
              >
                Menu
                {openNavbar && (
                  <div className="absolute top-full left-0 bg-gray-200 dark:bg-gray-700 grid grid-cols-2 gap-4 p-4 w-64 rounded-md">
                    <div className="flex flex-col space-y-2">
                      <h3>Spells</h3>
                      <hr className="border-black dark:border-white" />
                      <NavLink className={navLinks} to="spells">
                        Spells
                      </NavLink>
                      <NavLink className={navLinks} to="professions">
                        Classes
                      </NavLink>
                    </div>
                    <div className="flex flex-col space-y-2 ">
                      <h3>Equipment</h3>
                      <hr className="border-black dark:border-white" />
                      <NavLink className={navLinks} to="weapons">
                        Weapons
                      </NavLink>
                      <NavLink className={navLinks} to="armors">
                        Armor
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {currentUser && currentUser.role === "ADMIN" ? (
              <NavLink className={userLinks} to="users">
                USERS
              </NavLink>
            ) : null}
          </div>
          <div className="flex items-center space-x-4">
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

            {currentUser ? (
              <div>
                <NavLink
                  className={navLinks}
                  onClick={() => {
                    handleLogout();
                  }}
                  to="/"
                >
                  Logout
                </NavLink>
              </div>
            ) : (
              <div className="flex space-x-4">
                <NavLink className={navLinks} to="login">
                  Login
                </NavLink>
              </div>
            )}
            <div className={navLinks}>
              {currentUser ? (
                <>
                  <FaUser /> {currentUser.username}
                </>
              ) : (
                <>
                  <FaRegUser />
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="pt-28 pb-2">
        <Outlet />
      </main>
    </>
  );
};
