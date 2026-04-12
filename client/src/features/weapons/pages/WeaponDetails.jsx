import { useParams } from "react-router-dom";
import { NotFound } from "../../../app/pages/NotFound";

import { useGetWeaponQuery } from "../api/weaponApi";

export const WeaponDetails = () => {
  const { id } = useParams();
  const { data: weapon, error, isLoading } = useGetWeaponQuery(id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!weapon) {
    return <NotFound />;
  }

  return (
    <div>
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
