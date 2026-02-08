import { useEffect, useState } from "react";
import { WeaponContext } from "./WeaponContext";
import {
  fetchWeapons,
  createWeapon as apiCreateWeapon,
  updateWeapon as apiUpdateWeapon,
  deleteWeapon as apiDeleteWeapon,
} from "../api/weaponApi";

export const WeaponContextProvider = ({ children }) => {
  const [weaponList, setWeaponList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const weapons = await fetchWeapons();
      setWeaponList(weapons);
    };
    fetchData();
  }, []);

  const createWeapon = async (formData) => {
    const newWeapon = await apiCreateWeapon(formData);
    setWeaponList((prev) => [...prev, newWeapon]);
  };

  const updateWeapon = async (id, formData) => {
    await apiUpdateWeapon(id, formData);
    const updatedWeaponList = weaponList.map((weapon) =>
      weapon._id === id ? { ...weapon, ...formData } : weapon
    );
    setWeaponList(updatedWeaponList);
  };

  const deleteWeapon = async (id) => {
    await apiDeleteWeapon(id);
    const updatedWeapons = weaponList.filter((weapon) => weapon._id !== id);
    setWeaponList(updatedWeapons);
  };

  const weaponContextData = {
    weaponList,
    createWeapon,
    updateWeapon,
    deleteWeapon,
  };

  return (
    <WeaponContext.Provider value={weaponContextData}>
      {children}
    </WeaponContext.Provider>
  );
};
