import {} from "react";

import PowerPreview from "./PowerPreview";

const PowerList = ({ powersList, onDelete }) => {
  const powers = powersList.map((power) => (
    <PowerPreview key={power._id} power={power} onDelete={onDelete} />
  ));

  return <div>{powers}</div>;
};

export default PowerList;
