import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ThemeContextProvider } from "./contexts/ThemeContext";
import { AuthContextProvider } from "../features/auth/context/AuthContextProvider";
import { ArticleContextProvider } from "../features/articles/context/ArticleContext";
import { SpellContextProvider } from "../features/spells/context/SpellContextProvider";
import { WeaponContextProvider } from "../features/weapons/context/WeaponContextProvider";
import { ArmorContextProvider } from "../features/armors/context/ArmorContext";

import { Navbar } from "./layouts/Navbar";
import { Register } from "../app/pages/Register";
import { Login } from "../app/pages/Login";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { Forbidden } from "../app/pages/Forbidden";
import { Rules } from "../app/pages/Rules";
import { CharacterBuilder } from "../app/pages/CharacterBuilder";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ArticlePage } from "../features/articles/pages/ArticlePage";
import { ProfessionPage } from "../features/professions/pages/ProfessionPage";
import { SpellPage } from "../features/spells/pages/SpellPage";
import { WeaponPage } from "../features/weapons/pages/WeaponPage";
import { ArmorPage } from "../features/armors/pages/ArmorPage";
import { UserPage } from "../features/users/pages/UserPage";
import { AdminPage } from "../features/admin/pages/AdminPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/builder" element={<CharacterBuilder />}></Route>
        <Route path="/articles/*" element={<ArticlePage />} />
        <Route
          path="/professions/*"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ProfessionPage />
            </ProtectedRoute>
          }
        />
        <Route path="/spells/*" element={<SpellPage />} />
        <Route path="/weapons/*" element={<WeaponPage />} />
        <Route path="/armors/*" element={<ArmorPage />} />
        <Route path="/users/*" element={<UserPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  { future: { v7_fetcherPersist: true } }
);

function App() {
  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider>
          <ArticleContextProvider>
            <SpellContextProvider>
              <WeaponContextProvider>
                <ArmorContextProvider>
                  <RouterProvider
                    router={router}
                    future={{ v7_startTransition: true }}
                  />
                </ArmorContextProvider>
              </WeaponContextProvider>
            </SpellContextProvider>
          </ArticleContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
