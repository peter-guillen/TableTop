import { useEffect, useRef, useState, type ReactNode } from "react";
import { LuFilter, LuX } from "react-icons/lu";

interface FilterDropdownProps {
  activeCount: number;
  onClear: () => void;
  children: ReactNode;
}

// The Filter button and its popover. The list owns the filter state and
// passes its filter groups as children
export const FilterDropdown = ({
  activeCount,
  onClear,
  children,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking anywhere outside the button and popover, or on Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      >
        <LuFilter size={18} aria-hidden="true" />
        <span>Filter</span>
        {activeCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-emerald-700 text-white dark:bg-emerald-500 dark:text-stone-950">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl p-4 z-10 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-stone-900 dark:text-white">
              Filters
            </p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <LuX size={12} aria-hidden="true" />
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4">{children}</div>
        </div>
      )}
    </div>
  );
};
