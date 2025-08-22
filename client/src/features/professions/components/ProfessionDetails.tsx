import { useParams, Link } from "react-router-dom";
import { NotFound } from "../../../app/pages/NotFound";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Button } from "../../../shared/components/Button";

const tableBodyStyles = twMerge(classNames("odd:bg-white even:bg-slate-100"));
const tableHeadStyles = twMerge(classNames("font-medium text-2xl"));
const tableContainerStyles = twMerge(
  classNames("border-2 col-span-2 w-4/5 place-self-center")
);
const pageContainerStyles = twMerge(
  classNames("grid grid-cols-2 m-auto p-4 mt-6 border place-self-center w-4/5")
);

interface ProfessionDetailsProps {
  professionList: Profession[];
}

interface Level {
  level: string;
  description: string;
}

interface Profession {
  _id: string;
  title: string;
  spell: string;
  weapon: string;
  armor: string;
  levels: Level[];
}

export const ProfessionDetails: React.FC<ProfessionDetailsProps> = ({
  professionList,
}) => {
  const { id } = useParams();
  const profession = professionList.find((p) => p._id === id);

  if (!profession) {
    return <NotFound />;
  }

  return (
    <div className={pageContainerStyles}>
      <section className="col-span-2 mt-4 mb-4">
        <h2 className="text-6xl font-bold text-center">{profession.title}</h2>
      </section>
      <section className="col-span-2 p-6 border">
        <h3 className="text-3xl">Background</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          vero commodi, quis aut facere molestias. Maiores tempore voluptates
          quidem velit. Ab iste accusantium facere dolorem impedit. Qui,
          recusandae ducimus explicabo deleniti dolor earum quae iusto porro
          itaque officia, laudantium quas!
        </p>
      </section>
      <section className="col-span-2 p-6 mt-4 mb-4 border">
        <h3 className="text-3xl">Proficiencies</h3>
        <div>Spells: {profession.spell}</div>
        <div>Weapons: {profession.weapon}</div>
        <div>Armor: {profession.armor}</div>
      </section>

      <table className={tableContainerStyles}>
        <thead className={tableHeadStyles}>
          <tr>
            <td className="pl-2 border-r-2 border-2">Level</td>
            <td className="p-1 w-4/5 border-2">Features</td>
          </tr>
        </thead>
        {profession.levels.map((level, index) => (
          <tbody key={index} className={tableBodyStyles}>
            <tr>
              <td className="pl-2 border-r-2 border-2">{index + 1}</td>
              <td className="p-1 border-2">{level.description}</td>
            </tr>
          </tbody>
        ))}
      </table>

      <div>
        <Link to="/professions">
          <Button danger>Go back</Button>
        </Link>

        <Link to={`/professions/${id}/edit`}>
          <Button success>Edit</Button>
        </Link>
      </div>
    </div>
  );
};
