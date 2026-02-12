
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/AdminPanelCss/AdminHome.module.css";
import TrackingUser from "./TrackingUser";
import { ContactCon } from "../../Context/ContactContext";
import axios from "axios";


const Home = () => {
  const { page1, setPage1 } = useContext(ContactCon); // getting the data from the context

  const [newQuote, setNewQuote] = useState(""); //usestate for the new quote
  const [newAbout, setNewAbout] = useState(""); //usestate for the new about
  //using an object to track which number index is being edited
  const [newNums, setNewNums] = useState({}); //usestate for the new Numbers section for the happy customers and branches


  // here we are fetching data . trying to hit the route in the backend landingPage.route.js 
  useEffect(() => {  // useEffect to fetch the data and manage the side effects
    //  axios.get("/api/data/page1").then((res)=>{setPage1(res.data) ; console.log(res.data)}).catch((err)=>console.error(err))
    const fetchData = async () => { //async function to fetch the data
      try {
        const response = await axios.get("/api/data/page1"); // hit the get route and store the response
        if (response.status === 200) {
          setPage1(response.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch data: ", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setPage1])

  // Handler for the Qote
  const updateQuote = async () => { // async function to update the quote in the database
    try {
      const res = await axios.patch("/api/data/page1/quote", { quote: newQuote });  // hit the patch route to update the quote   
      console.log(res);
      setPage1(prev => ({ ...prev, quote: newQuote })); //update the ui instantly
      setNewQuote(""); //emptying the field after update
      alert("Quote updated successfully"); // succesful message
    } catch (err) {
      console.error(err);
    }
  }

  // Handler for the About
  const updateAboutText = async () => {
    try {
      const res = await axios.patch("/api/data/page1/about/largetext", { about: newAbout });
      setPage1(prev => ({ ...prev, about: { ...prev.about, LargeText: newAbout } })); //update the ui instantly
      setNewAbout(""); //emptying the field after update
      alert("About updated successfully"); // succesful message
    } catch (error) {
      console.error(error);
    }
  }


  // Handler for the Numbers
  const updateNumbers = async (index, name) => {  // async function to update the numbers for the about branch numbers and happy customers
    try {
      const numValue = newNums[index];
      if (!numValue) return alert("Enter a number"); //checking if user entered a number or not

      const res = await axios.patch(`/api/data/page1/about/number/${index}`, { name, num: numValue });

      if (res.data.success) {
        // 3. IMMUTABLE UPDATE: Create a deep copy of the page1 state
        // This prevents the "Cannot set properties of undefined" error
        const updatePage1 = JSON.parse(JSON.stringify(page1));

        //Ensure the nested path exists in our local copy
        if (!updatePage1.about) updatePage1.about = {}; //if it doesn't exist, create it
        if (!updatePage1.about.numberData) updatePage1.about.numberData = []; //if it doesn't exist, create it

        // update the specific index with new value
        updatePage1.about.numberData[index] = {
          ...updatePage1.about.numberData[index],
          name: name,
          num: numValue
        };

        setPage1(updatePage1); //update the ui / context / state

        //clear the input field
        setNewNums(prev => {
          const copy = { ...prev };
          delete copy[index];
          return copy;
        });

        alert(`Counter ${name} updated successfully to ${numValue}`);
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (

    <div className={styles.adminHomeContainer}>
      <TrackingUser />
      <div className={styles.landingPage}>

        {/* --- Quote Section --- */}
        <div className={styles.quote}>
          <label>Quote</label>
          <p>{page1?.quote}</p>
          <input
            value={newQuote}
            placeholder="Edit Quote"
            type="text"
            onChange={(e) => setNewQuote(e.target.value)}
          />
          <button onClick={updateQuote}>Update</button>
        </div>

        {/* --- About Large Text Section --- */}
        <div className={styles.about}>
          <label>About</label>
          <p>{page1?.about?.LargeText}</p>
          <textarea
            value={newAbout}
            onChange={(e) => setNewAbout(e.target.value)}
            placeholder="Edit About"
            rows="4"
          />
          <button onClick={updateAboutText}>Update</button>
        </div>

        {/* --- Numbers Section (AB BAHAR HAI) --- */}
        <div className={styles.statsWrapper}>
          {page1?.about?.numberData?.map((number, index) => (
            <div key={index} className={styles.number}>
              {/* SS-1 order: 1. Value, 2. Input, 3. Label, 4. Button */}
              <h3>{number.num}</h3>
              <input
                type="text"
                placeholder="New Value"
                onChange={(e) => setNewNums({ ...newNums, [index]: e.target.value })}
              />
              <p>{number.name}</p>
              <button onClick={() => updateNumbers(index, number.name)}>Edit here</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
