import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const PowerCreate = ({ onCreate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  //   const handleChange = (event) => {
  //     console.log(event.target.value);
  //     setFormData((prevFormData) => {
  //       return { ...prevFormData, [event.target.name]: event.target.value };
  //     });
  //   };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreate(formData);
    navigate("/powers");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleInputChange}
        name="title"
        value={formData.title}
        type="text"
      />
      <input
        onChange={handleInputChange}
        name="description"
        value={formData.description}
        type="text"
      />
      <input
        onChange={handleInputChange}
        name="category"
        value={formData.category}
        type="text"
      />
      <Button primary type="submit">
        Create
      </Button>
    </form>
  );
};

export default PowerCreate;
