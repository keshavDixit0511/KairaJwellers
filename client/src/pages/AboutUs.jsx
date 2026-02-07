import React from 'react'
import style from "../styles/pages/AboutUs.module.css"
const AboutUs = () => {

    const AboutUs = [
    {
        heading: "Welcome to Kaira Jewellers",
      para: `1Experience luxury, craftsmanship, and authenticity with Kaira Jewellers – your ultimate jewellery destination. At KS Kaira Jewellers Pvt. Ltd., we believe jewellery is not merely an adornment, but an expression of identity, elegance, and cultural heritage.

Based in Palam Vihar, Gurgaon, we have built a legacy of trust and excellence through our unwavering commitment to quality, creativity, and customer satisfaction. Every piece of jewellery we design is a harmonious blend of traditional artistry and modern aesthetics, crafted to celebrate individuality and timeless beauty.`,
    },
    {
      heading: "Our Journey Through Time",
       ul: [
        "2004 – Our entrepreneurial journey began in Mumbai & Surat with wholesale jewellery trading.",
        "2015 – Mr. Gunjan Sharma took a bold step to establish his first retail store, transforming vision into reality.",
        "2017 – With growing recognition and customer trust, we expanded by opening a new store in Greater Noida.",
        "2025 & Beyond – Our vision is to create a Pan-India presence through franchise stores, making Kaira Jewellers a household name.)",
      ],
    },
    {
      heading: "Meet Our Managing Directors",
      mentor:"Mr. Gunjan Sharma",
      para: "With over two decades of expertise in gold, diamonds, and gemstones, Mr. Gunjan Sharma is the driving force behind the brand. His entrepreneurial leap in 2015 established K S Jewellers, a venture that quickly earned respect for its craftsmanship and trust.",
    },
    {
      mentor:"Mr. Vikas Sharma",
      para: "Joining his brother in 2017, Mr. Vikas Sharma brought creativity and vision that helped expand the brand across Gurugram and Greater Noida West. Together, the duo continues to scale new heights while upholding the values of integrity, innovation, and humility.",
    },
    {
      heading: "Why Follow Our Blog?",
      para: `✔ Unmatched Craftsmanship – Each piece is designed with precision and passion.
✔ Authenticity Guaranteed – Trusted sources and certified materials.
✔ Modern Yet Traditional – A blend of heritage and contemporary styles.
✔ Customer-Centric Approach – Our priority is to make every purchase special.
`,
    },
  ];

   const renderAboutUs = AboutUs.map((AboutUs, id) => {
  return (
    <div className={style.conditionSection} key={id}>
      <div className={style.text}>
        {AboutUs.heading && <h1>{AboutUs.heading}</h1>}
        {AboutUs.mentor && <h2>{AboutUs.mentor}</h2>}

        {/* Correctly render para with HTML (for ✔ etc.) */}
        {AboutUs.para && (
          <p dangerouslySetInnerHTML={{ __html: AboutUs.para }}></p>
        )}

        {/* Render list if exists */}
        {AboutUs.ul && (
          <ul>
            {AboutUs.ul.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        )}

        {/* Render mentor if present */}
        
      </div>
    </div>
  );
});

  return (
    <div className={style.termAndConditionCOntainer}>
          <div className={style.termsinnerContainer}>
            <h1>About Us – Kaira Jewellers</h1>
            {renderAboutUs}
          </div>
        </div>
  )
}

export default AboutUs