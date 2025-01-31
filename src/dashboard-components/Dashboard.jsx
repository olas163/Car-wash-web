import React from "react";
import DashHeader from "./DashHeader";
import SideBar from "./SideBar";

function Dashboard() {
  return (
    <div className="min-h-screen pt">
      <DashHeader />
      <SideBar />
      {/* <ItemPrices/> */}
    </div>
  );
}

export default Dashboard;
