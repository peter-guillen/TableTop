import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuScroll } from "react-icons/lu";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import {
  useGetBackgroundByIdQuery,
  useCreateBackgroundMutation,
  useUpdateBackgroundMutation,
} from "../api/backgroundApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import { useGetAllItemsQuery } from "../../items/api/itemApi";

import { BackgroundBasicInfoSection } from "../components/BackgroundBasicInfoSection";
import { BackgroundStatsSection } from "../components/BackgroundStatsSection";
import { BackgroundProficienciesSection } from "../components/BackgroundProficienciesSection";
import { BackgroundTraitsSection } from "../components/BackgroundTraitsSection";
import { BackgroundDescriptionSection } from "../components/BackgroundDescriptionSection";

import { Background } from "../backgroundTypes";
import { defaultBackgroundFormData } from "../backgroundDefaults.ts";
import {
  formCard,
  formTitle,
  ghostButton,
  primaryButton,
} from "../../../shared/styles/theme.ts";

export function BackgroundForm() {
  const [formData, setFormData] = useState<Background>(
    defaultBackgroundFormData,
  );
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: constants } = useGetConstantsQuery();
  const {
    data: background,
    isLoading,
    isError,
  } = useGetBackgroundByIdQuery(id ?? "", { skip: !isEditing });
  const { data: powers = [] } = useGetAllPowersQuery();
  const { data: items = [] } = useGetAllItemsQuery();
  const [createBackground] = useCreateBackgroundMutation();
  const [updateBackground] = useUpdateBackgroundMutation();

  const {
    handleInputChange,
    handleFieldChange,
    handleCheckedChange,
    handleArrayFieldChange,
  } = useFormHandlers(setFormData);

  const handleStatModifiersChange = handleArrayFieldChange("statModifiers");
  const handleStartingItemsChange = handleArrayFieldChange("startingItems");
  const handleTraitsChange = handleFieldChange("traits");

  // Only trait-kind powers can be attached to a background
  const traitOptions = powers.filter(
    (p): p is typeof p & { _id: string } =>
      p._id !== undefined && p.kind === "trait",
  );

  const itemOptions = items.filter(
    (i): i is typeof i & { _id: string } => i._id !== undefined,
  );

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      await updateBackground({ id: id ?? "", data: formData });
    } else {
      await createBackground(formData);
    }
    navigate("/backgrounds");
  };

  useEffect(() => {
    if (isEditing && background) {
      setFormData({ ...background });
    }
  }, [isEditing, background]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuScroll
              className="text-emerald-700 dark:text-emerald-400"
              size={32}
            />
            <h1 className={formTitle}>
              {isEditing ? "Edit Background" : "Create Background"}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            Write the story before the adventure
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className={formCard}>
            <div className="space-y-8">
              {/* Basic Information */}
              <BackgroundBasicInfoSection
                name={formData.name}
                onInputChange={handleInputChange}
              />

              {/* Stat Modifiers */}
              <BackgroundStatsSection
                statModifiers={formData.statModifiers}
                statOptions={Object.values(constants?.STATS ?? {})}
                onStatModifiersChange={handleStatModifiersChange}
              />

              {/* Skills & Starting Items */}
              <BackgroundProficienciesSection
                skillProficiencies={formData.skillProficiencies}
                skillOptions={Object.values(constants?.SKILLS ?? {})}
                startingItems={formData.startingItems}
                itemOptions={itemOptions}
                onCheckedChange={handleCheckedChange}
                onStartingItemsChange={handleStartingItemsChange}
              />

              {/* Traits */}
              <BackgroundTraitsSection
                traits={formData.traits}
                traitOptions={traitOptions}
                onTraitsChange={handleTraitsChange}
              />

              {/* Description */}
              <BackgroundDescriptionSection
                description={formData.description}
                onInputChange={handleInputChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className={`${ghostButton} px-6 py-3`}
            >
              Cancel
            </button>
            <button className={`${primaryButton} px-8 py-3`}>
              {isEditing ? "Update Background" : "Create Background"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
