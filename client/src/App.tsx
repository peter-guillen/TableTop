import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import { ArticleContextProvider } from "./contexts/ArticleContext";
import { AuthContextProvider } from "./contexts/AuthContext";

import { Navbar } from "./components/Navbar.tsx";
import { Register } from "./components/users/Register";
import { Login } from "./components/users/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Forbidden } from "./components/Forbidden";
import { Rules } from "./components/Rules";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ArticlePage } from "./pages/ArticlePage";
import { ProfessionPage } from "./pages/ProfessionPage";
import { SpellPage } from "./pages/SpellPage";
import { WeaponPage } from "./pages/WeaponPage";
import { ArmorPage } from "./pages/ArmorPage";
import { UserPage } from "./pages/UserPage";

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
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "EDITOR", "USER"]}>
              <ProfessionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spells/*"
          element={
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "EDITOR", "USER"]}>
              <SpellPage />
            </ProtectedRoute>
          }
        />
        <Route path="/weapons" element={<WeaponPage />} />
        <Route path="/armors" element={<ArmorPage />} />
        <Route path="/users" element={<UserPage />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider>
          <ArticleContextProvider>
            <RouterProvider router={router} />
          </ArticleContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
