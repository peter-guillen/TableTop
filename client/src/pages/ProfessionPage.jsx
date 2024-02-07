import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import ProfessionList from "../components/ProfessionList";
import ProfessionDetails from "../components/ProfessionDetails";
import ProfessionCreate from "../components/ProfessionCreate";
import ProfessionEdit from "../components/ProfessionEdit";
import {
  fetchProfessions,
  createProfession,
  deleteProfession,
  updateProfession,
} from "../api/professionApi";

const ProfessionPage = () => {
  const [professionList, setProfessionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const professions = await fetchProfessions();
      setProfessionList(professions);
    };
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const newProfession = await createProfession(formData);
      setProfessionList([...professionList, newProfession]);
    } catch (error) {
      console.log("Error creating profession: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProfession(id);
      const updatedProfessionList = professionList.filter(
        (profession) => profession._id !== id
      );
      setProfessionList(updatedProfessionList);
    } catch (error) {
      console.log("Error deleting profession: ", error);
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      await updateProfession(id, formData);
      const updatedProfessionList = professionList.map((profession) =>
        profession._id === id ? { ...profession, ...formData } : profession
      );
      setProfessionList(updatedProfessionList);
    } catch (error) {
      console.log("Error: EDITING_PROFESSION: ", error);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProfessionList
              professionList={professionList}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="/createProfession"
          element={<ProfessionCreate onCreate={handleCreate} />}
        />
        <Route
          path="/:id"
          element={<ProfessionDetails professionList={professionList} />}
        />
        <Route
          path="/:id/edit"
          element={
            <ProfessionEdit
              professionList={professionList}
              onEdit={handleEdit}
            />
          }
        />
      </Routes>
    </>
  );
};

export default ProfessionPage;
