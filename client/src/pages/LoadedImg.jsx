import React, { useContext } from 'react'
import style from "../styles/pages/LoadedImg.module.css"
import { ContactCon } from '../Context/ContactContext'
const Diamond = () => {
  const{loadedDataName} = useContext(ContactCon)

  return (
    <div className={style.jewellery_Cont} >
      <div className={style.banner}>
        <div className={style.img_Cont}>
          <img src={loadedDataName.banner} alt=''/>
        </div>
      </div>

      <div className={style.jewellery_Wrapper}>
        <h1>{loadedDataName.name}</h1>
        <div className={style.img_Cont1}>
          {loadedDataName.images.map((img,idx)=>(
            <div className={style.img_Hold} key={idx}>
              <div className={style.animated_div}> Visit Shop</div>
              <img src={img} alt={img}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Diamond
 