import { apiFetch } from "../../auth/api/apiFetch";
import API_URL from "../../../shared/api/api";
import type { Spell } from "../spellTypes";

export const fetchSpells = async (): Promise<Spell[]> => {
  const response = await apiFetch(`${API_URL}/api/spells`);
  return response;
};

export const createSpell = async (formData: Spell): Promise<Spell> => {
  try {
    const response = await fetch(`${API_URL}/api/spells`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
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
  formData: Spell
): Promise<Spell> => {
  const response = await fetch(`${API_URL}/api/spells/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error while updating spell");
  }
  return await response.json();
};

export const deleteSpell = async (id: string): Promise<Spell> => {
  const response = await fetch(`${API_URL}/api/spells/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error while deleting spell");
  }
  return await response.json();
};
