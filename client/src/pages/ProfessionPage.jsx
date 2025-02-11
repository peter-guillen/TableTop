import { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../hooks/authFastRefreshHook";

import { ProfessionList } from "../components/professions/ProfessionList";
import { ProfessionDetails } from "../components/professions/ProfessionDetails";
import { ProfessionCreate } from "../components/professions/ProfessionCreate.tsx";
import { ProfessionEdit } from "../components/professions/ProfessionEdit";

import {
  fetchProfessions,
  createProfession,
  deleteProfession,
  updateProfession,
} from "../api/professionApi";

import { Button } from "../components/Button";

export const ProfessionPage = () => {
  const [professionList, setProfessionList] = useState([]);
  const { currentUser } = useContext(AuthContext);

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
      console.log("Error editing profession: ", error);
    }
  };

  return (
    <>
      <Link to={`/professions/createProfession`}>
        <Button primary>Create a Profession!</Button>
      </Link>

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
