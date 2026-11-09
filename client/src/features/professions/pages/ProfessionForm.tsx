import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { ProfessionBasicInfoSection } from "../components/ProfessionBasicInfoSection";
import { ProfessionDescriptionSection } from "../components/ProfessionDescriptionSection";
import { ProfessionProficienciesSection } from "../components/ProfessionProficienciesSection";
import { ProfessionLevelsSection } from "../components/ProfessionLevelsSection";
import { ProfessionSpellSlotsSection } from "../components/ProfessionSpellSlotsSection";
import { ProfessionSubclassSection } from "../components/ProfessionSubclassSection";
import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import {
  useGetAllProfessionsQuery,
  useCreateProfessionMutation,
  useUpdateProfessionMutation,
} from "../api/professionApi";
import {
  formCard,
  formTitle,
  ghostButton,
  primaryButton,
} from "../../../shared/styles/theme.ts";

export function ProfessionForm() {
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
  const handleCancel = () => navigate(-1);

  const {
    data: profession,
    isLoading,
    isError,
  } = useGetAllProfessionsQuery(id, { skip: !isEditing });
  const [createProfession] = useCreateProfessionMutation();
  const [updateProfession] = useUpdateProfessionMutation();

  const { handleCheckedChange, handleArrayFieldChange } =
    useFormHandlers(setFormData);

  useEffect(() => {
    if (isEditing && profession) {
      if (profession) setFormData(profession);
    }
  }, [isEditing, profession]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

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
              {isEditing ? "Edit Profession" : "Create Profession"}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            Build a path to follow
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className={formCard}>
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
              className={`${ghostButton} px-6 py-3`}
            >
              Cancel
            </button>
            <button className={`${primaryButton} px-8 py-3`}>
              {isEditing ? "Update Profession" : "Create Profession"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
