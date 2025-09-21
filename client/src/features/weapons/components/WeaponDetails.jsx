import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { NotFound } from "../../../app/pages/NotFound";

import { Button } from "../../../shared/components/Button";
import { WeaponContext } from "../context/WeaponContext";

export const WeaponDetails = () => {
  const { id } = useParams();
  const { weaponList } = useContext(WeaponContext);
  const weapon = weaponList.find((p) => p._id === id);
  if (!weapon) {
    return <NotFound />;
  }

  return (
    <div>
      <Link to={`/weapons/${id}/edit`}>
        <Button primary>Edit</Button>
      </Link>
      <div className="flex justify-center">
        <div className="flex flex-col border w-1/2">
          <p>Name: {weapon.title}</p>
          <p>Description: {weapon.description}</p>
          <p>Category: {weapon.category}</p>
        </div>
      </div>
    </div>
  );
};
