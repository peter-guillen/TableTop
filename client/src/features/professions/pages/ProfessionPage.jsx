import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../../../features/auth/ProtectedRoute.js";
import { ProfessionList } from "../components/ProfessionList";
import { ProfessionDetails } from "../components/ProfessionDetails";
import { ProfessionForm } from "./ProfessionForm";

export const ProfessionPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProfessionList />} />
        <Route path=":id" element={<ProfessionDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ProfessionForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ProfessionForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
