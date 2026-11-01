import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import {
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
} from "../api/itemApi";

// TODO: confirm actual path/hook name for the Power domain's RTK Query slice
import { useGetAllPowersQuery } from "../../powers/api/powerApi";

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
  primaryButton,
} from "../../../shared/styles/theme.ts";

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
  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const {
    handleInputChange,
    handleFieldChange,
    handleArrayFieldChange,
    handleObjectFieldChange,
  } = useFormHandlers(setFormData);

  const handleHealthChange = handleArrayFieldChange("healthEffects");
  const handleStatModifiersChange = handleArrayFieldChange("statModifiers");
  const handleResistancesChange = handleArrayFieldChange("resistances");
  const handlePropertiesChange = handleArrayFieldChange("properties");
  const handleQualityChange = handleArrayFieldChange("quality");
  const handleMaterialsChange = handleArrayFieldChange("materials");
  const handleGrantedPowersChange = handleArrayFieldChange("grantedPowers");
  const handleUniqueSkillsChange = handleArrayFieldChange("uniqueSkills");
  const handleSelfChargesChange = handleObjectFieldChange("selfCharges");
  const handleValueChange = handleFieldChange("value");

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      await updateItem({ id: id ?? "", data: formData });
    } else {
      await createItem(formData);
    }
    navigate("/items");
  };

  useEffect(() => {
    if (isEditing && item) {
      setFormData({ ...item });
    }
  }, [isEditing, item]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 p-6">
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
                allPowers={powers}
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

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
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
