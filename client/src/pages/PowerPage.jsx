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
import PowerCreate from "../components/powers/PowerCreate";
import PowerEdit from "../components/powers/PowerEdit";

const Power = () => {
  const [powerList, setPowersList] = useState([]);

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
      setPowersList([...powerList, newPower]);
    } catch (error) {
      console.log("Error while creating new power.", error);
    }
  };

  const handleDelete = async (id) => {
    await deletePower(id);
    const updatedPowers = await powerList.filter((power) => power._id !== id);
    setPowersList(updatedPowers);
  };

  const handleEdit = async (id, formData) => {
    try {
      await updatePower(id, formData);
      const updatedPowerList = await powerList.map((power) =>
        power._id === id ? { ...power, ...formData } : power
      );
      setPowersList(updatedPowerList);
    } catch (error) {
      console.log("Error while updating:", error);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<PowerList powerList={powerList} onDelete={handleDelete} />}
        />
        <Route
          path="/createPower"
          element={<PowerCreate onCreate={handleCreate} />}
        />
        <Route path="/:id" element={<PowerDetails powerList={powerList} />} />
        <Route
          path="/:id/edit"
          element={<PowerEdit onEdit={handleEdit} powerList={powerList} />}
        />
      </Routes>
    </>
  );
};

export default Power;
