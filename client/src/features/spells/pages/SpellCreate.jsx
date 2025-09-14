import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpellContext } from "../context/SpellContext";
import { Button } from "../../../shared/components/Button";

export const SpellCreate = ({ onCreate }) => {
  const { spellList, handleCreate } = useContext(SpellContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    damage: "",
    healing: "",
    effect: "",
    range: "",
    duration: "",
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
    await handleCreate(formData);
    navigate("/spells");
  };

  return (
    <form onSubmit={handleSubmit} className="dark:text-black">
      <label htmlFor="title" className="dark:text-white">
        Title:
      </label>
      <input
        onChange={handleInputChange}
        name="title"
        value={formData.title}
        type="text"
      />
      <label htmlFor="description" className="dark:text-white">
        Description:
      </label>
      <input
        onChange={handleInputChange}
        name="description"
        value={formData.description}
        type="text"
      />
      <label htmlFor="category" className="dark:text-white">
        Category:
      </label>
      <input
        onChange={handleInputChange}
        name="category"
        value={formData.category}
        type="text"
      />
      <label htmlFor="damage" className="dark:text-white">
        Damage:
      </label>
      <input
        onChange={handleInputChange}
        name="damage"
        value={formData.damage}
        type="text"
      />
      <label htmlFor="healing" className="dark:text-white">
        Healing:
      </label>
      <input
        onChange={handleInputChange}
        name="healing"
        value={formData.healing}
        type="text"
      />
      <label htmlFor="effect" className="dark:text-white">
        Effect:
      </label>
      <input
        onChange={handleInputChange}
        name="effect"
        value={formData.effect}
        type="text"
      />
      <label htmlFor="range" className="dark:text-white">
        Range:
      </label>
      <input
        onChange={handleInputChange}
        name="range"
        value={formData.range}
        type="text"
      />
      <label htmlFor="duration" className="dark:text-white">
        Duration:
      </label>
      <input
        onChange={handleInputChange}
        name="duration"
        value={formData.duration}
        type="text"
      />
      <Button primary type="submit">
        Create
      </Button>
    </form>
  );
};
