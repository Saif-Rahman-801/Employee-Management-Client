import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Layouts/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Authentications/Registration/Register";
import Login from "../Pages/Authentications/Login/Login";
import DashBoard from "../Pages/Dashboard/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        }
    ]
  },
  {
    path: "/dasboard/:email",
    element: <DashBoard />
  }
]);

export default router;