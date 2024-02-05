const API_URL = "http://localhost:1234/api/articles";

const fetchArticles = async () => {
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse;
};

const createArticle = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Network response not okay");
  }
  return await response.json();
};

const deleteArticle = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error while deleting");
  }
};

const updateArticle = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Error while updating");
    }
    return await response.json();
  } catch (error) {
    console.log("Error: UPDATING_ARTICLE", error);
  }
};

export { fetchArticles, createArticle, deleteArticle, updateArticle };
