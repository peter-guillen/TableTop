const API_URL = "http://localhost:1234/api/professions";

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

export const fetchProfessions = async (
  token: string
): Promise<Profession[]> => {
  const response = await fetch(API_URL, {
    method: "GET",
    // Applying these headers for the ensureIsAuthenticated middleware in the server.js file
    // Since we're using sessions "include"
    credentials: "include",
    // Mock token inside of AuthContext is being passed for authorization
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch professions");
  }

  return await response.json();
};

export const createProfession = async (
  token: string,
  formData: Profession
): Promise<Profession> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok!");
  }
  return await response.json();
};

export const deleteProfession = async (
  id: string,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error while deleting profession");
  }
};

export const updateProfession = async (
  id: string,
  formData: Profession,
  token: string
): Promise<Profession> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error while updating profession");
  }
  return await response.json();
};
