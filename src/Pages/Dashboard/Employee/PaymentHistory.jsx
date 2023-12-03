import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUser from "../../../Hooks/useUser";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const PaymentHistory = () => {
  const { user } = useAuth();
  const users = useUser();
  const axiosPublic = useAxiosPublic();
  const [paidUsers, setPaidUsers] = useState([]);
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    axiosPublic
      .get("/payments")
      .then((res) => {
        setPaidUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

  if (!users) {
    return <progress className="progress w-56"></progress>;
  }

  const mainUser = users.find((usr) => usr.email === user.email);

  if (!mainUser) {
    return <progress className="progress w-56"></progress>;
  }

  const paidUser = paidUsers.find((usr) => usr.userId === mainUser?._id);

  if (!paidUser) {
    return <progress className="progress w-56"></progress>;
  }

  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  return (
    <div className="overflow-x-auto font-medium">
      <div className="mb-4">
        <button
          onClick={toggleView}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {isCardView ? "Switch to Table View" : "Switch to Card View"}
        </button>
      </div>

      {isCardView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-xl font-bold mb-2">Month: {paidUser?.month}</p>
            <p>Amount: {paidUser?.salary}</p>
            <p>Transaction id: {paidUser?._id}</p>
          </div>
        </div>
      ) : (
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Month</th>
              <th>Amount</th>
              <th>Transaction id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th></th>
              <th>{paidUser?.month}</th>
              <td>{paidUser?.salary}</td>
              <td>{paidUser?._id}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
