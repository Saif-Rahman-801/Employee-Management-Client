import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";

const Dashboard = () => {
  const users = useUser();
  const { user } = useAuth();
  const roledUser = users.filter((data) => data?.email === user?.email);
  const [main] = roledUser;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/5 bg-[burlywood] h-[100px] md:min-h-screen">
        <nav className="flex flex-col lg:gap-3 font-medium">
          <NavLink className="px-3 py-2" to="/">
            Home
          </NavLink>
        </nav>
        {main?.role === "admin" ? (
          <nav className="flex flex-col lg:gap-3 font-medium">
            <NavLink className="px-3 py-2" to="/">
              All Employee List
            </NavLink>
          </nav>
        ) : main?.role === "hr" ? (
          <nav className="flex flex-col lg:gap-3 font-medium">
            <NavLink className="px-3 py-2" to="allUsers">
              Users
            </NavLink>
          </nav>
        ) : (
          <nav className="flex flex-col lg:gap-3 font-medium">
            <NavLink className="px-3 py-2" to="/">
              Payment History
            </NavLink>
            <NavLink className="px-3 py-2" to="worksheet">
              Work-sheet
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
