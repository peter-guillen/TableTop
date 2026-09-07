import { useEffect, useRef, useState } from "react";
import { LuSearch, LuFilter, LuX } from "react-icons/lu";

import { useGetAllItemsQuery } from "../api/itemApi";
import { useGetConstantsQuery } from "../../../shared/api/constantsApi.ts";

import { ItemPreview } from "./ItemPreview";
import { ItemCategory, Item } from "../itemTypes.ts";

const CATEGORY_OPTIONS: ItemCategory[] = [
  "weapon",
  "armor",
  "accessory",
  "consumable",
  "trinket",
];
const CATEGORY_TABS = ["all", ...CATEGORY_OPTIONS] as const;

// selfCharges.recharge is schema-inline (no "unlimited"), same reasoning
// as ItemBasicInfoSection hardcoding category — not a shared constant.
const SELF_CHARGES_RECHARGE_OPTIONS = [
  "none",
  "short_rest",
  "long_rest",
  "daily",
] as const;

export const ItemList = () => {
  const { data: items, isLoading, isError } = useGetAllItemsQuery();
  const { data: constants } = useGetConstantsQuery();

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORY_TABS)[number]>("all");

  // Universal filters — apply on every tab, including "all"
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  // Category-specific filters
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]); // weapon
  const [selectedResistanceTypes, setSelectedResistanceTypes] = useState<
    string[]
  >([]); // armor
  const [selectedModifierStats, setSelectedModifierStats] = useState<string[]>(
    [],
  ); // accessory
  const [selectedHealthDirections, setSelectedHealthDirections] = useState<
    string[]
  >([]); // consumable
  const [selectedConsumableDamageTypes, setSelectedConsumableDamageTypes] =
    useState<string[]>([]); // consumable
  const [selectedRechargeOptions, setSelectedRechargeOptions] = useState<
    string[]
  >([]); // trinket

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
  console.log(constants);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const toggle = (
    value: string,
    selected: string[],
    setSelected: (v: string[]) => void,
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const matchesUniversalFilters = (item: Item) => {
    if (
      selectedRarities.length > 0 &&
      !selectedRarities.includes(item.rarity)
    ) {
      return false;
    }
    if (
      selectedQualities.length > 0 &&
      !item.quality.some((q) => selectedQualities.includes(q))
    ) {
      return false;
    }
    if (
      selectedMaterials.length > 0 &&
      !item.materials.some((m) => selectedMaterials.includes(m))
    ) {
      return false;
    }
    return true;
  };

  const matchesCategoryFilters = (item: Item) => {
    if (item.category === "weapon" && selectedProperties.length > 0) {
      if (!item.properties.some((p) => selectedProperties.includes(p))) {
        return false;
      }
    }

    if (item.category === "armor" && selectedResistanceTypes.length > 0) {
      const hasMatch = item.resistances.some((r) =>
        selectedResistanceTypes.includes(r.damageType),
      );
      if (!hasMatch) return false;
    }

    if (item.category === "accessory" && selectedModifierStats.length > 0) {
      const hasMatch = item.statModifiers.some((m) =>
        selectedModifierStats.includes(m.stat),
      );
      if (!hasMatch) return false;
    }

    if (item.category === "consumable") {
      if (
        selectedHealthDirections.length > 0 &&
        !item.healthEffects.some((e) =>
          selectedHealthDirections.includes(e.direction),
        )
      ) {
        return false;
      }
      if (
        selectedConsumableDamageTypes.length > 0 &&
        !item.healthEffects.some((e) =>
          selectedConsumableDamageTypes.includes(e.damageType),
        )
      ) {
        return false;
      }
    }

    if (item.category === "trinket" && selectedRechargeOptions.length > 0) {
      if (!selectedRechargeOptions.includes(item.selfCharges.recharge)) {
        return false;
      }
    }

    return true;
  };

  const filteredItems = (items ?? []).filter((item) => {
    if (searchText.trim().length > 0) {
      const query = searchText.trim().toLowerCase();
      const matchesText =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);
      if (!matchesText) return false;
    }

    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }

    if (!matchesUniversalFilters(item)) return false;
    if (!matchesCategoryFilters(item)) return false;

    return true;
  });

  const activeFilterCount =
    selectedRarities.length +
    selectedQualities.length +
    selectedMaterials.length +
    (selectedCategory === "weapon"
      ? selectedProperties.length
      : selectedCategory === "armor"
        ? selectedResistanceTypes.length
        : selectedCategory === "accessory"
          ? selectedModifierStats.length
          : selectedCategory === "consumable"
            ? selectedHealthDirections.length +
              selectedConsumableDamageTypes.length
            : selectedCategory === "trinket"
              ? selectedRechargeOptions.length
              : 0);

  const clearAllFilters = () => {
    setSelectedRarities([]);
    setSelectedQualities([]);
    setSelectedMaterials([]);
    setSelectedProperties([]);
    setSelectedResistanceTypes([]);
    setSelectedModifierStats([]);
    setSelectedHealthDirections([]);
    setSelectedConsumableDamageTypes([]);
    setSelectedRechargeOptions([]);
  };

  const statAndSkillOptions = [
    ...Object.values(constants?.STATS ?? {}),
    ...Object.values(constants?.SKILLS ?? {}),
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
              Items
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Weave magic into your life
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-3/4">
            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
              {CATEGORY_TABS.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 capitalize text-sm font-medium border-b-2 transition-colors ${
                    selectedCategory === category
                      ? "border-cyan-600 text-cyan-600 dark:text-cyan-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {category}
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
                  placeholder="Search items..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

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
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg p-4 z-10 max-h-96 overflow-y-auto">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Filters
                      </p>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearAllFilters}
                          className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        >
                          <LuX size={12} />
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Universal filters */}
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                      Rarity
                    </p>
                    <div className="flex flex-col gap-1 max-h-32 overflow-y-auto mb-4">
                      {(constants?.RARITY ?? []).map((rarity) => (
                        <label
                          key={rarity}
                          className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedRarities.includes(rarity)}
                            onChange={() =>
                              toggle(
                                rarity,
                                selectedRarities,
                                setSelectedRarities,
                              )
                            }
                          />
                          {rarity}
                        </label>
                      ))}
                    </div>

                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                      Quality
                    </p>
                    <div className="flex flex-col gap-1 max-h-32 overflow-y-auto mb-4">
                      {(constants?.QUALITY ?? []).map((quality) => (
                        <label
                          key={quality}
                          className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedQualities.includes(quality)}
                            onChange={() =>
                              toggle(
                                quality,
                                selectedQualities,
                                setSelectedQualities,
                              )
                            }
                          />
                          {quality}
                        </label>
                      ))}
                    </div>

                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                      Materials
                    </p>
                    <div className="flex flex-col gap-1 max-h-32 overflow-y-auto mb-4">
                      {(constants?.MATERIALS ?? []).map((material) => (
                        <label
                          key={material}
                          className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedMaterials.includes(material)}
                            onChange={() =>
                              toggle(
                                material,
                                selectedMaterials,
                                setSelectedMaterials,
                              )
                            }
                          />
                          {material}
                        </label>
                      ))}
                    </div>

                    {/* Category-specific filters */}
                    {selectedCategory === "weapon" && (
                      <>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Properties
                        </p>
                        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                          {(constants?.PROPERTIES ?? []).map((property) => (
                            <label
                              key={property}
                              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedProperties.includes(property)}
                                onChange={() =>
                                  toggle(
                                    property,
                                    selectedProperties,
                                    setSelectedProperties,
                                  )
                                }
                              />
                              {property}
                            </label>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedCategory === "armor" && (
                      <>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Resists
                        </p>
                        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                          {(constants?.DAMAGE_TYPES ?? []).map((type) => (
                            <label
                              key={type}
                              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedResistanceTypes.includes(type)}
                                onChange={() =>
                                  toggle(
                                    type,
                                    selectedResistanceTypes,
                                    setSelectedResistanceTypes,
                                  )
                                }
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedCategory === "accessory" && (
                      <>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Boosts
                        </p>
                        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                          {statAndSkillOptions.map((stat) => (
                            <label
                              key={stat}
                              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedModifierStats.includes(stat)}
                                onChange={() =>
                                  toggle(
                                    stat,
                                    selectedModifierStats,
                                    setSelectedModifierStats,
                                  )
                                }
                              />
                              {stat}
                            </label>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedCategory === "consumable" && (
                      <>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Effect
                        </p>
                        <div className="flex flex-col gap-1 mb-4">
                          {["damage", "healing"].map((direction) => (
                            <label
                              key={direction}
                              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedHealthDirections.includes(
                                  direction,
                                )}
                                onChange={() =>
                                  toggle(
                                    direction,
                                    selectedHealthDirections,
                                    setSelectedHealthDirections,
                                  )
                                }
                              />
                              {direction}
                            </label>
                          ))}
                        </div>

                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Damage Type
                        </p>
                        <div className="flex flex-col gap-1 max-h-32 overflow-y-auto">
                          {(constants?.DAMAGE_TYPES ?? []).map((type) => (
                            <label
                              key={type}
                              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedConsumableDamageTypes.includes(
                                  type,
                                )}
                                onChange={() =>
                                  toggle(
                                    type,
                                    selectedConsumableDamageTypes,
                                    setSelectedConsumableDamageTypes,
                                  )
                                }
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedCategory === "trinket" && (
                      <>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Recharge
                        </p>
                        <div className="flex flex-col gap-1">
                          {SELF_CHARGES_RECHARGE_OPTIONS.map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 capitalize cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedRechargeOptions.includes(
                                  option,
                                )}
                                onChange={() =>
                                  toggle(
                                    option,
                                    selectedRechargeOptions,
                                    setSelectedRechargeOptions,
                                  )
                                }
                              />
                              {option.replace("_", " ")}
                            </label>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {filteredItems.length > 0 ? (
              <ItemPreview items={filteredItems} />
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
                No items match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
