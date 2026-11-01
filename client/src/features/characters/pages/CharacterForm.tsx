import { useState, useCallback, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CharacterIdentity } from "../components/CharacterIdentity.tsx";
import { CharacterArchetype } from "../components/CharacterArchetype.tsx";
import { CharacterStats } from "../components/CharacterStats.tsx";
import { CharacterProgression } from "../components/CharacterProgression.tsx";
import { CharacterLoadout } from "../components/CharacterLoadout.tsx";
import { CharacterPanel } from "../components/CharacterPanel.tsx";
import {
  useCreateCharacterMutation,
  useGetCharacterByIdQuery,
  useUpdateCharacterMutation,
} from "../api/characterApi";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi";
import { useGetAllSpeciesQuery } from "../../species/api/speciesApi";
import { useGetAllBackgroundsQuery } from "../../backgrounds/api/backgroundApi";
import { useGetAllProfessionsQuery } from "../../professions/api/professionApi";
import type { CharacterInput, PatchForm } from "../charactersTypes";
import {
  defaultCharacterFormData,
  defaultProgression,
} from "../characterDefaults";

export const CharacterForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const {
    data: character,
    isLoading: characterLoading,
    isError: characterError,
  } = useGetCharacterByIdQuery(id ?? "", { skip: !isEditing });

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

  const {
    data: constants,
    isLoading: constantsLoading,
    isError: constantsError,
  } = useGetConstantsQuery();

  const [formData, setFormData] = useState<CharacterInput>(
    defaultCharacterFormData,
  );

  const patchForm = useCallback<PatchForm>(
    (updated) => setFormData((prev) => ({ ...prev, ...updated })),
    [],
  );

  const [createCharacter, { isLoading: isCreating, error: createError }] =
    useCreateCharacterMutation();
  const [updateCharacter, { isLoading: isUpdating, error: updateError }] =
    useUpdateCharacterMutation();
  const saveError = createError ?? updateError;

  useEffect(() => {
    if (isEditing && character) {
      // Characters saved before leveling existed have no claimedLevel/powerSlots
      setFormData({
        ...character,
        progression: { ...defaultProgression, ...character.progression },
      });
    }
  }, [isEditing, character]);

  if (
    characterLoading ||
    speciesLoading ||
    backgroundsLoading ||
    professionsLoading ||
    constantsLoading
  )
    return <div>Loading...</div>;
  if (
    characterError ||
    speciesError ||
    backgroundsError ||
    professionsError ||
    constantsError ||
    !constants
  )
    return <div>Error loading character options</div>;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = isEditing
      ? await updateCharacter({ id: id ?? "", data: formData })
      : await createCharacter(formData);
    if (result.data) navigate(`/characters/${result.data._id}`);
  };

  const { identity, origin, archetype, mode, progression } = formData;
  const professionName =
    mode === "classless"
      ? "Classless"
      : professions.find((p) => p._id === archetype.profession)?.name;
  // e.g. "Level 3 Human Warrior · Soldier · they/them · 27 years old"
  const summary = [
    [
      `Level ${progression.level}`,
      species.find((s) => s._id === origin.species)?.name,
      professionName,
    ]
      .filter(Boolean)
      .join(" "),
    backgrounds.find((b) => b._id === origin.background)?.name,
    [identity.subjectPronoun, identity.objectPronoun].filter(Boolean).join("/"),
    identity.age ? `${identity.age} years old` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const rewardsPending =
    (mode === "classless" || Boolean(archetype.profession)) &&
    progression.claimedLevel < progression.level;

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white transition-colors duration-300 p-5 md:p-6">
        {/* Header: who the character is */}
        <div className="bg-white dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700/50 p-4 md:p-5 mb-3 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <CharacterIdentity
                formData={formData}
                patchForm={patchForm}
                summary={summary}
              />
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <div
                  title={
                    rewardsPending
                      ? `Level ${progression.claimedLevel + 1} rewards waiting`
                      : `Level ${progression.level}`
                  }
                  className={`relative w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center ${
                    rewardsPending
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-800/30 animate-pulse"
                      : "border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-900/40"
                  }`}
                >
                  <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 leading-none">
                    Lv
                  </span>
                  <span className="text-2xl font-extrabold leading-none text-stone-900 dark:text-white">
                    {progression.level}
                  </span>
                  {rewardsPending && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="text-sm font-bold px-4 py-2 rounded-lg border bg-emerald-500 border-emerald-600 text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isEditing
                    ? isUpdating
                      ? "Saving..."
                      : "Save Changes"
                    : isCreating
                      ? "Creating..."
                      : "Create Character"}
                </button>
              </div>
              {saveError && (
                <p className="text-xs text-red-600 dark:text-red-400 text-right max-w-60">
                  {"data" in saveError
                    ? ((saveError.data as { error?: string }).error ??
                      "Failed to save character")
                    : "Failed to save character"}
                </p>
              )}
            </div>
          </div>
          <CharacterArchetype
            formData={formData}
            patchForm={patchForm}
            species={species}
            backgrounds={backgrounds}
            professions={professions}
          />
        </div>

        {/*
          lg: progression + loadout | tabs | vitals
          md: the left wrapper is a column (progression, loadout, vitals) beside the tabs
          lg:contents dissolves that wrapper so its children become grid columns 1 and 3
        */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_240px] gap-3 items-start">
          <div className="flex flex-col gap-3 lg:contents">
            <div className="flex flex-col gap-3">
              <CharacterProgression
                formData={formData}
                patchForm={patchForm}
                constants={constants}
              />
              <CharacterLoadout formData={formData} patchForm={patchForm} />
            </div>
            <div className="lg:order-3">
              <CharacterStats
                formData={formData}
                patchForm={patchForm}
                constants={constants}
              />
            </div>
          </div>
          <CharacterPanel
            formData={formData}
            patchForm={patchForm}
            constants={constants}
          />
        </div>
      </div>
    </form>
  );
};
