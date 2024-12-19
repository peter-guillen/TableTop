import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { FaRegUser, FaUser, FaCartShopping } from "react-icons/fa6";

import { AuthContext } from "../contexts/AuthContext";

const navLinks = twMerge(classNames("text-white font-bold p-2"));
const userLinks = twMerge(classNames("text-gray-400 font-bold p-2"));

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenNavbar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { currentUser, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header>
        <nav className="flex justify-between items-center bg-gray-700 p-4">
          <div className="flex items-center space-x-4">
            <NavLink className={navLinks} to="/">
              Home
            </NavLink>
            <NavLink className={navLinks} to="rules">
              Rules
            </NavLink>
            <NavLink className={userLinks} to="characters">
              Characters
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
                  <div className="absolute top-full left-0 bg-gray-700 grid grid-cols-2 gap-4 p-4 w-64 rounded-md">
                    <div className="flex flex-col space-y-2">
                      <h3>Powers</h3>
                      <hr />
                      <NavLink className={navLinks} to="powers">
                        Spells
                      </NavLink>
                      <NavLink className={navLinks} to="professions">
                        Classes
                      </NavLink>
                    </div>
                    <div className="flex flex-col space-y-2 ">
                      <h3>Equipment</h3>
                      <hr />
                      <NavLink className={navLinks} to="equipment">
                        Items
                      </NavLink>
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
            <NavLink className={userLinks}>Make a Campaign</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <NavLink className={navLinks} to="shop">
                Shop
              </NavLink>
              <NavLink className={userLinks} to="shoppingCart">
                <FaCartShopping />
              </NavLink>
            </div>
            {currentUser ? (
              <div>
                <NavLink className={navLinks} onClick={handleLogout}>
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
                  <NavLink className={navLinks} to="register">
                    Signup
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
