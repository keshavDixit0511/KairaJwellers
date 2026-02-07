import React, { useContext, useEffect } from "react";
import AnimationCompo from "../components/LandingPage/AnimationCompo";
import Stores from "../components/LandingPage/Stores.jsx";

import Gallery from "../components/LandingPage/Gallery.jsx";
import BlackBanner from "../components/LandingPage/BlackBanner.jsx";
import Testimonials from "../components/LandingPage/Testimonials";
import Catogories from "../components/LandingPage/Catogories";
import Services from "../components/LandingPage/Services.jsx";
import { ContactCon } from "../Context/ContactContext.jsx";
import axios from "axios";
const MainCont = () => {
  const{setPage1} = useContext(ContactCon)

  // here we are fetching data . trying to hit the route in the backend landingPage.route.js 
  useEffect(() => {
    //  axios.get("/api/data/page1").then((res)=>{setPage1(res.data) ; console.log(res.data)}).catch((err)=>console.error(err))
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data/page1");
        if (response.status === 200) {
          setPage1(response.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch data: ", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setPage1])
  
  return (
    <div>
      <AnimationCompo />
      <Catogories />
      <Gallery />
      <Services />
      <BlackBanner />
      <Testimonials />
    </div> 
  );
};

export default MainCont;
