import { useState } from "react";

import { useGetAllSpeciesQuery } from "../api/speciesApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import { SpeciesPreview } from "./SpeciesPreview";
import { EmptyState } from "../../../shared/components/EmptyState.tsx";
import { ErrorMessage } from "../../../shared/components/ErrorMessage.tsx";
import { FilterCheckboxGroup } from "../../../shared/components/FilterCheckboxGroup.tsx";
import { FilterDropdown } from "../../../shared/components/FilterDropdown.tsx";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner.tsx";
import { SearchInput } from "../../../shared/components/SearchInput.tsx";

export const SpeciesList = () => {
  const { data: species, isLoading, isError } = useGetAllSpeciesQuery();
  const { data: constants } = useGetConstantsQuery();

  const {
    data: powers = [],
    isLoading: loadingPowers,
    isError: errorPowers,
  } = useGetAllPowersQuery();

  const [searchText, setSearchText] = useState("");
  const [selectedStats, setSelectedStats] = useState<string[]>([]);
  const [selectedResistanceTypes, setSelectedResistanceTypes] = useState<
    string[]
  >([]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;
  if (loadingPowers) return <LoadingSpinner />;
  if (errorPowers) return <ErrorMessage />;

  const powersById = Object.fromEntries(powers.map((p) => [p._id, p]));

  const filteredSpecies = (species ?? []).filter((s) => {
    if (searchText.trim().length > 0) {
      const query = searchText.trim().toLowerCase();
      const matchesText =
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query);
      if (!matchesText) return false;
    }

    if (selectedStats.length > 0) {
      const hasMatch = s.statModifiers.some((m) =>
        selectedStats.includes(m.stat),
      );
      if (!hasMatch) return false;
    }

    if (selectedResistanceTypes.length > 0) {
      const hasMatch = s.resistances.some((r) =>
        selectedResistanceTypes.includes(r.damageType),
      );
      if (!hasMatch) return false;
    }

    return true;
  });

  const activeFilterCount =
    selectedStats.length + selectedResistanceTypes.length;

  return (
    <>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-700 dark:text-amber-400">
              Species
            </h1>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300">
              The peoples of the world
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            {/* Search + Filter Bar */}
            <div className="flex items-start gap-3 mb-6">
              <SearchInput
                value={searchText}
                onChange={setSearchText}
                placeholder="Search species..."
              />

              <FilterDropdown
                activeCount={activeFilterCount}
                onClear={() => {
                  setSelectedStats([]);
                  setSelectedResistanceTypes([]);
                }}
              >
                <FilterCheckboxGroup
                  label="Boosts"
                  options={Object.values(constants?.STATS ?? {})}
                  selected={selectedStats}
                  onChange={setSelectedStats}
                />

                <FilterCheckboxGroup
                  label="Resists"
                  options={constants?.DAMAGE_TYPES ?? []}
                  selected={selectedResistanceTypes}
                  onChange={setSelectedResistanceTypes}
                />
              </FilterDropdown>
            </div>

            {filteredSpecies.length > 0 ? (
              <SpeciesPreview
                species={filteredSpecies}
                powersById={powersById}
              />
            ) : (
              <EmptyState message="No species match your search." />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
