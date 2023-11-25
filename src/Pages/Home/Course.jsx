import bootcampImage from "../../assets/developer.png";
import { FaArrowRight } from "react-icons/fa";

const Course = () => {
  return (
    <div className="container mx-auto mt-8 p-4 md:p-8 flex flex-col md:flex-row items-center">
      {/* Left Side: Bootcamp Image */}
      <div className="w-full md:w-1/2">
        <img src={bootcampImage} alt="Coding Bootcamp" className="w-full h-auto rounded" />
      </div>

      {/* Right Side: Bootcamp Details */}
      <div className="w-full md:w-1/2 mt-4 md:mt-0 pl-4 md:pl-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Join Our Coding Bootcamp</h1>
        <p className="text-sm md:text-lg mb-4 font-medium">
          Take your coding skills to the next level with our intensive and hands-on coding bootcamp.
          Whether you are a beginner or an experienced developer, our expert instructors will guide
          you through a comprehensive curriculum to enhance your programming knowledge.
        </p>
        <p className="text-sm md:text-lg mb-4 font-medium">
          Join our vibrant community of learners, collaborate on real-world projects, and
          accelerate your career in the world of software development.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
          <span>Enroll Now</span> <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Course;
