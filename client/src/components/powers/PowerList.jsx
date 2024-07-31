import {} from "react";
import { Link } from "react-router-dom";

import PowerPreview from "./PowerPreview";
import LoadingSpinner from "../LoadingSpinner";
import PowerCreate from "./PowerCreate";
import Button from "../Button";

const PowerList = ({ powerList, onCreate, onDelete }) => {
  if (!powerList || powerList.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Link to="/powers/createPower">
        <Button primary>Create new power</Button>
      </Link>
      <div>
        {powerList.map((power) => (
          <div key={power._id}>
            <PowerPreview power={power} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerList;
