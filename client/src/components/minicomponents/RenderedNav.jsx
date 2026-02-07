import React, { useContext, useState } from "react";
import style from "../../styles/minicomponents/RenderedNav.module.css";
import img from "../../assets/Images/jewellery.jpg";
import { ContactCon } from "../../Context/ContactContext";
import ban1 from '../../assets/Images/loadedImgData/dBanner.jpg'
import ban2 from '../../assets/Images/loadedImgData/gBanner.jpg'
import ban3 from '../../assets/Images/loadedImgData/sBanner.jpg'
import img1 from '../../assets/Images/gold/g1.webp'
import img2 from '../../assets/Images/gold/g2.webp'
import img3 from '../../assets/Images/gold/g3.webp'
import img4 from '../../assets/Images/gold/g4.webp'
import img5 from '../../assets/Images/gold/g5.webp'
import { useNavigate } from 'react-router-dom'


const items = [
  {
    name: "Gold",
    items: [
      "Jhumkas",
      "Bangles",
      "Necklaces",
      "Kadas",
      "Earrings",
      "Bracelets",
      "Gold Chains",
      "Pendants",
      "Rings",
      "Engagement Rings",
      "Nose Pins",
      "Mangalsutras"
    ]
  },
  {
    name: "Diamond",
    items: [
      "Rings",
      "Bracelets",
      "Gold Chains",
      "Earrings",
      "Bangles",
      "Necklaces",
      "Jhumkas",
      "Engagement Rings",
      "Mangalsutras",
      "Nose Pins",
      "Kadas",
      "Pendants"
    ]
  },
  {
    name: "Silver",
    items: [
      "Mangalsutras",
      "Nose Pins",
      "Kadas",
      "Pendants",
      "Jhumkas",
      "Bangles",
      "Bracelets",
      "Earrings",
      "Gold Chains",
      "Rings",
      "Engagement Rings",
      "Necklaces"
    ]
  }
];

const category = [
  { name: "Diamond", banner: ban1 },
  { name: "Gold", banner: ban2 },
  { name: "Silver", banner: ban3 }
];

const RenderedNav = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { setLoadedDataName, loadedDataName } = useContext(ContactCon)
  const navigate = useNavigate()


  const handleRequiredData = ()=>{
    if(true){
      // here call the api for the requested data 
      navigate('/Jewellery')
    }else{
      return
    }
  
 
  }

  return (
    <div className={style.outer_Nav}>
      <div className={style.renNav_Wrapper}>
        {/* left bar  */}
        <div className={style.left_Col}>
          {/* category  */}
          <div className={style.categories}>
            {category.map((ctg, idx) => (
              <h2
                key={idx}
                className={activeIdx === idx ? style.active : ""}
                onClick={() => {
                  setActiveIdx(idx);
                  setLoadedDataName({ name: ctg.name, banner: ctg.banner, images:[img1,img2,img3,img4,img5 ]}); //add images in that after api call
                  handleRequiredData()
                }}
              >
                {ctg.name}
              </h2>
            ))}
          </div>
          <div className={style.middle_ctgy}>
            {items[activeIdx].items.map((subItem, idx) => (
              <div key={subItem + idx}>
                {/* You can add an image for each subItem if available */}
                {/* <img src="" alt="" /> */}
                <h1>{subItem}</h1>
              </div>
            ))}
          </div>
        </div>
        {/* right bar  */}
        <div className={style.right_Col}>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default RenderedNav;
