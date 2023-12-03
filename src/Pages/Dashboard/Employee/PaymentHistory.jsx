import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useUser from "../../../Hooks/useUser";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const PaymentHistory = () => {
  const { user } = useAuth();
  const users = useUser();
  const axiosPublic = useAxiosPublic();
  const [paidUsers, setPaidUsers] = useState([]);

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


  //   console.log(mainUser);
  const paidUser = paidUsers.find((usr) => usr.userId === mainUser?._id);

  if (!paidUser) {
    return <progress className="progress w-56"></progress>;
  }

  console.log(paidUser);

  return (
    <div className="overflow-x-auto font-medium">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Month</th>
            <th>Amount</th>
            <th>Transaction id</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th></th>
            <th>{paidUser?.month} </th>
            <td>{paidUser?.salary} </td>
            <td>{paidUser?._id}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
