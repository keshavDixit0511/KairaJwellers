import React, { useState, useEffect} from 'react'
import style from "../../styles/LandingPage/Footer.module.css"
import { useNavigate } from 'react-router-dom'

const leftData = [
  {
    mainHead: "Information",
    links: [
      { text: "About Kaira", path: "/about" },
      { text: "Help & Faq's", path: "/faq" },
      { text: "Blog", path: "/blog" }
    ]
  },
  {
    mainHead: "Company",
    links: [
       { text: "Our Story", path: "/ourStory" },
      { text: "Privacy & Policy", path: "/privacyAndPolicy" },
      { text: "Terms Of Services", path: "/termAndCondition" }
    ]
  }
]
const rightData = [
  {
    mainHead: "Contact Us",
    links: [
      {
        logo: "📞",
        text: "+91 9717683838"
      },
      {
        logo: "📞",
        text: "+91 9717683838"
      },
      {
        logo: "✉️",
        text: "kaira@gmail.com"
      }
    ]
  },
  {
    mainHead: "Social Media",
    links: [
      {
        logo: "📘",
        text: "Facebook"
      },
      {
        logo: "📸",
        text: "Instagram"
      },
      {
        logo: "🐦",
        text: "Twitter"
      }
    ]
  },
]

const Footer = () => {

  // State to track device width for responsive logic
  const [isTabletOrBelow, setIsTabletOrBelow] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false
  );
  // Shutter state for leftData, initially closed
  const [openLeft, setOpenLeft] = useState([false, false]);

  // Update isTabletOrBelow on resize
  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrBelow(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle shutter for left section (only for tablet or below)
  const handleLeftShutter = (idx) => {
    if (!isTabletOrBelow) return;
    setOpenLeft((prev) => prev.map((v, i) => i === idx ? !v : false));
  };

  const navigate = useNavigate()
  const handlepages = (path) => {
  navigate(path);
  window.scrollTo(0, 0);   // react-router-dom will navigate to that page
}

  return (
    <div className={style.footer_Out}>
      <h1 className={style.footer_Main}>Kaira Jewellers</h1>
      <div className={style.footer_Up}>
        <div className={style.left_Two}>
          {leftData.map((item, idx) => (
            <div className={style.data_Cont1} key={idx}>
              <div
                className={style.cross_Cont}
                onClick={() => handleLeftShutter(idx)}
                style={isTabletOrBelow ? { cursor: "pointer" } : undefined}
              >
                <h1 className={style.mainHead}>{item.mainHead}</h1>
                {/* Shutter open/close button (only for tablet or below) */}
                {isTabletOrBelow && (
                  <button
                    className={style.collapseBtn}
                    aria-label={openLeft[idx] ? "Collapse section" : "Expand section"}
                    type="button"
                    tabIndex={0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        color: "white",
                        transition: "transform 0.3s",
                        transform: openLeft[idx] ? "rotate(0deg)" : "rotate(-180deg)"
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                )}
              </div>
              {/* Shutter content for tablet or below, always open for desktop */}
              <div
                className={style.list_Cont}
                style={
                  isTabletOrBelow
                    ? {
                        maxHeight: openLeft[idx] ? "500px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.3s ease"
                      }
                    : undefined
                }
              >
                {(isTabletOrBelow ? openLeft[idx] : true) &&
                  item.links?.map((link, linkIdx) => (
                    <li onClick={() => handlepages(link.path)} key={linkIdx}>{link.text}</li>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className={style.right_Two}>
          {rightData.map((item, idx) => (
            <div className={style.data_Cont} key={idx}>
              <h1>{item.mainHead}</h1>
              <div className={style.list_Cont1}>
                {item.links?.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <span style={{ marginRight: "0.5em" }}>{link.logo}</span>
                    {link.text}
                  </li>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.footer_Down}>
        <h1>&copy; 2025, KAIRA JEWELLERS</h1>
      </div>
    </div>
  )
}

export default Footer