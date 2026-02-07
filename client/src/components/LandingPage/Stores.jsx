import React, { useEffect, useRef } from "react";
import style from "../../styles/LandingPage/Stores.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Make store data dynamic
const storesData = [
  {
    name: "KS KAIRA JEWELLERS PVT LTD.",
    address: "Shop No.1 Huda Market, Sector 23, Gurugram, Haryana, India",
  },
  { 
    name: "KAIRA JEWELLERS",
    address:
      "Shop number - GF32, Greater Noida W Rd, Gaur City 1, Sector 4, Greater Noida, Ghaziabad, Uttar Pradesh 201306",
  },
  // Add more stores here as needed
];

const Stores = () => {
  const boxRefs = useRef([]);
  const outerBoxRef = useRef(null);

  useEffect(() => {
    if (!boxRefs.current || boxRefs.current.length === 0) return;

    // Use gsap.utils.toArray to ensure a clean array of elements
    const boxes = boxRefs.current.filter(Boolean);
    let startValue = "top 40%"
    if(window.innerWidth<=780){
      startValue="top 60%"
    }
    // Animate each box with a more natural stagger and slight overlap
    gsap.fromTo(
      boxes,
      {
        y: 100,
        scale: 0.92,
        opacity: 0,
        filter: "blur(2px)",
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: {
          each: 0.22,
          from: "start",
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: outerBoxRef.current,
          start: startValue,
          toggleActions: "play none none reverse",
          // markers: true, // Show markers for debugging
        },
      }
    );
  }, []);

  return (
    <div className={style.outer_StoreBox} ref={outerBoxRef}>
      <div className={style.top_StoreCont}>
        {/* these below two div's are for horizontal line  */}
        <div className={`${style.bar} ${style.left}`}></div>
        <div className={`${style.bar} ${style.right}`}></div>
        <div className={style.top_Inside}>
          <h1>Stores</h1>
          <h2>Our Connections</h2>
        </div>
      </div>
      <div className={`${style.bar} ${style.verticalBar}`}></div>
      <div className={style.address_Box}>
        {storesData.map((store, idx) => (
          <div
            key={idx}
            ref={el => (boxRefs.current[idx] = el)}
            className={style.add_Cont}
          >
            <h1>{store.name}</h1>
            <p>{store.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;
