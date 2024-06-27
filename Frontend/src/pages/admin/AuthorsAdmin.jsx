import { Card } from '../../ui/components/Card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { ModalSaveClose } from './components/ModalSaveClose';
import { useModal } from './context/ModalContext';
import { ModalDelete } from './components/ModalDelete';
import { getAuthors } from './helpers';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthorsAdmin = () => {
  const navigate = useNavigate();
  const { openModal, openModalDeletedAuthor } = useModal();
  const { user } = useContext(AuthContext);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const [autores, setAutores] = useState([])

  const fetchData = async () => {

    const respuesta = await getAuthors();
    // console.log(respuesta);
    setAutores(respuesta);

  }

  useEffect(() => {
    fetchData();
  }, [])


  const handleVerAutor = (autorID) => {
    navigate(`/author/${autorID}`);
  }

  const onAddAuthor = (newAuthor, respuesta) => {
    setAutores([newAuthor, ...autores]);
    if (respuesta.message) {
      notifySuccess(respuesta.message);
    } else if (respuesta.error) {
      notifyError(respuesta.error);
    } else {
      notifyError("Error interno en el servidor");
    }
  }

  const onDeleteAuthor = (authorId, respuesta) => {
    console.log("Desde onDeleteAuthor");
    setAutores(autores.filter(author => author._id !== authorId));

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
      <div className="grid grid-cols-3 p-4 gap-4 ">
        {autores.map((autor) => (
          <Card key={autor._id}>
            <h1 className="text-2xl font-bold text-center">
              {autor.nombre}
            </h1>
            <br />
            <div className="flex ">

              <p className="text-md">
                {autor.biografia}
              </p>
            </div>
            <div className="col-span-3">
              <label className="text-md font-bold mr-2">Libros:</label>
              <ul className="text-md">
                {autor.libros.map((libro, index) => (
                  <li key={index}>{libro}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center mt-3 mb-3">
              <img
                src={autor.foto_url}
                alt="Imagen"
                className="h-60 w-60 rounded-full"
              />
            </div>
            <button
              className="bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
              onClick={() => handleVerAutor(autor._id)}
            >
              Ver más
            </button>
            <button
              className="bg-red-400 px-4 py-1 rounded-md my-2 disabled:bg-red-300 w-full text-text-100 font-bold"
              onClick={(e) => {
                openModalDeletedAuthor(autor);
                console.log("Eliminar");
              }}
            >
              Eliminar
            </button>
          </Card>
        ))}
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
      <ModalSaveClose
        onNewAuthor={(value, respuesta) => onAddAuthor(value, respuesta)}
      />
      <ModalDelete
        onRemoveAuthor={(value, respuesta) => onDeleteAuthor(value, respuesta)}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </>
  )
}