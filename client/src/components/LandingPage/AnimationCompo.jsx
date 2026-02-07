import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import style from "../../styles/LandingPage/AnimationCompo.module.css";
import About from "./About.jsx";
import Hero from "./Hero.jsx";

import RingModel from "../Model/RingModel.jsx";
const AnimationCompo = () => {
    const mainContainer = useRef(null)
    const location = useLocation();
    const uniqueKey = `${location.pathname}-${location.state?.key || location.key}`;
 
  return (
    <div ref={mainContainer} className={style.Model_Container}>
      <div className={style.Animation_box}>
        <RingModel key={uniqueKey} mainContainer={mainContainer} />
      </div>
      <div style={{position:"absolute",top:"0",right:"0"}}>
      <Hero />
      </div>
   
      <About />
    </div>
  );
};

export default AnimationCompo; 
