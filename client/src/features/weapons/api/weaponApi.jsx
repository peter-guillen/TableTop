import API_URL from "../../../shared/api/api";

export const fetchWeapons = async () => {
  const response = await fetch(`${API_URL}/api/weapons`);
  const jsonResponse = response.json();
  return jsonResponse;
};

export const fetchWeapon = async (id) => {
  const response = await fetch(`${API_URL}/api/weapons/${id}`);
  const jsonResponse = response.json();
  return jsonResponse;
};

export const createWeapon = async (formData) => {
  const response = await fetch(`${API_URL}/api/weapons`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error creating new weapon");
  }
  return await response;
};

export const updateWeapon = async (id, formData) => {
  const response = await fetch(`${API_URL}/api/weapons/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error updating weapon");
  }
  return await response;
};

export const deleteWeapon = async (id) => {
  const response = await fetch(`${API_URL}/api/weapons/${id}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error deleting weapon");
  }
  return await response.json();
};
