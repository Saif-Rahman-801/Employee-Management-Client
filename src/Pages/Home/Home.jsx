import { useEffect, useState } from "react";
import Banner from "./Banner";
import Cutomer from "./Cutomer";
import Service from "./Service";
import Course from "./Course";
import Testimonials from "./Testimonials";
import Footer from "../Shared/Footer/Footer";

const Home = () => {
  const [servicesData, setServicesData] = useState([]);

  const fetchServicesData = async () => {
    try {
      const response = await fetch("https://employee-management-server-nine.vercel.app/services");
      const data = await response.json();
      setServicesData(data);
    } catch (error) {
      console.error("Error fetching services data:", error);
    }
  };

  useEffect(() => {
    fetchServicesData();
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
