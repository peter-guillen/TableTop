import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../../auth/ProtectedRoute";
import { CharacterList } from "../components/CharacterList.tsx";
import { CharacterDetails } from "../components/CharacterDetails.tsx";
import { CharacterForm } from "./CharacterForm.tsx";

export const CharacterPage = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor", "user"]}>
              <CharacterList />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor", "user"]}>
              <CharacterDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor", "user"]}>
              <CharacterForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor", "user"]}>
              <CharacterForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
