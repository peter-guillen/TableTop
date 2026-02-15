import API_URL from "../../../shared/api/api";
import { apiFetch } from "../../../features/auth/api/apiFetch";
interface Level {
  name: string;
  description: string;
}

interface Profession {
  _id: string;
  title: string;
  spell: string;
  weapon: string;
  armor: string;
  levels: Level[];
}

export const fetchProfessions = async (): Promise<Profession[]> => {
  const response = await apiFetch(`${API_URL}/api/professions`);
  return response;
};

export const createProfession = async (
  formData: Profession,
): Promise<Profession> => {
  try {
    const response = await fetch(`${API_URL}/api/professions`, {
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

export const updateProfession = async (
  id: string,
  formData: Profession,
): Promise<Profession> => {
  const response = await fetch(`${API_URL}/api/professions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error while updating profession");
  }
  return await response.json();
};

export const deleteProfession = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/professions/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error while deleting profession");
  }
  return await response.json();
};
