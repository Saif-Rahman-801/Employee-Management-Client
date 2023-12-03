import { useParams } from "react-router-dom";
import useUser from "../../Hooks/useUser";

const Details = () => {
  const { id } = useParams();
  const users = useUser();
  const employeeDetails = users.find((user) => user._id === id);

  if (!employeeDetails) {
    return <progress className="progress w-56"></progress>;
  }

  const { designation, img, name } = employeeDetails;

  return (
    <div className="max-w-md mx-auto mt-8 font-medium">
      <div className="bg-white p-6 rounded-md shadow-md">
        <img
          src={img}
          alt={`${name}'s profile`}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-medium mb-2">Name: {name}</h2>
        <p className="text-gray-600">Designation: {designation}</p>
        {/* Add additional details as needed */}
        {/* Example: <p className="text-gray-600">Email: {employeeDetails.email}</p> */}
      </div>
    </div>
  );
};

export default Details;
