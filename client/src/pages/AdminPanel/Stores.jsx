import React, { useState, useRef } from 'react';
// import Webcam from 'react-webcam';
import data from '../AdminPanel/Store.json';
import styles from '../../styles/AdminPanelCss/Stores.module.css';

function Stores() {
  const [stores, setStores] = useState(data.store);
  const [editingIndex, setEditingIndex] = useState(null);

  // Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [addCameraOpen, setAddCameraOpen] = useState(false);

  const webcamRef = useRef(null);
  const addWebcamRef = useRef(null);

  // New store data
  const [newStore, setNewStore] = useState({
    name: '',
    address: '',
    phone: '',
    mapsrc: '',
    image: ''
  });

  // --- Handlers ---
  const handleChange = (e, field, index) => {
    const updated = [...stores];
    updated[index][field] = e.target.value;
    setStores(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsCameraOpen(false);
  };

  const handleUpdate = () => {
    setEditingIndex(null);
    setIsCameraOpen(false);
  };

  const captureImage = (index) => {
    const imageSrc = webcamRef.current.getScreenshot();
    handleChange({ target: { value: imageSrc } }, 'image', index);
    setIsCameraOpen(false);
  };

  const captureNewStoreImage = () => {
    const imageSrc = addWebcamRef.current.getScreenshot();
    setNewStore({ ...newStore, image: imageSrc });
    setAddCameraOpen(false);
  };

  const handleAddStore = () => {
    if (!newStore.name || !newStore.address || !newStore.phone || !newStore.mapsrc || !newStore.image) {
      alert('Please fill all fields and add an image!');
      return;
    }
    setStores([...stores, newStore]);
    setNewStore({ name: '', address: '', phone: '', mapsrc: '', image: '' });
  };

  const removeImageAdd = () => {
    setNewStore({ name: '', address: '', phone: '', mapsrc: '', image: '' });
  };

  // --- Render ---
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Our Stores</h3>

      <div className={styles.storeGrid}>
        {stores.map((store, index) => (
          <div className={styles.storeCard} key={index}>
            {editingIndex === index ? (
              <div className={styles.editSection}>
                {/* Editable Inputs */}
                <input type="text" value={store.name} onChange={(e) => handleChange(e, 'name', index)} placeholder="Store Name" />
                <input type="text" value={store.address} onChange={(e) => handleChange(e, 'address', index)} placeholder="Store Address" />
                <input type="text" value={store.phone} onChange={(e) => handleChange(e, 'phone', index)} placeholder="Store Phone" />
                <input type="text" value={store.mapsrc} onChange={(e) => handleChange(e, 'mapsrc', index)} placeholder="Map Link" />

                {/* Image & Camera */}
                {store.image && <img src={store.image} alt={store.name} className={styles.storeImage} />}
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => handleChange({ target: { value: reader.result } }, 'image', index);
                    reader.readAsDataURL(file);
                  }
                }} />
                <button onClick={() => setIsCameraOpen(!isCameraOpen)}>
                  {isCameraOpen ? 'Close Camera' : 'Use Camera'}
                </button>
                {isCameraOpen && (
                  <div>
                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={200} />
                    <button onClick={() => captureImage(index)}>Capture Photo</button>
                  </div>
                )}

                <button onClick={handleUpdate}>Update</button>
              </div>
            ) : (
              <div>
                <h4 className={styles.storeName}>{store.name}</h4>
                <div className={styles.mediaBox}>
                  <img src={store.image} alt={store.name} className={styles.storeImage} />
                  <iframe src={store.mapsrc} className={styles.mapFrame} title={store.name}></iframe>
                </div>
                  <div className={styles.storeAddress}>
                        <p>{store.address}</p>
                        <p>{store.phone}</p>
                <button onClick={() => handleEdit(index)}>Edit</button>
                  </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Store Section */}

      <div className={styles.addCard}>
      <h3>Add New Store</h3>
        {newStore.image && (
          <div>
            <img src={newStore.image} alt="Preview" className={styles.previewImg} />
            <button onClick={removeImageAdd}>Remove</button>
          </div>
        )}

        <div className={styles.NewStoreDetails}>
          <input type="text" value={newStore.name} onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} placeholder="Store Name" />
        <input type="text" value={newStore.address} onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} placeholder="Store Address" />
        <input type="text" value={newStore.phone} onChange={(e) => setNewStore({ ...newStore, phone: e.target.value })} placeholder="Contact" />
        <input type="text" value={newStore.mapsrc} onChange={(e) => setNewStore({ ...newStore, mapsrc: e.target.value })} placeholder="Google Map Link" />
        </div>

        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setNewStore({ ...newStore, image: reader.result });
            reader.readAsDataURL(file);
          }
        }} />

        <button onClick={() => setAddCameraOpen(!addCameraOpen)}>
          {addCameraOpen ? 'Close Camera' : 'Use Camera'}
        </button>
        {addCameraOpen && (
          <div>
            <Webcam audio={false} ref={addWebcamRef} screenshotFormat="image/jpeg" width={200} />
            <button onClick={captureNewStoreImage}>Capture Photo</button>
          </div>
        )}

        <button onClick={handleAddStore}>Add Store</button>
      </div>
    </div>
  );
}

export default Stores;
