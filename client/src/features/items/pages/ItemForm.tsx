import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import { useGetConstantsQuery } from "../../../shared/api/constantsApi.ts";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-350 via-cyan-350 to-slate-300 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuSparkles
              className="text-cyan-400 dark:text-orange-400"
              size={32}
            />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-500 dark:from-cyan-300 dark:via-orange-300 dark:to-cyan-400">
              {isEditing ? "Edit Item" : "Create Item"}
            </h1>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Weave your magical creation
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
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
              className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-orange-800/50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-orange-700 dark:border-orange-800"
            >
              Cancel
            </button>
            <button className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white shadow-lg shadow-cyan-500/50 dark:shadow-orange-500/50 hover:shadow-xl hover:shadow-cyan-500/60 dark:hover:shadow-orange-500/60 transition-all duration-300">
              {isEditing ? "Update Item" : "Create Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
