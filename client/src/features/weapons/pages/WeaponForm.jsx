import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWeapons } from "../hooks/useWeapons";
import { WeaponBasicInfoSection } from "../components/WeaponBasicInfoSection";
import { WeaponCombatSection } from "../components/WeaponCombatSection";
import { WeaponSpecialSection } from "../components/WeaponSpecialSection";
import { WeaponDescriptionSection } from "../components/WeaponDescriptionSection";
import { LuSparkles } from "react-icons/lu";
import { useFormHandlers } from "../../../shared/hooks/useFormHandlers";

export function WeaponForm() {
  const { weaponList, createWeapon, updateWeapon } = useWeapons();

  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    category: "",
    rarity: "common",
    weight: "",
    value: "",

    // Combat Stats
    damage: "",
    damageType: "",
    range: "",
    properties: [],

    // Requirements & Special
    requirements: {
      strength: 0,
      proficiency: [],
      level: 1,
    },
    skills: [],
    special: "",

    // Description
    description: "",
    tags: [],
  });

  const { id } = useParams();
  const isEditing = Boolean(id);

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isEditing && weaponList && weaponList.length > 0) {
      const weapon = weaponList.find((weapon) => weapon._id === id);
      if (weapon) {
        setFormData(weapon);
      }
    }
  }, [id, weaponList, isEditing]);

  const {
    handleCheckedChange,
    handleArrayFieldChange,
    handleObjectFieldChange,
    handleNestedFieldChange,
  } = useFormHandlers(setFormData);

  // Handle input changes
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePropertiesChange = handleCheckedChange("properties");

  const handleSkillsChange = handleArrayFieldChange("skills");

  const handleRequirementChange = handleObjectFieldChange("requirements");

  const handleProficiencyChange = handleNestedFieldChange(
    "requirements",
    "proficiency",
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      await updateWeapon(id, formData);
    } else {
      await createWeapon(formData);
    }
    navigate("/weapons");
  };

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
              {isEditing ? "Edit Weapon" : "Create Weapon"}
            </h1>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Forge your legendary weapon
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
            <div className="space-y-8">
              {/* Basic Information */}
              <WeaponBasicInfoSection
                name={formData.name}
                category={formData.category}
                rarity={formData.rarity}
                weight={formData.weight}
                value={formData.value}
                tags={formData.tags}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
              />

              {/* Combat Stats */}
              <WeaponCombatSection
                damage={formData.damage}
                damageType={formData.damageType}
                range={formData.range}
                properties={formData.properties}
                onInputChange={handleInputChange}
                onPropertyChange={handlePropertiesChange}
              />

              {/* Special & Requirements */}
              <WeaponSpecialSection
                requirements={formData.requirements}
                skills={formData.skills}
                special={formData.special}
                onInputChange={handleInputChange}
                onRequirementChange={handleRequirementChange}
                onSkillsChange={handleSkillsChange}
                onProficiencyChange={handleProficiencyChange}
              />

              {/* Description */}
              <WeaponDescriptionSection
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
              className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-orange-800/50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-orange-700 dark:border-orange-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white shadow-lg shadow-cyan-500/50 dark:shadow-orange-500/50 hover:shadow-xl hover:shadow-cyan-500/60 dark:hover:shadow-orange-500/60 transition-all duration-300"
            >
              {isEditing ? "Update Weapon" : "Create Weapon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
