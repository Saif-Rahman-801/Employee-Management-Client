import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";
import { Navigate } from "react-router-dom";

const EmployeeRoutes = ({children}) => {
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
      const findEmployee = allUsers.find((usr) => usr.email === user.email);
  
      const employee = allUsers.find((usr) => usr._id === findEmployee?._id);

      const role = employee?.role
  
      if(role){
          if (role === "employee") {
              return children;
            } else {
              toast.error("It's a employee route, employee can only access the route");
              return <Navigate to="/" replace></Navigate>
            }
      }
  
      
    }
  };

export default EmployeeRoutes;