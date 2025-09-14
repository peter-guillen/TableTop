import { useState, useEffect } from "react";
import { Button } from "../../../shared/components/Button";
import { NewSpellPage } from "../../../features/spells/pages/NewSpellPage";

export const WeaponPage = () => {
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

  const fetchEquipmentDeepDetails = async (url) => {
    console.log(url);
    const response = await fetch(`https://www.dnd5eapi.co${url}`);
    const data = await response.json();
    console.log(data);
    setItemDetails(data);
  };

  return (
    <>
      <div>
        {/* <WeaponList />
      <WeaponDetails /> */}
        <div className="flex flex-wrap justify-center">
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
        </div>

        <div className="flex flex-col-2 justify-center">
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
            {itemDetails && (
              <div>
                <p>
                  <strong>Name:</strong> {itemDetails.name}
                </p>
                <p>
                  <strong>Cost:</strong> {itemDetails.cost?.quantity}
                  {itemDetails.cost?.unit}
                </p>
                <p>
                  <strong>Damage:</strong> {itemDetails.damage?.damage_dice} (
                  {itemDetails.damage?.damage_type?.name})
                </p>
                <p>
                  <strong>Weight:</strong> {itemDetails.weight} lbs
                </p>
                {/* Add more details as needed */}
              </div>
            )}
          </div>
        </div>
      </div>
      <NewSpellPage />
    </>
  );
};
