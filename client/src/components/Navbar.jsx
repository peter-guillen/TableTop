import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { FaRegUser, FaUser } from "react-icons/fa6";

// import AuthContext from "../hooks/authFastRefreshHook";
import { AuthContext } from "../contexts/AuthContext";

const navLinks = twMerge(classNames("text-white font-bold p-2"));
const userLinks = twMerge(classNames("text-gray-400 font-bold p-2"));

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const dropdownRef = useRef(null);

  // useEffect for dropdown Menu
  useEffect(() => {
    // If click is outside of the navbar box then close it
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
  // if (users === null) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {}, []);

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
            <NavLink className={navLinks} to="characters">
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
                      <NavLink className={navLinks} to="powers">
                        Spells
                      </NavLink>
                      <NavLink className={navLinks} to="professions">
                        Classes
                      </NavLink>
                    </div>
                    <div className="flex flex-col space-y-2">
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
            <NavLink className={navLinks}>Make a Campaign</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <NavLink className={userLinks} to="store">
                Shop
              </NavLink>
              <NavLink className={userLinks} to="shoppingCart">
                Cart
              </NavLink>
            </div>
            {/* {currentUser ? ( */}
            <div>
              <NavLink className={userLinks} onClick={handleLogout}>
                Logout
              </NavLink>
            </div>
            {/* // ) : ( */}
            <div className="flex space-x-4">
              <NavLink className={userLinks} to="register">
                Signup
              </NavLink>
              <NavLink className={userLinks} to="login">
                Login
              </NavLink>
            </div>
            {/* )} */}
            <FaUser />
            <div className={userLinks}>
              {currentUser ? currentUser.username : <FaRegUser />}
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
