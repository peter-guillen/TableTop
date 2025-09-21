import { Routes, Route } from "react-router-dom";

import { WeaponList } from "../components/WeaponList";
import { WeaponDetails } from "../components/WeaponDetails";
// import { WeaponCreate } from "./WeaponCreate";
// import { WeaponEdit } from "./WeaponEdit";

export const WeaponPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WeaponList />} />
        {/* <Route path="createWeapon" element={<WeaponCreate />} /> */}
        <Route path=":id" element={<WeaponDetails />} />
        {/* <Route path=":id/edit" element={<WeaponEdit />} /> */}
      </Routes>
    </>
  );
};
