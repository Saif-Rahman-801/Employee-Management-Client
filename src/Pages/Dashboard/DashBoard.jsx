import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import useAuth from "../../Hooks/useAuth";

const Dashboard = () => {
  const users = useUser();
  const { user } = useAuth();
  const roledUser = users.filter((data) => data?.email === user?.email);
  console.log(roledUser);
  const [main] = roledUser;
  console.log(main);

  return (
    <div className="flex justify-between">
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
            <NavLink className="px-3" to={`allUsers`}>
              Work-sheet
            </NavLink>
          </nav>
        )}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
