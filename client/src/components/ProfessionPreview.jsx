import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import Button from "./Button";

const ProfessionShow = ({ profession, onDelete }) => {
  const handleDelete = () => {
    onDelete(profession._id);
  };

  const professionContainer = twMerge(
    classNames(
      "text-white bg-blue-800 p-5 m-5 border rounded-md grid grid-cols-3 gap-4",
      { "text-lg font-bold": true }
    )
  );

  const professionContainerHeader = twMerge(
    classNames("bg-green-400 col-span-3")
  );
  const professionContainerItem = twMerge(
    classNames("bg-red-400 col-span-1 row-start-3")
  );

  return (
    <>
      <section className={professionContainer}>
        <img
          src={`https://picsum.photos/seed/200/400`}
          alt=""
          className="col-span-3"
        />
        <h2 className={professionContainerHeader}>{profession.title}</h2>
        <p className="col-span-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias
          rerum magni ea expedita hic aut, quisquam sequi incidunt itaque,
          assumenda, deleniti velit enim quibusdam. Neque labore hic ex quas ut.
        </p>
        <p className={professionContainerItem}>{profession.power}</p>
        <p className={professionContainerItem}>{profession.weapon}</p>
        <p className={professionContainerItem}>{profession.armor}</p>
        <Link key={profession.title} to={`/professions/${profession._id}`}>
          <Button secondary>Details</Button>
        </Link>

        <Button onClick={handleDelete} danger>
          Delete
        </Button>
      </section>
    </>
  );
};

export default ProfessionShow;
