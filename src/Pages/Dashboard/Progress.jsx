import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Progress = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [isCardView, setIsCardView] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/worksheet")
      .then((res) => setWorksheets(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

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
          {worksheets.map((worksheet, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-md shadow-md mb-4"
            >
              <p className="text-xl font-bold mb-2">{worksheet.task}</p>
              <p>Hours Worked: {worksheet.hoursWorked}</p>
              <p>Date: {worksheet.date}</p>
              <p>Email: {worksheet.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Hours Worked</th>
              <th>Date</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {worksheets.map((worksheet, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{worksheet.task}</td>
                <td>{worksheet.hoursWorked}</td>
                <td>{worksheet.date}</td>
                <td>{worksheet.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Progress;
