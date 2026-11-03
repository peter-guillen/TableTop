import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "../../features/auth/api/authApi.tsx";

import { ThemeContext } from "../contexts/ThemeContext.tsx";
import {
  dropdownItem,
  dropdownPanel,
  focusRing,
  hoverRow,
  ink,
  inkDanger,
  inkMuted,
  inkPrimary,
  inkSubtle,
  line,
  navLink,
  navLinkMobile,
  primaryButton,
  surfaceRaised,
} from "../../shared/styles/theme.ts";

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
  LuChevronDown,
  LuLogOut,
  LuLogIn,
  LuMenu,
  LuX,
  LuDrama,
  LuSparkles,
  LuBook,
  LuFlag,
  LuAnvil,
  LuScrollText,
  LuPencil,
  LuSchool,
  LuPersonStanding,
} from "react-icons/lu";

const isAdminOrMod = (role?: string) =>
  role === "admin" || role === "moderator";

// Routes inside each dropdown, used to highlight the dropdown's trigger
const PLAYER_TOOLS_ROUTES = ["/rules", "/characters", "/articles"];
const GAME_RESOURCE_ROUTES = [
  "/professions",
  "/species",
  "/backgrounds",
  "/items",
  "/powers",
];

const isWithin = (pathname: string, routes: string[]) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

// Dropdown opens on hover AND when anything inside it has keyboard focus
const dropdownMenu =
  "absolute left-0 z-50 mt-2 w-64 translate-y-1 opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100";

const menuLink = ({ isActive }: { isActive: boolean }) =>
  dropdownItem(isActive);

export const Navbar = () => {
  const { data: currentUser } = useGetCurrentUserQuery();

  const [logout] = useLogoutMutation();

  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("Navbar must be inside ThemeContextProvider");
  const { darkMode, toggleTheme } = themeContext;
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
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

  const canSeeAdmin = isAdminOrMod(currentUser?.role);
  const canCreateContent = ["admin", "moderator", "editor"].includes(
    currentUser?.role ?? "",
  );
  // Guests and logged-out visitors can browse, but can't have characters
  const canPlay = ["admin", "moderator", "editor", "user"].includes(
    currentUser?.role ?? "",
  );
  // Users can opt to show their name instead of their username (Profile page)
  const displayName =
    currentUser?.profile?.showName && currentUser.profile.name
      ? currentUser.profile.name
      : currentUser?.username;
  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 border-b px-4 py-3 sm:px-6 ${line} ${surfaceRaised}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left Section - Logo and Main Navigation */}
          <div className="flex items-center gap-4 sm:gap-8">
            <NavLink to="/" className={`rounded-lg ${focusRing}`}>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-amber-500 p-2 text-stone-950">
                  <FaDiceD20 className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span
                  className={`hidden text-lg font-extrabold tracking-tight sm:block sm:text-xl ${ink}`}
                >
                  RPG Hub
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-1 lg:flex">
              <NavLink
                to="/"
                end
                className={({ isActive }) => navLink(isActive)}
              >
                <FaHouse className="h-4 w-4" />
                <span>Home</span>
              </NavLink>

              {/* Player Tools Dropdown */}
              <div className="group relative">
                <button
                  className={navLink(isWithin(pathname, PLAYER_TOOLS_ROUTES))}
                >
                  <span>Player Tools</span>
                  <LuChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>

                <div className={dropdownMenu}>
                  <div className={`${dropdownPanel} space-y-0.5 px-2`}>
                    <NavLink to="/rules" className={menuLink}>
                      <LuBook className="h-4 w-4" />
                      <span>Basic Rules</span>
                    </NavLink>

                    {canPlay && (
                      <>
                        <NavLink to="/characters" end className={menuLink}>
                          <LuScrollText className="h-4 w-4" />
                          <span>Characters</span>
                        </NavLink>

                        <NavLink to="/characters/create" className={menuLink}>
                          <LuPencil className="h-4 w-4" />
                          <span>Character Builder</span>
                        </NavLink>
                      </>
                    )}

                    {/* Campaigns - not built yet, disabled entry instead of an empty section */}
                    <div
                      className={`flex cursor-not-allowed items-center justify-between px-2 py-1.5 text-sm ${inkSubtle}`}
                    >
                      <span className="flex items-center gap-2">
                        <LuFlag className="h-4 w-4" />
                        <span>Campaigns</span>
                      </span>
                      <span className="text-xs italic">Soon</span>
                    </div>

                    <NavLink to="/articles" className={menuLink}>
                      <FaUsers className="h-4 w-4" />
                      <span>Articles</span>
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Game Resources Dropdown */}
              <div className="group relative">
                <button
                  className={navLink(isWithin(pathname, GAME_RESOURCE_ROUTES))}
                >
                  <span>Game Resources</span>
                  <LuChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>

                <div className={dropdownMenu}>
                  <div className={`${dropdownPanel} space-y-0.5 px-2`}>
                    <NavLink to="/professions" className={menuLink}>
                      <LuDrama className="h-4 w-4" />
                      <span>Classes</span>
                    </NavLink>

                    <NavLink to="/species" className={menuLink}>
                      <LuPersonStanding className="h-4 w-4" />
                      <span>Species</span>
                    </NavLink>

                    <NavLink to="/backgrounds" className={menuLink}>
                      <LuSchool className="h-4 w-4" />
                      <span>Backgrounds</span>
                    </NavLink>

                    <NavLink to="/items" className={menuLink}>
                      <LuAnvil className="h-4 w-4" />
                      <span>Items</span>
                    </NavLink>

                    <NavLink to="/powers" className={menuLink}>
                      <LuSparkles className="h-4 w-4" />
                      <span>Powers</span>
                    </NavLink>
                  </div>
                </div>
              </div>

              <NavLink
                to="about"
                className={({ isActive }) => navLink(isActive)}
                onClick={closeMobile}
              >
                <span>About</span>
              </NavLink>

              {canCreateContent && (
                <NavLink
                  to="create"
                  className={({ isActive }) => navLink(isActive)}
                >
                  Create
                </NavLink>
              )}

              {canSeeAdmin && (
                <NavLink
                  to="admin"
                  className={({ isActive }) => navLink(isActive)}
                >
                  Admin
                </NavLink>
              )}
            </div>
          </div>

          {/* Right Section - User Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className={`rounded-md p-2 transition-colors ${hoverRow} ${focusRing}`}
            >
              {darkMode ? (
                <FaMoon className={`h-5 w-5 ${inkPrimary}`} />
              ) : (
                <FaSun className={`h-5 w-5 ${inkPrimary}`} />
              )}
            </button>

            {/* User Profile Dropdown - Desktop */}
            {currentUser ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${inkMuted} ${hoverRow} ${focusRing}`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white dark:bg-emerald-500 dark:text-stone-950">
                    <FaUser className="h-4 w-4" />
                  </div>
                  <LuChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div
                    className={`absolute right-0 z-50 mt-2 w-56 ${dropdownPanel} py-1`}
                  >
                    <div className={`border-b px-4 py-3 ${line}`}>
                      <p className={`text-sm font-medium ${ink}`}>
                        {displayName}
                      </p>
                      <p className={`text-xs ${inkSubtle}`}>
                        {currentUser.email}
                      </p>
                    </div>
                    <div className="space-y-0.5 p-1">
                      <NavLink to="profile" className={menuLink}>
                        <FaUser className="h-4 w-4" />
                        <span>Profile</span>
                      </NavLink>
                      <button
                        className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors hover:bg-red-50 dark:hover:bg-red-500/10 ${inkDanger} ${focusRing}`}
                        onClick={handleLogout}
                      >
                        <LuLogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="register"
                  className={`hidden rounded-md px-3 py-2 text-sm font-medium sm:block ${inkMuted} ${hoverRow} ${focusRing}`}
                >
                  Register
                </NavLink>
                <NavLink
                  to="login"
                  className={`hidden px-4 py-2 text-sm sm:inline-flex ${primaryButton}`}
                >
                  <LuLogIn className="h-4 w-4" />
                  <span>Log In</span>
                </NavLink>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className={`rounded-md p-2 transition-colors lg:hidden ${inkMuted} ${hoverRow} ${focusRing}`}
            >
              {isMobileMenuOpen ? (
                <LuX className="h-6 w-6" />
              ) : (
                <LuMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - mirrors the desktop structure/routes exactly */}
        {isMobileMenuOpen && (
          <div className={`mt-3 border-t pb-2 pt-3 lg:hidden ${line}`}>
            <div className="space-y-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) => navLinkMobile(isActive)}
                onClick={closeMobile}
              >
                <FaHouse className="h-4 w-4" />
                <span>Home</span>
              </NavLink>

              {/* Mobile Player Tools */}
              <div className="px-3 py-2">
                <div
                  className={`mb-2 text-xs font-bold uppercase tracking-wider ${inkPrimary}`}
                >
                  Player Tools
                </div>
                <div className="ml-2 space-y-0.5">
                  <NavLink
                    to="/rules"
                    className={menuLink}
                    onClick={closeMobile}
                  >
                    Basic Rules
                  </NavLink>
                  {canPlay && (
                    <>
                      <NavLink
                        to="/characters"
                        end
                        className={menuLink}
                        onClick={closeMobile}
                      >
                        Characters
                      </NavLink>
                      <NavLink
                        to="/characters/create"
                        className={menuLink}
                        onClick={closeMobile}
                      >
                        Character Builder
                      </NavLink>
                    </>
                  )}
                  <div
                    className={`flex items-center justify-between px-2 py-1.5 text-sm ${inkSubtle}`}
                  >
                    <span>Campaigns</span>
                    <span className="text-xs italic">Soon</span>
                  </div>
                  <NavLink
                    to="/articles"
                    className={menuLink}
                    onClick={closeMobile}
                  >
                    Articles
                  </NavLink>
                </div>
              </div>

              {/* Mobile Game Resources */}
              <div className="px-3 py-2">
                <div
                  className={`mb-2 text-xs font-bold uppercase tracking-wider ${inkPrimary}`}
                >
                  Game Resources
                </div>
                <div className="ml-2 space-y-0.5">
                  <NavLink
                    to="/professions"
                    className={menuLink}
                    onClick={closeMobile}
                  >
                    Classes
                  </NavLink>
                  <NavLink
                    to="/species"
                    className={menuLink}
                    onClick={closeMobile}
                  >
                    Species
                  </NavLink>
                  <NavLink
                    to="/backgrounds"
                    className={menuLink}
                    onClick={closeMobile}
                  >
                    Backgrounds
                  </NavLink>
                  <NavLink
                    to="/items"
                    className={menuLink}
                    onClick={closeMobile}
                  >
                    Items
                  </NavLink>
                  <NavLink
                    to="/powers"
                    className={menuLink}
                    onClick={closeMobile}
                  >
                    Powers
                  </NavLink>
                </div>
              </div>

              <NavLink
                to="about"
                className={({ isActive }) => navLinkMobile(isActive)}
                onClick={closeMobile}
              >
                <span>About</span>
              </NavLink>

              {canCreateContent && (
                <NavLink
                  to="create"
                  className={({ isActive }) => navLinkMobile(isActive)}
                  onClick={closeMobile}
                >
                  <span>Create</span>
                </NavLink>
              )}

              {canSeeAdmin && (
                <NavLink
                  to="admin"
                  className={({ isActive }) => navLinkMobile(isActive)}
                  onClick={closeMobile}
                >
                  <span>Admin</span>
                </NavLink>
              )}

              {/* Mobile User Actions */}
              {currentUser ? (
                <div
                  className={`mt-2 space-y-1 border-t pt-2 sm:hidden ${line}`}
                >
                  <div className={`px-3 py-2 text-sm font-medium ${ink}`}>
                    {displayName}
                  </div>
                  <NavLink
                    to="profile"
                    className={({ isActive }) => navLinkMobile(isActive)}
                    onClick={closeMobile}
                  >
                    <FaUser className="h-4 w-4" />
                    <span>Profile</span>
                  </NavLink>

                  <button
                    className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors hover:bg-red-50 dark:hover:bg-red-500/10 ${inkDanger} ${focusRing}`}
                    onClick={() => {
                      handleLogout();
                      closeMobile();
                    }}
                  >
                    <LuLogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div
                  className={`mt-2 space-y-1 border-t pt-2 sm:hidden ${line}`}
                >
                  <NavLink
                    to="register"
                    className={({ isActive }) => navLinkMobile(isActive)}
                    onClick={closeMobile}
                  >
                    <FaRegUser className="h-4 w-4" />
                    <span>Register</span>
                  </NavLink>
                  <NavLink
                    to="login"
                    className={({ isActive }) => navLinkMobile(isActive)}
                    onClick={closeMobile}
                  >
                    <LuLogIn className="h-4 w-4" />
                    <span>Login</span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
