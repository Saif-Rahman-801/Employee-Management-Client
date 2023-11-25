import competeImg from "../../assets/award.png";

const Cutomer = () => {
  return (
    <div className="Container flex flex-col md:flex-row justify-between items-center">
      <div>
        <div className="p-8 rounded-md font-medium">
          <h2 className="text-3xl font-bold mb-4">
            🌟 Be Our Customer of the Month! 🌟
          </h2>
          <p className="text-lg">
            We are searching for the next customer to feature as our Customer of
            the Month! 🏆
          </p>
          <p className="text-lg mb-4">
            Enjoy exclusive benefits, including a fantastic **30% discount on
            all purchases for one month!** 🎉
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline-orange">
            Learn More
          </button>
        </div>
      </div>
      <div>
        <img src={competeImg} alt="" />
      </div>
    </div>
  );
};

export default Cutomer;
