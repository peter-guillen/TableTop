// components/SearchBar.jsx
import React from "react";
import { LuSearch } from "react-icons/lu";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative flex-1 max-w-md ${className}`}>
      <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-10 pr-4 py-2
          border border-gray-300 dark:border-slate-600
          rounded-lg
          focus:ring-2 focus:ring-cyan-500 focus:border-transparent
          bg-white dark:bg-slate-700
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-slate-400
        "
      />
    </div>
  );
}
