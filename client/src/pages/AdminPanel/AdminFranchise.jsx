
import styles from "../../styles/AdminPanelCss/AdminFranchise.module.css";

import FranchiesQuary from "../AdminPanel/FrachiesQuary";
const AdminFranchise = () => {
  const FranchiseData = {
    franchise: [
      {
        name: "Mr. Gunjan Sharma",
        role: "director",
        image:
          "https://res.cloudinary.com/stackashu/image/upload/v1753431873/gunjan_nlqqqk.jpg",
      },
      {
        name: "Mr. Vikash Sharma",
        role: "director",
        image:
          "https://res.cloudinary.com/stackashu/image/upload/v1753431874/vikas_vkmov7.jpg",
      },
    ],
  };

  const renderFranchies = FranchiseData.franchise.map(
    (franchisedata, index) => (

      <div className={styles.franchiesdata} key={index}>
        <div className={styles.img}>
          <img src={franchisedata.image} />
          <div className={styles.selectImg}>
            <label className={styles.customfileupload}>
              <input type="file"/>

              Select Image
            </label>
          </div>
        </div>

        <div className={styles.text}>
          <div className={styles.name}>
            <h3>Name</h3>
            <p>{franchisedata.name}</p>
          </div>
          <div className={styles.role}>

            <h3>Role</h3>
            <p>{franchisedata.role}</p>
          </div>
        </div>
      </div>
    )
  );


  return <div className={styles.franchies}>
    <FranchiesQuary/>
    <div className={styles.owner}>

      {renderFranchies}
    </div>
    </div>;
};

export default AdminFranchise;
