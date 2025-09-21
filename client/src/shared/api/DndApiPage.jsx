import { Routes, Route } from "react-router-dom";

import { SpellApiDnd } from "./SpellApiDnd";
import { SpellDetailsDnd } from "./SpellDetailsDnd";

export const DndApiPage = () => {
  return (
    <>
      <Routes>
        <Route path="dndSpell" element={<SpellApiDnd />} />
        <Route path="dndSpell/:index" element={<SpellDetailsDnd />} />
      </Routes>
    </>
  );
};
