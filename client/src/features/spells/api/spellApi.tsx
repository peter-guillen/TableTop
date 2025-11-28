import { apiFetch } from "../../auth/api/apiFetch";
const API_URL = "http://localhost:1234/api/spells";

interface Spells {
  _id: string;
  description: string;
  // category: string;

  name: string;
  school: string;
  tier: string;
  element: string;
  tags: [];
  castingTime: string;
  isRitual: string;
  stamina: string;
  usesPerDay: string;
  range: string;
  area: string;
  target: string;
  attackType: string;
  duration: string;
  requiresConcentration: string;
  damage: [];
  healing: [];
  conditions: [];
  buffs: [];
  debuffs: [];
}

export const fetchSpells = async (): Promise<Spells[]> => {
  const response = await apiFetch(API_URL);
  return response;
};

export const createSpell = async (formData: Spells): Promise<Spells> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Full error response:", errorData);
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(errorData)}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Caught error:", error);
    throw error;
  }
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

export const deleteSpell = async (id: string): Promise<Spells> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error while deleting spell");
  }
  return await response.json();
};
