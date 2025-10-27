import { Routes, Route } from "react-router-dom";

import { SpellList } from "../components/SpellList";
import { SpellDetails } from "./SpellDetails";
import { SpellForm } from "./SpellForm";

export const SpellPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SpellList />} />
        <Route path="create" element={<SpellForm />} />
        <Route path=":id" element={<SpellDetails />} />
        <Route path=":id/edit" element={<SpellForm />} />
      </Routes>
    </>
  );
};
