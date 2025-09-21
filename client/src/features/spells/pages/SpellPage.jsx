import { Routes, Route } from "react-router-dom";

import { SpellList } from "../components/SpellList";
import { SpellDetails } from "../components/SpellDetails";
import { SpellCreate } from "./SpellCreate";
import { SpellEdit } from "./SpellEdit";

export const SpellPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SpellList />} />
        <Route path="createSpell" element={<SpellCreate />} />
        <Route path=":id" element={<SpellDetails />} />
        <Route path=":id/edit" element={<SpellEdit />} />
      </Routes>
    </>
  );
};
