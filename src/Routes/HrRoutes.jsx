import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";
import { Navigate } from "react-router-dom";

const HrRoutes = ({children}) => {
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
      const findHr = allUsers.find((usr) => usr.email === user.email);
  
      const hr = allUsers.find((usr) => usr._id === findHr?._id);
      // console.log(admin?.role);
      const role = hr?.role;
  
      if(role){

          if (role === "hr") {
            return children;
          } else {
            toast.error("It's a Hr route, Hr can only access the route");
            return <Navigate to="/" replace></Navigate>
          }
      }
    }
  };

export default HrRoutes;