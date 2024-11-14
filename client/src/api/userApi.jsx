const API_URL = "http://localhost:1234/api/users";

const fetchUsers = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });
  console.log(response);
  const jsonResponse = await response.json();
  return jsonResponse;
};

const createUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
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

// Fetching protected data with HttpOnly cookie automatically included
const fetchAdminData = async () => {
  try {
    const response = await fetch("/api/users/adminonly", {
      method: "GET",
      credentials: "include", // Ensures cookies are sent
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Protected data:", data);
    } else {
      console.error("Failed to fetch protected data:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching protected data:", error);
  }
};

const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return await response.json();
};

const checkAuthStatus = async () => {
  try {
    const response = await fetch("/api/users/authenticate", {
      method: "GET",
      credentials: "include", // Send cookies with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User is authenticated:", data.user);
      // Update your app state with the user's authentication status and data
    } else {
      console.log("User is not authenticated");
      // Handle not authenticated, e.g., redirect to login
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
  }
};

export {
  fetchUsers,
  createUser,
  loginUser,
  logoutUser,
  fetchAdminData,
  checkAuthStatus,
};
