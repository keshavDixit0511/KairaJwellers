import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import style from "../styles/pages/LoadedImg.module.css";
import { ContactCon } from '../Context/ContactContext';
const Diamond = () => {
  const{loadedDataName} = useContext(ContactCon)
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages from backend


  // Reset page and photos when the Category or Subcategory changes
  useEffect(() => {
    setPhotos([]);
    setPage(1);
  }, [loadedDataName.name, loadedDataName.subCategory]);

  useEffect(() => {
    const fetchPhotos = async () => {
      // 1. Guard: Don't fetch if name is missing
      if(!loadedDataName?.name) return;

      setLoading(true);
      try {
        let url = ""

        // 2. Normalize strings to lowercase for the Backend API
        const metal = loadedDataName.name.toLowerCase();
        // Logic to decide which API route to hit based on the 'type' we set in RenderedNav
        if(loadedDataName.type === 'all') {
          url = `/api/jewellery/${metal}/all/page/${page}`;
        }else {
          const sub = loadedDataName.subCategory.toLowerCase();
          url = `/api/jewellery/${metal}/subcategory/${sub}/photos/page/${page}`
        }

        console.log("Fetching from URL:", url); // Debugging line
        const res = await axios.get(url);
        console.log(res.data);

        setPhotos(prev => page === 1 ? res.data.photos : [...prev, ...res.data.photos]);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setPhotos([]); // Clear photos on error
      }finally{
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [loadedDataName.name, loadedDataName.subCategory, loadedDataName.type, page]);

  return (
    <div className={style.jewellery_Cont}>
      {/* Banner Section remains the same */}
      <div className={style.banner}>
        <div className={style.img_Cont}>
          <img src={loadedDataName?.banner} alt="Banner" />
        </div>
      </div>

      <div className={style.title_Container}>
        <span className={style.category_Tag}>{loadedDataName.name}</span>
        <h2 className={style.subcategory_Title}>
          {loadedDataName.subCategory || "All Collection"}
        </h2>
        <div className={style.divider}></div>
      </div>

      <div className={style.jewellery_Wrapper}>
        <div className={style.img_Grid}>
          {photos?.map((item, idx) => (
            <div className={style.img_Hold} key={item._id || idx}>
               <div className={style.img_Wrapper}>
                <img src={item.image} alt={item.imageName} />
                <div className={style.animated_div}>Visit Shop</div>
              </div>
              <div className={style.item_Info}>
                <p>{item.imageName}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination UI */}
        <div className={style.pagination_Section}>
          {loading && <p>Fetching more designs...</p>}
          
          {!loading && page < totalPages && (
            <button 
              className={style.loadMore_Btn} 
              onClick={() => setPage(prev => prev + 1)}
            >
              Load More Designs
            </button>
          )}

          {page >= totalPages && photos.length > 0 && (
            <p className={style.end_Message}>You've viewed all current designs.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Diamond
 