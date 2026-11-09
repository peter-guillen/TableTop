import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import {
  useGetProfessionByIdQuery,
  useCreateProfessionMutation,
  useUpdateProfessionMutation,
} from "../api/professionApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { NotFound } from "../../../app/pages/NotFound.tsx";

import { ProfessionBasicInfoSection } from "../components/ProfessionBasicInfoSection";
import { ProfessionStatsSection } from "../components/ProfessionStatsSection";
import { ProfessionProficienciesSection } from "../components/ProfessionProficienciesSection";
import { ProfessionLevelsSection } from "../components/ProfessionLevelsSection";
import { ProfessionDescriptionSection } from "../components/ProfessionDescriptionSection";

import { Profession } from "../professionTypes";
import { defaultProfessionFormData } from "../professionDefaults.ts";
import {
  formCard,
  formTitle,
  ghostButton,
  inkDanger,
  primaryButton,
} from "../../../shared/styles/theme.ts";

export function ProfessionForm() {
  const [formData, setFormData] = useState<Profession>(
    defaultProfessionFormData,
  );
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: constants } = useGetConstantsQuery();
  const {
    data: profession,
    isLoading,
    isError,
    error,
  } = useGetProfessionByIdQuery(id ?? "", { skip: !isEditing });
  const { data: powers = [] } = useGetAllPowersQuery();
  const { data: items = [] } = useGetAllItemsQuery();
  const [createProfession] = useCreateProfessionMutation();
  const [updateProfession] = useUpdateProfessionMutation();

  const {
    handleInputChange,
    handleCheckedChange,
    handleArrayFieldChange,
  } = useFormHandlers(setFormData);

  const handleStatModifiersChange = handleArrayFieldChange("statModifiers");
  const handleStartingItemsChange = handleArrayFieldChange("startingItems");
  const handleLevelRewardsChange = handleArrayFieldChange("levelRewards");

  // Level grants can hand out spells, abilities and traits
  // (techniques come from weapons, so they're left out)
  const grantablePowers = powers.filter(
    (p): p is typeof p & { _id: string } =>
      p._id !== undefined &&
      (p.kind === "spell" || p.kind === "ability" || p.kind === "trait"),
  );

  const itemOptions = items.filter(
    (i): i is typeof i & { _id: string } => i._id !== undefined,
  );

  const maxLevel = constants?.MAX_LEVEL ?? 0;

  // The server doesn't check grants yet (ROADMAP item 21), so the form does.
  // Same rules as the inline messages in ProfessionLevelsSection.
  const hasInvalidGrant = formData.levelRewards.some((reward) =>
    reward.grants.some(
      (grant) =>
        (grant.type === "auto" && !grant.trait) ||
        (grant.type === "professionChoice" &&
          (grant.options?.length ?? 0) < 2),
    ),
  );

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Needs MAX_LEVEL to save every level; the button is disabled until then
    if (hasInvalidGrant || !constants) return;

    // Save one entry per level, 1 to MAX_LEVEL, so the builder sees every level
    const levelRewards = Array.from({ length: maxLevel }, (_, i) => {
      const level = i + 1;
      return (
        formData.levelRewards.find((r) => r.level === level) ?? {
          level,
          grants: [],
          statIncreases: [],
          slotIncreases: [],
        }
      );
    });
    const data = { ...formData, levelRewards };

    if (isEditing) {
      await updateProfession({ id: id ?? "", data });
    } else {
      await createProfession(data);
    }
    navigate("/professions");
  };

  useEffect(() => {
    if (isEditing && profession) {
      // Defaults fill any field an older record is missing
      setFormData({ ...defaultProfessionFormData, ...profession });
    }
  }, [isEditing, profession]);

  if (isLoading) return <p>Loading...</p>;
  // Editing a profession that doesn't exist (or a malformed id) is a 404
  const isNotFound = error && "status" in error && error.status === 404;
  if (isNotFound) return <NotFound />;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuSparkles
              className="text-emerald-700 dark:text-emerald-400"
              size={32}
            />
            <h1 className={formTitle}>
              {isEditing ? "Edit Profession" : "Create Profession"}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            Build a path to follow
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className={formCard}>
            <div className="space-y-8">
              {/* Basic Information */}
              <ProfessionBasicInfoSection
                name={formData.name}
                onInputChange={handleInputChange}
              />

              {/* Stat Modifiers */}
              <ProfessionStatsSection
                statModifiers={formData.statModifiers}
                statOptions={Object.values(constants?.STATS ?? {})}
                onStatModifiersChange={handleStatModifiersChange}
              />

              {/* Proficiencies & Starting Items */}
              <ProfessionProficienciesSection
                armorProficiencies={formData.armorProficiencies}
                weaponProficiencies={formData.weaponProficiencies}
                skillProficiencies={formData.skillProficiencies}
                startingItems={formData.startingItems}
                armorOptions={constants?.ARMOR ?? []}
                weaponOptions={constants?.PROPERTIES ?? []}
                skillOptions={Object.values(constants?.SKILLS ?? {})}
                itemOptions={itemOptions}
                onCheckedChange={handleCheckedChange}
                onStartingItemsChange={handleStartingItemsChange}
              />

              {/* Level Rewards */}
              <ProfessionLevelsSection
                levelRewards={formData.levelRewards}
                maxLevel={maxLevel}
                statOptions={Object.values(constants?.STATS ?? {})}
                powerOptions={grantablePowers}
                onLevelRewardsChange={handleLevelRewardsChange}
              />

              {/* Description */}
              <ProfessionDescriptionSection
                description={formData.description}
                onInputChange={handleInputChange}
              />
            </div>
          </div>

          {hasInvalidGrant && (
            <p role="alert" className={`mb-4 text-sm ${inkDanger}`}>
              Some level grants are incomplete. Fix the marked grants to save.
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className={`${ghostButton} px-6 py-3`}
            >
              Cancel
            </button>
            <button
              disabled={hasInvalidGrant || !constants}
              className={`${primaryButton} px-8 py-3 disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {isEditing ? "Update Profession" : "Create Profession"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
