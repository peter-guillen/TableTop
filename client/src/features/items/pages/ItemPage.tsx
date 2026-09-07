import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../../auth/ProtectedRoute";
import { ItemList } from "../components/ItemList";
import { ItemDetails } from "./ItemDetails";
import { ItemForm } from "./ItemForm";

export const ItemPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path=":id" element={<ItemDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ItemForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ItemForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
