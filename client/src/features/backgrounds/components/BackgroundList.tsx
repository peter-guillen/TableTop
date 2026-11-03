import { useEffect, useRef, useState } from "react";
import { LuSearch, LuFilter, LuX } from "react-icons/lu";

import { useGetAllBackgroundsQuery } from "../api/backgroundApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import { BackgroundPreview } from "./BackgroundPreview";

export const BackgroundList = () => {
  const { data: backgrounds, isLoading, isError } = useGetAllBackgroundsQuery();
  const { data: constants } = useGetConstantsQuery();

  const {
    data: powers = [],
    isLoading: loadingPowers,
    isError: errorPowers,
  } = useGetAllPowersQuery();

  const {
    data: items = [],
    isLoading: loadingItems,
    isError: errorItems,
  } = useGetAllItemsQuery();

  const [searchText, setSearchText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStats, setSelectedStats] = useState<string[]>([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  if (loadingPowers) return <p>Loading...</p>;
  if (errorPowers) return <p>Something went wrong</p>;
  if (loadingItems) return <p>Loading...</p>;
  if (errorItems) return <p>Something went wrong</p>;

  const powersById = Object.fromEntries(powers.map((p) => [p._id, p]));
  const itemsById = Object.fromEntries(items.map((i) => [i._id, i]));

  const filteredBackgrounds = (backgrounds ?? []).filter((background) => {
    if (searchText.trim().length > 0) {
      const query = searchText.trim().toLowerCase();
      const matchesText =
        background.name.toLowerCase().includes(query) ||
        background.description.toLowerCase().includes(query);
      if (!matchesText) return false;
    }

    if (selectedSkills.length > 0) {
      const hasMatch = background.skillProficiencies.some((skill) =>
        selectedSkills.includes(skill),
      );
      if (!hasMatch) return false;
    }

    if (selectedStats.length > 0) {
      const hasMatch = background.statModifiers.some((m) =>
        selectedStats.includes(m.stat),
      );
      if (!hasMatch) return false;
    }

    return true;
  });

  const activeFilterCount = selectedSkills.length + selectedStats.length;

  return (
    <>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-amber-700 dark:text-amber-400">
              Backgrounds
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-300">
              Every hero comes from somewhere
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-3/4">
            {/* Search + Filter Bar */}
            <div className="flex items-start gap-3 mb-6">
              <div className="relative flex-1">
                <LuSearch
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search backgrounds..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  <LuFilter size={18} />
                  <span>Filter</span>
                  {activeFilterCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-emerald-600 text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-lg p-4 z-10 max-h-96 overflow-y-auto">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-stone-900 dark:text-white">
                        Filters
                      </p>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={() => {
                            setSelectedSkills([]);
                            setSelectedStats([]);
                          }}
                          className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                        >
                          <LuX size={12} />
                          Clear
                        </button>
                      )}
                    </div>

                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">
                      Skills
                    </p>
                    <div className="flex flex-col gap-1 max-h-32 overflow-y-auto mb-4">
                      {Object.values(constants?.SKILLS ?? {}).map((skill) => (
                        <label
                          key={skill}
                          className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 capitalize cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSkills((prev) => [...prev, skill]);
                              } else {
                                setSelectedSkills((prev) =>
                                  prev.filter((s) => s !== skill),
                                );
                              }
                            }}
                          />
                          {skill}
                        </label>
                      ))}
                    </div>

                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">
                      Boosts
                    </p>
                    <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
                      {Object.values(constants?.STATS ?? {}).map((stat) => (
                        <label
                          key={stat}
                          className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 capitalize cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedStats.includes(stat)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStats((prev) => [...prev, stat]);
                              } else {
                                setSelectedStats((prev) =>
                                  prev.filter((s) => s !== stat),
                                );
                              }
                            }}
                          />
                          {stat}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {filteredBackgrounds.length > 0 ? (
              <BackgroundPreview
                backgrounds={filteredBackgrounds}
                powersById={powersById}
                itemsById={itemsById}
              />
            ) : (
              <p className="text-center text-stone-500 dark:text-stone-400 mt-8">
                No backgrounds match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
