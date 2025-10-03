import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NotFound } from "../../../app/pages/NotFound";

import { Button } from "../../../shared/components/Button";
import { ArmorContext } from "../context/ArmorContext";

export const ArmorDetails = () => {
  const { id } = useParams();
  const { armorList } = useContext(ArmorContext);
  const armor = armorList.find((p) => p._id === id);
  if (!armor) {
    return <NotFound />;
  }

  return (
    <div>
      <Link to={`/armors/${id}/edit`}>
        <Button primary>Edit</Button>
      </Link>
      <div className="flex justify-center">
        <div className="flex flex-col border w-1/2">
          <p>Name: {armor.title}</p>
          <p>Description: {armor.description}</p>
          <p>Category: {armor.category}</p>
        </div>
      </div>
    </div>
  );
};
