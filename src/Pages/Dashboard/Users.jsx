import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const [Allusers, setAllUsers] = useState([]);
  const axiosPublic = useAxiosPublic();

  const fetchUser = async () => {
    try {
      const response = await fetch("https://employee-management-server-nine.vercel.app/users");
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const employees = Allusers.filter((user) => user.role === "employee");

  useEffect(() => {
    fetchUser();
  }, []);

  const handleVerification = async (userId) => {
    const specificUser = Allusers.find((userr) => userr._id === userId);
    const verified = specificUser?.isVerified;
    const user = { isVerified: !verified };

    try {
      const res = await axiosPublic.put(`/users/${userId}`, user);
      if (res.data.modifiedCount > 0) {
        toast.success("Employee verified");
        await fetchUser();
      }
    } catch (error) {
      toast.error("Error verifying employee");
      console.log(error);
    }
  };

  const handleModal = (e) => {
    e.preventDefault();
    const month = e.target.month.value;
    const year = e.target.year.value;
    console.log(month, year);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-lg">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Verified</th>
              <th className="px-4 py-2">Bank Account</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">Pay</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {employees.map((employee, idx) => (
              <tr key={employee._id}>
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">
                  {employee.isVerified ? (
                    <button
                      onClick={() => handleVerification(employee._id)}
                      className="text-green-400 text-[20px] md:text-[40px]"
                    >
                      <TiTick />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerification(employee._id)}
                      className="text-red-600 text-lg md:text-xl"
                    >
                      <ImCross />
                    </button>
                  )}
                </td>
                <td className="px-4 py-2">{employee.bankAccountNo}</td>
                <td className="px-4 py-2">{employee.negotiatedSalary}</td>
                <td className="px-4 py-2">
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
                    <div className="modal-box p-6 mx-auto mt-16 bg-white rounded-md w-full md:w-96">
                      <h3 className="font-bold text-lg mb-4">
                        Pay {employee.name}
                      </h3>
                      <p>Salary: {employee.negotiatedSalary}</p>
                      <div className="modal-action mt-4">
                        <form
                          onSubmit={handleModal}
                          method="dialog"
                          className="text-center"
                        >
                          <label className="block">
                            Month:
                            <input
                              type="text"
                              placeholder="Enter month"
                              name="month"
                              className="border px-2 py-1 mt-1 w-full"
                            />
                          </label>
                          <label className="block mt-4">
                            Year:
                            <input
                              type="text"
                              name="year"
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
                <td className="px-4 py-2">
                  <Link to={`/details`}>See details</Link>{" "}
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
