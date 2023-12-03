import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Layouts/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentications/Registration/Register";
import Login from "../Pages/Authentications/Login/Login";
import DashBoard from "../Pages/Dashboard/DashBoard";
import Users from "../Pages/Dashboard/Users";
import WorkSheet from "../Pages/Dashboard/Employee/WorkSheet";
import ContactUs from "../Pages/ContactUs";
import PrivateRoute from "./PrivateRoute";
import AllEmployee from "../Pages/Dashboard/Admin/AllEmployee";
import AdminRoutes from "./AdminRoutes";
import HrRoutes from "./HrRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import Details from "../Pages/Dashboard/Details";
import PaymentHistory from "../Pages/Dashboard/Employee/PaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/:id",
        element: (
          <HrRoutes>
            <Details />
          </HrRoutes>
        ),
      },
    ],
  },
  {
    path: "/dasboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "allUsers",
        element: (
          <HrRoutes>
            <Users />
          </HrRoutes>
        ),
      },
      {
        path: "payment",
        element: <EmployeeRoutes>
        <PaymentHistory />
        </EmployeeRoutes>
      },
      {
        path: "worksheet",
        element: (
          <EmployeeRoutes>
            <WorkSheet />
          </EmployeeRoutes>
        ),
      },
      {
        path: "allEmployee",
        element: (
          <AdminRoutes>
            <AllEmployee />
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
