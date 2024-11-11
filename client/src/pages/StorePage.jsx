import StoreList from "../components/store/StoreList";
import StorePreview from "../components/store/storePreview";
import { Routes, Route } from "react-router-dom";

const StorePage = () => {
  return (
    <>
      <div>Hello</div>
      <Routes>
        <Route path="/" element={<StoreList />} />
        <Route path="/:id" element={<StorePreview />} />
      </Routes>
    </>
  );
};

export default StorePage;
