import styles from "../../styles/LandingPage/Catogories.module.css";
import React, { useContext } from "react";
import goldRingImg from "../../assets/Images/category/goldring.webp";
import pendantsCatImg from "../../assets/Images/category/pendants-cat.webp";
import silverRingImg from "../../assets/Images/category/silver ring.jpg";
import { ContactCon } from "../../Context/ContactContext";



const Catogories = () => {
  const{page1} = useContext(ContactCon)

  return (
    <div className={styles.Catogories_main}>
      <div className={styles.Catogories_title}>
        <h1>Categories</h1>
      </div>

      <div className={styles.Catogories_main_boxes}>
        {page1?.categories?.map((category, idx) => (
          <div className={styles.Catogories_boxes} key={idx}>
            <div   className={styles.Catogories_img}>
            <img
            
              src={category.img}
              alt={category.img}
            />
            </div>  
           
            <h1 className={styles.catg_Name} >
              {category.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catogories;
