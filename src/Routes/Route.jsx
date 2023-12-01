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
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "worksheet",
        element: (
          <PrivateRoute>
            <WorkSheet />
          </PrivateRoute>
        ),
      },
      {
        path: "allEmployee",
        element: (
          <PrivateRoute>
            <AllEmployee />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
