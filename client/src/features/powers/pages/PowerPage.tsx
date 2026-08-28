import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../../auth/ProtectedRoute";
import { PowerList } from "../components/PowerList";
import { PowerDetails } from "./PowerDetails";
import { PowerForm } from "./PowerForm";

export const PowerPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PowerList />} />
        <Route path=":id" element={<PowerDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <PowerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <PowerForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
