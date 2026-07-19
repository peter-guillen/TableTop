import { Route, Routes } from "react-router-dom";

import { ArticleDetails } from "../components/ArticleDetails";
import { ArticleList } from "../components/ArticleList";
import { ArticleForm } from "./ArticleForm";
import { ProtectedRoute } from "../../auth/ProtectedRoute";

export const ArticlePage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/:id" element={<ArticleDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ArticleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ArticleForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
