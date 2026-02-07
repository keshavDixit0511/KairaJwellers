import React, { useContext, useEffect } from 'react';
import style from "../styles/pages/Stores.module.css";
import { ContactCon } from '../Context/ContactContext';
import axios from 'axios';

const registeredOffice = {
  name: 'Registered Office',
  address: 'Shop No.1, Huda Market, Sector 23, Gurugram, Haryana, India',
  phone: ['+91 124 405 2774', '+91 7065 546 678'],
  mapSrc: 'https://www.google.com/maps?q=Shop+No.1,+Huda+Market,+Sector+23,+Gurugram,+Haryana,+India&output=embed',
  icon: '🏢',
};

const RegisteredOfficeCard = ({ office }) => (
  <div className={style['registered-office-card']}>
    <h3 className={style['registered-office-title']}>{office.icon} {office.name}</h3>
    <p className={style['registered-office-address']}>{office.address}</p>
    <div className={style['registered-office-contact']}>
      {office.phone.map((phone, idx) => (
        <a key={idx} href={`tel:${phone.replace(/ /g, '')}`} className={style['registered-office-phone']}>
          📞 {phone}
        </a>
      ))}
    </div>
    <iframe
      src={office.mapSrc}
      loading="lazy"
      className={style['store-map']}
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Registered Office Map"
    ></iframe>
  </div>
);

const StoreCard = ({ store }) => (
  <div className={style['store-card']}>
    {store?.image && (
      <img
        src={store.image}
        alt={store.name}
        className={style['store-image']}
      />
    )}
    <div className={style['store-info']}>
      <h3 className={style['store-title']}>{store.icon || '📍'} {store.name}</h3>
      <p className={style['store-address']}>{store.address}</p>
      <div className={style['store-contact']}>
        {Array.isArray(store.phone)
          ? store.phone.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone.replace(/ /g, '')}`}
                className={style['store-phone']}
              >
                📞 {phone}
              </a>
            ))
          : store.phone && (
              <a
                href={`tel:${store.phone.replace(/ /g, '')}`}
                className={style['store-phone']}
              >
                📞 {store.phone}
              </a>
            )
        }
      </div>
      {store.mapsrc && (
        <iframe
          src={store.mapsrc}
          loading="lazy"
          className={style['store-map']}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title={`${store.name} Map`}
        ></iframe>
      )}
    </div>
  </div>
);

const StoreLocations = () => {
  const { page2, setPage2 } = useContext(ContactCon);

  useEffect(() => {
    axios
      .get("/api/data/page2")
      .then((res) => {
        setPage2(res.data.store);
      })
      .catch((err) => console.error(err));
  }, [setPage2]);

  return (
    <section className={style['store-section']}>
      <div className={style['store-header']}>
        <h2 className={style['store-main-title']}>Visit Our Stores</h2>
        <p className={style['store-subtitle']}>Find your nearest Kaira Jewellers showroom</p>
      </div>
      <RegisteredOfficeCard office={registeredOffice} />
      <div className={style['store-grid']}>
        {Array.isArray(page2) && page2.length > 0 ? (
          page2.map((store, index) => (
            <StoreCard key={index} store={store} />
          ))
        ) : (
          <p className={style['no-stores']}>No stores found.</p>
        )}
      </div>
    </section>
  );
};

export default StoreLocations;