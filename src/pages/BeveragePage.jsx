import React from "react";
import HomePageHeader from "../components/HomePageHeader";
import BeverageBody from "../components/BeverageBody";
import HomePageFooter from "../components/HomePageFooter";

const BeveragePage = () => {
  return (
    <div>
      <HomePageHeader />
      <BeverageBody />
      <HomePageFooter />
    </div>
  );
};

export default BeveragePage;
