import { apiFetch } from "../../auth/api/apiFetch";
const API_URL = "http://localhost:1234/api/spells";

interface Spells {
  _id: string;
  title: string;
  description: string;
  category: string;
}

export const fetchSpells = async (): Promise<Spells[]> => {
  const response = await apiFetch(API_URL);
  return response;
};

export const createSpell = async (formData: Spells): Promise<Spells> => {
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

export const deleteSpell = async (id: string): Promise<Spells> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  console.log(id);
  if (!response.ok) {
    throw new Error("Error while deleting spell");
  }
  return await response.json();
};

export const updateSpell = async (
  id: string,
  formData: Spells
): Promise<Spells> => {
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
