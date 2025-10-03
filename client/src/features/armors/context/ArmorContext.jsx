import { createContext, useEffect, useState } from "react";
import {
  fetchArmors,
  //   fetchArmor,
  //   createArmor,
  //   updateArmor,
  deleteArmor as apiDeleteArmor,
} from "../api/armorApi";

export const ArmorContext = createContext();

export const ArmorContextProvider = ({ children }) => {
  const [armorList, setArmorList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const armors = await fetchArmors();
      setArmorList(armors);
    };
    fetchData();
  }, []);
  const deleteArmor = async (id) => {
    await apiDeleteArmor(id);
    const updatedArmors = armorList.filter((armor) => armor._id !== id);
    setArmorList(updatedArmors);
  };

  const armorContextData = {
    armorList,
    deleteArmor,
  };

  return (
    <ArmorContext.Provider value={armorContextData}>
      {children}
    </ArmorContext.Provider>
  );
};
