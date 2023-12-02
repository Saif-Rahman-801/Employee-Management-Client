import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const allUsers = useUser();
  const { user, setLoading, loading } = useAuth();
//   const navigate = useNavigate();

  if (!user) {
    setLoading(true);
  }

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user) {
    const findAdmin = allUsers.find((usr) => usr.email === user.email);
    // console.log(findAdmin, findAdmin?._id);

    const admin = allUsers.find((usr) => usr._id === findAdmin?._id);
    // console.log(admin?.role);
    const role = admin?.role

    if(role){
        if (role === "admin") {
            return children;
          } else {
            toast.error("It's a admin route, Admin can only access the route");
            return <Navigate to="/" replace></Navigate>
          }
    }

    
  }
};

export default AdminRoutes;
