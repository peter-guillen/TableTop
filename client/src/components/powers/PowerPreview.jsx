import { Link } from "react-router-dom";

import { PowerDetails } from "./PowerDetails";
import { Button } from "../Button";

export const PowerPreview = ({ power, onDelete }) => {
  const handleDelete = () => {
    onDelete(power._id);
  };

  return (
    <div className="flex text-white bg-gray-500 m-4 p-2">
      <div>{power.title}</div>
      <Link to={`/powers/${power._id}`}>
        <Button primary>Details</Button>
      </Link>
      <Button danger onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};
