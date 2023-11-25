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
          {servicesData.map((service) => (
            <Service key={service.id} service={service} />
          ))}
        </div>
        <div>
          <img src={competeImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
