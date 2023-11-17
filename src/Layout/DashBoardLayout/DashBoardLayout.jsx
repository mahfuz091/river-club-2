import React, { useState } from "react";
import Header from "../../pages/Dashboard/Header/Header";
import Sidebar from "../../pages/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const DashBoardLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='padding'>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}></Header>
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        ></Sidebar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardLayout;
