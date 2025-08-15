import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ArticleContext } from "../../hooks/articleFastRefreshHook";
import { Button } from "../Button";

export const ArticleCreate = () => {
  const { handleCreate } = useContext(ArticleContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    author: "",
    synopsis: "",
    comments: [{ author: "", body: "", date: "" }],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleCreate(formData);
    navigate("/articles");
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          value={formData.title}
        />
        <label htmlFor="title">Description:</label>

        <input
          type="text"
          name="body"
          onChange={handleInputChange}
          value={formData.body}
        />
        <label htmlFor="title">Author:</label>

        <input
          type="text"
          name="author"
          onChange={handleInputChange}
          value={formData.author}
        />
        <label html="title">Synopsis:</label>

        <input
          type="text"
          name="synopsis"
          onChange={handleInputChange}
          value={formData.synopsis}
        />
        <Button primary>Create</Button>
      </form>
    </>
  );
};
