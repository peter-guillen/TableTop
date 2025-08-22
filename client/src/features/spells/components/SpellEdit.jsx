import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Button } from "../../../shared/components/Button";

export const SpellEdit = ({ onEdit, spellList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const currentSpell = spellList.find((spell) => spell._id === id);
    if (currentSpell) {
      setFormData({
        title: currentSpell.title,
        description: currentSpell.description,
        category: currentSpell.category,
      });
    }
  }, [id, spellList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onEdit(id, formData);
    navigate("/spells");
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
