import { apiFetch } from "../utils/apiFetch";
const API_URL = "http://localhost:1234/api/spells";

export const fetchSpells = async () => {
  const response = await apiFetch(API_URL);
  return response;
};

export const createSpell = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Network response was no ok!");
  }
  return await response.json();
};

export const deleteSpell = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error while deleting spell");
  }
  return await response.json();
};

export const updateSpell = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error while updating spell");
  }
  return await response.json();
};
