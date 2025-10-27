import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NotFound } from "../../../app/pages/NotFound";

import { Button } from "../../../shared/components/Button";
import { SpellContext } from "../context/SpellContext";

export const SpellDetails = () => {
  const { id } = useParams();
  const { spellList } = useContext(SpellContext);
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
