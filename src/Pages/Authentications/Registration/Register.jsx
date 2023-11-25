import "../../CSS/all.css";
import register from "../../../assets/register.png";
const Register = () => {
  return (
    <div className="Container mt-8 p-6 rounded-md  text-black font-medium my-10 flex flex-col md:navUl md:flex-row">
      {/* <h2 className="text-2xl font-semibold  mb-6">Register</h2> */}
      <div>
        <img src={register} alt="" />
      </div>
      <div>
        <div className="navUl">
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className=" block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className=" block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
            />
          </div>
        </div>

        <div className="navUl">
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className=" block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
            />
          </div>

          {/* Bank Account No Field */}
          <div className="mb-4">
            <label htmlFor="bankAccountNo" className=" block mb-2">
              Bank Account No
            </label>
            <input
              type="text"
              id="bankAccountNo"
              name="bankAccountNo"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
            />
          </div>
        </div>

        <div className="navUl">
          {/* Negotiated Salary Field */}
          <div className="mb-4">
            <label htmlFor="negotiatedSalary" className=" block mb-2">
              Negotiated Salary
            </label>
            <input
              type="text"
              id="negotiatedSalary"
              name="negotiatedSalary"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
            />
          </div>

          {/* Designation Field */}
          <div className="mb-4">
            <label htmlFor="designation" className=" block mb-2">
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
            />
          </div>
        </div>

        {/* Photo Upload Field */}
        <div className="mb-4">
          <label htmlFor="photo" className=" block mb-2">
            Photo Upload
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-4">
          <label htmlFor="role" className=" block mb-2">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300 "
          >
            <option className="font-md" value="employee">Employee</option>
            <option className="font-md"  value="hr">HR</option>
            <option className="font-md"  value="admin">Admin</option>
          </select>
        </div>
        <div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-orange">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
