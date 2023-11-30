import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUser = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const employees = users.filter((user) => user.role === "employee");
  console.log(employees);
  const axiosPublic = useAxiosPublic();

  const handleVerification = (userId) => {
    
    const user = { isVerified: true };

    axiosPublic
      .put(`/users/${userId}`, user)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success("employee verified");
          fetchUser();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Bank Acoount</th>
              <th>Salary</th>
              <th>Pay</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {/* row 1 */}
            {employees.map((employee, idx) => (
              <tr key={employee._id}>
                <th>{idx + 1} </th>
                <td>{employee.name} </td>
                <td>{employee.email} </td>
                <td>
                  {employee.isVerified ? (
                    <button className="text-green-400 text-[40px]">
                      <TiTick />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerification(employee._id)}
                      className="text-red-600 text-lg"
                    >
                      <ImCross />
                    </button>
                  )}
                </td>
                <td>{employee.bankAccountNo} </td>
                <td>{employee.negotiatedSalary} </td>
                <td>
                  <button className="px-3 py-3 border bg-green-400 rounded-md">
                    Pay{" "}
                  </button>{" "}
                </td>
                <td>
                  <Link to={`/details`}>See details </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
