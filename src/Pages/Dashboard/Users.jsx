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
  //   console.log(employees);
  const axiosPublic = useAxiosPublic();

  const handleVerification = (userId) => {
    const specificUser = users.find((userr) => userr._id === userId);
    // console.log(specificUser.isVerified);
    const verified = specificUser?.isVerified;
    const user = { isVerified: !verified };

    axiosPublic
      .put(`/users/${userId}`, user)
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success("employee verified");
          fetchUser();
        }
      })
      .catch((error) => {
        toast.error("employee verified");
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
                    <button
                      onClick={() => handleVerification(employee._id)}
                      className="text-green-400 text-[40px]"
                    >
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
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className={`px-3 py-3 border bg-green-400 rounded-md ${
                      !employee.isVerified
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!employee.isVerified}
                  >
                    Pay
                  </button>{" "}
                                    <dialog id="my_modal_1" className="modal">
                    <div className="modal-box p-6 mx-auto mt-16 bg-white rounded-md w-96">
                      <h3 className="font-bold text-lg mb-4">Pay {employee.name}</h3>
                      <p>Salary: {employee.negotiatedSalary}</p>
                      <div className="modal-action mt-4">
                        <form method="dialog" className="text-center">
                          <label className="block">
                            Month:
                            <input
                              type="text"
                              placeholder="Enter month"
                              className="border px-2 py-1 mt-1 w-full"
                            />
                          </label>
                          <label className="block mt-4">
                            Year:
                            <input
                              type="text"
                              placeholder="Enter year"
                              className="border px-2 py-1 mt-1 w-full"
                            />
                          </label>
                          <button
                            className="mt-4 bg-green-400 px-3 py-1 text-white rounded-md mr-2"
                            onClick={() =>
                              document.getElementById("my_modal_1").close()
                            }
                          >
                            Close
                          </button>
                          <button
                            className="mt-4 bg-blue-500 px-3 py-1 text-white rounded-md"
                            onClick={() => {
                              // Your logic to process the payment
                              // You can use employee, month, and year here
                              // ...

                              // Close the modal
                              document.getElementById("my_modal_1").close();
                              toast.success("Payment processed successfully");
                            }}
                          >
                            Pay
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
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
