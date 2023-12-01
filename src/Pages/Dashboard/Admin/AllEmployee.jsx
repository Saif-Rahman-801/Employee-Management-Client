/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllEmployee = () => {
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();

  const fetchUser = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
<div className="overflow-x-auto">
  <table className="w-full table-auto border-collapse">
    <thead className="text-lg bg-gray-200">
      <tr>
        <th className="border px-4 py-2"></th>
        <th className="border px-4 py-2">Name</th>
        <th className="border px-4 py-2">Designation</th>
        <th className="border px-4 py-2">Make HR</th>
        <th className="border px-4 py-2">Fire</th>
      </tr>
    </thead>
    <tbody className="font-medium">
      {users.map((employee, idx) => (
        <tr key={employee._id} className="border">
          <td className="border px-4 py-2">{idx + 1}</td>
          <td className="border px-4 py-2">{employee.name}</td>
          <td className="border px-4 py-2">{employee.designation}</td>

          <td className="border px-4 py-2">
            <button className="px-3 py-2 bg-green-500 rounded-md text-white">
              Make HR
            </button>
          </td>
          <td className="border px-4 py-2">
            <button className="px-3 py-2 bg-red-500 rounded-md text-white">
              Fire
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default AllEmployee;
