import API_URL from "../../../shared/api/api";
interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export const fetchUsers = async (token: string): Promise<User[]> => {
  const response = await fetch(`${API_URL}/api/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch users");
  }

  return await response.json();
};

export const createUser = async (formData: User): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  // if user exists do not add
  // const existingUser = await User.findOne({ email });
  // if (existingUser) {
  //   return res.status(400).json({ message: "User already exists" });
  // }
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || "Network response was not ok.");
  }
  return await response.json();
};

export const loginUser = async (
  formData: Pick<User, "email" | "password">,
  token: string
): Promise<{ token: string; user: User }> => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
    // return { success: false, message: error.message };
  }

  return await response.json();
};

export const logoutUser = async (): Promise<void> => {
  const response = await fetch(`${API_URL}/api/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
};

export const deleteUser = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error while deleting user");
  }
};
