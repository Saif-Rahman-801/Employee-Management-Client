import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [allUsers, setAllUsers] = useState([]);
  const [main, setMain] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/users");
        setAllUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const initializeData = async () => {
      await fetchData();
      // Perform other asynchronous operations if needed
    };

    initializeData();
  }, [axiosPublic]);

  useEffect(() => {
    const getMainRole = () => {
      const mainUser = allUsers.find((data) => data?.email === user?.email);
      console.log(mainUser);
      return mainUser;
    };

    const mainUser = getMainRole();

    // Use cleanup function to set mainUser after allUsers is updated
    const cleanup = () => {
      setMain(mainUser);
    };

    // Cleanup function will be called after the first render
    return cleanup;
  }, [allUsers, user]);

  console.log(main);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/5 bg-[burlywood] h-[100px] md:min-h-screen">
        {main?.role === "employee" ? (
          <nav className="flex flex-col lg:gap-3 font-medium">
            <NavLink className="px-3 py-2" to="/">
              Home
            </NavLink>
            <NavLink className="px-3 py-2" to="/">
              Payment History
            </NavLink>
            <NavLink className="px-3 py-2" to="worksheet">
              Work-sheet
            </NavLink>
          </nav>
        ) : main?.role === "hr" ? (
          <nav className="flex flex-col lg:gap-3 font-medium">
            <NavLink className="px-3 py-2" to="/">
              Home
            </NavLink>
            <NavLink className="px-3 py-2" to="allUsers">
              Users
            </NavLink>
          </nav>
        ) : main?.role === "admin" ? (
          <nav className="flex flex-col lg:gap-3 font-medium">
            <NavLink className="px-3 py-2" to="/">
              Home
            </NavLink>
            <NavLink className="px-3 py-2" to="allEmployee">
              All Employee List
            </NavLink>
          </nav>
        ) : (
          <nav className="flex flex-col lg:gap-3 font-medium">
            <NavLink className="px-3 py-2" to="/">
              Home
            </NavLink>
            <NavLink className="px-3 py-2" to="allEmployee">
              All Employee List
            </NavLink>
          </nav>
        )}
      </div>

      <div className="lg:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
