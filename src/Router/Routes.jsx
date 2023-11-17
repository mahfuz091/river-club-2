import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import MainMenu from "../pages/Dashboard/MainMenu/MainMenu";
import PreviousOrder from "../pages/Dashboard/PreviousOrder/PreviousOrder";

import PrintHiostory from "../pages/Dashboard/PrintHistory/PrintHiostory";
import Customer from "../pages/Dashboard/Customer/Customer";
import Setting from "../pages/Dashboard/Setting/Setting";
import Login from "../pages/Login/Login";
import Login2 from "../pages/Login/Login2";
import PrivetRoute from "../pages/PrivetRoute/PrivetRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivetRoute> <DashBoardLayout /></PrivetRoute>,
    children: [
      {
        path: "/",
        element: <MainMenu></MainMenu>,
      },
      {
        path: "mainmenu",
        element: <MainMenu></MainMenu>,
      },
      {
        path: "previousOrder",
        element: <PreviousOrder></PreviousOrder>,
      },
      {
        path: "print",
        element: <PrintHiostory></PrintHiostory>,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "login2",
    element: <Login2 />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
