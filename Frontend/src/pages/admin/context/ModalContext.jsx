// ModalContext.js
import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleteAuthor, setShowModalDeleteAuthor] = useState(false);
  const [dataAuthor, setDataAuthor] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openModalDeletedAuthor = (datos) => {
    setShowModalDeleteAuthor(true);
    setDataAuthor(datos);
  }
  const closeModalDeleteAuthor = () => setShowModalDeleteAuthor(false);

  return (
    <ModalContext.Provider value={{ 
      showModal, openModal, closeModal,
      showModalDeleteAuthor, openModalDeletedAuthor, closeModalDeleteAuthor, dataAuthor
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
