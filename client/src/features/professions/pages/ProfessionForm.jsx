import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProfessions } from "../hooks/useProfessions";
import { ProfessionBasicInfoSection } from "../components/ProfessionBasicInfoSection";
// import { ProfessionCastingSection } from "../components/ProfessionCastingSection";
// import { ProfessionCombatSection } from "../components/ProfessionCombatSection";
import { ProfessionDescriptionSection } from "../components/ProfessionDescriptionSection";
// import { ProfessionConditionsSection } from "../components/ProfessionConditionsSection";
import { LuSparkles } from "react-icons/lu";

export function ProfessionForm() {
  const { professionList, createProfession, updateProfession } =
    useProfessions();
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    levels: Array.from({ length: 10 }, (_, index) => ({
      level: `${index + 1}`,
      description: "",
    })),

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
    if (isEditing && professionList && professionList.length > 0) {
      const profession = professionList.find(
        (profession) => profession._id === id,
      );
      if (profession) {
        setFormData(profession);
      }
    }
  }, [id, professionList, isEditing]);

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
      await updateProfession(id, formData);
    } else {
      await createProfession(formData);
    }
    navigate("/professions");
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
              {isEditing ? "Edit Profession" : "Create Profession"}
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
              <ProfessionBasicInfoSection
                name={formData.name}
                school={formData.school}
                tier={formData.tier}
                element={formData.element}
                tags={formData.tags}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
              />

              {/* Description */}
              <ProfessionDescriptionSection
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
              {isEditing ? "Update Profession" : "Create Profession"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
