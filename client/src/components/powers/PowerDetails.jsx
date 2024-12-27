import { useParams, Link } from "react-router-dom";
import { NotFound } from "../../pages/NotFound";

import { Button } from "../Button";

export const PowerDetails = ({ powerList }) => {
  const { id } = useParams();
  const power = powerList.find((p) => p._id === id);
  if (!power) {
    return <NotFound />;
  }
  return (
    <div>
      <Link to={`/powers/${id}/edit`}>
        <Button primary>Edit</Button>
      </Link>
      <div>{power.title}</div>
      <div>{power.description}</div>
      <div>{power.category}</div>
    </div>
  );
};
