import { Link } from "react-router-dom";

import { SpellDetails } from "./SpellDetails";
import { Button } from "../Button";

export const SpellPreview = ({ spell, onDelete }) => {
  const handleDelete = () => {
    onDelete(spell._id);
  };

  return (
    <div className="flex text-white bg-gray-500 m-4 p-2">
      <div>{spell.title}</div>
      <Link to={`/spells/${spell._id}`}>
        <Button primary>Details</Button>
      </Link>
      <Button danger onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};
