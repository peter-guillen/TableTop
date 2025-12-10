import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../../../features/auth/ProtectedRoute";
import { SpellList } from "../components/SpellList";
import { SpellDetails } from "./SpellDetails";
import { SpellForm } from "./SpellForm";

export const SpellPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SpellList />} />
        <Route path=":id" element={<SpellDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <SpellForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <SpellForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
