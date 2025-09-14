import { createContext, useEffect, useState } from "react";
import {
  fetchSpells,
  createSpell,
  deleteSpell,
  updateSpell,
} from "../api/spellApi";

export const SpellContext = createContext();

export const SpellContextProvider = ({ children }) => {
  const [spellList, setSpellList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const spells = await fetchSpells();
      setSpellList(spells);
    };
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    const newSpell = await createSpell(formData);
    setSpellList([...spellList, newSpell]);
  };

  const handleDelete = async (id) => {
    await deleteSpell(id);
    const updatedSpells = await spellList.filter((spell) => spell._id !== id);
    setSpellList(updatedSpells);
  };

  const handleEdit = async (id, formData) => {
    await updateSpell(id, formData);
    const updatedSpellList = spellList.map((spell) =>
      spell._id === id ? { ...spell, ...formData } : spell
    );
    setSpellList(updatedSpellList);
  };
  const spellContextData = {
    spellList,
    handleCreate,
    handleDelete,
    handleEdit,
  };

  return (
    <SpellContext.Provider value={spellContextData}>
      {children}
    </SpellContext.Provider>
  );
};
