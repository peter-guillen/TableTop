import { Route, Routes } from "react-router-dom";

import { ArticleDetails } from "../components/ArticleDetails.tsx";
import { ArticleList } from "../components/ArticleList.tsx";
import { ArticleForm } from "./ArticleForm.tsx";
import { ProtectedRoute } from "../../auth/ProtectedRoute.tsx";

export const ArticlePage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/:id" element={<ArticleDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor"]}>
              <ArticleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/edit"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor"]}>
              <ArticleForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
