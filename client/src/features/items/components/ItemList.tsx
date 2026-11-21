import { useState } from "react";

import { useGetAllItemsQuery } from "../api/itemApi";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import { ItemPreview } from "./ItemPreview";
import { Category, Item } from "../itemTypes.ts";
import { EmptyState } from "../../../shared/components/EmptyState.tsx";
import { ErrorMessage } from "../../../shared/components/ErrorMessage.tsx";
import { FilterCheckboxGroup } from "../../../shared/components/FilterCheckboxGroup.tsx";
import { FilterDropdown } from "../../../shared/components/FilterDropdown.tsx";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner.tsx";
import { SearchInput } from "../../../shared/components/SearchInput.tsx";

const CATEGORY_OPTIONS: Category[] = [
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
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

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
          selectedConsumableDamageTypes.includes(e.damageType ?? ""),
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
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-700 dark:text-amber-400">
              Items
            </h1>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300">
              Weave magic into your life
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full lg:w-3/4">
            {/* Category Tabs */}
            <div className="flex gap-1 sm:gap-2 mb-6 border-b border-stone-200 dark:border-stone-800 overflow-x-auto">
              {CATEGORY_TABS.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 whitespace-nowrap px-3 sm:px-4 py-2 capitalize text-sm font-semibold border-b-2 transition-colors ${
                    selectedCategory === category
                      ? "border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-400"
                      : "border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search + Filter Bar */}
            <div className="flex items-start gap-3 mb-6">
              <SearchInput
                value={searchText}
                onChange={setSearchText}
                placeholder="Search items..."
              />

              <FilterDropdown
                activeCount={activeFilterCount}
                onClear={clearAllFilters}
              >
                {/* Universal filters */}
                <FilterCheckboxGroup
                  label="Rarity"
                  options={constants?.RARITY ?? []}
                  selected={selectedRarities}
                  onChange={setSelectedRarities}
                />

                <FilterCheckboxGroup
                  label="Quality"
                  options={constants?.QUALITY ?? []}
                  selected={selectedQualities}
                  onChange={setSelectedQualities}
                />

                <FilterCheckboxGroup
                  label="Materials"
                  options={constants?.MATERIALS ?? []}
                  selected={selectedMaterials}
                  onChange={setSelectedMaterials}
                />

                {/* Category-specific filters */}
                {selectedCategory === "weapon" && (
                  <FilterCheckboxGroup
                    label="Properties"
                    options={constants?.PROPERTIES ?? []}
                    selected={selectedProperties}
                    onChange={setSelectedProperties}
                  />
                )}

                {selectedCategory === "armor" && (
                  <FilterCheckboxGroup
                    label="Resists"
                    options={constants?.DAMAGE_TYPES ?? []}
                    selected={selectedResistanceTypes}
                    onChange={setSelectedResistanceTypes}
                  />
                )}

                {selectedCategory === "accessory" && (
                  <FilterCheckboxGroup
                    label="Boosts"
                    options={statAndSkillOptions}
                    selected={selectedModifierStats}
                    onChange={setSelectedModifierStats}
                  />
                )}

                {selectedCategory === "consumable" && (
                  <>
                    <FilterCheckboxGroup
                      label="Effect"
                      options={["damage", "healing"]}
                      selected={selectedHealthDirections}
                      onChange={setSelectedHealthDirections}
                    />

                    <FilterCheckboxGroup
                      label="Damage Type"
                      options={constants?.DAMAGE_TYPES ?? []}
                      selected={selectedConsumableDamageTypes}
                      onChange={setSelectedConsumableDamageTypes}
                    />
                  </>
                )}

                {selectedCategory === "trinket" && (
                  <FilterCheckboxGroup
                    label="Recharge"
                    options={SELF_CHARGES_RECHARGE_OPTIONS}
                    selected={selectedRechargeOptions}
                    onChange={setSelectedRechargeOptions}
                  />
                )}
              </FilterDropdown>
            </div>

            {filteredItems.length > 0 ? (
              <ItemPreview items={filteredItems} />
            ) : (
              <EmptyState message="No items match your search." />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
