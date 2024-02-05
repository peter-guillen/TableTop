import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "./Button";

const ArticleCreate = ({ onCreate }) => {
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
    await onCreate(formData);
    navigate("/articles");
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          value={formData.title}
        />
        <input
          type="text"
          name="body"
          onChange={handleInputChange}
          value={formData.body}
        />
        <input
          type="text"
          name="author"
          onChange={handleInputChange}
          value={formData.author}
        />
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

export default ArticleCreate;
