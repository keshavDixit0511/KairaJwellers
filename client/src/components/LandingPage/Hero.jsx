import React, { useRef, useEffect, useContext, useState } from 'react';
import style from "../../styles/LandingPage/Hero.module.css";
import gsap from 'gsap';
import { ContactCon } from '../../Context/ContactContext';

// const qoute ="  Jewellery is a story you wear, a memory you treasure, and a promise you keep."
const Hero = () => {
  const{page1} = useContext(ContactCon)
  const heroRef = useRef(null);


  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, x: 500 },
        { opacity: 1, x: 0, duration: 2, ease: "power2.inOut" }
      );
    } 
  }, []);

  return (
    <div className={style.Hero_OuterBox} >
    
     
      <div ref={heroRef}>
        <div className={style.Hero_InnerBox}>
          <h1>
            Ks Kaira<br />
            Jewellers
          </h1>
          <p>
           {page1.quote}
          </p> 
        </div>

        <div className={style.Button_box}>
          <div className={style.Button_Wrapper}>
            <h1>EXPLORE</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
