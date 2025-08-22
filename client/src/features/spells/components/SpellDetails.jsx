import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NotFound } from "../../../app/pages/NotFound";

import { Button } from "../../../shared/components/Button";

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
      <div className="flex justify-center">
        <div className="flex flex-col border w-1/2">
          <p>Name: {spell.title}</p>
          <p>Description: {spell.description}</p>
          <p>Category: {spell.category}</p>
        </div>
      </div>
    </div>
  );
};
