import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useUser from "../../Hooks/useUser";

const Dashboard = () => {

  const { user, loading, setLoading } = useAuth();
  const allUsers = useUser();
  const [main, setMain] = useState(null);

  useEffect(() => {
    const getMainRole = () => {
      // check if user is available
      if (!user) {
        setLoading(true);
      }
      if (!allUsers) {
        setLoading(true);
      }
      if (loading) {
        return <progress className="progress w-56"></progress>;
      }

      if (allUsers && user) {
        const mainEmail = allUsers.find((data) => data?.email === user?.email);
        const mainUser = allUsers.find((data) => data?._id === mainEmail?._id);
        console.log(mainUser);
        setMain(mainUser);
        return mainUser;
      }
    };

    const mainUser = getMainRole();

    // Set timeout to return a loading state after 3 seconds if the role is still undefined
    const timeoutId = setTimeout(() => {
      if (!mainUser) {
        setLoading(true);
      }
    }, 5000);

    // Clear the timeout when the component unmounts or when the role is set
    return () => clearTimeout(timeoutId);
  }, [allUsers, loading, setLoading, user]);

  /* if (!main) {
    // Main user data is not available yet, you can return a loading indicator or null
    return null;
  } */

  const role = main?.role;
  // const role = "";
  console.log(role);
  if (!role) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {role ? (
        <div className="lg:w-1/5 bg-[burlywood] h-[180px] md:min-h-screen">
          {role === "employee" ? (
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
          ) : role === "hr" ? (
            <nav className="flex flex-col lg:gap-3 font-medium">
              <NavLink className="px-3 py-2" to="/">
                Home
              </NavLink>
              <NavLink className="px-3 py-2" to="allUsers">
                Users
              </NavLink>
            </nav>
          ) : role === "admin" ? (
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
              <NavLink className="px-3 py-2" to="/">
                Payment History
              </NavLink>
              <NavLink className="px-3 py-2" to="worksheet">
                Work-sheet
              </NavLink>
              <NavLink className="px-3 py-2" to="allUsers">
                Users
              </NavLink>
              <NavLink className="px-3 py-2" to="allEmployee">
                All Employee List
              </NavLink>
            </nav>
          )}
        </div>
      ) : (
        <div className="lg:w-1/5 bg-[burlywood] h-auto md:min-h-screen">
          <nav className="flex flex-col lg:gap-3 font-medium">
            <NavLink
              className="px-3 py-2 border-b border-gray-600 block"
              to="/"
            >
              Home
            </NavLink>

            <div className="p-3">
              <h2 className="border-b mb-2 p-2 border-gray-600">
                For Employees{" "}
              </h2>
              <NavLink className="px-3 py-2 block" to="/">
                Payment History
              </NavLink>
              <NavLink className="px-3 py-2 block" to="worksheet">
                Work-sheet
              </NavLink>
            </div>

            <div className="p-3">
              <h2 className="border-b mb-2 p-2 border-gray-600">For HR </h2>
              <NavLink className="px-3 py-2 block" to="allUsers">
                Users
              </NavLink>
            </div>

            <div className="p-3">
              <h2 className="border-b mb-2 p-2 border-gray-600">For Admin</h2>
              <NavLink className="px-3 py-2 block" to="allEmployee">
                All Employee List
              </NavLink>
            </div>
          </nav>
        </div>
      )}

      <div className="lg:w-4/5">
        <div className="flex justify-center items-center">
          <h2 className="text-xl my-4 text-center font-medium">
            Welcome to the dashboard please use the sidebar to navigate
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
