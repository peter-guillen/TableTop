import { useState, useCallback } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { CharacterIdentity } from "../components/CharacterIdentity.tsx";
import { CharacterArchetype } from "../components/CharacterArchetype.tsx";
import { useCreateCharacterMutation } from "../api/characterApi";
import { useGetAllSpeciesQuery } from "../../species/api/speciesApi";
import { useGetAllBackgroundsQuery } from "../../backgrounds/api/backgroundApi";
import { useGetAllProfessionsQuery } from "../../professions/api/professionApi";
import type { CharacterInput, PatchForm } from "../charactersTypes";
import { defaultCharacterFormData } from "../characterDefaults";

export const CharacterForm = () => {
  const navigate = useNavigate();

  const {
    data: species = [],
    isLoading: speciesLoading,
    isError: speciesError,
  } = useGetAllSpeciesQuery();

  const {
    data: backgrounds = [],
    isLoading: backgroundsLoading,
    isError: backgroundsError,
  } = useGetAllBackgroundsQuery();

  const {
    data: professions = [],
    isLoading: professionsLoading,
    isError: professionsError,
  } = useGetAllProfessionsQuery();

  const [formData, setFormData] = useState<CharacterInput>(
    defaultCharacterFormData,
  );

  const patchForm = useCallback<PatchForm>(
    (updated) => setFormData((prev) => ({ ...prev, ...updated })),
    [],
  );

  const [createCharacter, { isLoading: isCreating, error: createError }] =
    useCreateCharacterMutation();

  if (speciesLoading || backgroundsLoading || professionsLoading)
    return <div>Loading...</div>;
  if (speciesError || backgroundsError || professionsError)
    return <div>Error loading character options</div>;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await createCharacter(formData);
    if ("data" in result) navigate(`/characters/${result.data._id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-slate-50 dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-900 text-slate-900 dark:text-white transition-colors duration-300 p-5 md:p-6">
        <CharacterIdentity formData={formData} patchForm={patchForm} />
        <CharacterArchetype
          formData={formData}
          patchForm={patchForm}
          species={species}
          backgrounds={backgrounds}
          professions={professions}
        />
        {createError && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-3">
            {"data" in createError
              ? ((createError.data as { error?: string }).error ??
                "Failed to create character")
              : "Failed to create character"}
          </p>
        )}
        <button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Character"}
        </button>
      </div>
    </form>
  );
};
