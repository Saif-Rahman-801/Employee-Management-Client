import "../../CSS/all.css";
import register from "../../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import useUser from "../../../Hooks/useUser";

const image_key = import.meta.env.VITE_IMG_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const allUsers = useUser();
  console.log(allUsers);

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
    const findAdmin = allUsers.find((user) => user.role === "admin");
    const findHr = allUsers.find((user) => user.role === "hr");
    const findUser = allUsers.find((user) => user.email === email);


    if (findUser) {
      toast.error("email already exists");
      return;
    }

    if (role === "admin") {
      if (findAdmin) {
        toast.error("Admin Already Exists");
        return;
      }
    } else if (role === "hr") {
      if (findHr) {
        toast.error("Hr Already Exists");
        return;
      }
    }

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

        // Validate password
        if (
          password.length < 6 ||
          !/[A-Z]/.test(password) ||
          !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {
          toast.error(
            "Password must be at least 6 characters long, contain a capital letter, and have a special character."
          );
          return;
        }

        // You can send this data to your server or perform other actions
        const userData = {
          name,
          email,
          bankAccountNo,
          negotiatedSalary,
          designation,
          img: imageUrl,
          role,
          isVerified: false,
        };
        // console.log(userData);

        createUser(email, password)
          .then((res) => {
            // console.log(res.user);
            axiosPublic
              .post("/users", userData)
              .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                  toast.success("Registrated successfully");
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error(error);
              });
            updateProfile(res.user, {
              displayName: name,
              photoURL: imageUrl,
            })
              .then(() => {
                // Profile updated!
                // ...
              })
              .catch((error) => {
                // An error occurred
                // ...
                console.log(error);
                toast.error(error);
              });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            toast.error(error);
          });
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
            required
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
            required
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
