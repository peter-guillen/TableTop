import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SpellContext } from "../context/SpellContext";
import { SpellBasicInfoSection } from "../components/SpellBasicInfoSection";
import { SpellCastingSection } from "../components/SpellCastingSection";
import { SpellCombatSection } from "../components/SpellCombatSection";
import { SpellDescriptionSection } from "../components/SpellDescriptionSection";
import { SpellConditionsSection } from "../components/SpellConditionsSection";
import { LuSparkles } from "react-icons/lu";

export function SpellForm() {
  const { spellList, createSpell, updateSpell } = useContext(SpellContext);
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    school: "",
    tier: "",
    element: "",
    tags: [],
    // domain: "",
    // category: "",

    // Casting
    castingTime: "",
    duration: "",
    range: "",
    area: "",
    stamina: "",
    usesPerDay: "",
    isRitual: Boolean,
    requiresConcentration: Boolean,

    // Combat
    damage: [],
    healing: [],

    // Effects & Conditions
    conditions: [],
    buffs: [],
    debuffs: [],

    // Description
    description: "",
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
    if (isEditing && spellList && spellList.length > 0) {
      const spell = spellList.find((spell) => spell._id === id);
      if (spell) {
        setFormData(spell);
      }
    }
  }, [id, spellList, isEditing]);

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
      await updateSpell(id, formData);
    } else {
      console.log(formData);
      await createSpell(formData);
    }
    navigate("/spells");
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
              {isEditing ? "Edit Spell" : "Create Spell"}
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
              <SpellBasicInfoSection
                name={formData.name}
                school={formData.school}
                tier={formData.tier}
                element={formData.element}
                tags={formData.tags}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
              />

              {/* Casting Details */}
              <SpellCastingSection
                castingTime={formData.castingTime}
                range={formData.range}
                duration={formData.duration}
                area={formData.area}
                stamina={formData.stamina}
                usesPerDay={formData.usesPerDay}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
              />

              {/* Combat Stats */}
              <SpellCombatSection
                damage={formData.damage}
                healing={formData.healing}
                onInputChange={handleInputChange}
                onDamageChange={handleDamageChange}
                onHealingChange={handleHealingChange}
              />

              <SpellConditionsSection
                onInputChange={handleInputChange}
                onBuffsChange={handleBuffsChange}
                onDebuffsChange={handleDebuffsChange}
                onConditionsChange={handleConditionsChange}
              />

              {/* Description */}
              <SpellDescriptionSection
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
              {isEditing ? "Update Spell" : "Create Spell"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
