import { Routes, Route } from "react-router-dom";

import { ArmorList } from "../components/ArmorList";
import { ArmorDetails } from "../components/ArmorDetails";
import { ArmorForm } from "../pages/ArmorForm";
import { ProtectedRoute } from "../../../features/auth/ProtectedRoute";
// import {ArmorCreate } from "./ArmorCreate";
// import {ArmorEdit } from "./ArmorEdit";

export const ArmorPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArmorList />} />
        <Route path=":id" element={<ArmorDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={"admin"}>
              <ArmorForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
