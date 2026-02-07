import style from "../styles/pages/OurStory.module.css";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const OurStory = () => {
  const left = [
    {
      date: "2004",
      content:
        "We have started our entrepreneur Journey in to 2004 from Wholesale business in Mumbai & Surat.",
        icon: <FaRegArrowAltCircleRight className={style.icons} />,
    },
    {
      date: "2017",
      content:
        "We gained recognition in the market for our unique styles so we thought of expanding and opening the new store in Greater Noida.",
        icon: <FaRegArrowAltCircleRight className={style.icons} />,
    },
  ];

  const right = [
    {
      date: "2015",
      content:
        "In 2015, Gunjan took a bold step by opening his own retail store. Although it was a risky venture, his dedication and skill led him to success.",
        icon: <FaRegArrowAltCircleLeft  className={style.icons} />,
    },
    {
      date: "2025",
      content:
        "Planning to create Pan India presence through Franchise stores.",
        icon: <FaRegArrowAltCircleLeft  className={style.icons} />,
    },
  ];

  const renderLeftdata = left.map((data, index) => {
    return (
      <div key={index} className={style.leftContainer}>
        <div className={style.leftcircle}>
            <h2>{data.date}</h2>
             <span>{data.icon}</span>
        </div>
        <p>{data.content}</p>
      </div>
    );
  });

  const renderRightData = right.map((data, idx) => {
    return (
      <div className={style.rightContainer} key={idx}>
        <div className={style.rightCircle}>
             <span>{data.icon}</span>
            <h2>{data.date}</h2>
        </div>
        <p>{data.content}</p>
      </div>
    );
  });

  return (
    <div className={style.ourStoryMainContainer}>
      <h1>OUR JOURNEY THROUGH TIME</h1>
      <div className={style.ourStoryContainer}>
        <div className={style.left}>{renderLeftdata}</div>
        <div className={style.lineContainer}> 
            <div className={style.line}>
            </div>
        </div>
        <div className={style.right}>{renderRightData}</div>
      </div>
    </div>
  );
};

export default OurStory;
