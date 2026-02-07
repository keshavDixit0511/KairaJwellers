import React, { createContext, useState } from 'react'

export const ContactCon = createContext();

const ContactContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mountModel, setMountModel] = useState(false);
  const [openFranchiseForm, setOpenFranchiseForm] = useState(false);
  const [loadedDataName, setLoadedDataName] = useState({name:"",banner:null,images:[]});
  const [loadedJewelleryData, setLoadedJewelleryData] = useState({});
  const [page1, setPage1] = useState({});
  const [page2, setPage2] = useState({});
  const [page3, setPage3] = useState({});
  const [page4, setPage4] = useState({});
  const [page5, setPage5] = useState({});

  const contextValue = {
    isOpen,
    setIsOpen,
    mountModel,
    setMountModel,
    openFranchiseForm,
    setOpenFranchiseForm,
    loadedDataName,
    setLoadedDataName,
    loadedJewelleryData,
    setLoadedJewelleryData,
    page1,
    setPage1,
    page2,
    setPage2,
    page3,
    setPage3,
    page4,
    setPage4,
    page5,
    setPage5,
  };

  return (
    <ContactCon.Provider value={contextValue}>
      {children}
    </ContactCon.Provider>
  );
};

export default ContactContext;