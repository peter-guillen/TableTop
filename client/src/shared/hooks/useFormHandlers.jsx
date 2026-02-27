// Factory function to handle multiple checkboxes
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
