import React, { useContext, useEffect } from "react";
import style from "../styles/pages/Franchise.module.css";
import gunjan from ".././assets/Images/franchise/gunjan.jpeg";
import vikas from ".././assets/Images/franchise/vikas.jpg";
import { ContactCon } from "../Context/ContactContext";
import axios from "axios";

const points = [
  {
    heading: "Trusted Brand Legacy",
    body: "Partner with a reputed brand built on over a decade of excellence, trust, and customer loyalty in the jewellery industry.",
  },
  {
    heading: "Premium Product Range",
    body: "Offer customers handcrafted, machine-engraved, and polished jewellery that blends traditional heritage with contemporary elegance.",
  },
  {
    heading: "Proven Business Model",
    body: "Backed by successful operations since 2015 and a strong presence in multiple locations, ensuring a low-risk, scalable franchise opportunity.",
  },
  {
    heading: "Strong Market Reputation",
    body: "Recognized as a preferred choice for fine jewellery in Gurgaon and Greater Noida, with a loyal and expanding customer base.",
  },
  {
    heading: "High-Quality Standards",
    body: "Benefit from a house quality control system ensuring every product meets the highest standards of craftsmanship and durability.",
  },
  {
    heading: "Continuous Product Innovation",
    body: "Leverage a design-forward approach that keeps pace with evolving market trends while preserving timeless artistry.",
  },
];
const states = [
  "Delhi NCR",
  "Chandigarh",
  "Jaipur",
  "Lucknow",
  "Dehradun",
  "Agra",
];
const user = [
  {
    name: "Mr. Gunjan Sharma",
    role: "Director",
    image: gunjan,
  },
  {
    name: "Mr. Vikash Sharma",
    role: "Director",
    image: vikas,
  },
];
const Franchise = () => {
  const { page4, setPage4 } = useContext(ContactCon);
  useEffect(() => {
    axios
      .get("api/data/page4")
      .then((res) => {
        setPage4(res.data);
        // console.log(res.data)
        // Set the user array with the data from page4 if available
        if (res.data && res.data.user && Array.isArray(res.data.user)) {
          // Overwrite the user array with the data from page4
          user.splice(0, user.length, ...res.data.user);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  const { setOpenFranchiseForm } = useContext(ContactCon);
  const drivers = [
    {
      title: "Growing Middle Class Population",
      content: [
        "55% of the population is expected to join the middle class by 2025.",
        "Increased wealth in the middle class leads to higher acquisition of gold for both consumption and investment.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/1975/1975607.png",
    },
    {
      title: "Increasing Women Workforce",
      content: [
        "Higher education levels have increased the percentage of women in the workforce.",
        "Rising income levels of working couples and lifestyle changes have fueled the demand for gems and jewellery.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/4601/4601899.png",
    },
    {
      title: "Indian Wedding Market",
      content: [
        "The Indian wedding jewellery market is estimated at Rs 3 Lakh Crore /Annum.",
        "Growing at a rate of 7–8% annually.",
        "35% of Indians are 10–29 Years old.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/3176/3176295.png",
    },
    {
      title: "Rise in Branded Jewellery",
      content: [
        "Preference shift from the unorganized sector to the organized sector.",
        "Organized brands introduce distinctive designs.",
        "Brand-conscious consumers prefer known names.",
      ],
      image: "https://cdn-icons-png.flaticon.com/512/1792/1792532.png",
    },
  ];
  return (
    <div className={style.Franchise_Out}>
      <h1 className={style.Main_head}>
        India's Fastest Growing Diamond Gold Jewellery brand Franchise
      </h1>
      {/* RollOUt  */}
      <div className={style.Fra2_out}>
        <h1>Rollout Plan</h1>
        <div className={style.States_Wrapper}>
          <div className={style.States}>
            {states.map((st, idx) => (
              <div key={idx}>
                <h2>{st}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.Franchise_Topwrapper}>
        {/* heading  */}
        <div className={style.Top_heading}>
          <h2>
            REASONS TO PARTNER WITH KAIRA JEWELLERS
            <span className={style.goldUnderline}></span>
          </h2>
        </div>
        {/* key points  */}
        <div className={style.pointsWrapper}>
          <div className={style.points}>
            {points.map((pt, idx) => (
              <div className={style.rendered_Stuff} key={idx}>
                <div>
                  <h1>
                    <span className={style.ball}></span>
                    {pt.heading}
                  </h1>
                  <p>{pt.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Market Growth Section */}
      <div className={style.growthContainer}>
        <h2>Market Growth Drivers</h2>
        <div className={style.growthGrid}>
          {drivers.map((item, i) => (
            <div className={style.growthCard} key={i}>
              <img
                src={item.image}
                alt={item.title}
                className={style.growthImg}
              />
              <h3>{item.title}</h3>
              <ul>
                {item.content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Management Section */}
      <section className={style.managementSection}>
        <h2 className={style.managementTitle}>Our Management</h2>
        <div className={style.managementGrid}>
          {user.map((person, index) => (
            <div className={style.managementCard} key={index}>
              <img
                src={person.image}
                alt={person.name}
                className={style.managementImg}
              />
              <h3>{person.name}</h3>
              <p className={style.role}>({person.role})</p>
            </div>
          ))}
        </div>
        <p className={style.tagline}>
          We believe in teamwork, and our Core Management team is ready to help
          you succeed!
        </p>
      </section>
      {/* Quote and Button Row */}
      <div className={style.franchiseQuoteRow}>
        <span className={style.franchiseQuote}>
          Want to be a Franchise partner?
        </span>
        <button
          className={style.franchiseQuoteBtn}
          onClick={() => setOpenFranchiseForm(true)}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Franchise;
