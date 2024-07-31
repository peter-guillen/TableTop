import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ThemeContext } from "./contexts/ThemeContext";
import ArticleContextProvider from "./contexts/ArticleContext";
import AuthContextProvider from "./contexts/AuthContext";

import Navbar from "./components/Navbar";
import Register from "./components/users/Register";
import Login from "./components/users/Login";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/ArticlePage";
import ProfessionPage from "./pages/ProfessionPage";
import PowerPage from "./pages/PowerPage";
import WeaponPage from "./pages/WeaponPage";
import ArmorPage from "./pages/ArmorPage";
import Rules from "./components/Rules";

import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./components/Forbidden";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/articles/*" element={<ArticlePage />} />
        <Route
          path="/professions/*"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <ProfessionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/powers/*"
          element={
            <ProtectedRoute roles={["admin"]}>
              <PowerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weapons"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <WeaponPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/armors"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <ArmorPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <ThemeContext.Provider value="Hello from Theme Context">
        <ArticleContextProvider>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </ArticleContextProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
