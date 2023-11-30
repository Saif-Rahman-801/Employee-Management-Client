import { useParams } from "react-router-dom";
import useUser from "../../Hooks/useUser";

const DashBoard = () => {
  const users = useUser();
  const { email } = useParams();

  const role = users.filter((user) => user.email === email);
  console.log(role);

  return (
    <div>
      <h2>Welcome to dashboard</h2>
      {/* Display users or perform other actions with the users state */}
    </div>
  );
};

export default DashBoard;
