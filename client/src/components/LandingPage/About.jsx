import style from "../../styles/LandingPage/About.module.css";
import React, { useRef, useEffect, useState, useContext } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactCon } from "../../Context/ContactContext";

gsap.registerPlugin(ScrollTrigger);
// const para = ` At KS Kaira Jewellers Pvt. Ltd., jewellery is not only an adornment
//             but an expression of identity, elegance, and cultural legacy. Based in
//             Palam Vihar, Gurgaon, we have earned a trusted name in the jewellery
//             industry through our unwavering commitment to quality, craftsmanship,
//             and customer satisfaction. Our journey began with a vision to
//             seamlessly blend traditional artistry with modern aesthetics, crafting
//             timeless pieces that speak to both heritage and individuality.`

// const aboutData = [
//   {
//     num:"500",
//     name:"Happy Customers"
//   },
//   { 
//     num:"5",
//     name:"Branches"
//   }
// ]

const About = () => {
  const containerRef = useRef(null);
  const aboutHeaderRef = useRef(null);
  const bottomContainerRef = useRef(null);
  const paragraphRef = useRef(null);
  const countingRef = useRef(null);

  const{page1} = useContext(ContactCon);

 console.log(page1?.about?.LargeText)
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power2",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            // Remove 'end' and set toggleActions to only play once and not reverse
            // This ensures the animation only plays in and does not hide on scroll out
            toggleActions: "play none none reverse",
            // markers: true,
          },
        }
      );
    }

    // Animate subcomponents from left -100% to left 0
    if (bottomContainerRef.current && paragraphRef.current && countingRef.current) {
      gsap.fromTo(
        bottomContainerRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomContainerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        paragraphRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",  
          opacity: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        countingRef.current,
        { x: "-100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: countingRef.current,
            start: "top 97%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className={style.about_Container}>
      <div>
        <h1 ref={aboutHeaderRef} className={style.about}>About Us</h1>
        <div ref={bottomContainerRef} className={style.bottom_Container}>
          <p ref={paragraphRef}>
           {page1?.about?.LargeText  || "Loading..."}
          </p>

          <div ref={countingRef} className={style.Counting}>
            {page1?.about?.numberData?.map((data,idx)=>(
              <div  key={idx} className={style.happy_Customers}>
                <h1 className={style.num}>{data.num}+</h1>
                <h1 className={style.text}>{data.name}</h1>
              </div>
            ))}
           
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default About;
