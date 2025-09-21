import { createContext, useEffect, useState } from "react";
import {
  fetchWeapons,
  //   fetchWeapon,
  //   createWeapon,
  //   updateWeapon,
  //   removeWeapon,
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

  const weaponContextData = {
    weaponList,
  };

  return (
    <WeaponContext.Provider value={weaponContextData}>
      {children}
    </WeaponContext.Provider>
  );
};
