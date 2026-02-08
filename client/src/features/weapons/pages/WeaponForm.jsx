import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWeapons } from "../hooks/useWeapons";
import { WeaponBasicInfoSection } from "../components/WeaponBasicInfoSection";
// import { WeaponCastingSection } from "../components/WeaponCastingSection";
// import { WeaponCombatSection } from "../components/WeaponCombatSection";
// import { WeaponDescriptionSection } from "../components/WeaponDescriptionSection";
// import { WeaponConditionsSection } from "../components/WeaponConditionsSection";
import { LuSparkles } from "react-icons/lu";

export function WeaponForm() {
  const { weaponList, createWeapon, updateWeapon } = useWeapons();
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    description: "",
    category: "",
    properties: "",
    weight: "",
    damage: "",
    skills: "",
    range: "",
    type: "",
    rarity: "",
    price: "",
    tags: [],
  });

  // Grab the id from url: if there is an id set to Edit Mode
  const { id } = useParams();
  const isEditing = Boolean(id);

  // Return to the previous page
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

  // Handle input changes
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle multiple checked boxes for tags
  const handleCheckedChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: checked
        ? [...prevFormData.tags, value] // Add tag
        : prevFormData.tags.filter((tag) => tag !== value), // Remove tag
    }));
  };

  // Handle the array changes for adding or removing an item in the array
  const handleArrayFieldChange = (fieldName) => {
    return (newData) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: newData,
      }));
    };
  };

  const handleDamageChange = handleArrayFieldChange("damage");
  const handleHealingChange = handleArrayFieldChange("healing");
  const handleBuffsChange = handleArrayFieldChange("buffs");
  const handleDebuffsChange = handleArrayFieldChange("debuffs");
  const handleConditionsChange = handleArrayFieldChange("conditions");

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
            Forge your new weapon
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
            <div className="space-y-8">
              {/* Basic Information */}
              <WeaponBasicInfoSection
                name={formData.name}
                description={formData.description}
                rarity={formData.rarity}
                properties={formData.properties}
                tags={formData.tags}
                category={formData.category}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
              />

              {/* Casting Details */}
              {/* <WeaponCastingSection
                castingTime={formData.castingTime}
                range={formData.range}
                duration={formData.duration}
                area={formData.area}
                stamina={formData.stamina}
                usesPerDay={formData.usesPerDay}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
              /> */}

              {/* Combat Stats */}
              {/* <WeaponCombatSection
                damage={formData.damage}
                healing={formData.healing}
                onInputChange={handleInputChange}
                onDamageChange={handleDamageChange}
                onHealingChange={handleHealingChange}
              /> */}

              {/* <WeaponConditionsSection
                onInputChange={handleInputChange}
                onBuffsChange={handleBuffsChange}
                onDebuffsChange={handleDebuffsChange}
                onConditionsChange={handleConditionsChange}
              /> */}

              {/* Description */}
              {/* <WeaponDescriptionSection
                description={formData.description}
                onInputChange={handleInputChange}
              /> */}
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
              {isEditing ? "Update Weapon" : "Create Weapon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
