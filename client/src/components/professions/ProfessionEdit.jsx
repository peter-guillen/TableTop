import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const professionForm = twMerge(
  classNames("border rounded-md bg-gray-200 p-2 m-2", {})
);

export const ProfessionEdit = ({ onEdit, professionList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    spell: "",
    weapon: "",
    armor: "",
    levels: [
      { level: "one", description: "" },
      { level: "two", description: "" },
      { level: "three", description: "" },
      { level: "four", description: "" },
      { level: "five", description: "" },
      { level: "six", description: "" },
      { level: "seven", description: "" },
      { level: "eight", description: "" },
      { level: "nine", description: "" },
      { level: "ten", description: "" },
    ],
  });

  useEffect(() => {
    const currentProfession = professionList.find((prof) => prof._id === id);
    if (currentProfession) {
      setFormData({
        title: currentProfession.title,
        spell: currentProfession.spell,
        weapon: currentProfession.weapon,
        armor: currentProfession.armor,
        levels: currentProfession.levels.map((level) => ({ ...level })),
      });
    }
  }, [id, professionList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("level")) {
      const levelIndex = parseInt(name.replace("level", ""), 10) - 1;

      setFormData((prevData) => ({
        ...prevData,
        levels: prevData.levels.map((level, index) =>
          index === levelIndex ? { ...level, description: value } : level
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onEdit(id, formData);
    navigate("/professions");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={professionForm}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          value={formData.title}
        />
        <label htmlFor="spell">Spell:</label>
        <input
          type="text"
          name="spell"
          onChange={handleInputChange}
          value={formData.spell}
        />
        <label htmlFor="weapon">Weapon:</label>
        <input
          type="text"
          name="weapon"
          onChange={handleInputChange}
          value={formData.weapon}
        />
        <label htmlFor="armor">Armor:</label>
        <input
          type="text"
          name="armor"
          onChange={handleInputChange}
          value={formData.armor}
        />

        {formData.levels.map((level, index) => (
          <div key={index}>
            <label htmlFor={`level${index + 1}`}>Level: {index + 1}</label>
            <input
              type="text"
              name={`level${index + 1}`}
              onChange={handleInputChange}
              value={level.description}
            />
          </div>
        ))}

        <button type="submit">Add</button>
      </form>

      <Link to="/professions">Go back</Link>
    </>
  );
};
