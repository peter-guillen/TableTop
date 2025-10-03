import { createContext, useEffect, useState } from "react";
import {
  fetchWeapons,
  //   fetchWeapon,
  //   createWeapon,
  //   updateWeapon,
  deleteWeapon as apiDeleteWeapon,
} from "../api/weaponApi";

export const WeaponContext = createContext();

export const WeaponContextProvider = ({ children }) => {
  const [weaponList, setWeaponList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const weapons = await fetchWeapons();
      setWeaponList(weapons);
    };
    fetchData();
  }, []);

  const deleteWeapon = async (id) => {
    await apiDeleteWeapon(id);
    const updatedWeapons = weaponList.filter((weapon) => weapon._id !== id);
    setWeaponList(updatedWeapons);
  };

  const weaponContextData = {
    weaponList,
    deleteWeapon,
  };

  return (
    <WeaponContext.Provider value={weaponContextData}>
      {children}
    </WeaponContext.Provider>
  );
};
