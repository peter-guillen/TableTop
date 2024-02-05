const API_URL = "http://localhost:1234/api/powers";

const fetchPowers = async () => {
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse;
};

const createPower = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Network response was no ok!");
  }
  return await response.json();
};

const deletePower = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error while deleting power");
  }
  return await response.json();
};

const updatePower = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Error while updating power");
  }
  return await response.json();
};

export { fetchPowers, createPower, deletePower, updatePower };
