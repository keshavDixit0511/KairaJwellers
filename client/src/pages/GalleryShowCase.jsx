import React, { useContext, useEffect } from "react";
import style from "../styles/pages/GalleryShowCase.module.css";
import Carasoule from "../components/LandingPage/Carasoule";
import gold from "../assets/Images/biscuits/gold.png";
import silver from "../assets/Images/biscuits/silver.png";
import { ContactCon } from "../Context/ContactContext";
import axios from "axios";

const GalleryShowCase = () => {
  const { page3, setPage3 } = useContext(ContactCon);

  useEffect(() => {
    axios
      .get("/api/data/page3")
      .then((res) => {
        setPage3(res.data.gallery);
        console.log(res.data.gallery);
      })
      .catch((err) => console.error(err));
    console.log(page3?.carousel, "data printed");
  }, [setPage3]);
``
  return (
    <div>
      <Carasoule />
      {/* diamond section  */}
      <div className={style.diamond_Div}>
        <div className={style.dia_Top}>
          <h1>Diamond collection</h1>
          <h3>Crafted by nature, perfected by design.</h3>
        </div>
        <div className={style.dia_Bottom}>
          <div className={style.pic_Cont}>
            <div className={style.largeCard}>
              <img className={style.pic1} src={page3?.diamond?.[0]} alt="Diamond 1" />
            </div>
            <div>
              <img className={style.pic2} src={page3?.diamond?.[1]} alt="Diamond 2" />
            </div>
            <div>
              <img className={style.pic3} src={page3?.diamond?.[2]} alt="Diamond 3" />
            </div>
            <div>
              <img className={style.pic4} src={page3?.diamond?.[3]} alt="Diamond 4" />
            </div>
            <div>
              <img className={style.pic5} src={page3?.diamond?.[4]} alt="Diamond 5" />
            </div>
          </div>
        </div>
      </div>

      {/* gold section */}
      <div className={style.gold_Div}>
        <div className={style.dia_Top}>
          <h1>Gold collection</h1>
          <h3>A piece of gold, a piece of your story.</h3>
        </div>
        <div className={style.dia_Bottom}>
          <div className={style.pic_Cont}>
            <div className={style.largeCard}>
              <img className={style.pic1} src={page3?.gold?.[0]} alt="Gold 1" />
            </div>
            <div>
              <img className={style.pic2} src={page3?.gold?.[1]} alt="Gold 2" />
            </div>
            <div>
              <img className={style.pic3} src={page3?.gold?.[2]} alt="Gold 3" />
            </div>
            <div>
              <img className={style.pic4} src={page3?.gold?.[3]} alt="Gold 4" />
            </div>
            <div>
              <img className={style.pic5} src={page3?.gold?.[4]} alt="Gold 5" />
            </div>
          </div>
        </div>
      </div>

      {/* silver section  */}
      <div className={style.silver_Div}>
        <div className={style.dia_Top}>
          <h1>Silver collection</h1>
          <h3>Crafted to grace. Designed in silver.</h3>
        </div>
        <div className={style.dia_Bottom}>
          <div className={style.pic_Cont}>
            <div className={style.largeCard}>
              <img className={style.pic1} src={page3?.silver?.[0]} alt="Silver 1" />
            </div>
            <div>
              <img className={style.pic2} src={page3?.silver?.[0]} alt="Silver 2" />
            </div>
            <div>
              <img className={style.pic3} src={page3?.silver?.[0]} alt="Silver 3" />
            </div>
            <div>
              <img className={style.pic4} src={page3?.silver?.[3]} alt="Silver 4" />
            </div>
            <div>
              <img className={style.pic5} src={page3?.silver?.[4]} alt="Silver 5" />
            </div>
          </div>
        </div>
      </div>

      {/* gold and silver biscuit  */}
      <div className={style.biscuit}>
        <h1 className={style.biscuit_head}>Gold and Silver Biscuit and Coin</h1>
        <div className={style.bis_Wrap}>
          <div>
            <img src={gold} alt="Gold Biscuit" />
          </div>
          <div>
            <img src={silver} alt="Silver Biscuit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryShowCase;
