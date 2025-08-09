import React from "react";
import HomePageHeader from "../components/HomePageHeader";
import CustomerOrderBody from "../components/CustomerOrderBody";
import HomePageFooter from "../components/HomePageFooter";

const CustomerOrderPage = () => {
  return (
    <div>
      <HomePageHeader />
      <CustomerOrderBody />
      <HomePageFooter />
    </div>
  );
};

export default CustomerOrderPage;
