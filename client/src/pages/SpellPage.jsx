import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";

import { SpellList } from "../components/spells/SpellList";
import { SpellDetails } from "../components/spells/SpellDetails";
import { SpellCreate } from "../components/spells/SpellCreate";
import { SpellEdit } from "../components/spells/SpellEdit";
import { SpellApiDnd } from "../components/spells/SpellApiDnd";
import { SpellDetailsDnd } from "../components/spells/SpellDetailsDnd";

import {
  fetchSpells,
  createSpell,
  deleteSpell,
  updateSpell,
} from "../api/spellApi";
import { Button } from "../components/Button";

export const SpellPage = () => {
  const [spellList, setSpellsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const spells = await fetchSpells();
      setSpellsList(spells);
    };
    fetchData();
  }, [navigate]);

  const handleCreate = async (formData) => {
    const newSpell = await createSpell(formData);
    setSpellsList([...spellList, newSpell]);
  };

  const handleDelete = async (id) => {
    await deleteSpell(id);
    const updatedSpells = await spellList.filter((spell) => spell._id !== id);
    setSpellsList(updatedSpells);
  };

  const handleEdit = async (id, formData) => {
    await updateSpell(id, formData);
    const updatedSpellList = spellList.map((spell) =>
      spell._id === id ? { ...spell, ...formData } : spell
    );
    setSpellsList(updatedSpellList);
  };

  const handleReorder = (newOrder) => {
    setSpellsList(newOrder);
  };

  return (
    <>
      <div className="flex justify-center space-x-4">
        <Link to="customSpell">
          <Button secondary>Custom Spells</Button>
        </Link>
        <Link to="dndSpell">
          <Button success>Dnd Spells</Button>
        </Link>
      </div>
      <Routes>
        <Route
          path="/customSpell"
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

        <Route path="/dndSpell" element={<SpellApiDnd />} />
        <Route path="/spells/:index" element={<SpellDetailsDnd />} />
        <Route
          path="/:id/edit"
          element={<SpellEdit onEdit={handleEdit} spellList={spellList} />}
        />
        <Route path="/:id" element={<SpellDetails spellList={spellList} />} />
      </Routes>
    </>
  );
};
