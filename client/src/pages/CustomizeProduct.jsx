import React from 'react';
import styles from '../styles/pages/CustomizeProduct.module.css';

const CustomizeProduct = () => {
  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <h2>Customer Details</h2>
        
        <div className={styles.inputGroup}>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />
        </div>
        
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Country</label>
            <input type="text" placeholder="Enter your country" />
          </div>
          <div className={styles.inputGroup}>
            <label>State</label>
            <input type="text" placeholder="Enter your state" />
          </div>
          <div className={styles.inputGroup}>
            <label>City</label>
            <input type="text" placeholder="Enter your city" />
          </div>
        </div>
        
        <div className={styles.inputGroup}>
          <label>Full Address</label>
          <input type="text" placeholder="Enter your full address" />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Select Metal Type</label>
            <select>
              <option>-- Select --</option>
              <option>Gold</option>
              <option>Silver</option>
              <option>Platinum</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Select size</label>
            <select>
              <option>-- Select size --</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Upload Product Image</label>
          <input type="file" />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Product Description</label>
          <textarea placeholder="Enter product description..."></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default CustomizeProduct;
