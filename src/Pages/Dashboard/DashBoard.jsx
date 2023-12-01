import { NavLink, Outlet } from "react-router-dom";
// import useUser from "../../Hooks/useUser";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";

const Dashboard = () => {
  const users = useUser();
  const { user } = useAuth();
  const roledUser = users.filter((data) => data?.email === user?.email);
  console.log(roledUser);
  const [main] = roledUser;
  console.log(main);
  console.log(users);

  return (
    <div className="flex">
      <div className="w-[20%] bg-[burlywood] h-[100vh]">
        {main?.role === "admin" ? (
          <nav className="flex flex-col gap-3 font-medium">
            <NavLink className="px-3 pt-3" to={`/`}>
              Home
            </NavLink>
            <NavLink className="px-3 pt-3" to={`/`}>
              All employee list
            </NavLink>
          </nav>
        ) : main?.role === "hr" ? (
          <nav className="flex flex-col gap-3 font-medium">
            <NavLink className="px-3 pt-3" to={`/`}>
              Home
            </NavLink>
            <NavLink className="px-3" to={`allUsers`}>
              Users
            </NavLink>
          </nav>
        ) : (
          <nav className="flex flex-col gap-3 font-medium">
            <NavLink className="px-3 pt-3" to={`/`}>
              Payment History
            </NavLink>
            <NavLink className="px-3" to={`worksheet`}>
              Work-sheet
            </NavLink>
          </nav>
        )}
      </div>

      <div className="w-[80%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
