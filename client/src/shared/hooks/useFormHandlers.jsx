// Factory function to handle multiple checkboxes
// useContext
export function useFormHandlers(setFormData) {
  const handleCheckedChange = (fieldName) => {
    return (e) => {
      const { value, checked } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: checked
          ? [...prevFormData[fieldName], value]
          : prevFormData[fieldName].filter((item) => item !== value),
      }));
    };
  };

  const handleArrayFieldChange = (fieldName) => {
    return (newData) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: newData,
      }));
    };
  };

  const handleObjectFieldChange = (objectName) => {
    return (field, value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [objectName]: {
          ...prevFormData[objectName],
          [field]: value,
        },
      }));
    };
  };

  const handleNestedFieldChange = (objectName, nestedKey) => {
    return (value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [objectName]: {
          ...prevFormData[objectName],
          [nestedKey]: value,
        },
      }));
    };
  };

  return {
    handleCheckedChange,
    handleArrayFieldChange,
    handleObjectFieldChange,
    handleNestedFieldChange,
  };
}

// features/shared/formReducers.js
export const formReducers = {
  updateField(state, action) {
    const { field, value } = action.payload;
    state[field] = value;
  },
  toggleArrayItem(state, action) {
    const { field, value, checked } = action.payload;
    if (checked) {
      state[field].push(value);
    } else {
      state[field] = state[field].filter((item) => item !== value);
    }
  },
  updateObjectField(state, action) {
    const { objectName, field, value } = action.payload;
    state[objectName][field] = value;
  },
  resetForm() {
    return initialState;
  },
};
