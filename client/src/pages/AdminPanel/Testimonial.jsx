import React, { useContext, useState } from 'react';
import { ContactCon } from "../../Context/ContactContext";
import axios from 'axios';
import styles from "../../styles/AdminPanelCss/AdminTestimonial.module.css";

const Testimonial = () => {
  const { page1, setPage1 } = useContext(ContactCon);
  
  // Local state for the form
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    img: ""
  });
  const [indexToEdit, setIndexToEdit] = useState(0);

  // Word count logic
  const getWordCount = (str) => str.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const words = getWordCount(formData.text);

    // Validation: 70 to 100 words
    if (words < 15 || words > 20) {
      alert(`Word count is ${words}. Please stay between 10 and 20 words.`);
      return;
    }

    try {
      const res = await axios.patch(`http://localhost:5000/api/data/page1/testimonial/${indexToEdit}`, formData);
      
      // Update Context UI
      const updatedPage1 = JSON.parse(JSON.stringify(page1));
      updatedPage1.page1.testimonial[indexToEdit] = formData;
      setPage1(updatedPage1);
      
      alert("Testimonial Updated!");
      setFormData({ name: "", text: "", img: "" }); // Reset form
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.testimonialContainer}>
      <h2>Testimonial Management</h2>

      {/* 1. DISPLAY SECTION: Show what's currently in the DB */}
      <div className={styles.currentList}>
        <h3>Live Testimonials</h3>
        <div className={styles.grid}>
          {page1?.testimonial?.map((item, idx) => (
            <div key={idx} className={styles.card} onClick={() => {setFormData(item); setIndexToEdit(idx);}}>
              <img src={item.img || "https://via.placeholder.com/50"} alt="user" />
              <div>
                <h4>{item.name}</h4>
                <p>{item.text.substring(0, 50)}...</p>
                <small>Slot: {idx}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* 2. FORM SECTION: Add or Edit */}
      <div className={styles.formSection}>
        <h3>Edit Slot {indexToEdit}</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="User Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
          
          <input 
            type="text" 
            placeholder="Image URL (RandomUser API suggested)" 
            value={formData.img}
            onChange={(e) => setFormData({...formData, img: e.target.value})}
            required 
          />

          <textarea 
            placeholder="Review (20 - 30 words)" 
            value={formData.text}
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            required
          ></textarea>
          
          <div className={styles.countBox}>
            Word Count: <span className={getWordCount(formData.text) >= 70 && getWordCount(formData.text) <= 100 ? styles.valid : styles.invalid}>
              {getWordCount(formData.text)}
            </span>
          </div>

          <select onChange={(e) => setIndexToEdit(e.target.value)} value={indexToEdit}>
            <option value="0">Slot 1</option>
            <option value="1">Slot 2</option>
            <option value="2">Slot 3</option>
            <option value="3">Slot 4</option>
            <option value="4">Slot 5</option>
            <option value="5">Slot 6</option>
            <option value="6">Slot 7</option>
          </select>

          <button type="submit">Update Testimonial</button>
        </form>
      </div>
    </div>
  );
};

export default Testimonial;