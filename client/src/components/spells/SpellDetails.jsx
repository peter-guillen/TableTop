import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NotFound } from "../../pages/NotFound";

import { Button } from "../Button";

export const SpellDetails = ({ spellList }) => {
  const { id } = useParams();
  const spell = spellList.find((p) => p._id === id);
  if (!spell) {
    return <NotFound />;
  }

  return (
    <div>
      <Link to={`/spells/${id}/edit`}>
        <Button primary>Edit</Button>
      </Link>
      <div>{spell.title}</div>
      <div>{spell.description}</div>
      <div>{spell.category}</div>
    </div>
  );
};
