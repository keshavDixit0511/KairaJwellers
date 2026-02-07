import React from 'react'
import style from "../../styles/minicomponents/TestimonialCard.module.css"

const TestimonialCard = ({ name, img, text }) => {
  return (
    <div className={style.card_Cont}>
      <div className={style.card_Wrapper}>
        <div className={style.left}>
          {/* Only render img if img prop is provided */}
          {img ? (
            <img src={img} alt={name || 'testimonial user'} />
          ) : (
            // fallback: show a placeholder if img is missing
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "#aaa"
              }}
            >
              ?
            </div>
          )}
        </div>

        <div className={style.right}>
          <h1>{name}</h1>
          {/* stars div  */}
          <div className={style.stars}>
            <div>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  fill="#FFD700"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "inline-block" }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <h2>{text.slice(0,40)}</h2>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
