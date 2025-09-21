const API_URL = "http://localhost:1234/api/armors";

export const getArmors = async () => {
  const response = await fetch(API_URL);
  const jsonResponse = response.json();
  return jsonResponse;
};

export const getArmor = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const jsonResponse = response.json();
  return jsonResponse;
};

export const createArmor = async (formData) => {
  const response = await fetch(API_URL, {
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
  const response = await fetch(`${API_URL}/${id}`, {
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
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error deleting armor");
  }
};
