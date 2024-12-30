import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
import { AuthContext } from "../hooks/authFastRefreshHook";

import { SpellList } from "../components/spells/SpellList";
import { SpellDetails } from "../components/spells/SpellDetails";
import { SpellCreate } from "../components/spells/SpellCreate";
import { SpellEdit } from "../components/spells/SpellEdit";

import {
  fetchSpells,
  createSpell,
  deleteSpell,
  updateSpell,
} from "../api/spellApi";

export const SpellPage = () => {
  const [spellList, setSpellsList] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spells = await fetchSpells();
        setSpellsList(spells);
      } catch (err) {
        if (err.message === "Unauthorized") {
          navigate("/forbidden");
        } else {
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleCreate = async (formData) => {
    try {
      const newSpell = await createSpell(formData);
      setSpellsList([...spellList, newSpell]);
    } catch (error) {
      console.log("Error while creating new spell.", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteSpell(id);
    const updatedSpells = await spellList.filter((spell) => spell._id !== id);
    setSpellsList(updatedSpells);
  };

  const handleEdit = async (id, formData) => {
    try {
      console.log(id, formData);
      await updateSpell(id, formData);
      const updatedSpellList = spellList.map((spell) =>
        spell._id === id ? { ...spell, ...formData } : spell
      );
      setSpellsList(updatedSpellList);
    } catch (error) {
      console.log("Error while updating:", error);
    }
  };

  const handleReorder = (newOrder) => {
    setSpellsList(newOrder);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <SpellList
              spellList={spellList}
              onDelete={handleDelete}
              onReorder={handleReorder}
            />
          }
        />
        <Route
          path="/createSpell"
          element={<SpellCreate onCreate={handleCreate} />}
        />
        <Route path="/:id" element={<SpellDetails spellList={spellList} />} />
        <Route
          path="/:id/edit"
          element={<SpellEdit onEdit={handleEdit} spellList={spellList} />}
        />
      </Routes>
    </>
  );
};
