import style from "../../styles/LandingPage/BlackBanner.module.css";
import React, { useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactCon } from "../../Context/ContactContext";
 
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const masonryRef = useRef(null);
  const imgRefs = useRef([]);
  const{page1} = useContext(ContactCon)
  useEffect(() => {
    if (!masonryRef.current) return;

    // Clear previous refs
    imgRefs.current = imgRefs.current.slice(0, 7);

    // All images animate in at once (no delay, same trigger)
    const directions = [
      { y: -80, x: 0 }, // img1: from top
      { y: 80, x: 0 }, // img2: from bottom
      { y: 0, x: -80 }, // img3: from left
      { y: 0, x: 80 }, // img4: from right
      { y: -60, x: 60 }, // img5: from top-right
      { y: 60, x: -60 }, // img6: from bottom-left
      { y: -40, x: 40 }, // img7: from top-right (softer)
    ];

    imgRefs.current.forEach((img, idx) => {
      if (!img) return;
      gsap.fromTo(
        img,
        {
          opacity: 0,
          scale: 0.96,
          ...directions[idx],
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power1.inOut",
          delay: 0, // No delay, all animate together
          scrollTrigger: {
            trigger: masonryRef.current,
            start: "top 100%",
            scrub: 1,
            end: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className={style.outer_CollBox}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className={style.container}>
        {/* Bestseller Card */}
        <div className={style.bestsellerCard}>
          <div className={style.pic_Cont}>
          <img src={page1?.banner?.[0]} alt="Bestseller" />
          </div>
         
          <div className={style.titleText}>
            <h1>BestSellers</h1>
          </div>
        </div>

        {/* Title */}

        {/* Left bottom text */}
        <div className={style.customText}>
          <div className={style.double_Text}>
          <h2>Get</h2>
          <h1>Customization</h1>
          </div>
        
          <div className={style.pic_Cont}>
          <img src={page1?.banner?.[1]} alt="Customization" />
           </div>
        </div>

        {/* Right bottom image */}
       
      </div>

      <div className={style.masonryGrid} ref={masonryRef}>
        <img
          src={page1?.banner?.[2]}
          alt="img1"
          className={style.item1}
          ref={(el) => (imgRefs.current[0] = el)}
        />
        <img
          src={page1?.banner?.[3]}
          alt="img2"
          className={style.item2}
          ref={(el) => (imgRefs.current[1] = el)}
        />
        <img
          src={page1?.banner?.[4]}
          alt="img3"
          className={style.item3}
          ref={(el) => (imgRefs.current[2] = el)}
        />
        <img
          src={page1?.banner?.[5]}
          alt="img4"
          className={style.item4}
          ref={(el) => (imgRefs.current[3] = el)}
        />
        <img
          src={page1?.banner?.[6]}
          alt="img5"
          className={style.item5}
          ref={(el) => (imgRefs.current[4] = el)}
        />
        <img
          src={page1?.banner?.[7]}
          alt="img6"
          className={style.item6}
          ref={(el) => (imgRefs.current[5] = el)}
        />
        <img
          src={page1?.banner?.[8]}
          alt="img7"
          className={style.item7}
          ref={(el) => (imgRefs.current[6] = el)}
        />
      </div>
    </div>
  );
};

export default Gallery;
