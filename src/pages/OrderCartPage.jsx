import React from "react";
import HomePageHeader from "../components/HomePageHeader";
import OrderCartBody from "../components/OrderCartBody";
import HomePageFooter from "../components/HomePageFooter";

const OrderCartPage = () => {
  return (
    <div>
      <HomePageHeader />
      <OrderCartBody />
      <HomePageFooter />
    </div>
  );
};

export default OrderCartPage;
