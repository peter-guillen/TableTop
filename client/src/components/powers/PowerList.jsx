import {} from "react";
import { Link } from "react-router-dom";

import PowerPreview from "./PowerPreview";
import LoadingSpinner from "../LoadingSpinner";
import PowerCreate from "./PowerCreate";
import Button from "../Button";

const PowerList = ({ powerList, onCreate }) => {
  if (!powerList || powerList.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Link to="/powers/createPower">
        <Button primary>Create new power</Button>
      </Link>
      {/* <div>{powers}</div> */}
      <div>
        {powerList.map((power) => (
          <div key={power._id}>
            <PowerPreview power={power} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PowerList;
