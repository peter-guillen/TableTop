import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import { PowerList } from "../components/powers/PowerList";
import { PowerDetails } from "../components/powers/PowerDetails";
import { PowerCreate } from "../components/powers/PowerCreate";
import { PowerEdit } from "../components/powers/PowerEdit";

import {
  fetchPowers,
  createPower,
  deletePower,
  updatePower,
} from "../api/powerApi";

export const PowerPage = () => {
  const [powerList, setPowersList] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const powers = await fetchPowers();
        setPowersList(powers);
      } catch (err) {
        if (err.message === "Unauthorized") {
          navigate("/forbidden");
        } else {
        }
      }
    };
    fetchData();
  }, [navigate]);

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
      console.log(id, formData);
      await updatePower(id, formData);
      const updatedPowerList = powerList.map((power) =>
        power._id === id ? { ...power, ...formData } : power
      );
      setPowersList(updatedPowerList);
    } catch (error) {
      console.log("Error while updating:", error);
    }
  };

  const handleReorder = (newOrder) => {
    setPowersList(newOrder);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PowerList
              powerList={powerList}
              onDelete={handleDelete}
              onReorder={handleReorder}
            />
          }
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
