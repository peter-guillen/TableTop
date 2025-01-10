import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const WeaponDetails = () => {
  const { weaponIndex } = useParams();
  const [weaponDetails, setWeaponDetails] = useState(null);

  const fetchWeaponDetails = async () => {
    const response = await fetch(
      `https://www.dnd5eapi.co/api/equipment/${weaponIndex}`
    );
    const data = await response.json();
    setWeaponDetails(data);
  };

  useEffect(() => {
    fetchWeaponDetails();
  }, [weaponIndex]);

  return (
    <div>
      {weaponDetails ? (
        <div>
          <h2>{weaponDetails.name}</h2>
          <p>
            <strong>Category:</strong> {weaponDetails.equipment_category.name}
          </p>
          <p>
            <strong>Weight:</strong> {weaponDetails.weight || "N/A"}
          </p>
          <p>
            <strong>Cost:</strong>{" "}
            {`${weaponDetails.cost.quantity} ${weaponDetails.cost.unit}`}
          </p>
        </div>
      ) : (
        <p>Loading weapon details...</p>
      )}
    </div>
  );
};
