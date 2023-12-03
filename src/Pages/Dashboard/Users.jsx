import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
  const [Allusers, setAllUsers] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [salaryId, setSalaryId] = useState(null);
  const [close, setClose] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [paymentData, setPaymentData] = useState([]);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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
        toast.success("Employee verified field changed");
        await fetchUser();
      }
    } catch (error) {
      toast.error("Error verifying employee");
      console.log(error);
    }
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const fetchPaymentData = () => {
    axiosPublic
    .get("/payments")
    .then((res) => {
      // console.log(res.data);
      setPaymentData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    fetchPaymentData()
   /*  axiosPublic
      .get("/payments")
      .then((res) => {
        // console.log(res.data);
        setPaymentData(res.data);
      })
      .catch((error) => {
        console.log(error);
      }); */
  }, []);

  const handlePay = (userId, salary) => {
    console.log(userId, salary);
    // setSalaryId(null);
    setClose(false);

    const salaryandId = {
      userId,
      salary,
    };
    setSalaryId(salaryandId);
  };

  const handlePayment = (e) => {
    // console.log(e.target);

    if (close) {
      setSalaryId(null);
      return;
    }

    const form = e.target;
    const month = form.month.value;
    const year = form.year.value;
    const { userId, salary } = salaryId;
    console.log(year, month, userId, salary);
    const paymentDetails = {
      userId,
      year,
      month,
      salary,
    };
    console.log(paymentDetails);

    const paid = paymentData.find((data) => data.userId === userId);
    console.log(paid);
    if (paid) {
      toast.error(
        "The employee is already paid; You can't pay a Employee twice"
      );
      return;
    }
    // if (alreadyPaid) {
    //   toast.error(
    //     "The employee is already paid; You can't pay a Employee twice"
    //   );
    //   return;
    // }

    axiosPublic
      .post("/payment", paymentDetails)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Payment processed successfully");
          setSalaryId(null);
          fetchPaymentData()
        }
      })
      .catch((error) => console.log(error));
      
  };

  console.log(salaryId);

  return (
    <div>
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
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-lg">{employee.name}</p>
                  <button
                    onClick={() => {
                      navigate(`/${employee._id}`);
                    }}
                  >
                    See details
                  </button>{" "}
                </div>
                <p>Email: {employee.email}</p>
                <p>
                  Verified:{" "}
                  {employee.isVerified ? (
                    <TiTick
                      onClick={() => handleVerification(employee._id)}
                      className="text-green-400 text-[20px] md:text-[40px]"
                    />
                  ) : (
                    <ImCross
                      onClick={() => handleVerification(employee._id)}
                      className="text-red-600 text-lg md:text-xl"
                    />
                  )}
                </p>
                <p>Bank Account: {employee.bankAccountNo}</p>
                <p>Salary: {employee.negotiatedSalary}</p>
                <div
                  onClick={() => {
                    handlePay(employee._id, employee.negotiatedSalary);
                  }}
                >
                  <button
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${employee._id}`)
                        .showModal()
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
                </div>
                <dialog id={`my_modal_${employee._id}`} className="modal">
                  <div className="modal-box p-6 mx-auto mt-16 bg-white rounded-md w-full md:w-96">
                    <h3 className="font-bold text-lg mb-4">
                      Pay {employee.name}
                    </h3>
                    <p>Salary: {employee.negotiatedSalary}</p>
                    <div className="modal-action mt-4">
                      {/* Modal Form */}
                      <form
                        onSubmit={handlePayment}
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
                        <div
                          onClick={() => {
                            setClose(true);
                          }}
                        >
                          <button
                            className="mt-4 bg-green-400 px-3 py-1 text-white rounded-md mr-2"
                            onClick={() =>
                              document
                                .getElementById(`my_modal_${employee._id}`)
                                .close()
                            }
                          >
                            Close
                          </button>
                        </div>
                        <button
                          className="mt-4 bg-blue-500 px-3 py-1 text-white rounded-md"
                          onClick={() => {
                            // handlePayment
                            // Your logic to process the payment
                            // You can use employee, month, and year here
                            // ...

                            // Close the modal
                            document
                              .getElementById(`my_modal_${employee._id}`)
                              .close();
                            // toast.success("Payment processed successfully");
                          }}
                        >
                          Pay
                        </button>
                      </form>
                      {/* Modal Form */}
                    </div>
                  </div>
                </dialog>
              </div>
            ))}
          </div>
        ) : (
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
                    <div
                      onClick={() => {
                        handlePay(employee._id, employee.negotiatedSalary);
                      }}
                    >
                      <button
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${employee._id}`)
                            .showModal()
                        }
                        className={`px-3 py-3 border bg-green-400 rounded-md ${
                          !employee.isVerified
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={!employee.isVerified}
                      >
                        Pay
                      </button>
                    </div>
                    <dialog id={`my_modal_${employee._id}`} className="modal">
                      <div className="modal-box p-6 mx-auto mt-16 bg-white rounded-md w-full md:w-96">
                        <h3 className="font-bold text-lg mb-4">
                          Pay {employee.name}
                        </h3>
                        <p>Salary: {employee.negotiatedSalary}</p>
                        {/* Modal form*/}
                        <div className="modal-action mt-4">
                          <form
                            onSubmit={handlePayment}
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
                            <div
                              onClick={() => {
                                setClose(true);
                              }}
                            >
                              <button
                                className="mt-4 bg-green-400 px-3 py-1 text-white rounded-md mr-2"
                                onClick={() =>
                                  document
                                    .getElementById(`my_modal_${employee._id}`)
                                    .close()
                                }
                              >
                                Close
                              </button>
                            </div>
                            <button
                              className="mt-4 bg-blue-500 px-3 py-1 text-white rounded-md"
                              onClick={() => {
                                // handlePay(
                                //   employee._id,
                                //   employee.negotiatedSalary
                                // );
                                // Your logic to process the payment
                                // You can use employee, month, and year here
                                // ...

                                // Close the modal
                                document
                                  .getElementById(`my_modal_${employee._id}`)
                                  .close();
                              }}
                            >
                              Pay
                            </button>
                          </form>
                        </div>
                        {/* modal form */}
                      </div>
                    </dialog>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        navigate(`/${employee._id}`);
                      }}
                    >
                      See details
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
