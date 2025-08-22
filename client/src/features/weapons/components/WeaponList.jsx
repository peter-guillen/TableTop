import { useState, useEffect } from "react";
import { Button } from "../Button";

export const WeaponList = () => {
  const [weaponsList, setWeaponsList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(
    "simple-melee-weapons"
  );

  const [itemDetails, setItemDetails] = useState(null);

  const fetchEquipmentDetails = async (category) => {
    const response = await fetch(
      `https://www.dnd5eapi.co/api/equipment-categories/${category}`
    );
    const data = await response.json();
    setWeaponsList(data.equipment || []);
  };

  useEffect(() => {
    fetchEquipmentDetails(currentCategory);
  }, [currentCategory]);
  return (
    <div>
      <div>
        <Button
          onClick={() => setCurrentCategory("simple-melee-weapons")}
          primary
        >
          Simple Melee
        </Button>
        <Button
          onClick={() => setCurrentCategory("martial-melee-weapons")}
          danger
        >
          Martial Melee
        </Button>
        <Button
          onClick={() => setCurrentCategory("simple-ranged-weapons")}
          success
        >
          Simple Ranged
        </Button>
        <Button
          onClick={() => setCurrentCategory("martial-ranged-weapons")}
          warning
        >
          Martial Ranged
        </Button>
      </div>
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
    </div>
  );
};
