import { useState, useEffect } from "react";
import {
  LuX,
  LuSave,
  LuSparkles,
  LuSword,
  LuBookOpen,
  LuShield,
  LuEye,
  LuEyeOff,
  LuUpload,
  LuCircleAlert,
} from "react-icons/lu";

const ModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  config,
  initialData = {},
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({});

  // Initialize form data
  //   useEffect(() => {
  //     if (isOpen) {
  //       const initialFormData = {};
  //       config.fields.forEach((field) => {
  //         initialFormData[field.name] =
  //           initialData[field.name] || field.defaultValue || "";
  //       });
  //       setFormData(initialFormData);
  //       setErrors({});
  //     }
  //   }, [isOpen, config, initialData]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    config.fields.forEach((field) => {
      const value = formData[field.name];

      // Required validation
      if (
        field.required &&
        (!value || (typeof value === "string" && value.trim() === ""))
      ) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // Type-specific validation
      if (value && field.validation) {
        if (field.validation.min && value.length < field.validation.min) {
          newErrors[
            field.name
          ] = `${field.label} must be at least ${field.validation.min} characters`;
        }
        if (field.validation.max && value.length > field.validation.max) {
          newErrors[
            field.name
          ] = `${field.label} must be no more than ${field.validation.max} characters`;
        }
        if (field.validation.pattern && !field.validation.pattern.test(value)) {
          newErrors[field.name] =
            field.validation.message || `${field.label} format is invalid`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error for this field
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const renderField = (field) => {
    const value = formData[field.name] || "";
    const hasError = errors[field.name];

    const baseInputClasses = `w-full px-4 py-3 rounded-lg border bg-slate-800/50 text-white placeholder-slate-400 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
      hasError
        ? "border-red-500 dark:border-red-400"
        : "border-slate-600 hover:border-purple-400 focus:border-purple-500"
    }`;

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) =>
              handleInputChange(
                field.name,
                field.type === "number"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
            placeholder={field.placeholder}
            className={baseInputClasses}
          />
        );

      case "password":
        return (
          <div className="relative">
            <input
              type={showPassword[field.name] ? "text" : "password"}
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={baseInputClasses + " pr-12"}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(field.name)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors"
            >
              {showPassword[field.name] ? (
                <LuEyeOff className="w-5 h-5" />
              ) : (
                <LuEye className="w-5 h-5" />
              )}
            </button>
          </div>
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className={baseInputClasses + " resize-none"}
          />
        );

      case "select":
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={baseInputClasses}
          >
            <option value="">
              {field.placeholder || `Select ${field.label}`}
            </option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              className="w-5 h-5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-slate-300">
              {field.checkboxLabel || field.label}
            </span>
          </label>
        );

      case "file":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-800/30 hover:bg-slate-700/30 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <LuUpload className="w-8 h-8 mb-3 text-slate-400" />
                  <p className="mb-2 text-sm text-slate-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-slate-500">
                    {field.fileTypes || "PNG, JPG, GIF up to 10MB"}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept={field.accept}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.files[0])
                  }
                />
              </label>
            </div>
            {value && (
              <p className="text-sm text-purple-400">
                Selected: {value.name || value}
              </p>
            )}
          </div>
        );

      case "richtext":
        return (
          <div className="space-y-2">
            <div className="flex space-x-2 p-2 bg-slate-700/50 rounded-t-lg border-b border-slate-600">
              <button
                type="button"
                className="px-2 py-1 text-xs bg-slate-600 hover:bg-slate-500 rounded text-white transition-colors"
              >
                B
              </button>
              <button
                type="button"
                className="px-2 py-1 text-xs bg-slate-600 hover:bg-slate-500 rounded text-white transition-colors"
              >
                I
              </button>
              <button
                type="button"
                className="px-2 py-1 text-xs bg-slate-600 hover:bg-slate-500 rounded text-white transition-colors"
              >
                U
              </button>
            </div>
            <textarea
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={field.rows || 8}
              className={baseInputClasses + " resize-none rounded-t-none"}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-purple-900/20 rounded-2xl shadow-2xl border border-purple-500/20 backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              {config.icon && (
                <config.icon className="w-6 h-6 text-purple-400" />
              )}
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {isEdit ? `Edit ${title}` : `Create ${title}`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <LuX className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.fields.map((field) => (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : "col-span-1"}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {field.label}
                    {field.required && (
                      <span className="text-red-400 ml-1">*</span>
                    )}
                  </label>

                  {renderField(field)}

                  {errors[field.name] && (
                    <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm">
                      <LuCircleAlert className="w-4 h-4" />
                      <span>{errors[field.name]}</span>
                    </div>
                  )}

                  {field.helpText && (
                    <p className="text-xs text-slate-500 mt-1">
                      {field.helpText}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <LuSave className="w-4 h-4" />
              <span>
                {isEdit ? "Update" : "Create"} {title}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example configurations for different content types
const spellConfig = {
  icon: LuSparkles,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter spell name",
    },
    {
      name: "rarity",
      type: "select",
      label: "Rarity",
      required: true,
      options: [
        { value: "common", label: "Common" },
        { value: "uncommon", label: "Uncommon" },
        { value: "rare", label: "Rare" },
        { value: "very_rare", label: "Very Rare" },
        { value: "legendary", label: "Legendary" },
      ],
    },
    {
      name: "range",
      type: "text",
      label: "Range",
      required: true,
      placeholder: "e.g., 60 feet",
    },
    {
      name: "damage",
      type: "text",
      label: "Damage",
      placeholder: "e.g., 3d6 fire",
    },
    {
      name: "duration",
      type: "text",
      label: "Duration",
      required: true,
      placeholder: "e.g., Instantaneous",
    },
    {
      name: "effects",
      type: "textarea",
      label: "Effects",
      fullWidth: true,
      rows: 3,
      placeholder: "Describe the spell effects",
    },
    {
      name: "description",
      type: "richtext",
      label: "Description",
      required: true,
      fullWidth: true,
      rows: 6,
      placeholder: "Enter detailed spell description...",
    },
  ],
};

const weaponConfig = {
  icon: LuSword,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter weapon name",
    },
    {
      name: "type",
      type: "select",
      label: "Type",
      required: true,
      options: [
        { value: "simple_melee", label: "Simple Melee" },
        { value: "martial_melee", label: "Martial Melee" },
        { value: "simple_ranged", label: "Simple Ranged" },
        { value: "martial_ranged", label: "Martial Ranged" },
      ],
    },
    {
      name: "damage",
      type: "text",
      label: "Damage",
      required: true,
      placeholder: "e.g., 1d8 slashing",
    },
    {
      name: "properties",
      type: "textarea",
      label: "Properties",
      placeholder: "List weapon properties",
    },
    {
      name: "skills",
      type: "text",
      label: "Required Skills",
      placeholder: "e.g., Proficiency with martial weapons",
    },
    {
      name: "features",
      type: "richtext",
      label: "Special Features",
      fullWidth: true,
      rows: 4,
      placeholder: "Describe any special features...",
    },
  ],
};

const articleConfig = {
  icon: LuBookOpen,
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      placeholder: "Enter article title",
    },
    {
      name: "author",
      type: "text",
      label: "Author",
      required: true,
      placeholder: "Enter author name",
    },
    {
      name: "category",
      type: "select",
      label: "Category",
      required: true,
      options: [
        { value: "guide", label: "Guide" },
        { value: "strategy", label: "Strategy" },
        { value: "lore", label: "Lore" },
        { value: "rules", label: "Rules" },
        { value: "homebrew", label: "Homebrew" },
      ],
    },
    {
      name: "synopsis",
      type: "textarea",
      label: "Synopsis",
      fullWidth: true,
      rows: 3,
      placeholder: "Brief article summary...",
    },
    {
      name: "content",
      type: "richtext",
      label: "Content",
      required: true,
      fullWidth: true,
      rows: 12,
      placeholder: "Write your article content here...",
    },
  ],
};

const classConfig = {
  icon: LuShield,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Class Name",
      required: true,
      placeholder: "Enter class name",
    },
    {
      name: "background",
      type: "textarea",
      label: "Background",
      fullWidth: true,
      rows: 3,
      placeholder: "Class background and lore...",
    },
    {
      name: "level",
      type: "number",
      label: "Starting Level",
      required: true,
      defaultValue: 1,
    },
    {
      name: "features",
      type: "richtext",
      label: "Features",
      fullWidth: true,
      rows: 6,
      placeholder: "Describe class features...",
    },
    {
      name: "traits",
      type: "richtext",
      label: "Traits",
      fullWidth: true,
      rows: 4,
      placeholder: "List class traits...",
    },
  ],
};

// Demo component showing the forms in action
export const NewFormPage = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    setFormData(data);
    setCurrentModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          D&D Content Forms
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => setCurrentModal("spell")}
            className="p-6 bg-slate-800/50 border border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            <LuSparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <span className="text-white font-medium">Create Spell</span>
          </button>

          <button
            onClick={() => setCurrentModal("weapon")}
            className="p-6 bg-slate-800/50 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all duration-300 hover:scale-105"
          >
            <LuSword className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <span className="text-white font-medium">Create Weapon</span>
          </button>

          <button
            onClick={() => setCurrentModal("article")}
            className="p-6 bg-slate-800/50 border border-green-500/20 rounded-xl hover:border-green-500/40 transition-all duration-300 hover:scale-105"
          >
            <LuBookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <span className="text-white font-medium">Create Article</span>
          </button>

          <button
            onClick={() => setCurrentModal("class")}
            className="p-6 bg-slate-800/50 border border-yellow-500/20 rounded-xl hover:border-yellow-500/40 transition-all duration-300 hover:scale-105"
          >
            <LuShield className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <span className="text-white font-medium">Create Class</span>
          </button>
        </div>

        {Object.keys(formData).length > 0 && (
          <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Last Submitted Data:
            </h3>
            <pre className="text-slate-300 text-sm overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Modal Forms */}
      <ModalForm
        isOpen={currentModal === "spell"}
        onClose={() => setCurrentModal(null)}
        onSubmit={handleSubmit}
        title="Spell"
        config={spellConfig}
      />

      <ModalForm
        isOpen={currentModal === "weapon"}
        onClose={() => setCurrentModal(null)}
        onSubmit={handleSubmit}
        title="Weapon"
        config={weaponConfig}
      />

      <ModalForm
        isOpen={currentModal === "article"}
        onClose={() => setCurrentModal(null)}
        onSubmit={handleSubmit}
        title="Article"
        config={articleConfig}
      />

      <ModalForm
        isOpen={currentModal === "class"}
        onClose={() => setCurrentModal(null)}
        onSubmit={handleSubmit}
        title="Class"
        config={classConfig}
      />
    </div>
  );
};
