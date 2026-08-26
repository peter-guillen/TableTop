import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../../auth/ProtectedRoute";
import { CharacterList } from "../components/CharacterList.tsx";
import { CharacterDetails } from "../components/CharacterDetails.tsx";
import { CharacterForm } from "./CharacterForm.tsx";

export const CharacterPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path=":id" element={<CharacterDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CharacterForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CharacterForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
