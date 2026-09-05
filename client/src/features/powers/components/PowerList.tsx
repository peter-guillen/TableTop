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
      const weaponTags = power.requirements?.weaponTags ?? [];
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
              Powers
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Weave magic into your life
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-3/4">
            {/* Kind Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
              {KIND_TABS.map((kind) => (
                <button
                  key={kind}
                  onClick={() => setSelectedKind(kind)}
                  className={`px-4 py-2 capitalize text-sm font-medium border-b-2 transition-colors ${
                    selectedKind === kind
                      ? "border-cyan-600 text-cyan-600 dark:text-cyan-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search powers..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {selectedKind !== "all" && (
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <LuFilter size={18} />
                    <span>Filter</span>
                    {activeFilterCount > 0 && (
                      <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-cyan-600 text-white">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-4 z-10">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
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
                            className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                          >
                            <LuX size={12} />
                            Clear
                          </button>
                        )}
                      </div>

                      {selectedKind === "spell" && (
                        <>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                            School
                          </p>
                          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                            {SCHOOL_OPTIONS.map((school) => (
                              <label
                                key={school}
                                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                              >
                                <input
                                  type="checkbox"
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
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                            Weapon Tags
                          </p>
                          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                            {WEAPON_TAG_OPTIONS.map((tag) => (
                              <label
                                key={tag}
                                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                              >
                                <input
                                  type="checkbox"
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
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                            Ability Filters
                          </p>
                          {ABILITY_OPTIONS.length === 0 ? (
                            <p className="text-sm text-slate-400 dark:text-slate-500">
                              No filters yet.
                            </p>
                          ) : (
                            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                              {ABILITY_OPTIONS.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
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
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                            Trait Filters
                          </p>
                          {TRAIT_OPTIONS.length === 0 ? (
                            <p className="text-sm text-slate-400 dark:text-slate-500">
                              No filters yet.
                            </p>
                          ) : (
                            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                              {TRAIT_OPTIONS.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
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
              <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
                No powers match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
