import { Link, useNavigate } from "react-router-dom";
import login from "../../../assets/key.png";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useUser from "../../../Hooks/useUser";
const Login = () => {
  const users = useUser();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const validUser = users.find((user) => user.email === email);
    // console.log(validUser);
    if (!validUser) {
      toast.error(
        "You are not eligble for login; You were either fired or you don't have any account"
      );
      return;
    }

    signIn(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("Logged in successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 rounded-md text-black font-medium my-10 border-2 shadow-md">
      <div>
        {/* Your login image or logo goes here */}
        <div className="flex items-center justify-center gap-2 flex-row-reverse">
          <h2 className="text-xl font-bold">Login</h2>
          <img src={login} alt="" className="w-[50px]" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-orange-300"
          />
        </div>

        <div className="navUl">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-orange">
            Login
          </button>
          <div className="my-2 navUl">
            <p>Do not have an account? Please</p>
            <Link
              className="text-blue-500 flex items-center gap-2"
              to={`/register`}
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
