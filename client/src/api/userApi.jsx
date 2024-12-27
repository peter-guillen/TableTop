const API_URL = "http://localhost:1234/api/users";

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch users");
  }

  return await response.json();
};

export const createUser = async (formData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  // if user exists do not add
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Error details:", errorDetails);
    throw new Error("Network response was not ok.");
  }
  return await response.json();
};

export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      // throw new Error(error.message || "Login failed");
      return { success: false, message: error.message };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, message: "ERORR try agin later" };
  }
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return await response.json();
};
