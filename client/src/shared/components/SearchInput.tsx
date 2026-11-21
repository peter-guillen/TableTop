import { LuSearch } from "react-icons/lu";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: SearchInputProps) => {
  return (
    <div className="relative flex-1">
      <LuSearch
        size={18}
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400"
      />
    </div>
  );
};
