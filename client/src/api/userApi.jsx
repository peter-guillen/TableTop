const API_URL = "http://localhost:1234/api/users";

const fetchUsers = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

const createUser = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Error details:", errorDetails);
      throw new Error("Network response was not ok.");
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};

const loginUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Login error:", error);
    return { success: false, message: error.message };
  }
};

const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return await response.json();
};

export { fetchUsers, createUser, loginUser, logoutUser };
