import { Route, Routes } from "react-router-dom";

import { AdminArticleList } from "../components/AdminArticleList";
import { ArticleDetails } from "../components/ArticleDetails";
import { ArticleList } from "../components/ArticleList";
import { AdminArticleCreate } from "./AdminArticleCreate";
import { AdminArticleEdit } from "./AdminArticleEdit";
import { NewFormPage } from "./NewFormPage";
import Demo from "./FormTemplate";
import CharacterCreator from "./CharacterForm";
import { SpellForm } from "../../spells/pages/SpellForm";
import { WeaponForm } from "./WeaponForm";
// import { SpellDetails } from "./SpellDetails";

export const ArticlePage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/adminArticleList" element={<AdminArticleList />} />
        <Route path="/createArticle" element={<AdminArticleEdit />} />
        <Route path="/:id" element={<ArticleDetails />} />
        {/* <Route path="/:id/edit" element={<AdminArticleEdit />} /> */}
        <Route path="/newForm" element={<NewFormPage />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/charSheet" element={<CharacterCreator />} />
        {/* <Route path="/createSpell" element={<SpellForm />} /> */}
        {/* <Route path="/:id/edit" element={<SpellForm />} /> */}
        {/* <Route path="/spellDetails" element={<SpellDetails />} /> */}
        {/* <Route path="/spellModal" element={<QuickSpellModal />} /> */}
        <Route path="/weaponForm" element={<WeaponForm />} />
      </Routes>
    </>
  );
};
