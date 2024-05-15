import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

// import { FaRegUser, FaUser } from "react-icons/fa6";

const navLinks = twMerge(classNames("text-white font-bold p-2"));
const userLinks = twMerge(classNames("text-gray-400 font-bold p-2"));

const Navbar = () => {
  return (
    <>
      <header>
        <nav className="bg-gray-700 m-auto p-4">
          <NavLink className={navLinks} to="/">
            Home
          </NavLink>
          <NavLink className={navLinks} to="articles">
            Articles
          </NavLink>
          <NavLink className={navLinks} to="professions">
            Professions
          </NavLink>
          <NavLink className={navLinks} to="powers">
            Powers
          </NavLink>
          <NavLink className={navLinks} to="equipment">
            Equipment
          </NavLink>
          <NavLink className={navLinks} to="weapons">
            Weapons
          </NavLink>
          <NavLink className={navLinks} to="armors">
            Armor
          </NavLink>
          <NavLink className={userLinks}>Cart</NavLink>
          <NavLink className={navLinks} to="register">
            Signup
          </NavLink>
          <NavLink className={userLinks}>Login</NavLink>
          {/* <FaRegUser /> */}
          <NavLink className={userLinks}>Logout</NavLink>
          {/* <FaUser /> */}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
