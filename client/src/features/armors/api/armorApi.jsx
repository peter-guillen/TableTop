import API_URL from "../../../shared/api/api";

export const fetchArmors = async () => {
  const response = await fetch(`${API_URL}/api/armors/`);
  const jsonResponse = response.json();
  return jsonResponse;
};

export const fetchArmor = async (id) => {
  const response = await fetch(`${API_URL}/api/armors/${id}`);
  const jsonResponse = response.json();
  return jsonResponse;
};

export const createArmor = async (formData) => {
  const response = await fetch(`${API_URL}/api/armors`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error creating new armor");
  }
  return await response;
};

export const updateArmor = async (id, formData) => {
  const response = await fetch(`${API_URL}/api/armors/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error updating armor");
  }
  return await response;
};

export const deleteArmor = async (id) => {
  const response = await fetch(`${API_URL}/api/armors/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error deleting armor");
  }
};
