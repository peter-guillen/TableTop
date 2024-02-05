import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";
import { ArticleContext } from "./contexts/ArticleContext";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import ArticlePage from "./pages/ArticlePage";
import ProfessionPage from "./pages/ProfessionPage";
import PowerPage from "./pages/PowerPage";
import WeaponPage from "./pages/WeaponPage";
import ArmorPage from "./pages/ArmorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/articles/*" element={<ArticlePage />} />
        <Route path="/professions/*" element={<ProfessionPage />} />
        <Route path="/powers" element={<PowerPage />} />
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
        <ArticleContext.Provider value="Article Context">
          <RouterProvider router={router} />
        </ArticleContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
