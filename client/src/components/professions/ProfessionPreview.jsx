import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { Button } from "../Button";

export const ProfessionPreview = ({ profession, onDelete }) => {
  const handleDelete = () => {
    onDelete(profession._id);
  };

  const professionContainer = twMerge(
    classNames(
      "text-white text-center bg-blue-900 p-5 m-5 border rounded-md grid gap-4",
      {
        "text-lg font-bold": true,
      }
    )
  );

  const professionContainerHeader = twMerge(classNames("text-3xl col-span-3"));

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

        <div>
          <Link key={profession.title} to={`/professions/${profession._id}`}>
            <Button primary>Details</Button>
          </Link>

          <Button onClick={handleDelete} danger>
            Delete
          </Button>
        </div>
      </section>
    </>
  );
};
