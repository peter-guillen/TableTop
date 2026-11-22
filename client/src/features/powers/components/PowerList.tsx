import { useState } from "react";

import { useGetAllConditionsQuery } from "../../conditions/api/conditionApi";
import { useGetAllPowersQuery } from "../api/powerApi";

import { PowerPreview } from "./PowerPreview";
import { EmptyState } from "../../../shared/components/EmptyState.tsx";
import { ErrorMessage } from "../../../shared/components/ErrorMessage.tsx";
import { FilterCheckboxGroup } from "../../../shared/components/FilterCheckboxGroup.tsx";
import { FilterDropdown } from "../../../shared/components/FilterDropdown.tsx";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner.tsx";
import { SearchInput } from "../../../shared/components/SearchInput.tsx";

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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;
  if (loadingCondition) return <LoadingSpinner />;
  if (errorCondition) return <ErrorMessage />;

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
              <SearchInput
                value={searchText}
                onChange={setSearchText}
                placeholder="Search powers..."
              />

              {selectedKind !== "all" && (
                <FilterDropdown
                  activeCount={activeFilterCount}
                  onClear={() => {
                    setSelectedSchools([]);
                    setSelectedWeaponTags([]);
                    setSelectedAbilityOptions([]);
                    setSelectedTraitOptions([]);
                  }}
                >
                  {selectedKind === "spell" && (
                    <FilterCheckboxGroup
                      label="School"
                      options={SCHOOL_OPTIONS}
                      selected={selectedSchools}
                      onChange={setSelectedSchools}
                    />
                  )}

                  {selectedKind === "technique" && (
                    <FilterCheckboxGroup
                      label="Weapon Tags"
                      options={WEAPON_TAG_OPTIONS}
                      selected={selectedWeaponTags}
                      onChange={setSelectedWeaponTags}
                    />
                  )}

                  {selectedKind === "ability" && (
                    <FilterCheckboxGroup
                      label="Ability Filters"
                      options={ABILITY_OPTIONS}
                      selected={selectedAbilityOptions}
                      onChange={setSelectedAbilityOptions}
                    />
                  )}

                  {selectedKind === "trait" && (
                    <FilterCheckboxGroup
                      label="Trait Filters"
                      options={TRAIT_OPTIONS}
                      selected={selectedTraitOptions}
                      onChange={setSelectedTraitOptions}
                    />
                  )}
                </FilterDropdown>
              )}
            </div>

            {filteredPowers.length > 0 ? (
              <PowerPreview
                powers={filteredPowers}
                conditionsById={conditionsById}
              />
            ) : (
              <EmptyState message="No powers match your search." />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
