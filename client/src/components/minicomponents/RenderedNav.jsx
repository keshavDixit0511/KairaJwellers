import React, { useContext, useState, useEffect } from "react";
import style from "../../styles/minicomponents/RenderedNav.module.css";
import { ContactCon } from "../../Context/ContactContext";
import { useNavigate } from 'react-router-dom'

import axios  from 'axios';



const RenderedNav = () => {
  const [categories, setCategories] = useState([]); //Dynamic Metal Data (Gold, Silver, Diamond)
  const [subCategories, setSubCategories] = useState([]); //Dynamic subMetal Data (jumka, ring, pendants)
  const [activeIdx, setActiveIdx] = useState(0);
  const {setLoadedDataName} = useContext(ContactCon);  
  const navigate = useNavigate()

  // Fetch Main Categories 
  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const res = await axios.get('/api/jewellery');
        setCategories(res.data.jewelleries);
      } catch (error) {
        console.error("Error fetching main categories:", error);
      }
    };
    fetchMainCategories();
  },[]);

  useEffect(() => {
    if(categories.length > 0) {
      const fetchSubCategories = async () => {
        const currentMetal = categories[activeIdx].name;
        try {
          const res = await axios.get(`/api/jewellery/${currentMetal}/subcategories/names`);
          setSubCategories(res.data.subcategoryNames);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubCategories();
    }
  }, [activeIdx, categories]);


  const handleCategoryClick = (ctg) => {
    // this triger the view all logic for the jewelley page for the metal (Gold, Silver, Diamond)
    setLoadedDataName({
      name: ctg.name,
      banner: ctg.banner,
      type: 'all' //tell the target page to fetch from /:name/all/page/1
    });
    navigate('/Jewellery');
  }

  const handleSubCategoryClick = (subName) => {
    const currentMetal = categories[activeIdx];
    //this triger the specific subcategory fetch
    setLoadedDataName({
      name: currentMetal.name,
      banner: currentMetal.banner,
      subCategory: subName,
      type: 'specific' //tell the target page to fetch from /:name/subCategory/:sub/photos/page/1
    });
    navigate('/Jewellery');
  }

  return (
    <div className={style.outer_Nav}>
      <div className={style.renNav_Wrapper}>
        {/* left bar  */}
        <div className={style.left_Col}>
          {/* category  / Main metal column (GOLD , SILVER, DIAMOND) */}
          <div className={style.categories}>
            {categories.map((ctg, idx) => (
              <h2
                key={ctg._id}
                className={activeIdx === idx ? style.active : ""}
                onMouseEnter={() => setActiveIdx(idx)} // switch subs on hover
                onClick={() => handleCategoryClick(ctg)} //view ALl on click
              >
                {ctg.name.toUpperCase()}
              </h2>
            ))}
          </div>

          {/* subCategories column */}
          <div className={style.middle_ctgy}>
            {
              subCategories.map((subItem, idx) => (
                <div key={idx} onClick={() => handleSubCategoryClick(subItem)} className={style.subItemCard}>
                  <h1>{subItem.charAt(0).toUpperCase() + subItem.slice(1)}</h1>
                </div>
              ))
            }
          </div>
        </div>
        {/* right bar  */}
        <div className={style.right_Col}>
          {/* Display the banner of the currently hovered main category */}
          {
            categories[activeIdx] && (
              <img key={activeIdx} src={categories[activeIdx].banner} alt={`${categories[activeIdx].name} banner`} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default RenderedNav;
