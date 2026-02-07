import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminPanelCss/AdminJwellery.module.css";
import axios from "axios";

const AdminJwellery = () => {
  const [catogory, setCatogory] = useState("Diamond"); // default Diamond
  const [subcatogory, setSubcatogory] = useState(null);
  const [jwellery, setJwellery] = useState([]);
  const [editImgId, setEditImgId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editFile, setEditFile] = useState(null);

  // Fetch jewellery data
  const fetchJwellery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/jwellery");
      const data = res.data.jwellery || [];
      setJwellery(data);

      // Set first subcategory if category is Diamond
      const selectedCat = data.find((cat) => cat.name === "Diamond");
      if (selectedCat && selectedCat.subcategories?.length > 0) {
        setSubcatogory(selectedCat.subcategories[0].subcategoriesName);
      }
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchJwellery();
  }, []);

  // Edit handlers
  const handleEdit = (img) => {
    setEditImgId(img._id);
    setEditName(img.imageName);
    setEditFile(null);
  };

  const handleCancel = () => {
    setEditImgId(null);
    setEditName("");
    setEditFile(null);
  };



  // Save handler (PATCH request)
  const handleSave = async () => {
    try {
      const imgToUpdate = jwellery
        .flatMap((cat) => cat.subcategories)
        .flatMap((sub) => sub.photos)
        .find((img) => img._id === editImgId);

      if (!imgToUpdate) {
        console.error("Image not found for saving.");
        return;
      }

      let imageUrl = imgToUpdate.image;

      // If new file is selected → upload first
      // if (editFile) {
      //   const formData = new FormData();
      //   formData.append("image", editFile);

      //   const uploadRes = await axios.post("http://localhost:5000/upload", formData, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   });

      //   imageUrl = uploadRes.data.url;
      // }

      // ✅ must match schema exactly (imageName + image)
      const updatedData = {
        imageName: editName,
        image: imageUrl,
      };

      await axios.patch(
        `http://localhost:5000/user/jwellery/${catogory}/${subcatogory}/${editImgId}`,
        updatedData
      );

      await fetchJwellery();
      handleCancel();
    } catch (err) {
      console.error("Error saving:", err.response?.data || err.message);
    }
  };

  // Category handler
  const catogoryHandler = (catName) => {
    setCatogory(catName);
    const selectedCat = jwellery.find((cat) => cat.name === catName);
    if (selectedCat && selectedCat.subcategories?.length > 0) {
      setSubcatogory(selectedCat.subcategories[0].subcategoriesName);
    } else {
      setSubcatogory(null);
    }
  };

  // Render categories
  const renderCategories = jwellery?.map((cat, index) => (
    <div
      className={`${styles.catogoryItem} ${catogory === cat.name ? styles.activeCat : ""
        }`}
      key={index}
      onClick={() => catogoryHandler(cat.name)}
    >
      {cat?.name}
    </div>
  ));

  // Render subcategories
  // Subcategory Dropdown
  const renderSubcategories = jwellery
    ?.filter((cat) => cat?.name === catogory)
    .map((cat) => (
      <div key={cat._id} className={styles.subcatogoryWrapper}>
        <label className={styles.dropdownLabel}>
          {catogory} :
        </label>
        <select
          className={styles.subDropdown}
          value={subcatogory || ""}
          onChange={(e) => setSubcatogory(e.target.value)}
        >
          <option value="" disabled>
            Select a Subcategory
          </option>
          {cat.subcategories?.map((sub) => (
            <option key={sub._id} value={sub.subcategoriesName}>
              {sub.subcategoriesName}
            </option>
          ))}

        </select>
      </div>
    ));

  // Render photos
  const renderPhotos = jwellery
    ?.filter((cat) => cat?.name === catogory)
    .flatMap((cat) =>
      cat.subcategories
        ?.filter((sub) => sub.subcategoriesName === subcatogory)
        .flatMap((sub) =>
          sub.photos?.map((img) => (
            <div key={img._id} className={styles.photoItem}>
              {editImgId === img._id ? (
                <div>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="file"
                    onChange={(e) => setEditFile(e.target.files[0])}
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>{img.imageName}</p>
                  <img src={img.image} alt={img.imageName} className={styles.img} />
                  <br />
                  <button onClick={() => handleEdit(img)}>Edit</button>
                </div>
              )}
            </div>
          ))
        )
    );

  return (
    <div className={styles.bdy}>
      <div className={styles.cat}>
        <div className={styles.catogory}>{renderCategories}</div>
        <div className={styles.subcatogory}>{renderSubcategories}</div>
      </div>
      <div className={styles.photos}>{renderPhotos}</div>
    </div>
  );
};

export default AdminJwellery;
