import { Routes, Route } from "react-router-dom";

import { ArmorList } from "../components/ArmorList";
import { ArmorDetails } from "../components/ArmorDetails";
// import {ArmorCreate } from "./ArmorCreate";
// import {ArmorEdit } from "./ArmorEdit";

export const ArmorPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArmorList />} />
        {/* <Route path="createArmor" element={<ArmorCreate />} /> */}
        <Route path=":id" element={<ArmorDetails />} />
        {/* <Route path=":id/edit" element={<ArmorEdit />} /> */}
      </Routes>
    </>
  );
};
