import { useState } from "react";

import { useGetAllBackgroundsQuery } from "../api/backgroundApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import { BackgroundPreview } from "./BackgroundPreview";
import { EmptyState } from "../../../shared/components/EmptyState.tsx";
import { ErrorMessage } from "../../../shared/components/ErrorMessage.tsx";
import { FilterCheckboxGroup } from "../../../shared/components/FilterCheckboxGroup.tsx";
import { FilterDropdown } from "../../../shared/components/FilterDropdown.tsx";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner.tsx";
import { SearchInput } from "../../../shared/components/SearchInput.tsx";

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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;
  if (loadingPowers) return <LoadingSpinner />;
  if (errorPowers) return <ErrorMessage />;
  if (loadingItems) return <LoadingSpinner />;
  if (errorItems) return <ErrorMessage />;

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
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-700 dark:text-amber-400">
              Backgrounds
            </h1>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300">
              Every hero comes from somewhere
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
                placeholder="Search backgrounds..."
              />

              <FilterDropdown
                activeCount={activeFilterCount}
                onClear={() => {
                  setSelectedSkills([]);
                  setSelectedStats([]);
                }}
              >
                <FilterCheckboxGroup
                  label="Skills"
                  options={Object.values(constants?.SKILLS ?? {})}
                  selected={selectedSkills}
                  onChange={setSelectedSkills}
                />

                <FilterCheckboxGroup
                  label="Boosts"
                  options={Object.values(constants?.STATS ?? {})}
                  selected={selectedStats}
                  onChange={setSelectedStats}
                />
              </FilterDropdown>
            </div>

            {filteredBackgrounds.length > 0 ? (
              <BackgroundPreview
                backgrounds={filteredBackgrounds}
                powersById={powersById}
                itemsById={itemsById}
              />
            ) : (
              <EmptyState message="No backgrounds match your search." />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
