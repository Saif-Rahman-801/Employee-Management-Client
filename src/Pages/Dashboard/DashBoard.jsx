import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Dashboard = () => {
  /* const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [allUsers, setAllUsers] = useState([]);
  const [main, setMain] = useState(null);

  // const findAdmin = allUsers.find((usr) => usr.email === user.email);

  // console.log(findAdmin,findAdmin?._id);
  // const admin = allUsers.find((usr) => usr._id === findAdmin?._id)
  // const role = admin.role
  // console.log(role);

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
      const mainEmail = allUsers.find((data) => data?.email === user?.email);
      const mainUser = allUsers.find((data) => data?._id === mainEmail?._id);
      // console.log(mainUser);
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

  console.log(main, main?.role);
  const role = main?.role;
  console.log(role); */

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
    };

    initializeData();
  }, [axiosPublic]);

  useEffect(() => {
    const getMainRole = () => {
      // check if user is available
      const mainEmail = allUsers.find((data) => data?.email === user?.email);
      const mainUser = allUsers.find((data) => data?._id === mainEmail?._id);
      return mainUser;
    };

    const mainUser = getMainRole();

    const cleanup = () => {
      setMain(mainUser);
    };

    return cleanup;
  }, [allUsers, user]);

  if (!main) {
    // Main user data is not available yet, you can return a loading indicator or null
    return null;
  }

  const role = main?.role;
  console.log(role)

  return (
    <div className="flex flex-col lg:flex-row">
      {role ? (
        <div className="lg:w-1/5 bg-[burlywood] h-[150px] md:min-h-screen">
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
