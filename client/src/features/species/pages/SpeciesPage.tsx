import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../../auth/ProtectedRoute";
import { SpeciesList } from "../components/SpeciesList";
import { SpeciesDetails } from "./SpeciesDetails";
import { SpeciesForm } from "./SpeciesForm";

export const SpeciesPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SpeciesList />} />
        <Route path=":id" element={<SpeciesDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor"]}>
              <SpeciesForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor"]}>
              <SpeciesForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
