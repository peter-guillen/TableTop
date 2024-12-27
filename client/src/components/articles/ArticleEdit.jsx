import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArticleContext } from "../../hooks/articleFastRefreshHook";
import { Button } from "../Button";

export const ArticleEdit = ({ articleList }) => {
  const { handleEdit } = useContext(ArticleContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    author: "",
    synopsis: "",
    // comments: [{ author: "", body: "", date: "" }],
  });

  useEffect(() => {
    const currentArticle = articleList.find((article) => article._id === id);
    if (currentArticle) {
      setFormData({
        title: currentArticle.title,
        body: currentArticle.body,
        author: currentArticle.author,
        synopsis: currentArticle.synopsis,
      });
    }
  }, [id, articleList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleEdit(id, formData);
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
        <Button primary>Submit</Button>
      </form>
    </>
  );
};
