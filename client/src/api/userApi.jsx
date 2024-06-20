const API_URL = "http://localhost:1234/api/users";

const fetchUsers = async () => {
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse;
};

const createUser = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  return await response.json();
};

const loginUser = async (formData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  return await response.json();
};

export { fetchUsers, createUser, loginUser };
