import { useEffect, useState } from "react";
import { SpellContext } from "./SpellContext";
import {
  fetchSpells,
  createSpell as apiCreateSpell,
  updateSpell as apiUpdateSpell,
  deleteSpell as apiDeleteSpell,
} from "../api/spellApi";

export const SpellContextProvider = ({ children }) => {
  const [spellList, setSpellList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const spells = await fetchSpells();
      setSpellList(spells);
    };
    fetchData();
  }, []);

  const createSpell = async (formData) => {
    const newSpell = await apiCreateSpell(formData);
    setSpellList((prev) => [...prev, newSpell]);
  };

  const updateSpell = async (id, formData) => {
    await apiUpdateSpell(id, formData);
    const updatedSpellList = spellList.map((spell) =>
      spell._id === id ? { ...spell, ...formData } : spell
    );
    setSpellList(updatedSpellList);
  };

  const deleteSpell = async (id) => {
    await apiDeleteSpell(id);
    const updatedSpells = spellList.filter((spell) => spell._id !== id);
    setSpellList(updatedSpells);
  };

  const spellContextData = {
    spellList,
    createSpell,
    updateSpell,
    deleteSpell,
  };

  return (
    <SpellContext.Provider value={spellContextData}>
      {children}
    </SpellContext.Provider>
  );
};
