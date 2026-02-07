import Navbar from "../components/LandingPage/Navbar.jsx";
import useScrollToTop from "../hooks/useScrollToTop.js";

import style from "../styles/Landing/LandingPage.module.css";

import Footer from "../components/LandingPage/Footer.jsx";
import { Outlet } from "react-router-dom";
import ContactUs from "../pages/ContactUs.jsx";
import { useContext } from "react";
import { ContactCon } from "../Context/ContactContext";
import FranchiseEnq from "../pages/FranchiseEnq.jsx";

const LandingPage = () => {
  useScrollToTop();
  const { isOpen, openFranchiseForm } = useContext(ContactCon);

  return (  
    <div className={style.LandingPage_cont}>
      <Navbar />
      {isOpen && <ContactUs />}
      {openFranchiseForm && <FranchiseEnq />}
      {/* below outlet is for body and navigation between the pages  */}
      <Outlet />
      
      <Footer />
    </div>
  );
};

export default LandingPage;
