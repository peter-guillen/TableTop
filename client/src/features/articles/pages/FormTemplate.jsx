import React, { useState } from "react";
import { ChevronDown, Plus, Trash2, Save, Eye, Settings } from "lucide-react";

const ContentManagementForm = ({
  config,
  initialData = {},
  onSave,
  onPreview,
  title = "Content Management",
}) => {
  const [formData, setFormData] = useState(initialData);
  const [openSections, setOpenSections] = useState(
    config?.sections?.reduce((acc, section) => {
      acc[section.id] = section.defaultOpen !== false;
      return acc;
    }, {}) || {}
  );
  const [openDropdowns, setOpenDropdowns] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleArrayAdd = (fieldId) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: [...(prev[fieldId] || []), ""],
    }));
  };

  const handleArrayRemove = (fieldId, index) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: prev[fieldId].filter((_, i) => i !== index),
    }));
  };

  const handleArrayChange = (fieldId, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: prev[fieldId].map((item, i) => (i === index ? value : item)),
    }));
  };

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const toggleDropdown = (fieldId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const renderField = (field) => {
    const value = formData[field.id] || field.defaultValue || "";

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            type={field.type}
            id={field.id}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
          />
        );

      case "textarea":
        return (
          <textarea
            id={field.id}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-vertical"
          />
        );

      case "select":
        return (
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown(field.id)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 flex items-center justify-between"
            >
              <span className={value ? "text-slate-100" : "text-slate-400"}>
                {value || field.placeholder || "Select an option"}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  openDropdowns[field.id] ? "rotate-180" : ""
                }`}
              />
            </button>
            {openDropdowns[field.id] && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {field.options?.map((option) => (
                  <button
                    key={typeof option === "string" ? option : option.value}
                    type="button"
                    onClick={() => {
                      handleInputChange(
                        field.id,
                        typeof option === "string" ? option : option.value
                      );
                      toggleDropdown(field.id);
                    }}
                    className="w-full px-4 py-3 text-left text-slate-100 hover:bg-slate-700 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {typeof option === "string" ? option : option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case "checkbox":
        return (
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                id={field.id}
                checked={value}
                onChange={(e) => handleInputChange(field.id, e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded border-2 transition-all duration-200 ${
                  value
                    ? "bg-amber-500 border-amber-500"
                    : "bg-slate-800 border-slate-600 group-hover:border-slate-500"
                }`}
              >
                {value && (
                  <svg
                    className="w-4 h-4 text-slate-900 absolute top-0.5 left-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-slate-100 group-hover:text-amber-400 transition-colors duration-200">
              {field.checkboxLabel || field.label}
            </span>
          </label>
        );

      case "array":
        const arrayValue = formData[field.id] || [];
        return (
          <div className="space-y-3">
            {arrayValue.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(field.id, index, e.target.value)
                  }
                  placeholder={field.placeholder}
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => handleArrayRemove(field.id, index)}
                  className="p-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleArrayAdd(field.id)}
              className="flex items-center space-x-2 px-4 py-3 text-amber-400 hover:text-amber-300 hover:bg-amber-900/20 rounded-lg transition-all duration-200 border border-dashed border-slate-600 hover:border-amber-500 w-full"
            >
              <Plus className="w-5 h-5" />
              <span>Add {field.label}</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Settings className="w-8 h-8 text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onPreview}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-slate-100 rounded-lg transition-colors duration-200"
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => onSave(formData)}
              className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-900 font-medium rounded-lg transition-colors duration-200"
            >
              <Save className="w-5 h-5" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {config?.sections?.map((section) => (
            <div
              key={section.id}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 bg-slate-750 hover:bg-slate-700 transition-colors duration-200 flex items-center justify-between"
              >
                <h2 className="text-xl font-semibold text-slate-100">
                  {section.title}
                </h2>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-200 ${
                    openSections[section.id] ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openSections[section.id] && (
                <div className="p-6 space-y-6">
                  {section.description && (
                    <p className="text-slate-300">{section.description}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields?.map((field) => (
                      <div
                        key={field.id}
                        className={`${field.fullWidth ? "md:col-span-2" : ""}`}
                      >
                        {field.type !== "checkbox" && (
                          <label
                            htmlFor={field.id}
                            className="block text-sm font-medium text-slate-300 mb-2"
                          >
                            {field.label}
                            {field.required && (
                              <span className="text-red-400 ml-1">*</span>
                            )}
                          </label>
                        )}
                        {renderField(field)}
                        {field.description && (
                          <p className="mt-2 text-sm text-slate-400">
                            {field.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Example configuration for D&D Character Creation
const dndCharacterConfig = {
  sections: [
    {
      id: "basic-info",
      title: "Basic Information",
      description: "Essential character details",
      defaultOpen: true,
      fields: [
        {
          id: "name",
          type: "text",
          label: "Character Name",
          required: true,
          placeholder: "Enter character name",
        },
        {
          id: "class",
          type: "select",
          label: "Class",
          required: true,
          placeholder: "Choose a class",
          options: [
            "Fighter",
            "Wizard",
            "Rogue",
            "Cleric",
            "Ranger",
            "Barbarian",
            "Bard",
            "Druid",
            "Monk",
            "Paladin",
            "Sorcerer",
            "Warlock",
          ],
        },
        {
          id: "race",
          type: "select",
          label: "Race",
          required: true,
          placeholder: "Choose a race",
          options: [
            "Human",
            "Elf",
            "Dwarf",
            "Halfling",
            "Dragonborn",
            "Gnome",
            "Half-Elf",
            "Half-Orc",
            "Tiefling",
          ],
        },
        { id: "level", type: "number", label: "Level", defaultValue: 1 },
        {
          id: "background",
          type: "text",
          label: "Background",
          placeholder: "e.g., Acolyte, Criminal, Folk Hero",
        },
        {
          id: "alignment",
          type: "select",
          label: "Alignment",
          placeholder: "Choose alignment",
          options: [
            "Lawful Good",
            "Neutral Good",
            "Chaotic Good",
            "Lawful Neutral",
            "True Neutral",
            "Chaotic Neutral",
            "Lawful Evil",
            "Neutral Evil",
            "Chaotic Evil",
          ],
        },
      ],
    },
    {
      id: "backstory",
      title: "Character Backstory",
      description: "Bring your character to life with their history",
      fields: [
        {
          id: "backstory",
          type: "textarea",
          label: "Backstory",
          fullWidth: true,
          rows: 6,
          placeholder: "Tell your character's story...",
        },
        {
          id: "personality",
          type: "textarea",
          label: "Personality Traits",
          placeholder: "Describe personality traits...",
        },
        {
          id: "ideals",
          type: "textarea",
          label: "Ideals",
          placeholder: "What drives your character...",
        },
        {
          id: "bonds",
          type: "textarea",
          label: "Bonds",
          placeholder: "Important connections...",
        },
        {
          id: "flaws",
          type: "textarea",
          label: "Flaws",
          placeholder: "Character weaknesses...",
        },
      ],
    },
    {
      id: "equipment",
      title: "Equipment & Inventory",
      description: "Manage your character's possessions",
      fields: [
        {
          id: "weapons",
          type: "array",
          label: "Weapons",
          placeholder: "e.g., Longsword, Shortbow",
        },
        {
          id: "armor",
          type: "array",
          label: "Armor & Shields",
          placeholder: "e.g., Chain Mail, Shield",
        },
        {
          id: "equipment",
          type: "array",
          label: "Equipment",
          placeholder: "e.g., Rope, Torch, Backpack",
        },
        {
          id: "magical-items",
          type: "array",
          label: "Magical Items",
          placeholder: "e.g., Potion of Healing, +1 Sword",
        },
      ],
    },
    {
      id: "abilities",
      title: "Special Abilities",
      description: "Class features, spells, and special abilities",
      fields: [
        {
          id: "class-features",
          type: "array",
          label: "Class Features",
          placeholder: "e.g., Action Surge, Spellcasting",
        },
        {
          id: "spells",
          type: "array",
          label: "Spells",
          placeholder: "e.g., Fireball, Cure Wounds",
        },
        {
          id: "proficiencies",
          type: "array",
          label: "Proficiencies",
          placeholder: "e.g., Athletics, Stealth",
        },
        {
          id: "multiclass",
          type: "checkbox",
          label: "Multiclass Character",
          checkboxLabel: "This character has levels in multiple classes",
        },
      ],
    },
  ],
};

// Demo Component
const Demo = () => {
  const [formData, setFormData] = useState({});

  const handleSave = (data) => {
    console.log("Saving data:", data);
    setFormData(data);
    alert("Character saved! Check console for data.");
  };

  const handlePreview = () => {
    console.log("Current form data:", formData);
    alert("Preview mode! Check console for current data.");
  };

  return (
    <ContentManagementForm
      config={dndCharacterConfig}
      title="D&D Character Creator"
      onSave={handleSave}
      onPreview={handlePreview}
      initialData={{
        name: "Aragorn",
        class: "Ranger",
        race: "Human",
        level: 5,
      }}
    />
  );
};

export default Demo;
