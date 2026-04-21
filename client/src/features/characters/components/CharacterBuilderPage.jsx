import { CharacterIdentity } from "./CharacterIdentity";
import { CharacterArchetype } from "./CharacterArchetype";
import { CharacterStats } from "./CharacterStats";
import { CharacterOverview } from "./CharacterOverview";
import { CharacterPanel } from "./CharacterPanel";
import { useGetLibraryItemsQuery } from "../../../features/library/api/libraryApi";
import { useState, useCallback } from "react";

export const CharacterBuilderPage = () => {
  const { data: library, isLoading, error } = useGetLibraryItemsQuery();
  const updateInput = useCallback(
    (updated) => setState((prev) => ({ ...prev, ...updated })),
    [],
  );

  const [state, setState] = useState({
    name: "",
    cls: "",
    mode: "standard",
    subPronoun: "",
    objPronoun: "",
    portrait: null,
    innerTab: "Powers",
    expandedPower: null,
    age: "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading library data</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-slate-50 dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300 p-5 md:p-6">
      <CharacterIdentity
        library={library}
        state={state}
        updateInput={updateInput}
      />
      <CharacterArchetype library={library} state={state} />
      <CharacterStats
        library={library}
        state={state}
        updateInput={updateInput}
      />
      <div className="grid md:grid-cols-[280px_1fr] gap-4 items-start">
        <CharacterOverview
          library={library}
          state={state}
          updateInput={updateInput}
        />
        <CharacterPanel
          library={library}
          state={state}
          updateInput={updateInput}
        />
      </div>
    </div>
  );
};
