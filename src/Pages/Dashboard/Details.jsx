import { useParams } from "react-router-dom";
import useUser from "../../Hooks/useUser";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";


const Details = () => {
  const { id } = useParams();
  const users = useUser();
  const [payments, setPayments] = useState([]);
  const axiosPublic = useAxiosPublic();
  const employeeDetails = users.find((user) => user._id === id);

  useEffect(() => {
    axiosPublic
      .get("/payments")
      .then((res) => setPayments(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

  if (!payments) {
    return <progress className="progress w-56"></progress>;
  }

  const salaryDetails = payments.find((data) => data.userId === id);
  // console.log(salaryDetails);

  if (!salaryDetails) {
    return <progress className="progress w-56"></progress>;
  }

  const { year, month, salary } = salaryDetails;

  if (!employeeDetails) {
    return <progress className="progress w-56"></progress>;
  }
  // console.log(employeeDetails);
  const { designation, img, name } = employeeDetails;

  const chartData = [
    {
      name: `${month} ${year}`,
      salary: salary,
    },
  ];

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
         {/* Render Chart */}
        <BarChart
          width={400}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salary" fill="#ff9900" />
        </BarChart>
        
      </div>
    </div>
  );
};

export default Details;