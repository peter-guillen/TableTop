import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import {
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
} from "../api/itemApi";

import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import { Power } from "../../powers/powerTypes";

import { ItemBasicInfoSection } from "../components/ItemBasicInfoSection";
import { ItemCombatSection } from "../components/ItemCombatSection";
import { ItemSpecialSection } from "../components/ItemSpecialSection";
import { ItemDescriptionSection } from "../components/ItemDescriptionSection";

import { Item } from "../itemTypes";
import { defaultItemFormData } from "../itemDefaults.ts";
import {
  formCard,
  formTitle,
  ghostButton,
  inkDanger,
  primaryButton,
} from "../../../shared/styles/theme.ts";
import { ErrorMessage } from "../../../shared/components/ErrorMessage.tsx";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner.tsx";

export function ItemForm() {
  const [formData, setFormData] = useState<Item>(defaultItemFormData);
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: constants } = useGetConstantsQuery();
  const {
    data: item,
    isLoading,
    isError,
  } = useGetItemByIdQuery(id ?? "", { skip: !isEditing });
  const { data: powers = [] } = useGetAllPowersQuery();
  // Saved powers always have an _id; narrow the type for the picker
  const savedPowers = powers.filter(
    (p): p is Power & { _id: string } => p._id !== undefined,
  );
  const [createItem, { error: createError }] = useCreateItemMutation();
  const [updateItem, { error: updateError }] = useUpdateItemMutation();
  const saveError = createError ?? updateError;

  // Text, select and textarea inputs: the input's name is the formData key
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHealthChange = (healthEffects: Item["healthEffects"]) =>
    setFormData((prev) => ({ ...prev, healthEffects }));
  const handleStatModifiersChange = (statModifiers: Item["statModifiers"]) =>
    setFormData((prev) => ({ ...prev, statModifiers }));
  const handleResistancesChange = (resistances: Item["resistances"]) =>
    setFormData((prev) => ({ ...prev, resistances }));
  const handlePropertiesChange = (properties: Item["properties"]) =>
    setFormData((prev) => ({ ...prev, properties }));
  const handleQualityChange = (quality: Item["quality"]) =>
    setFormData((prev) => ({ ...prev, quality }));
  const handleMaterialsChange = (materials: Item["materials"]) =>
    setFormData((prev) => ({ ...prev, materials }));
  const handleGrantedPowersChange = (grantedPowers: Item["grantedPowers"]) =>
    setFormData((prev) => ({ ...prev, grantedPowers }));
  const handleUniqueSkillsChange = (uniqueSkills: Item["uniqueSkills"]) =>
    setFormData((prev) => ({ ...prev, uniqueSkills }));
  const handleValueChange = (value: Item["value"]) =>
    setFormData((prev) => ({ ...prev, value }));

  // Nested object: one handler updates any field on selfCharges
  const handleSelfChargesChange = <K extends keyof Item["selfCharges"]>(
    field: K,
    value: Item["selfCharges"][K],
  ) =>
    setFormData((prev) => ({
      ...prev,
      selfCharges: { ...prev.selfCharges, [field]: value },
    }));

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = isEditing
      ? await updateItem({ id: id ?? "", data: formData })
      : await createItem(formData);
    // On failure stay on the form; saveError shows the server's message
    if (result.data) navigate("/items");
  };

  useEffect(() => {
    if (isEditing && item) {
      setFormData({ ...item });
    }
  }, [isEditing, item]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

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
              {isEditing ? "Edit Item" : "Create Item"}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            Weave your magical creation
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className={formCard}>
            <div className="space-y-8">
              {/* Basic Information */}
              <ItemBasicInfoSection
                name={formData.name}
                category={formData.category}
                rarity={formData.rarity}
                quality={formData.quality}
                materials={formData.materials}
                value={formData.value}
                rarityOptions={constants?.RARITY ?? []}
                qualityOptions={constants?.QUALITY ?? []}
                materialOptions={constants?.MATERIALS ?? []}
                onInputChange={handleInputChange}
                onValueChange={handleValueChange}
                onQualityChange={handleQualityChange}
                onMaterialsChange={handleMaterialsChange}
              />

              {/* Combat Properties */}
              <ItemCombatSection
                healthEffects={formData.healthEffects}
                statModifiers={formData.statModifiers}
                resistances={formData.resistances}
                properties={formData.properties}
                damageTypeOptions={constants?.DAMAGE_TYPES ?? []}
                propertyOptions={constants?.PROPERTIES ?? []}
                statOptions={Object.values(constants?.STATS ?? {})}
                skillOptions={Object.values(constants?.SKILLS ?? {})}
                onHealthChange={handleHealthChange}
                onStatModifiersChange={handleStatModifiersChange}
                onResistancesChange={handleResistancesChange}
                onPropertiesChange={handlePropertiesChange}
              />

              {/* Granted Powers, Self Charges, Unique Skills */}
              <ItemSpecialSection
                grantedPowers={formData.grantedPowers}
                selfCharges={formData.selfCharges}
                uniqueSkills={formData.uniqueSkills}
                allPowers={savedPowers}
                onGrantedPowersChange={handleGrantedPowersChange}
                onSelfChargesChange={handleSelfChargesChange}
                onUniqueSkillsChange={handleUniqueSkillsChange}
              />

              {/* Description */}
              <ItemDescriptionSection
                description={formData.description}
                onInputChange={handleInputChange}
              />
            </div>
          </div>

          {saveError && (
            <p role="alert" className={`mb-4 text-sm ${inkDanger}`}>
              {"data" in saveError
                ? ((saveError.data as { error?: string }).error ??
                  "Failed to save item")
                : "Failed to save item"}
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
            <button className={`${primaryButton} px-8 py-3`}>
              {isEditing ? "Update Item" : "Create Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
