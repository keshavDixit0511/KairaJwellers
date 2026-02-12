import { useState } from "react"
import { IoIosMenu } from "react-icons/io";

import styles from '../../styles/AdminPanelCss/Navbar.module.css'



const Navbar = ({ setPage }) => {

  const [activePage, setactivePage] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (page) => {
    setPage(page);
    setactivePage(page);
    setMenuOpen(false);
  };

  return (


    <div className={styles.navbar}>
      {/* Menu Icon for small screens */}
      <div className={styles.navIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <IoIosMenu />
      </div>

      {/* Menu Items */}
      <div className={`${styles.menuItems} ${menuOpen ? styles.showMenu : ""}`}>
        <p className={activePage === "home" ? styles.active : ""} onClick={() => handleClick("home")}>Home</p>
        <p className={activePage === "testimonial" ? styles.active : ""} onClick = {() => handleClick("testimonial")}>Testimonials</p>
        <p className={activePage === "stores" ? styles.active : ""} onClick={() => handleClick("stores")}>Stores</p>
        <p className={activePage === "gallery" ? styles.active : ""} onClick={() => handleClick("gallery")}>Gallery</p>
        <p className={activePage === "franchise" ? styles.active : ""} onClick={() => handleClick("franchise")}>Franchise</p>
        <p className={activePage === "jewellery" ? styles.active : ""} onClick={() => handleClick("jewellery")}>Jewellery</p>
        <p className={activePage === "assits" ? styles.active : ""} onClick={() => handleClick("assits")}>Assists</p>
      </div>
    </div>


  )
}

export default Navbar