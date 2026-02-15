import { useEffect, useState } from "react";
import { ArmorContext } from "./ArmorContext";
import {
  fetchArmors,
  createArmor as apiCreateArmor,
  updateArmor as apiUpdateArmor,
  deleteArmor as apiDeleteArmor,
} from "../api/armorApi";

export const ArmorContextProvider = ({ children }) => {
  const [armorList, setArmorList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const armors = await fetchArmors();
      setArmorList(armors);
    };
    fetchData();
  }, []);

  const createArmor = async (formData) => {
    const newArmor = await apiCreateArmor(formData);
    setArmorList([...armorList, newArmor]);
  };

  const updateArmor = async (id, formData) => {
    await apiUpdateArmor(id, formData);
    const updatedArmorList = armorList.map((armor) =>
      armor._id === id ? { ...armor, ...formData } : armor,
    );
    setArmorList(updatedArmorList);
  };

  const deleteArmor = async (id) => {
    await apiDeleteArmor(id);
    const updatedArmors = armorList.filter((armor) => armor._id !== id);
    setArmorList(updatedArmors);
  };

  const armorContextData = {
    armorList,
    createArmor,
    updateArmor,
    deleteArmor,
  };

  return (
    <ArmorContext.Provider value={armorContextData}>
      {children}
    </ArmorContext.Provider>
  );
};
