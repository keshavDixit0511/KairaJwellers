import style from "../../styles/LandingPage/Gallery.module.css";
import React, { useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactCon } from "../../Context/ContactContext";

gsap.registerPlugin(ScrollTrigger);

const Collections = () => {
  const outerRef = useRef(null);
  const videoRef = useRef(null);
  const{page1} = useContext(ContactCon)
  // console.log(page1?.video) // set here your  video ---------------------------------------- 
  useEffect(() => {
    if (!videoRef.current || !outerRef.current) return;
 

    // Responsive values
    let startValue, borderRadius, scaleValue, endValue,scaleTo;
    const width = window.innerWidth;

    if (width <= 480) {
      startValue = "top 80%";
      borderRadius = "0px";
      scaleValue = 1;
      endValue = "top 50%";
      scaleTo = 1;
    } else if (width <= 768) {
      startValue = "top 50%";
      borderRadius = "0px";
      scaleValue = 1;
      scaleTo = 0.9;
      endValue = "top 80%";
    } else {
      startValue = "top 20%";
      borderRadius = "25px";
      scaleValue = 1.2;
      endValue = "top 80%";
      scaleTo = 0.9; 
    }

    const anim = gsap.fromTo(
      videoRef.current,
      {
        y: 50,
        scale: scaleValue,
        borderRadius: "0px",
      },
      {
        y: 0,
        scale: scaleTo,
        borderRadius: borderRadius,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: outerRef.current,
          start: startValue,
          // markers:true,
          end: endValue,
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      if (anim) anim.kill();
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <div className={style.Collections_Cont} ref={outerRef}>
      <h1>Gallery</h1>
      <div ref={videoRef} className={style.video_Cont}>
        <video
          className={style.iframe_vid}
          // src={page1?.video}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Collections;
