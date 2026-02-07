import style from "../../styles/LandingPage/Testimonials.module.css";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import TestimonialCard from "../minicomponents/TestimonialCard";
import { ContactCon } from "../../Context/ContactContext";



const Testimonials = () => {
  const{page1} = useContext(ContactCon)
  return (
    <div className={style.test_Cont}>
      <div className={`${style.bubble} ${style.b1}`}></div>
      <div className={`${style.bubble} ${style.b2}`}></div>
      <div className={`${style.bubble} ${style.b3}`}></div>
      <h1>Testimonials</h1>
        <Swiper
        modules={[ Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          // when window width is >= 0px
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 640px (tablet)
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 1024px (desktop)
          1024: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
        }}
        className={style.swiper}
      >
        {page1?.testimonial?.map((testimonial, idx) => (
          <SwiperSlide key={idx}>
            <TestimonialCard
              name={testimonial.name}
              img={testimonial.img}
              text={testimonial.text}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
