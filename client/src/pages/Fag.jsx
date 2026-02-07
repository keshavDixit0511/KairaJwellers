import React from 'react'
// import { div } from 'three/src/nodes/TSL.js'
import { useState } from 'react';
import style from '../styles/LandingPage/Fag.module.css'

const Fag = () => {

    const [openIndex, setOpenIndex] = useState(null); 
     const [isActive, setIsActive] = useState(false);

    const fag = [
        {
        qa:"Who are KS Kaira Jewellers Pvt. Ltd.?",
        ans:'At KS Kaira Jewellers Pvt. Ltd., jewellery is not only an adornment but an expression of identity, elegance, and cultural legacy. Based in Palam Vihar, Gurgaon, we are known for our commitment to quality, craftsmanship, and customer satisfaction'
    },
      {
        qa:"What is unique about your craftsmanship?",
        ans:'Each piece is handcrafted or machine-engraved by skilled artisans, blending traditional artistry with modern aesthetics to create timeless jewellery.'
    },
    {
        qa:"What types of jewellery do you offer?",
        ans:'We offer handcrafted jewellery, machine-engraved designs, and polished collections that perfectly balance traditional and modern styles.'
    },
    {
        qa:"How do you ensure quality?",
        ans:'We use only the finest materials like gold, diamonds, and precious stones. Every piece undergoes strict quality checks to ensure durability and excellence.'
    },
    {
        qa:"What's the story behind Kaira Jewellers?",
        ans:'Founded by Gunjan in 2015, Kaira Jewellers started as a bold venture and has grown through unique styles and dedication, expanding to Greater Noida and planning Pan India franchise stores.'
    },
]

 const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
    setIsActive(!isActive)
     
    // if clicked again → close it
  };


const renderFag = fag.map((item,index) => {
    return <div className={`${style.fagsection} ${openIndex === index ? style.active : style.inactive}`} >
         <div >
           <h2
            style={{ cursor: "pointer" }}
            onClick={() => handleToggle(index)}        
          >
            {item.qa}
          </h2>
          {openIndex === index && <p>{item.ans}</p>}
         </div>
        </div>
})

  return (
    <div className={style.fagContainer}>
        <div className={style.innnerfag}>
          <h1 className={style.heading}>Frequently Asked Questions</h1>
          {renderFag}
        </div>
    </div>
  )
}

export default Fag