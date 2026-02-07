import Navbar from "./Navbar";
import { useState } from "react";
import Home from "./AdminHome";
import Stores from "./Stores";
import AdminGallery from "./AdminGallery";
import AdminFranchise from "./AdminFranchise";
import AdminJwellery from "./AdminJwellery";
import Assists from './Assists'
import style from '../../styles/AdminPanelCss/AdminPage.module.css'


const AdminPage = () => {

  const [page, setPage] = useState("home");

  const renderComponent = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "stores":
        return <Stores />;  
      case "gallery":
        return <AdminGallery />;
      case "franchise":
        return <AdminFranchise />;
        case "assits":
        return <Assists/>
      case "jewellery":
        return <AdminJwellery/>
      default:
        return <div>Select a section</div>;
    }
  };

  return (

    <div className={style.adminPanel}>
      <Navbar setPage={setPage} />
      {renderComponent()}
    </div>
  );
};

export default AdminPage;
