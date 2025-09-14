import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Button } from "../../../shared/components/Button";

const tableBodyStyles = twMerge(classNames("odd:bg-white even:bg-slate-100"));
const tableHeadStyles = twMerge(classNames("font-medium text-2xl"));
const tableContainerStyles = twMerge(
  classNames("border-2 col-span-2 w-4/5 place-self-center")
);
const pageContainerStyles = twMerge(
  classNames("grid grid-cols-2 m-auto p-4 mt-6 border place-self-center w-4/5")
);

interface ProfessionCreateProps {
  onCreate: (formData: FormDataType) => Promise<void>;
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

export const ProfessionCreate: React.FC<ProfessionCreateProps> = ({
  onCreate,
}) => {
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
    await onCreate(formData);
    navigate("/professions");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={pageContainerStyles}>
        <section className="col-span-2 mt-4 mb-4">
          <h2 className="text-6xl font-bold text-center">Title</h2>
        </section>
        <section className="col-span-2 p-6 border">
          <h3 className="text-3xl">Background</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Exercitationem modi, iste veniam repellat placeat atque soluta eos
            sapiente voluptates possimus est adipisci. Tempora magni impedit
            repellendus mollitia ducimus dolores labore illo dolorem totam
            dignissimos, beatae omnis id eaque? Quos, laborum.
          </p>
        </section>
        <section className="col-span-2 p-6 mt-4 mb-4 border">
          <h3 className="text-3xl">Proficiencies</h3>
        </section>
        <section className="col-span-2 p-6 mt-4 mb-4 border">
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            value={formData.title}
            placeholder="title"
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
        </section>

        <table className={tableContainerStyles}>
          <thead className={tableHeadStyles}>
            <tr>
              <td className="pl-2 border-r-2 border-2">Level</td>
              <td className="p-1 w-4/5 border-2">Features</td>
            </tr>
          </thead>
          {formData.levels.map((level, index) => (
            <tbody key={index} className={tableBodyStyles}>
              <tr>
                <td className="pl-2 border-r-2 border-2">{index + 1}</td>
                <td className="p-1 border-2">
                  <input
                    type="text"
                    name={`level${index + 1}`}
                    onChange={handleInputChange}
                    value={level.description}
                    className="bg-gray-300 w-full"
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        <div>
          <Button primary>Add</Button>
        </div>
      </form>

      <Link to="/professions">
        <Button danger>Go Back</Button>
      </Link>
    </>
  );
};
