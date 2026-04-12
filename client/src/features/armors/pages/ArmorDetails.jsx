import { useParams } from "react-router-dom";
import { NotFound } from "../../../app/pages/NotFound";

import { useGetArmorQuery } from "../api/armorApi";

export const ArmorDetails = () => {
  const { id } = useParams();
  const { data: armor, error, isLoading } = useGetArmorQuery(id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!armor) {
    return <NotFound />;
  }

  return (
    <div>
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
