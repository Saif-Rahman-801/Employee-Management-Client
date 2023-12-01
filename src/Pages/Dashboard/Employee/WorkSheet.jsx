import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const WorkSheet = () => {
  const [formData, setFormData] = useState({
    task: "",
    hoursWorked: "",
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post data to the database using Axios
      await axios.post("your-api-endpoint", formData);

      // Optionally, you can reset the form after successful submission
      setFormData({
        task: "",
        hoursWorked: "",
        date: new Date(),
      });

      // Add any additional logic after successful submission
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="flex justify-between max-w-3xl mx-auto mt-8">
    <div className="max-w-lg p-6 rounded-md text-black font-medium border-2 shadow-md">
      <form onSubmit={handleSubmit}>
        {/* Tasks Dropdown */}
        <div className="mb-4">
          <label htmlFor="task" className="block mb-2">
            Tasks
          </label>
          <select
            id="task"
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
          >
            <option value="">Select Task</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
            {/* Add more options if needed */}
          </select>
        </div>

        {/* Hours Worked */}
        <div className="mb-4">
          <label htmlFor="hoursWorked" className="block mb-2">
            Hours Worked
          </label>
          <input
            type="number"
            id="hoursWorked"
            name="hoursWorked"
            value={formData.hoursWorked}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
          />
        </div>

        {/* Date Picker */}
        <div className="mb-4">
          <label htmlFor="date" className="block mb-2">
            Date
          </label>
          <DatePicker
            id="date"
            name="date"
            selected={formData.date}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-orange"
          >
           Submit
          </button>
        </div>
      </form>
    </div>
    <div className="w-full p-6 rounded-md text-black font-medium border-2 shadow-md">
    <table className="w-full border-collapse border border-gray-500">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Task</th>
          <th className="border p-2">Hours Worked</th>
          <th className="border p-2">Date</th>
        </tr>
      </thead>
      {/* <tbody>
        {tableData.map((data, index) => (
          <tr key={index}>
            <td className="border p-2">{data.task}</td>
            <td className="border p-2">{data.hoursWorked}</td>
            <td className="border p-2">{data.date}</td>
          </tr>
        ))}
      </tbody> */}
    </table>
  </div> </div>
  );
};

export default WorkSheet;
