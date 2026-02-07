
import styles from "../../styles/AdminPanelCss/AdminHome.module.css";
import TrackingUser from "./TrackingUser";

const Home = () => {

    const data = {
    about: {
      numberData: [
        { num: 500, name: "Branches" },
        { num: 1200, name: "Employees" },
      ],
      LargeText:
        "At KS Kaira Jewellers Pvt. Ltd., jewellery is not only an adornment but an expression of identity, elegance, and cultural legacy. Based in Palam Vihar, Gurgaon, we have earned a trusted name in the jewellery industry through our unwavering commitment to quality, craftsmanship, and customer satisfaction. Our journey began with a vision to seamlessly blend traditional artistry with modern aesthetics, crafting timeless pieces that speak to both heritage and individuality.",
    },
    quote:
      "Jewellery is a story you wear, a memory you treasure, and a promise you keep.",
  };

  return (

    <div className={styles.adminHomeContainer}>
     <TrackingUser/>
      <div className={styles.landingPage}>
        <div className={styles.quote}>

          <label>Quote</label>
          <p>{data.quote}</p>
          <input placeholder="edit Quote" type="text" />
          <button>update</button>
        </div>

        <div className={styles.about}>

          <label>About</label>
          <p>{data.about.LargeText}</p>
          <textarea placeholder="Edit About"></textarea>
          <button>update</button>

          <span className={styles.number}>

            {data.about.numberData.map((number, index) => (
              <div key={index}>
                <h3>{number.name}</h3>
                <p>{number.num}</p>
                <input type="text" />
                <button>Edit here</button>
              </div>
            ))}
          </span>
        </div>
      </div>   
    </div>
  );
};

export default Home;
