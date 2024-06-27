import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard"
import { ModalAddBook } from "./components/ModalAddBook"
import { useModal } from "./context/ModalContextBooks";
import { getBooks } from "./helpers";
import { ModalDeleteBook } from "./components/ModalDeleteBook";
import { ModalEditBook } from "./components/ModalEditBook";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BooksAdmin = () => {

  const { openModal, showModalUpdateBook } = useModal();

  const [libros, setLibros] = useState([])

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const fetchData = async () => {

    const respuesta = await getBooks();
    setLibros(respuesta);

  }

  useEffect(() => {
    fetchData();
  }, [showModalUpdateBook])

  const onAddBook = (newBook, respuesta) => {
    setLibros([newBook, ...libros]);

    if (respuesta.message) {
      notifySuccess(respuesta.message);
    } else if (respuesta.error) {
      notifyError(respuesta.error);
    } else {
      notifyError("Error interno en el servidor");
    }
  }

  const onDeleteBook = (bookId, respuesta) => {
    setLibros(libros.filter(libro => libro._id !== bookId));

    if (respuesta.message) {
      notifySuccess(respuesta.message);
    } else if (respuesta.error) {
      notifyError(respuesta.error);
    } else {
      notifyError("Error interno en el servidor");
    }
  }

  const onUpdateBook = (newBook, respuesta) => {
    setLibros(libros.map(libro => (libro._id === newBook._id ? newBook : libro)));
    if (respuesta.message) {
      notifySuccess(respuesta.message);
    } else if (respuesta.error) {
      notifyError(respuesta.error);
    } else {
      notifyError("Error interno en el servidor");
    }
  }

  return (
    <>
      <div>BooksAdmin</div>
      <div className="grid grid-cols-1 md:grid-cols-3">

        {
          libros.map(libro => (
            <div
              key={libro._id}
              style={{ marginRight: '1rem' }}>
              <BookCard
                {...libro}
                libro={libro}
              />

            </div>
          ))
        }
      </div>
      <div className="floating-button">
        <button
          type="button"
          onClick={(e) => {
            openModal(e)
            console.log("Abrir modal");
          }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <ModalAddBook
        onNewBook={(value, respuesta) => onAddBook(value, respuesta)}
      />
      <ModalDeleteBook
        onRemoveBook={(value, respuesta) => onDeleteBook(value, respuesta)}
      />
      {
        showModalUpdateBook ?
          <ModalEditBook
            onEditBook={(value, respuesta) => onUpdateBook(value, respuesta)}
          />

          : null
      }
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </>
  )
}