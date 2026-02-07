import style from '../../styles/LandingPage/Services.module.css';
import React, { useRef, useEffect} from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = ["Get Customized Product", "Delivery On Time", "Refund Policy 15 Days"];

const Services = () => {
  const outerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!outerRef.current || !itemRefs.current) return;

    gsap.fromTo(
      itemRefs.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.95, 
      }, 
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className={style.outer_ServiceBox} ref={outerRef}>
      <h1>Services</h1>
      <div className={style.Cont_serve}>
        {services.map((ser, idx) => (
          <div
            className={style.main}
            key={idx}
            ref={el => (itemRefs.current[idx] = el)}
          >
            <h2>{ser}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
