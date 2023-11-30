import { CgLogIn, CgLogOut } from "react-icons/cg";
import { MdDashboard, MdHome } from "react-icons/md";
import devLogo from "../../../assets/dev.png";
import { RiContactsFill } from "react-icons/ri";
import "../../CSS/all.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged Out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="text-gray-600 font-medium flex justify-between items-center Container">
      <div className="logo navUl">
        {/* Your company logo */}
        <img src={devLogo} alt="Company Logo" className="w-[80px]" />
        <h1 className="text-2xl font-bold">Web-Solutions </h1>
      </div>

      <ul className="nav-items navUl">
        <Link to={`/`}>
          <li className="hidden md:flex flex-col justify-center items-center">
            <span className="text-3xl text-orange-400">
              <MdHome />
            </span>
            Home
          </li>
        </Link>
        <Link to={`/dasboard`}>
          <li className="hidden md:flex flex-col justify-center items-center mx-4">
            <span className="text-3xl text-orange-400">
              <MdDashboard />
            </span>
            Dashboard
          </li>
        </Link>
        <Link to={`/contact`}>
          <li className="hidden md:flex flex-col justify-center items-center">
            <span className="text-3xl text-orange-400">
              <RiContactsFill />
            </span>
            Contact us
          </li>
        </Link>
      </ul>

      <div className="user-section navUl">
        {user ? (
          <>
            {/* Display user photo */}
            <img
              src={user.photoURL}
              alt="User"
              className="user-photo w-[30px]"
            />

            {/* Clicking user photo reveals Logout button */}
            <button onClick={handleLogOut} className="logout-button navUl">
              Logout
              <CgLogOut />
            </button>
          </>
        ) : (
          <>
            {/* Conditional Register and Login buttons */}
            <Link to={`/register`}>
              <button className="bg-blue-400 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline navUl items-center">
                Register <FaArrowRight />
              </button>
            </Link>
            <Link to={`/login`}>
              <button className="bg-blue-400 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline navUl items-center">
                Login <CgLogIn />
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
