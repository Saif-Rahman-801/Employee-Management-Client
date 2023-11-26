import "../../CSS/all.css";
import register from "../../../assets/register.png";
import { Link } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";

const image_key = import.meta.env.VITE_IMG_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`

const Register = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    // Extracting other form data
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const bankAccountNo = formData.get("bankAccountNo");
    const negotiatedSalary = formData.get("negotiatedSalary");
    const designation = formData.get("designation");
    const role = formData.get("role");
  
    // Extracting the image file
    const photo = formData.get("photo");
  
    // Creating a FormData object for image upload
    const imageFormData = new FormData();
    imageFormData.append("image", photo);
  
    // Posting the image to ImgBB
    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: imageFormData,
      });
  
      if (response.ok) {
        const imageData = await response.json();
  
        // Access the image URL from the ImgBB response
        const imageUrl = imageData.data.url;
  
        // Now you can use the imageUrl along with other form data
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Bank Account No:", bankAccountNo);
        console.log("Negotiated Salary:", negotiatedSalary);
        console.log("Designation:", designation);
        console.log("Photo URL:", imageUrl);
        console.log("Role:", role);
  
        // You can send this data to your server or perform other actions
      } else {
        console.error("Failed to upload image to ImgBB");
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
    }
  };
  
  return (
    <div className="Container mt-8 p-6 rounded-md  text-black font-medium my-10 flex flex-col md:navUl md:flex-row">
      {/* <h2 className="text-2xl font-semibold  mb-6">Register</h2> */}
      <div>
        <img src={register} alt="" />
      </div>
      <form onSubmit={handleRegister}>
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
            <option className="font-md" value="employee">
              Employee
            </option>
            <option className="font-md" value="hr">
              HR
            </option>
            <option className="font-md" value="admin">
              Admin
            </option>
          </select>
        </div>
        <div className="navUl">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-orange">
            Register
          </button>
          <div className="my-2 navUl">
            <p>Already have an account? Please</p>
            <Link
              className="text-blue-500 flex items-center gap-2"
              to={`/login`}
            >
              Login <CgLogIn />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
