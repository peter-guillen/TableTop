import { useState, useCallback } from "react";

import { CharacterIdentity } from "../components/CharacterIdentity.tsx";
import { CharacterArchetype } from "../components/CharacterArchetype.tsx";
import { CharacterStats } from "../components/CharacterStats.tsx";
import { CharacterOverview } from "../components/CharacterOverview.tsx";
import { CharacterPanel } from "../components/CharacterPanel.tsx";
import {
  useGetAllCharactersQuery,
  useCreateCharacterMutation,
} from "../api/characterApi";
import { Character } from "../charactersTypes";
import { defaultCharacterFormData } from "../characterDefaults";
import { useGetConstantsQuery } from "../../../shared/api/constantsApi";

export const CharacterForm = () => {
  const {
    data: characters = [],
    isLoading: characterLoading,
    isError: characterError,
  } = useGetAllCharactersQuery();

  const {
    data: constants,
    isLoading: constantsLoading,
    isError: constantsError,
  } = useGetConstantsQuery();

  const [formData, setFormData] = useState<Character>(defaultCharacterFormData);

  // Patch form helper to avoid having to spread form data everywhere when updating fields in nested components
  // Example usage: patchForm({ species: "Human", background: "Noble" })
  const patchForm = useCallback(
    (updated: Partial<Character>) =>
      setFormData((prev) => ({ ...prev, ...updated })),
    [],
  );

  const [createCharacter] = useCreateCharacterMutation();

  if (characterLoading || constantsLoading) return <div>Loading...</div>;
  if (characterError || constantsError)
    return <div>Error loading library data</div>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createCharacter(formData);
  };

  console.log(formData);

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-slate-50 dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300 p-5 md:p-6">
        <CharacterIdentity formData={formData} patchForm={patchForm} />
        <CharacterArchetype
          constants={constants}
          formData={formData}
          patchForm={patchForm}
        />
        <CharacterStats formData={formData} patchForm={patchForm} />
        <div className="grid md:grid-cols-[280px_1fr] gap-4 items-start">
          <CharacterOverview formData={formData} patchForm={patchForm} />
          <CharacterPanel
            formData={formData}
            patchForm={patchForm}
            constants={constants}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
