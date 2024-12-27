import { Routes, Route, Link } from "react-router-dom";

import ShopList from "../components/shop/ShopList";
import ShopPreview from "../components/shop/ShopPreview";
import Button from "../components/Button";

const ShopPage = () => {
  return (
    <>
      <div className="text-center ">
        <h1 className="text-5xl">UNDER CONSTRUCTION</h1>
        <h2 className="text-xl">
          Please be careful when exploring this area. There are hazardous heavy
          objects above and deadly sharp objects below.
        </h2>
        <Routes>
          <Route path="/" element={<ShopList />} />
          <Route path="/:id" element={<ShopPreview />} />
        </Routes>
      </div>
      <Link to="/">
        <Button primary>Home</Button>
      </Link>
    </>
  );
};

export default ShopPage;
