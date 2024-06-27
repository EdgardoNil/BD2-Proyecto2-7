import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard"
import { ModalAddBook } from "./components/ModalAddBook"
import { useModal } from "./context/ModalContextBooks";
import { getBooks } from "./helpers";
import { ModalDeleteBook } from "./components/ModalDeleteBook";
import { ModalEditBook } from "./components/ModalEditBook";

export const BooksAdmin = () => {

  const { openModal, showModalUpdateBook } = useModal();

  const [libros, setLibros] = useState([])

  const fetchData = async () => {

    const respuesta = await getBooks();
    setLibros(respuesta);
    
  }

  useEffect(() => {
    fetchData();
  }, [])

  // const libros = [
  //   {
  //     id: 'a',
  //     titulo: 'Los hornos de hitler',
  //     imagen: 'https://ss365.liverpool.com.mx/xl/1028844111.jpg',
  //     precio: 200,
  //     disponible: true,
  //     descripcion: 'Una sobreviviente de los campos de concentración de Auschwitz y de Birkenau. La visión de cinco chimeneas arrojando el humo de la carne quemada de centenares de miles de seres humanos, entre ellos los padres y los dos hijos de la escritora. Cómo eran y actuaban los dirigentes de Auschwitz y Belsen; quién fue Joseph Kramer, juzgado como el criminal número uno en el proceso de Luneburg. Olga Lengyel conservó como testimonio de esta experiencia las cicatrices y la marca del cautiverio, pruebas que mantuvieron incólume su espíritu de humanismo. En Los hornos de Hitler la autora narra al mundo civilizado el horror de los campos de exterminio nazis.',
  //     autor: 'Olga Lengyel',
  //     genero: 'Novela',
  //     stock: 5,
  //     puntuacion: 95,
  //     anio: 1948,
  //   },
  //   {
  //     id: 'b',
  //     titulo: 'Los hornos de hitler',
  //     imagen: 'https://ss365.liverpool.com.mx/xl/1028844111.jpg',
  //     precio: 200,
  //     disponible: true,
  //     descripcion: 'Una sobreviviente de los campos de concentración de Auschwitz y de Birkenau. La visión de cinco chimeneas arrojando el humo de la carne quemada de centenares de miles de seres humanos, entre ellos los padres y los dos hijos de la escritora. Cómo eran y actuaban los dirigentes de Auschwitz y Belsen; quién fue Joseph Kramer, juzgado como el criminal número uno en el proceso de Luneburg. Olga Lengyel conservó como testimonio de esta experiencia las cicatrices y la marca del cautiverio, pruebas que mantuvieron incólume su espíritu de humanismo. En Los hornos de Hitler la autora narra al mundo civilizado el horror de los campos de exterminio nazis.',
  //     autor: 'Olga Lengyel',
  //     genero: 'Novela',
  //     stock: 5,
  //     puntuacion: 95,
  //     anio: 1948,
  //   },
  //   {
  //     id: 'c',
  //     titulo: 'Los hornos de hitler',
  //     imagen: 'https://ss365.liverpool.com.mx/xl/1028844111.jpg',
  //     precio: 200,
  //     disponible: true,
  //     descripcion: 'Una sobreviviente de los campos de concentración de Auschwitz y de Birkenau. La visión de cinco chimeneas arrojando el humo de la carne quemada de centenares de miles de seres humanos, entre ellos los padres y los dos hijos de la escritora. Cómo eran y actuaban los dirigentes de Auschwitz y Belsen; quién fue Joseph Kramer, juzgado como el criminal número uno en el proceso de Luneburg. Olga Lengyel conservó como testimonio de esta experiencia las cicatrices y la marca del cautiverio, pruebas que mantuvieron incólume su espíritu de humanismo. En Los hornos de Hitler la autora narra al mundo civilizado el horror de los campos de exterminio nazis.',
  //     autor: 'Olga Lengyel',
  //     genero: 'Novela',
  //     stock: 5,
  //     puntuacion: 95,
  //     anio: 1948,
  //   },
  //   {
  //     id: 'd',
  //     titulo: 'Los hornos de hitler',
  //     imagen: 'https://ss365.liverpool.com.mx/xl/1028844111.jpg',
  //     precio: 200,
  //     disponible: false,
  //     descripcion: 'Una sobreviviente de los campos de concentración de Auschwitz y de Birkenau. La visión de cinco chimeneas arrojando el humo de la carne quemada de centenares de miles de seres humanos, entre ellos los padres y los dos hijos de la escritora. Cómo eran y actuaban los dirigentes de Auschwitz y Belsen; quién fue Joseph Kramer, juzgado como el criminal número uno en el proceso de Luneburg. Olga Lengyel conservó como testimonio de esta experiencia las cicatrices y la marca del cautiverio, pruebas que mantuvieron incólume su espíritu de humanismo. En Los hornos de Hitler la autora narra al mundo civilizado el horror de los campos de exterminio nazis.',
  //     autor: 'Olga Lengyel',
  //     genero: 'Novela',
  //     stock: 5,
  //     puntuacion: 95,
  //     anio: 1948,
  //   },
  // ]

  const onAddBook = (newBook) => {
    setLibros([newBook, ...libros]);
  }

  const onDeleteBook = (bookId) => {
    setLibros(libros.filter(libro => libro._id !== bookId));
  }

  const onUpdateBook = (newBook) => {
    setLibros(libros.map(libro => (libro._id === newBook._id ? newBook : libro)));
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
        onNewBook={(value) => onAddBook(value)}
      />
      <ModalDeleteBook
        onRemoveBook={(value) => onDeleteBook(value)}
      />
      {
        showModalUpdateBook ? 
        <ModalEditBook
          onEditBook={(value) => onUpdateBook(value)}
        />
        
        : null
      }
    </>
  )
}