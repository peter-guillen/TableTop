import { useEffect, useRef, useState } from "react";
import { LuSearch, LuFilter, LuX } from "react-icons/lu";

import { useGetAllConditionsQuery } from "../../conditions/api/conditionApi";
import { useGetAllPowersQuery } from "../api/powerApi";

import { PowerPreview } from "./PowerPreview";

const KIND_OPTIONS = ["spell", "technique", "ability", "trait"] as const;
const KIND_TABS = ["all", ...KIND_OPTIONS] as const;

const SCHOOL_OPTIONS = [
  "abjuration",
  "conjuration",
  "divination",
  "enchantment",
  "evocation",
  "illusion",
  "necromancy",
  "transmutation",
] as const;

const WEAPON_TAG_OPTIONS = [
  "finesse",
  "heavy",
  "light",
  "loading",
  "reach",
  "thrown",
  "two-handed",
] as const;

const ABILITY_OPTIONS: string[] = []; // placeholder — swap in real values later
const TRAIT_OPTIONS: string[] = []; // placeholder — swap in real values later

export const PowerList = () => {
  const { data: powers, isLoading, isError } = useGetAllPowersQuery();

  const {
    data: conditions = [],
    isLoading: loadingCondition,
    isError: errorCondition,
  } = useGetAllConditionsQuery();

  const [searchText, setSearchText] = useState("");
  const [selectedKind, setSelectedKind] =
    useState<(typeof KIND_TABS)[number]>("all");

  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [selectedWeaponTags, setSelectedWeaponTags] = useState<string[]>([]);
  const [selectedAbilityOptions, setSelectedAbilityOptions] = useState<
    string[]
  >([]);
  const [selectedTraitOptions, setSelectedTraitOptions] = useState<string[]>(
    [],
  );

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
  if (loadingCondition) return <p>Loading...</p>;
  if (errorCondition) return <p>Something went wrong</p>;

  const conditionsById = Object.fromEntries(conditions.map((c) => [c._id, c]));

  const filteredPowers = (powers ?? []).filter((power) => {
    if (searchText.trim().length > 0) {
      const query = searchText.trim().toLowerCase();
      const matchesText =
        power.name.toLowerCase().includes(query) ||
        power.description.toLowerCase().includes(query);
      if (!matchesText) return false;
    }

    if (selectedKind !== "all" && power.kind !== selectedKind) {
      return false;
    }

    if (
      selectedKind === "spell" &&
      selectedSchools.length > 0 &&
      (!power.school || !selectedSchools.includes(power.school))
    ) {
      return false;
    }

    if (selectedKind === "technique" && selectedWeaponTags.length > 0) {
      const weaponTags = power.requirements?.properties ?? [];
      const hasMatch = weaponTags.some((tag) =>
        selectedWeaponTags.includes(tag),
      );
      if (!hasMatch) return false;
    }

    // ability/trait filters have no real field to match against yet —
    // selectedAbilityOptions/selectedTraitOptions are wired up but no-op
    // until those option lists and their matching power fields are built

    return true;
  });

  const activeFilterCount =
    selectedKind === "spell"
      ? selectedSchools.length
      : selectedKind === "technique"
        ? selectedWeaponTags.length
        : selectedKind === "ability"
          ? selectedAbilityOptions.length
          : selectedKind === "trait"
            ? selectedTraitOptions.length
            : 0;

  return (
    <>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-700 dark:text-amber-400">
              Powers
            </h1>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300">
              Weave magic into your life
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full lg:w-3/4">
            {/* Kind Tabs */}
            <div className="flex gap-1 sm:gap-2 mb-6 border-b border-stone-200 dark:border-stone-800 overflow-x-auto">
              {KIND_TABS.map((kind) => (
                <button
                  key={kind}
                  onClick={() => setSelectedKind(kind)}
                  className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 capitalize text-sm font-semibold border-b-2 transition-colors ${
                    selectedKind === kind
                      ? "border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-400"
                      : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600"
                  }`}
                >
                  {kind}
                </button>
              ))}
            </div>

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
                  placeholder="Search powers..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400"
                />
              </div>

              {selectedKind !== "all" && (
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <LuFilter size={18} />
                    <span>Filter</span>
                    {activeFilterCount > 0 && (
                      <span className="flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-emerald-700 text-white dark:bg-emerald-500 dark:text-stone-950">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl p-4 z-10">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-stone-900 dark:text-white">
                          Filters
                        </p>
                        {activeFilterCount > 0 && (
                          <button
                            onClick={() => {
                              setSelectedSchools([]);
                              setSelectedWeaponTags([]);
                              setSelectedAbilityOptions([]);
                              setSelectedTraitOptions([]);
                            }}
                            className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                          >
                            <LuX size={12} />
                            Clear
                          </button>
                        )}
                      </div>

                      {selectedKind === "spell" && (
                        <>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                            School
                          </p>
                          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                            {SCHOOL_OPTIONS.map((school) => (
                              <label
                                key={school}
                                className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 capitalize cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 accent-emerald-700 dark:accent-emerald-500"
                                  checked={selectedSchools.includes(school)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedSchools((prev) => [
                                        ...prev,
                                        school,
                                      ]);
                                    } else {
                                      setSelectedSchools((prev) =>
                                        prev.filter((s) => s !== school),
                                      );
                                    }
                                  }}
                                />
                                {school}
                              </label>
                            ))}
                          </div>
                        </>
                      )}

                      {selectedKind === "technique" && (
                        <>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                            Weapon Tags
                          </p>
                          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                            {WEAPON_TAG_OPTIONS.map((tag) => (
                              <label
                                key={tag}
                                className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 capitalize cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 accent-emerald-700 dark:accent-emerald-500"
                                  checked={selectedWeaponTags.includes(tag)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedWeaponTags((prev) => [
                                        ...prev,
                                        tag,
                                      ]);
                                    } else {
                                      setSelectedWeaponTags((prev) =>
                                        prev.filter((t) => t !== tag),
                                      );
                                    }
                                  }}
                                />
                                {tag}
                              </label>
                            ))}
                          </div>
                        </>
                      )}

                      {selectedKind === "ability" && (
                        <>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                            Ability Filters
                          </p>
                          {ABILITY_OPTIONS.length === 0 ? (
                            <p className="text-sm text-stone-400 dark:text-stone-500">
                              No filters yet.
                            </p>
                          ) : (
                            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                              {ABILITY_OPTIONS.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 capitalize cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-emerald-700 dark:accent-emerald-500"
                                    checked={selectedAbilityOptions.includes(
                                      option,
                                    )}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedAbilityOptions((prev) => [
                                          ...prev,
                                          option,
                                        ]);
                                      } else {
                                        setSelectedAbilityOptions((prev) =>
                                          prev.filter((o) => o !== option),
                                        );
                                      }
                                    }}
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      {selectedKind === "trait" && (
                        <>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                            Trait Filters
                          </p>
                          {TRAIT_OPTIONS.length === 0 ? (
                            <p className="text-sm text-stone-400 dark:text-stone-500">
                              No filters yet.
                            </p>
                          ) : (
                            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                              {TRAIT_OPTIONS.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300 capitalize cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-emerald-700 dark:accent-emerald-500"
                                    checked={selectedTraitOptions.includes(
                                      option,
                                    )}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedTraitOptions((prev) => [
                                          ...prev,
                                          option,
                                        ]);
                                      } else {
                                        setSelectedTraitOptions((prev) =>
                                          prev.filter((o) => o !== option),
                                        );
                                      }
                                    }}
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {filteredPowers.length > 0 ? (
              <PowerPreview
                powers={filteredPowers}
                conditionsById={conditionsById}
              />
            ) : (
              <p className="text-center text-stone-500 dark:text-stone-400 mt-8">
                No powers match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
