import { Routes, Route, Link } from "react-router-dom";

import { SpellList } from "../components/SpellList";
import { SpellDetails } from "../components/SpellDetails";
import { SpellCreate } from "./SpellCreate";
import { SpellEdit } from "./SpellEdit";
import { SpellApiDnd } from "../api/SpellApiDnd";
import { SpellDetailsDnd } from "../api/SpellDetailsDnd";

import { NewSpellPage } from "./NewSpellPage";
import { Button } from "../../../shared/components/Button";
import { SpellPreview } from "../components/SpellPreview";

export const SpellPage = () => {
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
        <Route path="customSpell" element={<SpellList />} />
        <Route path="createSpell" element={<SpellCreate />} />
        <Route path="spells/:id" element={<SpellDetails />} />
        <Route path="dndSpell" element={<SpellApiDnd />} />
        <Route path="dndSpell/:index" element={<SpellDetailsDnd />} />
        <Route path=":id/edit" element={<SpellEdit />} />
        <Route path="spellPreview" element={<SpellPreview />} />
        <Route path="/" element={<NewSpellPage />} />
      </Routes>
    </>
  );
};
