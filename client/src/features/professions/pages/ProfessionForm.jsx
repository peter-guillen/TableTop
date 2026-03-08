import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProfessions } from "../hooks/useProfessions";
import { LuSparkles } from "react-icons/lu";

import { ProfessionBasicInfoSection } from "../components/ProfessionBasicInfoSection";
import { ProfessionDescriptionSection } from "../components/ProfessionDescriptionSection";
import { ProfessionProficienciesSection } from "../components/ProfessionProficienciesSection";
import { ProfessionLevelsSection } from "../components/ProfessionLevelsSection";
import { ProfessionSpellSlotsSection } from "../components/ProfessionSpellSlotsSection";
import { ProfessionSubclassSection } from "../components/ProfessionSubclassSection";
import { useFormHandlers } from "../../../shared/hooks/useFormHandlers";

export function ProfessionForm() {
  const { professionList, createProfession, updateProfession } =
    useProfessions();
  const DEFAULT_PROFESSION_FORM = {
    // Basic Info
    title: "",
    hitDie: "",
    spellcastingAbility: null,
    sourceBook: "Player's Handbook",
    isPlayable: true,

    // Description
    description: "",

    // Proficiencies
    armorProficiencies: [],
    weaponProficiencies: [],
    toolProficiencies: [],
    savingThrows: {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    },
    skillChoices: { choose: 2, from: [] },

    // Level features
    levels: [],

    // Profession slots
    spellSlots: [],

    // Subclass
    subclassName: "",
    subclassLevel: "",
    startingEquipment: [],
  };
  const [formData, setFormData] = useState(() => ({
    ...DEFAULT_PROFESSION_FORM,
  }));

  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isEditing && professionList?.length > 0) {
      const profession = professionList.find((p) => p._id === id);
      if (profession) setFormData(profession);
    }
  }, [id, professionList, isEditing]);

  const { handleCheckedChange, handleArrayFieldChange } =
    useFormHandlers(setFormData);

  // Generic scalar field handler (title, hitDie, etc.)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
            Build a path to follow
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
            <div className="space-y-8">
              <ProfessionBasicInfoSection
                title={formData.title}
                hitDie={formData.hitDie}
                spellcastingAbility={formData.spellcastingAbility}
                sourceBook={formData.sourceBook}
                isPlayable={formData.isPlayable}
                onInputChange={handleInputChange}
              />

              <ProfessionDescriptionSection
                description={formData.description}
                onInputChange={handleInputChange}
              />

              <ProfessionProficienciesSection
                armorProficiencies={formData.armorProficiencies}
                weaponProficiencies={formData.weaponProficiencies}
                toolProficiencies={formData.toolProficiencies}
                savingThrows={formData.savingThrows}
                skillChoices={formData.skillChoices}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
                onArmorChange={handleArrayFieldChange("armorProficiencies")}
                onWeaponChange={handleArrayFieldChange("weaponProficiencies")}
                onToolChange={handleArrayFieldChange("toolProficiencies")}
                onSavingThrowChange={(val) =>
                  setFormData((prev) => ({ ...prev, savingThrows: val }))
                }
                onSkillChoicesChange={(val) =>
                  setFormData((prev) => ({ ...prev, skillChoices: val }))
                }
              />

              <ProfessionLevelsSection
                levels={formData.levels}
                onInputChange={handleInputChange}
                onLevelsChange={handleArrayFieldChange("levels")}
              />

              <ProfessionSpellSlotsSection
                spellSlots={formData.spellSlots}
                spellcastingAbility={formData.spellcastingAbility}
                onSpellSlotsChange={handleArrayFieldChange("spellSlots")}
              />

              <ProfessionSubclassSection
                subclassName={formData.subclassName}
                subclassLevel={formData.subclassLevel}
                startingEquipment={formData.startingEquipment}
                onInputChange={handleInputChange}
                onStartingEquipmentChange={handleArrayFieldChange(
                  "startingEquipment",
                )}
              />
            </div>
          </div>

          {/* ----- Action Buttons ----- */}
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
