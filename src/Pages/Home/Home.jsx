import { useEffect, useState } from "react";
import Banner from "./Banner";
import Service from "./Service";
import competeImg from "../../assets/competence.png";

const Home = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch("services.json")
      .then((res) => res.json())
      .then((data) => setServicesData(data));
  }, []);

  return (
    <div>
      <Banner />
      <div className="Container flex justify-between items-center">
        <div>
          <div className="p-8 rounded-md font-medium">
            <h2 className="text-3xl font-bold mb-4">
              🌟 Be Our Customer of the Month! 🌟
            </h2>
            <p className="text-lg mb-4">
              We are searching for the next customer to feature as our Customer
              of the Month! 🏆
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
    </div>
  );
};

export default Home;
