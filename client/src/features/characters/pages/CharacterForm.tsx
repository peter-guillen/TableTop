import { CharacterIdentity } from "../components/CharacterIdentity";
import { CharacterArchetype } from "../components/CharacterArchetype";
import { CharacterStats } from "../components/CharacterStats";
import { CharacterOverview } from "../components/CharacterOverview";
import { CharacterPanel } from "../components/CharacterPanel";
import { useGetAllLibraryItemsQuery } from "../../library/api/libraryApi";
import { useState, useCallback } from "react";
import {
  useCreateCharacterMutation,
  useUpdateCharacterMutation,
} from "../api/characterApi";

export const CharacterForm = () => {
  const { data: library, isLoading, isError } = useGetAllLibraryItemsQuery();

  // Patch form helper to avoid having to spread form data everywhere when updating fields in nested components
  // Example usage: patchForm({ species: "Human", background: "Noble" })
  const patchForm = useCallback(
    (updated) => setFormData((prev) => ({ ...prev, ...updated })),
    [],
  );

  const [formData, setFormData] = useState({
    name: "",
    mode: "classed",
    subPronoun: "",
    objPronoun: "",
    portrait: null,
    age: "",
    species: "",
    background: "",
    profession: "",
    subProfession: "",
    affinity: "",
    selectedFeats: [],
    selectedWeapons: [],
    selectedArmor: "",
    hpMax: 50,
    hpCurrent: 0,
    mpMax: 30,
    mpCurrent: 0,
    momMax: 5,
    momCurrent: 0,
    attack: 0,
    accuracy: 0,
    dominance: 0,
    defense: 0,
    resolve: 0,
    resilience: 0,
    movement: 0,
    initiative: 0,
    modSources: [],
  });

  const [createCharacter] = useCreateCharacterMutation();
  const [updateCharacter] = useUpdateCharacterMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading library data</div>;

  const handleSumbit = async (event) => {
    event.preventDefault();
    await createCharacter(formData);
  };

  console.log(library);

  return (
    <form onSubmit={handleSumbit}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-slate-50 dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300 p-5 md:p-6">
        <CharacterIdentity
          library={library}
          formData={formData}
          patchForm={patchForm}
        />
        <CharacterArchetype
          library={library}
          formData={formData}
          patchForm={patchForm}
        />
        <CharacterStats
          library={library}
          formData={formData}
          patchForm={patchForm}
        />
        <div className="grid md:grid-cols-[280px_1fr] gap-4 items-start">
          <CharacterOverview
            library={library}
            formData={formData}
            patchForm={patchForm}
          />
          <CharacterPanel
            library={library}
            formData={formData}
            patchForm={patchForm}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
