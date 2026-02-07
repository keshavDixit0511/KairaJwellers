import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from '../../styles/AdminPanelCss/AdminGallery.module.css';

const AdminGallery = () => {
  const [galleryData, setGalleryData] = useState(null); // initially null
  const [capturedImages, setCapturedImages] = useState({});
  const [cameraOpen, setCameraOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // ✅ Fetch gallery data from API
  useEffect(() => {
    axios
      .get("/api/data/page3")
      .then((res) => {
        setGalleryData(res.data.gallery);
        console.log("Gallery API:", res.data.gallery);
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  // Open camera
  const handleOpenCamera = async (section, index) => {
    setActiveSection(section);
    setActiveIndex(index);
    setCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // Close camera
  const handleCloseCamera = () => {
    setCameraOpen(false);
    let stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  // Capture photo
  const handleCapture = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL("image/png");

    setCapturedImages(prev => ({
      ...prev,
      [`${activeSection}-${activeIndex}`]: imageData
    }));

    handleCloseCamera();
  };

  // Save captured image as original
  const handleSave = (section, index) => {
    const key = `${section}-${index}`;
    const updatedSection = [...galleryData[section]];
    updatedSection[index] = capturedImages[key];

    setGalleryData(prev => ({
      ...prev,
      [section]: updatedSection
    }));

    setCapturedImages(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  // Remove captured image
  const handleRemove = (section, index) => {
    const key = `${section}-${index}`;
    setCapturedImages(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleFileChange = (e, sectionName, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const key = `${sectionName}-${index}`;
        setCapturedImages((prev) => ({ ...prev, [key]: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Render images
  const renderSection = (sectionName, images) => (
    <div key={sectionName}>
      <h3 className={styles.heading}>
        {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
      </h3>
      <div className={styles.diamand}>
        {images.map((img, index) => {
          const key = `${sectionName}-${index}`;
          return (
            <div className={styles.selectImg} key={key}>
              <div className={styles.Img}>
                <img src={img} alt="Default" />
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, sectionName, index)}
                />
                <button onClick={() => handleOpenCamera(sectionName, index)}>
                  Open Camera
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ✅ Wait until data is loaded
  if (!galleryData) {
    return <p>Loading gallery...</p>;
  }

  return (
    <div className={styles.gallery}>
      {renderSection("carousel", galleryData.carousel)}
      {renderSection("diamond", galleryData.diamond)}
      {renderSection("gold", galleryData.gold)}
      {renderSection("silver", galleryData.silver)}

      {cameraOpen && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            zIndex: 9999
          }}
        >
          <button
            onClick={handleCloseCamera}
            style={{
              position: "absolute", top: 20, right: 20,
              background: "red", color: "white",
              padding: "5px 10px", border: "none", cursor: "pointer"
            }}
          >
            Close
          </button>
          <video ref={videoRef} autoPlay playsInline style={{ maxWidth: "100%", maxHeight: "70%" }} />
          <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />
          <button
            onClick={handleCapture}
            style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "white", border: "5px solid gray",
              marginTop: 20, cursor: "pointer"
            }}
          ></button>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
