import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative flex-1 max-w-md ${className}`}>
      <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 dark:text-stone-500 w-4 h-4" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-10 pr-4 py-2
          border border-stone-300 dark:border-stone-600
          rounded-lg
          focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          bg-white dark:bg-stone-700
          text-stone-900 dark:text-white
          placeholder-stone-500 dark:placeholder-stone-400
        "
      />
    </div>
  );
}
