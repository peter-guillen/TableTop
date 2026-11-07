import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ThemeContextProvider } from "./contexts/ThemeContext.tsx";

import { Navbar } from "./layouts/Navbar";
import { Register } from "./pages/Register.tsx";
import { Login } from "./pages/Login.tsx";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { Forbidden } from "../app/pages/Forbidden";
import { About } from "../app/pages/About.tsx";
import { Rules } from "../features/playerTools/components/Rules";
import { CharacterPage } from "../features/characters/pages/CharacterPage.tsx";

import { Home } from "./pages/Home.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { ArticlePage } from "../features/articles/pages/ArticlePage";
import { ItemPage } from "../features/items/pages/ItemPage.tsx";
import { ProfessionPage } from "../features/professions/pages/ProfessionPage";
import { SpeciesPage } from "../features/species/pages/SpeciesPage.tsx";
import { BackgroundPage } from "../features/backgrounds/pages/BackgroundPage.tsx";
import { PowerPage } from "../features/powers/pages/PowerPage.tsx";
import { UserPage } from "../features/users/pages/UserPage.tsx";
import { AdminPage } from "../features/admin/pages/AdminPage.tsx";
import { QuickActions } from "./pages/QuickActions.tsx";
import { useGetConstantsQuery } from "../shared/constants/api/constantsApi.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roles={["admin", "moderator"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute roles={["admin", "moderator", "editor"]}>
              <QuickActions />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/characters/*" element={<CharacterPage />} />
        <Route path="/articles/*" element={<ArticlePage />} />
        <Route path="/items/*" element={<ItemPage />} />
        <Route path="/powers/*" element={<PowerPage />} />
        <Route path="/professions/*" element={<ProfessionPage />} />
        <Route path="/species/*" element={<SpeciesPage />} />
        <Route path="/backgrounds/*" element={<BackgroundPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
  { future: { v7_fetcherPersist: true } },
);

function App() {
  useGetConstantsQuery();
  return (
    <>
      <ThemeContextProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </ThemeContextProvider>
    </>
  );
}

export default App;
