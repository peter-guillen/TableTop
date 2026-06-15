import { Dispatch, SetStateAction } from "react";
/**
 * useFormHandlers
 *
 * A custom hook that returns event handler factories for managing local
 * form state via useState. This is for form data that lives and dies
 * with the component — it does not persist across navigation.
 *
 * Use this for simpler CRUD forms: SpellForm, ItemForm, etc.
 *
 * For the CharacterBuilder, which is compositional and needs state to
 * persist across sections, use the Redux slice (formReducers) instead.
 * The full character builder flow looks like:
 *
 *   Library domain RTK Query call  →  populates all option lists
 *            ↓
 *   Redux slice (formReducers)     →  tracks in-progress character state
 *            ↓
 *   useFormHandlers                →  dispatches changes to that slice
 *            ↓
 *   RTK Query mutation             →  submits, invalidates cache tag
 *
 * @param {Function} setFormData - The useState setter for the form's data object
 */
export function useFormHandlers<T extends Record<string, any>>(
  setFormData: Dispatch<SetStateAction<T>>,
) {
  /**
   * Handles standard text, select, and textarea inputs.
   * Uses the input's name attribute as the formData key.
   * Covers most simple field changes — the workhorse handler.
   * e.g. <input name="title" onChange={handleInputChange} />
   *
   * @returns {Function} onChange handler for input/select/textarea elements
   */
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles checkbox inputs that map to an array field on formData.
   * The checkbox's value attribute is the item to add or remove.
   * e.g. a "blinded" checkbox adds/removes "blinded" from formData.conditions
   *
   * @param {string} fieldName - The array field on formData to update
   * @returns {Function} onChange handler for a checkbox input
   */
  const handleCheckedChange = (fieldName: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: checked
          ? [...(prevFormData[fieldName] as string[]), value]
          : (prevFormData[fieldName] as string[]).filter(
              (item) => item !== value,
            ),
      }));
    };
  };

  /**
   * Replaces an entire array field on formData with new data.
   * Used when a child component manages its own array state and
   * hands the finished array back up — e.g. statModifiers rows.
   *
   * @param {string} fieldName - The array field on formData to replace
   * @returns {Function} Handler that accepts the new array
   */
  const handleArrayFieldChange = <U,>(fieldName: keyof T) => {
    return (newData: U[]) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: newData,
      }));
    };
  };

  /**
   * Updates one field inside a nested object on formData.
   * The field to update is decided at call time, so one handler
   * covers all fields on that object.
   * e.g. handleObjectFieldChange("healthEffect")("dice", "1d6")
   *
   * @param {string} objectName - The nested object key on formData
   * @returns {Function} Handler that accepts (field, value)
   */
  const handleObjectFieldChange = (objectName: keyof T) => {
    return (field: string, value: any) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [objectName]: {
          ...(prevFormData[objectName] as Record<string, any>),
          [field]: value,
        },
      }));
    };
  };

  /**
   * Updates one specific field inside a nested object on formData.
   * Both the object and the field are locked in at creation time,
   * so the returned handler only needs the new value.
   * Use when a single control owns exactly one nested field.
   * e.g. handleNestedFieldChange("healthEffect", "isDoT")
   *
   * Compared to handleObjectFieldChange: that handler covers all fields
   * on an object. This one is pre-bound to a single field — useful when
   * a dedicated toggle or control owns exactly one property.
   *
   * @param {string} objectName - The nested object key on formData
   * @param {string} nestedKey - The specific field to update
   * @returns {Function} Handler that accepts only the new value
   */
  const handleNestedFieldChange = (objectName: keyof T, nestedKey: string) => {
    return (value: any) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [objectName]: {
          ...(prevFormData[objectName] as Record<string, any>),
          [nestedKey]: value,
        },
      }));
    };
  };

  return {
    handleInputChange,
    handleCheckedChange,
    handleArrayFieldChange,
    handleObjectFieldChange,
    handleNestedFieldChange,
  };
}
