import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { WeaponList } from "./WeaponList";

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

  const fetchEquipmentDeepDetails = async (url) => {
    const response = await fetch(`https://www.dnd5eapi.co${url}`);
    const data = await response.json();
    setWeaponDetails(data);
  };

  return (
    <div>
      <div>
        {weaponsList.length > 0 ? (
          weaponsList.map((weapon) => (
            <div
              key={weapon.index}
              onClick={() => fetchEquipmentDeepDetails(weapon.url)} // Pass weapon URL
              style={{ cursor: "pointer" }}
            >
              {weapon.name}
            </div>
          ))
        ) : (
          <p>Loading weapons...</p>
        )}
      </div>
      <div>
        <h3>
          <strong>Weapon Details</strong>
        </h3>
      </div>
      {weaponDetails && (
        <div>
          <p>
            <strong>Name:</strong> {weaponDetails.name}
          </p>
          <p>
            <strong>Cost:</strong> {weaponDetails.cost?.quantity}{" "}
            {weaponDetails.cost?.unit}
          </p>
          <p>
            <strong>Damage:</strong> {weaponDetails.damage?.damage_dice} (
            {weaponDetails.damage?.damage_type?.name})
          </p>
          <p>
            <strong>Weight:</strong> {weaponDetails.weight} lbs
          </p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};
