import { CgLogIn, CgLogOut } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import devLogo from "../../../assets/dev.png";
import { RiContactsFill } from "react-icons/ri";
import "../../CSS/all.css"

const Navbar = () => {
//   const isLoggedIn = true;
  const isLoggedIn = false;
  return (
    <nav className="text-gray-600 font-medium flex justify-between items-center Container">
      <div className="logo navUl">
        {/* Your company logo */}
        <img src={devLogo} alt="Company Logo" className="w-[80px]" />
        <h1 className="text-2xl font-bold">Web-Solutions </h1>
      </div>

      <ul className="nav-items navUl">
        <li className="flex flex-col justify-center items-center">
          <span className="text-3xl text-orange-400">
            <MdDashboard />
          </span>
          Dashboard
        </li>
        <li className="flex flex-col justify-center items-center">
            <span className="text-3xl text-orange-400">
            <RiContactsFill />
            </span>
            Contact us</li>
      </ul>

      <div className="user-section navUl">
        {isLoggedIn ? (
          <>
            {/* Display user photo */}
            <img src="" alt="User" className="user-photo" />

            {/* Clicking user photo reveals Logout button */}
            <button className="logout-button navUl">Logout
            <CgLogOut />
            </button>
          </>
        ) : (
          <>
            {/* Conditional Register and Login buttons */}
            <button className="bg-blue-400 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline navUl items-center gap-2">
              Register 
            </button>
            <button className="bg-blue-400 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline navUl items-center">
              Login <CgLogIn />
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
