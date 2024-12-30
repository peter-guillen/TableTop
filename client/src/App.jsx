import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ThemeContextProvider } from "./contexts/ThemeContext";
import { ArticleContextProvider } from "./contexts/ArticleContext";
import { AuthContextProvider } from "./contexts/AuthContext";

import { Navbar } from "./components/Navbar";
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
import { ShopPage } from "./pages/ShopPage";

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
            <ProtectedRoute roles={["ADMIN", "MODERATOR", "USER"]}>
              <ProfessionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spells/*"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <SpellPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weapons"
          element={
            // <ProtectedRoute roles={["ADMIN", "USER"]}>
            //   <WeaponPage />
            // </ProtectedRoute>
            <WeaponPage />
          }
        />
        <Route
          path="/armors"
          element={
            // <ProtectedRoute roles={["ADMIN", "USER"]}>
            //   <ArmorPage />
            // </ProtectedRoute>
            <ArmorPage />
          }
        />
      </Route>
      <Route path="/shop/*" element={<ShopPage />}></Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider value="Hello from Theme Context">
          <ArticleContextProvider>
            <RouterProvider router={router} />
          </ArticleContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
