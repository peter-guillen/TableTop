import { Link } from "react-router-dom";

import { SpellDetails } from "./SpellDetails";
import { Button } from "../Button";

export const SpellPreview = ({ spell, onDelete }) => {
  const handleDelete = () => {
    onDelete(spell._id);
  };

  return (
    <div className="flex flex-row justify-between items-center text-white bg-gray-500 m-4 p-2">
      <h2 className="p-2">{spell.title}</h2>
      <div className="flex flex-row space-x-2">
        <Link to={`/spells/${spell._id}`}>
          <Button primary>Details</Button>
        </Link>
        <Button danger onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
