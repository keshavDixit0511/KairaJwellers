import style from '../../styles/LandingPage/Carasoule.module.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ContactCon } from '../../Context/ContactContext';

const Carasoule = () => {
  const { page3, setPage3 } = useContext(ContactCon);
  const [current, setCurrent] = useState(0);

  // Fetch carousel images from API and set in context
  useEffect(() => {
    axios
      .get("/api/data/page3")
      .then((res) => {
        setPage3(res.data.gallery); // setPage3 expects the gallery object
      })
      .catch((err) => console.error(err));
  }, [setPage3]);

  // Get images from page3?.carousel (array of image URLs)
  const images = page3?.carousel || [];

  // Update current index when images array changes
  useEffect(() => {
    if (images.length > 0 && current >= images.length) {
      setCurrent(0);
    }
  }, [images, current]);

  useEffect(() => {
    if (!images.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => {
    if (!images.length) return;
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    if (!images.length) return;
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className={style.carouselContainer}>
      <button className={style.leftArrow} onClick={prevSlide} aria-label="Previous Slide">
        <svg viewBox="0 0 24 24" fill="none">
          <polyline points="15 18 9 12 15 6" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {images.length > 0 ? (
        <img
          src={images[current]}
          alt={`carousel-img-${current + 1}`}
          className={style.carouselImage}
        />
      ) : (
        <div className={style.carouselImage} style={{ background: "#eee", minHeight: 200 }} />
      )}
      <button className={style.rightArrow} onClick={nextSlide} aria-label="Next Slide">
        <svg viewBox="0 0 24 24" fill="none">
          <polyline points="9 6 15 12 9 18" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Carasoule;
