interface FilterCheckboxGroupProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

// One titled list of checkboxes inside a FilterDropdown. Options show with
// underscores as spaces ("short_rest" reads "short rest")
export const FilterCheckboxGroup = ({
  label,
  options,
  selected,
  onChange,
}: FilterCheckboxGroupProps) => {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
        {label}
      </p>
      {options.length === 0 ? (
        <p className="text-sm text-stone-400 dark:text-stone-500">
          No filters yet.
        </p>
      ) : (
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 capitalize cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-emerald-700 dark:accent-emerald-500"
                checked={selected.includes(option)}
                onChange={(e) =>
                  onChange(
                    e.target.checked
                      ? [...selected, option]
                      : selected.filter((value) => value !== option),
                  )
                }
              />
              {option.replace(/_/g, " ")}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
