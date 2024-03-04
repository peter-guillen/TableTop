import { useState, useEffect } from "react";
import {
  fetchPowers,
  createPower,
  deletePower,
  updatePower,
} from "../api/powerApi";
import PowerList from "../components/powers/PowerList";
import { Routes, Route } from "react-router-dom";
import PowerDetails from "../components/powers/PowerDetails";

const Power = () => {
  const [powersList, setPowersList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const powers = await fetchPowers();
      setPowersList(powers);
    };
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const newPower = await createPower(formData);
      setPowersList([...powersList, newPower]);
    } catch (error) {
      console.log("Error while creating new power.", error);
    }
  };

  const handleDelete = async (id) => {
    await deletePower(id);
    const updatedPowers = await powersList.filter((power) => power._id !== id);
    setPowersList(updatedPowers);
  };

  const handleUpdate = async (id, formData) => {
    try {
      const updatePower = await powersList.map();
    } catch (error) {
      console.log("Error while updating:", error);
    }
  };

  return (
    <>
      <PowerList
        onDelete={handleDelete}
        onCreate={handleCreate}
        powersList={powersList}
      />
      <Routes>
        <Route path="/:id" element={<PowerDetails powersList={powersList} />} />
      </Routes>
    </>
  );
};

export default Power;
