import { useEffect, useState } from "react";
import Banner from "./Banner";
import Cutomer from "./Cutomer";
import Service from "./Service";
import Course from "./Course";
import Testimonials from "./Testimonials";
import Footer from "../Shared/Footer/Footer";
// import Service from "./Service";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch("https://employee-management-server-nine.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServicesData(data));
  }, []);

  return (
    <div>
      <Banner />
      <Cutomer />
      <div className="my-10">
        <h2 className="text-center font-bold text-3xl">Our Services</h2>
        <div className="Container grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Service key={service.id} service={service} />
          ))}
        </div>
      </div>
      <Course />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
