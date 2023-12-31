/* 
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const AllEmployee = () => {
  const [AllUsers, setAllUsers] = useState([]);
  // const [fire, setFire] = useState(false);
  const axiosPublic = useAxiosPublic();

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://employee-management-server-nine.vercel.app/users"
      );
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const employees = AllUsers.filter((user) => user.isVerified === true);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleFire = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/users/${userId}`);

        if (res.data.deletedCount > 0) {
          toast.success(
            "User fired successfully, It will be deleted from the list after a refresh"
          );
          await fetchUser();
        }

        await Swal.fire({
          title: "Deleted!",
          text: "User has been fired.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHR = async (userId) => {
    const user = {
      role: "hr",
      isVerified: true,
    };

    try {
      const res = await axiosPublic.put(`/hr/${userId}`, user);

      if (res.data.modifiedCount > 0) {
        toast.success("Employee role updated to HR");
        await fetchUser();
      }
    } catch (error) {
      toast.error("Error updating employee role");
      console.log(error);
    }
  };

  const handleFired = (userId) => {
    console.log(userId);
    const fired = {
      fired: true,
    };
    Swal.fire({
      title: "Are you sure? You want to fire the employee?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/fire/${userId}`, fired)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              toast.success("Employee fired");
            }
            fetchUser();
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire({
          title: "Fired!",
          text: "Your employee has been fired.",
          icon: "success",
        });
      }
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
                {employee.fired ? (
                  <p onClick={() => handleFire(employee._id)} className="px-3 py-2 bg-red-500 rounded-md text-white">
                    <i className="flex gap-3 text-[16px]">
                      Fired <FaTrash />
                    </i>
                  </p>
                ) : (
                  <button
                    onClick={() => handleFired(employee._id)}
                    className="px-3 py-2 bg-red-500 rounded-md text-white"
                  >
                    Fire
                  </button>
                  // <button
                  //   onClick={() => handleFire(employee._id)}
                  //   className="px-3 py-2 bg-red-500 rounded-md text-white"
                  // >
                  //   Fire
                  // </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; */
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

const AllEmployee = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const axiosPublic = useAxiosPublic();

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://employee-management-server-nine.vercel.app/users"
      );
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const employees = AllUsers.filter((user) => user.isVerified === true);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleFire = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/users/${userId}`);

        if (res.data.deletedCount > 0) {
          toast.success(
            "User fired successfully, It will be deleted from the list after a refresh"
          );
          await fetchUser();
        }

        await Swal.fire({
          title: "Deleted!",
          text: "User has been fired.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHR = async (userId) => {
    const user = {
      role: "hr",
      isVerified: true,
    };

    try {
      const res = await axiosPublic.put(`/hr/${userId}`, user);

      if (res.data.modifiedCount > 0) {
        toast.success("Employee role updated to HR");
        await fetchUser();
      }
    } catch (error) {
      toast.error("Error updating employee role");
      console.log(error);
    }
  };

  const handleFired = (userId) => {
    const fired = {
      fired: true,
    };
    Swal.fire({
      title: "Are you sure? You want to fire the employee?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/fire/${userId}`, fired)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              toast.success("Employee fired");
            }
            fetchUser();
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire({
          title: "Fired!",
          text: "Your employee has been fired.",
          icon: "success",
        });
      }
    });
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="overflow-x-auto">
      <button
        onClick={toggleView}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        {isGridView ? "Switch to Table View" : "Switch to Card View"}
      </button>

      {isGridView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="border p-4 rounded-md bg-white shadow-md"
            >
              <p>Name: {employee.name}</p>
              <p>Designation: {employee.designation}</p>
              <div className="flex gap-3 my-3 font-medium">

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
                <div>
                  {employee.fired ? (
                    <p
                      onClick={() => handleFire(employee._id)}
                      className="px-3 py-2 bg-red-500 rounded-md text-white cursor-pointer"
                    >
                      <i className="flex gap-3 text-[16px]">
                        Fired <FaTrash />
                      </i>
                    </p>
                  ) : (
                    <button
                      onClick={() => handleFired(employee._id)}
                      className="px-3 py-2 bg-red-500 rounded-md text-white"
                    >
                      Fire
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
                  {employee.fired ? (
                    <p
                      onClick={() => handleFire(employee._id)}
                      className="px-3 py-2 bg-red-500 rounded-md text-white cursor-pointer"
                    >
                      <i className="flex gap-3 text-[16px]">
                        Fired <FaTrash />
                      </i>
                    </p>
                  ) : (
                    <button
                      onClick={() => handleFired(employee._id)}
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
      )}
    </div>
  );
};

export default AllEmployee;
