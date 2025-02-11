import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const professionForm = twMerge(
  classNames("border rounded-md bg-gray-200 p-2 m-2", {})
);

interface ProfessionEditProps {
  onEdit: (id: string | undefined, formData: FormDataType) => Promise<void>;
  professionList: Profession[];
}

interface Level {
  level: string;
  description: string;
}

interface FormDataType {
  title: string;
  spell: string;
  weapon: string;
  armor: string;
  levels: Level[];
}

interface Profession {
  _id: string;
  title: string;
  spell: string;
  weapon: string;
  armor: string;
  levels: Level[];
}

export const ProfessionEdit: React.FC<ProfessionEditProps> = ({
  onEdit,
  professionList,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    spell: "",
    weapon: "",
    armor: "",
    levels: Array.from({ length: 10 }, (_, index) => ({
      level: `${index + 1}`,
      description: "",
    })),
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
