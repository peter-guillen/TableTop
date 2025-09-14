import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArticleContext } from "../context/ArticleContext";
import { Button } from "../../../shared/components/Button";

export const AdminArticleEdit = () => {
  const { handleCreate, handleEdit, articleList } = useContext(ArticleContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    author: "",
    synopsis: "",
    // comments: [{ author: "", body: "", date: "" }],
  });

  useEffect(() => {
    if (isEditMode === true && id) {
      const currentArticle = articleList.find((article) => article._id === id);
      if (currentArticle) {
        setFormData({
          title: currentArticle.title,
          body: currentArticle.body,
          author: currentArticle.author,
          synopsis: currentArticle.synopsis,
        });
      }
    } else {
      setFormData({
        title: "",
        body: "",
        author: "",
        synopsis: "",
      });
    }
  }, [isEditMode, id, articleList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditMode === "edit") {
      await handleEdit(id, formData);
    } else {
      await handleCreate(formData);
    }
    navigate("/articles");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          value={formData.title}
          placeholder="title"
        />
        <input
          type="text"
          name="body"
          onChange={handleInputChange}
          value={formData.body}
          placeholder="body"
        />
        <input
          type="text"
          name="author"
          onChange={handleInputChange}
          value={formData.author}
          placeholder="author"
        />
        <input
          type="text"
          name="synopsis"
          onChange={handleInputChange}
          value={formData.synopsis}
          placeholder="synopsis"
        />
        <Button primary>{isEditMode === true ? "Update" : "Create"}</Button>
      </form>
    </>
  );
};
