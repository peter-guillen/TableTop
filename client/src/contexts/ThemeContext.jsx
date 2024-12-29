import { useState, useEffect } from "react";
import { ThemeContext } from "../hooks/themeFastRefreshHook";

export const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
