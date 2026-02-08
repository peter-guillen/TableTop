import { Routes, Route } from "react-router-dom";

import { WeaponList } from "../components/WeaponList";
import { WeaponDetails } from "../components/WeaponDetails";
import { WeaponForm } from "../pages/WeaponForm";
import { ItemCardDemo } from "../components/WeaponListTest";
import { ProtectedRoute } from "../../../features/auth/ProtectedRoute";
// import { WeaponCreate } from "./WeaponCreate";
// import { WeaponEdit } from "./WeaponEdit";

export const WeaponPage = () => {
  return (
    <>
      {/* <ItemCardDemo /> */}
      <Routes>
        <Route path="/" element={<WeaponList />} />
        <Route path=":id" element={<WeaponDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <WeaponForm />
            </ProtectedRoute>
          }
        />
        {/* <Route path=":id/edit" element={<WeaponEdit />} /> */}
      </Routes>
    </>
  );
};
