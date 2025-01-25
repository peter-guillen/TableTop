import { useState, useEffect } from "react";
import { ThemeContext } from "../hooks/themeFastRefreshHook";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const ThemeContextProvider = ({ children }) => {
  // const [darkMode, setDarkMode] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = getCookie("theme");
    return savedTheme === "dark"; // Convert string to boolean
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    document.cookie = "theme=dark; path=/; max-age=" + 60 * 60 * 24 * 365;
  }, [darkMode]);

  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  // };
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
