import bannerImage from "../../assets/code.png";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center bg-gray-800 text-white p-4 md:p-8 my-7">
      {/* Left Side: Text */}
      <div className="w-full md:w-1/2 md:mr-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Transforming Ideas into{" "}
          <span className="text-orange-400">Digital Success</span>
        </h1>
        <p className="text-sm md:text-lg text-gray-300 font-medium">
          Elevate your online presence with our cutting-edge web solutions. We
          specialize in crafting bespoke websites and digital experiences
          tailored to your unique business needs. From innovative design to
          robust development, we are your partners in the digital journey.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-black font-medium py-2 px-4 mt-4 rounded">
          Explore Our Services
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 mt-4 md:mt-0">
        <img
          src={bannerImage}
          alt="Web Solutions Banner"
          className="w-full md:w-[400px] rounded"
        />
      </div>
    </div>
  );
};

export default Banner;
