const API_URL = "http://localhost:1234/api/professions";

const fetchProfessions = async (token) => {
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
  const jsonResponse = await response.json();
  return jsonResponse;
};

const createProfession = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok!");
  }
  return await response.json();
};

const deleteProfession = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error while deleting profession");
  }
};

const updateProfession = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Error while updating profession");
    }
    return await response.json();
  } catch (error) {
    console.log("Error: UPDATING_PROFESSION", error);
  }
};

export {
  fetchProfessions,
  createProfession,
  deleteProfession,
  updateProfession,
};
