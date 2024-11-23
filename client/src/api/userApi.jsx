const API_URL = "http://localhost:1234/api/users";

const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
};

const createUser = async (formData) => {
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

const loginUser = async (formData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }

  return await response.json();
};

const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return await response.json();
};

export { fetchUsers, createUser, loginUser, logoutUser };
