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
// import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./components/Forbidden";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/ArticlePage";
import ProfessionPage from "./pages/ProfessionPage";
import PowerPage from "./pages/PowerPage";
import WeaponPage from "./pages/WeaponPage";
import ArmorPage from "./pages/ArmorPage";
import StorePage from "./pages/StorePage";
import Rules from "./components/Rules";

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
            // <ProtectedRoute roles={["ADMIN", "USER"]}>
            //   <ProfessionPage />
            // </ProtectedRoute>
            <ProfessionPage />
          }
        />
        <Route
          path="/powers/*"
          element={
            // <ProtectedRoute roles={["ADMIN"]}>
            //   <PowerPage />
            // </ProtectedRoute>
            <PowerPage />
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
      <Route path="/store/*" element={<StorePage />}></Route>
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
