import {} from "react";

import PowerPreview from "./PowerPreview";
import PowerCreate from "./PowerCreate";

const PowerList = ({ powersList, onDelete, onCreate }) => {
  const powers = powersList.map((power) => (
    <PowerPreview key={power._id} power={power} onDelete={onDelete} />
  ));

  return (
    <div>
      <div>
        <PowerCreate onCreate={onCreate} />
      </div>
      <div>{powers}</div>
    </div>
  );
};

export default PowerList;
