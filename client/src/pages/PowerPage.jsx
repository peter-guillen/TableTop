import { useState, useEffect } from "react";
import {
  fetchPowers,
  createPower,
  deletePower,
  updatePower,
} from "../api/powerApi";
import PowerList from "../components/PowerList";

const Power = () => {
  const [powersList, setPowersList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const powers = await fetchPowers();
      setPowersList(powers);
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    await createPower();
    const updatedPowers = await powersList.map((power) => power);
    setPowersList(updatedPowers);
  };

  const handleDelete = async (id) => {
    await deletePower(id);
    const updatedPowers = await powersList.filter((power) => power._id !== id);
    setPowersList(updatedPowers);
  };

  return (
    <>
      <PowerList
        onDelete={handleDelete}
        onCreate={handleCreate}
        powersList={powersList}
      />
    </>
  );
};

export default Power;
