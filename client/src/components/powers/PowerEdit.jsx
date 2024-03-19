import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Button from "../Button";

const PowerEdit = ({ onEdit, powerList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const currentPower = powerList.find((power) => power._id === id);
    if (currentPower) {
      setFormData({
        title: currentPower.title,
        description: currentPower.description,
        category: currentPower.category,
      });
    }
  }, [id, powerList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onEdit(id, formData);
    navigate("/powers");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          name="title"
          value={formData.title}
          type="text"
        />
        <input
          onChange={handleInputChange}
          name="category"
          value={formData.category}
          type="text"
        />
        <input
          onChange={handleInputChange}
          name="description"
          value={formData.description}
          type="text"
        />
        <button type="submit">Add</button>
      </form>
      <Link to="/">
        <Button primary>Home</Button>
      </Link>
    </div>
  );
};

export default PowerEdit;
