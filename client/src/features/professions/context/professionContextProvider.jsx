import { useEffect, useState } from "react";
import { ProfessionContext } from "./ProfessionContext";
import {
  fetchProfessions,
  createProfession as apiCreateProfession,
  updateProfession as apiUpdateProfession,
  deleteProfession as apiDeleteProfession,
} from "../api/professionApi";

export const ProfessionContextProvider = ({ children }) => {
  const [professionList, setProfessionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const professions = await fetchProfessions();
      setProfessionList(professions);
    };
    fetchData();
  }, []);

  const createProfession = async (formData) => {
    const newProfession = await apiCreateProfession(formData);
    setProfessionList((prev) => [...prev, newProfession]);
  };

  const updateProfession = async (id, formData) => {
    await apiUpdateProfession(id, formData);
    const updatedProfessionList = professionList.map((profession) =>
      profession._id === id ? { ...profession, ...formData } : profession,
    );
    setProfessionList(updatedProfessionList);
  };

  const deleteProfession = async (id) => {
    await apiDeleteProfession(id);
    const updatedProfessions = professionList.filter(
      (profession) => profession._id !== id,
    );
    setProfessionList(updatedProfessions);
  };

  const professionContextData = {
    professionList,
    createProfession,
    updateProfession,
    deleteProfession,
  };

  return (
    <ProfessionContext.Provider value={professionContextData}>
      {children}
    </ProfessionContext.Provider>
  );
};
