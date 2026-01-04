import API_URL from "../../../shared/api/api";
interface Comments {
  author: string;
  body: string;
  date: Date;
}
interface Article {
  _id: string;
  title: string;
  body: string;
  synopsis: string;
  author: string;
  comments: Comments[];
  createdAt: string;
  updatedAt: string;
}

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/api/articles`, {
    method: "GET",
    credentials: "include",
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const createArticle = async (formData: Article): Promise<Article> => {
  const response = await fetch(`${API_URL}/api/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Network response not okay");
  }
  return await response.json();
};

export const updateArticle = async (
  id: string,
  formData: Article
): Promise<Article> => {
  const response = await fetch(`${API_URL}/api/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed to update article");
  }
  return await response.json();
};

export const deleteArticle = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/articles/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Error while deleting");
  }
};
