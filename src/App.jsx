import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PopularMenuPage from "./pages/PopularMenuPage";
import SushiPlatterPage from "./pages/SushiPlatterPage";
import BeveragePage from "./pages/BeveragePage";
import OrderCartPage from "./pages/OrderCartPage";
import CustomerOrderPage from "./pages/CustomerOrderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/popular" element={<PopularMenuPage />} />
      <Route path="/platters" element={<SushiPlatterPage />} />
      <Route path="/beverage" element={<BeveragePage />} />
      <Route path="/cart" element={<OrderCartPage />} />
      <Route path="/orders" element={<CustomerOrderPage />} />
    </Routes>
  );
}

export default App;
