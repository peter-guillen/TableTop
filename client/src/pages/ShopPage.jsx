import ShopList from "../components/shop/ShopList";
import ShopPreview from "../components/shop/ShopPreview";
import { Routes, Route } from "react-router-dom";

const ShopPage = () => {
  return (
    <>
      <div>Hello</div>
      <Routes>
        <Route path="/" element={<ShopList />} />
        <Route path="/:id" element={<ShopPreview />} />
      </Routes>
    </>
  );
};

export default ShopPage;
