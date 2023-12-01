/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllEmployee = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [fire, setFire] = useState(false);
  const axiosPublic = useAxiosPublic();

  const fetchUser = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const employees = AllUsers.filter((user) => user.isVerified === true);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleFire = (userId) => {
    /*  */
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/users/${userId}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              setFire(!fire);
              toast.success(
                "User fired successfully, It will be deleted from the list after a refresh"
              );
              //   Refetch here
              //   fetchUser();
            }
          })
          .catch((error) => console.log(error));

        Swal.fire({
          title: "Deleted!",
          text: "User has been fired.",
          icon: "success",
        });
      }
    });
  };

  const handleHR = (userId) => {
    // console.log(userId);
    /*  const employee = AllUsers.find((user) => user._id === userId);
    console.log(employee.role); */
    const user = {
      role: "hr",
      isVerified: true,
    };

    axiosPublic
      .put(`/hr/${userId}`, user)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Employee role updated to HR");
          fetchUser();
        }
      })
      .catch((error) => {
        toast.error("Error updating employee role");
        console.log(error);
      });
  };

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
          {employees.map((employee, idx) => (
            <tr key={employee._id} className="border">
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{employee.designation}</td>

              <td className="border px-4 py-2">
                <div>
                  {employee.role === "hr" ? (
                    <p> hr </p>
                  ) : (
                    <button
                      onClick={() => handleHR(employee._id)}
                      className="px-3 py-2 bg-green-500 rounded-md text-white"
                    >
                      Make HR
                    </button>
                  )}
                </div>
              </td>
              <td className="border px-4 py-2">
                {fire ? (
                  <p>
                    <i>Fired</i>{" "}
                  </p>
                ) : (
                  <button
                    onClick={() => handleFire(employee._id)}
                    className="px-3 py-2 bg-red-500 rounded-md text-white"
                  >
                    Fire
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployee;
