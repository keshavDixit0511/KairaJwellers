import { useState, useRef } from "react";

import styles from "../../styles/AdminPanelCss/Assists.module.css";


const Assists = () => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [activeItem, setActiveItem] = useState({ type: null, index: null });
  const [bannerImages, setBannerImages] = useState([
    "https://res.cloudinary.com/stackashu/image/upload/v1753431874/carasoualIMg2_skuzhs.webp",
    "https://res.cloudinary.com/stackashu/image/upload/v1753431874/img9_eoenga.png",
    "https://res.cloudinary.com/stackashu/image/upload/v1753431872/img2_jaqcnn.jpg",
    "https://res.cloudinary.com/stackashu/image/upload/v1753431872/img3_fkx3k1.jpg",
    "https://res.cloudinary.com/stackashu/image/upload/v1753431873/img7_ssdyft.jpg",
    "https://res.cloudinary.com/stackashu/image/upload/v1753431873/img6_quscim.jpg",
    "https://res.cloudinary.com/stackashu/image/upload/v1753431872/img5_u3xu89.jpg",
    "https://res.cloudinary.com/stackashu/image/upload/v1753431872/img4_zgpqee.jpg",
    "https://res.cloudinary.com/stackashu/image/upload/v1753431874/g4_unsoal.webp",
  ]);

  const [categories, setCategories] = useState([
    {
      img: "https://res.cloudinary.com/stackashu/image/upload/v1753431876/silver_ring_cqcddm.jpg",
      name: "Diamond",
    },
    {
      img: "https://res.cloudinary.com/stackashu/image/upload/v1753431875/pendants-cat_eidhtw.webp",
      name: "Gold",
    },
    {
      img: "https://res.cloudinary.com/stackashu/image/upload/v1753431875/goldring_kzpdvq.webp",
      name: "Silver",
    },
  ]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openCamera = async (type, index) => {
    setActiveItem({ type, index });
    setCapturedImage(null);
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setCameraOpen(false);
    }
  };

  const closeCamera = () => {
    setCameraOpen(false);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      closeCamera();
    }
  };

  const saveCapturedImage = () => {
    if (activeItem.type === "banner") {
      const updatedBanners = [...bannerImages];
      updatedBanners[activeItem.index] = capturedImage;
      setBannerImages(updatedBanners);
    } else if (activeItem.type === "category") {
      const updatedCategories = [...categories];
      updatedCategories[activeItem.index].img = capturedImage;
      setCategories(updatedCategories);
    }
    setCapturedImage(null);
    setActiveItem({ type: null, index: null });
  };

  const removeCapturedImage = () => {
    setCapturedImage(null);
    setActiveItem({ type: null, index: null });
  };

  const renderCategories = categories.map((cat, index) => (

    <div className={styles.catogores} key={index}>
      {/* <p>{cat.name}</p> */}
      <div className={styles.catogoresimage}>
        <div className={styles.catimage}>

          <img src={cat.img} alt={cat.name} />
        </div>
      </div>

      <div className={styles.editCatogory}>
        <div className={styles.editCatogoryText}>
          <h3>Edit here</h3>
          <input type="text" />
        </div>
        <div className={styles.catogoryButtons}>
          <label className={styles.customFileUpload}>

            <input type="file" />
            <span>Select Image</span>
          </label>
          <button onClick={() => openCamera("category", index)}>
            Open Camera
          </button>
        </div>
        {activeItem.type === "category" &&
          activeItem.index === index &&
          capturedImage && (
            <div>
              <img
                src={capturedImage}
                alt="Captured"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div>
                <button onClick={saveCapturedImage}>Save</button>
                <button onClick={removeCapturedImage}>Remove</button>
              </div>
            </div>
          )}
      </div>
    </div>
  ));

  const renderBanners = bannerImages.map((image, index) => (
  
    <div className={styles.banner} key={index}>


      <div className={styles.bannerimage}>
        <img src={image} alt={`Banner ${index + 1}`} />
      </div>
      <div className={styles.banneredit}>
        <label className={styles.customFileUpload}>

          <span>
            <input type="file" />
            Select Image
          </span>
        </label>
        <button onClick={() => openCamera("banner", index)}>Open Camera</button>
      </div>
      {activeItem.type === "banner" &&
        activeItem.index === index &&
        capturedImage && (
          <div>
            <img src={capturedImage} alt="Captured" />
            <div>
              <button onClick={saveCapturedImage}>Save</button>
              <button onClick={removeCapturedImage}>Remove</button>
            </div>
          </div>
        )}
    </div>
  ));

  return (

    <div className={styles.assistsContainer}>
      <label className={styles.heading}>Banner</label>
      <div className={styles.bannerContainer}>
        {renderBanners}
      </div>
      <h1 className={styles.heading}>Categories</h1>
      <div className={styles.mainCatogory}>

        {renderCategories}
      </div>
      {cameraOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 9999,
          }}
        >
          <button
            onClick={closeCamera}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "red",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              zIndex: 10000,
            }}
          >
            Close
          </button>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              zIndex: 9998,
            }}
          />
          <button
            onClick={capturePhoto}
            style={{
              position: "absolute",
              bottom: "30px",
              background: "white",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              border: "2px solid gray",
              cursor: "pointer",
              zIndex: 10000,
            }}
          ></button>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
};

export default Assists;
