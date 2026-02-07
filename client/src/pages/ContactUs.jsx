import React, { useContext } from 'react'
import style from "../styles/pages/ContactUs.module.css"
import { ContactCon } from '../Context/ContactContext'

const ContactUs = () => {
  const{isOpen,setIsOpen} = useContext(ContactCon)
  return (
    <div className={style.overlay}>
      <div className={style.formContainer}>
        <div className={style.headerRow}>
          <h2 className={style.heading}>Contact Form</h2>
          <button className={style.closeButton} type="button" onClick={() => setIsOpen(false)}>&times;</button>
        </div>
        <form className={style.form}>
          <div className={style.row}>
            <div className={style.inputGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div className={style.row}>
            <div className={style.inputGroup}>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
            </div>
          </div>
          <div className={style.row}>
            <div className={style.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Type your message" rows={4} required className={style.textarea}></textarea>
            </div>
          </div>
          <button type="submit" className={style.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
  