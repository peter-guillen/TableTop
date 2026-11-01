import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import { ArmorBasicInfoSection } from "../components/ArmorBasicInfoSection";
import { ArmorCombatSection } from "../components/ArmorCombatSection";
import { ArmorDescriptionSection } from "../components/ArmorDescriptionSection";
import { ArmorSpecialSection } from "../components/ArmorSpecialSection";
import { LuSparkles } from "react-icons/lu";
import {
  useGetAllArmorsQuery,
  useCreateArmorMutation,
  useUpdateArmorMutation,
} from "../api/armorApi";
import {
  formCard,
  formTitle,
  ghostButton,
  primaryButton,
} from "../../../shared/styles/theme.ts";

export function ArmorForm() {
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    category: "",
    rarity: "common",
    material: "",
    weight: "",
    value: "",

    // Defense Stats
    armorRating: "",
    shield: false,
    properties: [],
    resistances: [],

    // Requirements & Special
    requirements: {
      strength: 0,
      proficiency: [],
      level: 1,
    },
    stealthDisadvantage: false,
    skills: [],
    special: "",

    // Description
    description: "",
    tags: [],
  });

  // Grab the id from url: if there is an id set to Edit Mode
  const { id } = useParams();
  const isEditing = Boolean(id);

  // Return to the previous page
  const navigate = useNavigate();
  const {
    data: armor,
    isLoading,
    isError,
  } = useGetAllArmorsQuery({ skip: !isEditing });
  const [createArmor] = useCreateArmorMutation();
  const [updateArmor] = useUpdateArmorMutation();

  const {
    handleCheckedChange,
    handleArrayFieldChange,
    handleObjectFieldChange,
    handleNestedFieldChange,
  } = useFormHandlers(setFormData);

  useEffect(() => {
    if (isEditing && armor) {
      if (armor) {
        setFormData(armor);
      }
    }
  }, [isEditing, armor]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const handleCancel = () => navigate(-1);

  // Handle input changes
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePropertiesChange = handleCheckedChange("properties");
  const handleResistancesChange = handleArrayFieldChange("resistances");
  const handleSkillsChange = handleArrayFieldChange("skills");
  const handleRequirementChange = handleObjectFieldChange("requirements");
  const handleProficiencyChange = handleNestedFieldChange("proficiency");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      await updateArmor(id, formData);
    } else {
      await createArmor(formData);
    }
    navigate("/armors");
  };

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
              {isEditing ? "Edit Armor" : "Create Armor"}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            Forge your legendary protection
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className={formCard}>
            <div className="space-y-8">
              {/* Basic Information */}
              <ArmorBasicInfoSection
                name={formData.name}
                category={formData.category}
                rarity={formData.rarity}
                material={formData.material}
                weight={formData.weight}
                value={formData.value}
                tags={formData.tags}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
              />

              {/* Combat Stats */}
              <ArmorCombatSection
                armorRating={formData.armorRating}
                shield={formData.shield}
                properties={formData.properties}
                resistances={formData.resistances}
                onInputChange={handleInputChange}
                onPropertyChange={handlePropertiesChange}
                onResistancesChange={handleResistancesChange}
              />

              {/* Special & Requirements */}
              <ArmorSpecialSection
                requirements={formData.requirements}
                stealthDisadvantage={formData.stealthDisadvantage}
                skills={formData.skills}
                special={formData.special}
                onInputChange={handleInputChange}
                onRequirementChange={handleRequirementChange}
                onSkillsChange={handleSkillsChange}
                onProficiencyChange={handleProficiencyChange}
              />

              {/* Description */}
              <ArmorDescriptionSection
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
              {isEditing ? "Update Armor" : "Create Armor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
