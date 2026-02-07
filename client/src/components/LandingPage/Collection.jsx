import React from 'react';
import jewellery from "../../assets/Images/jewellery.jpg";
import style from '../../styles/LandingPage/Collection.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import img1 from "../../assets/Images/BlackLayout/img1.jpeg";
import img2 from "../../assets/Images/BlackLayout/img2.jpeg";
import img3 from "../../assets/Images/BlackLayout/img3.jpeg";
import img4 from "../../assets/Images/BlackLayout/img4.jpeg";
import img5 from "../../assets/Images/BlackLayout/img5.jpeg";
import img6 from "../../assets/Images/BlackLayout/img6.jpeg";
import img7 from "../../assets/Images/BlackLayout/img7.jpeg";
import img8 from "../../assets/Images/BlackLayout/img8.jpg";
import img9 from "../../assets/Images/BlackLayout/img9.png";

const Gallery = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  
  return (
    <div className={style.outer_CollBox}>
      
      <div className={style.photos_Wrapper}>
        {/* Row 1: Left to right */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={'auto'}
          loop={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          className={style.swiperRow}
        >
          {images.map((img, idx) => (
            <SwiperSlide className={style.slide} key={`r1-${idx}`}>
              <img src={img} alt={`jewellery-${idx+1}`} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Row 2: Right to left */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={'auto'}
          loop={true}
          speed={4000}
          autoplay={{
            delay: -1,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          className={style.swiperRow}
        >
          {images.map((img, idx) => (
            <SwiperSlide className={style.slide} key={`r2-${idx}`}>
              <img src={img} alt={`jewellery-${idx+1}`} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Gallery;
