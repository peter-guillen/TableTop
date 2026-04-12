import { Routes, Route } from "react-router-dom";

import { WeaponList } from "../components/WeaponList";
import { WeaponDetails } from "../pages/WeaponDetails";
import { WeaponForm } from "../pages/WeaponForm";
import { ProtectedRoute } from "../../../features/auth/ProtectedRoute";
import { SearchBar } from "../../admin/components/SearchBar";

export const WeaponPage = () => {
  return (
    <>
      <SearchBar>Search Here</SearchBar>
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
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <WeaponForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
