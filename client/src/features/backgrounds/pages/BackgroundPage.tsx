import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../../auth/ProtectedRoute";
import { BackgroundList } from "../components/BackgroundList";
import { BackgroundDetails } from "./BackgroundDetails";
import { BackgroundForm } from "./BackgroundForm";

export const BackgroundPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BackgroundList />} />
        <Route path=":id" element={<BackgroundDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor"]}>
              <BackgroundForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor"]}>
              <BackgroundForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
