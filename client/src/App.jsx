import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { ThemeContext } from "./contexts/ThemeContext";
import { ArticleContextProvider } from "./contexts/ArticleContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/ArticlePage";
import ProfessionPage from "./pages/ProfessionPage";
import PowerPage from "./pages/PowerPage";
import WeaponPage from "./pages/WeaponPage";
import ArmorPage from "./pages/ArmorPage";
import Register from "./components/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articles/*" element={<ArticlePage />} />
        <Route path="/professions/*" element={<ProfessionPage />} />
        <Route path="/powers/*" element={<PowerPage />} />
        <Route path="/weapons" element={<WeaponPage />} />
        <Route path="/armors" element={<ArmorPage />} />
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
          <RouterProvider router={router} />
        </ArticleContextProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
