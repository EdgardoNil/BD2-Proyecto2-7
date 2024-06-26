import { Card } from '../../ui/components/Card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const Authors = () => {
  const navigate = useNavigate();
  // const [autores, setAutores] = useState([]);
  const { user } = useContext(AuthContext);
  
  const autores = [
    {
      "id_autor": 1,
      "nombre": "Shakespeare",
      "biografia": "William Shakespeare fue un dramaturgo, poeta y actor inglés. Conocido en ocasiones como el Bardo de Avon, Shakespeare es con frecuencia considerado el escritor más importante en lengua inglesa y uno de los más célebres de la literatura universal.",
      "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/220px-Shakespeare.jpg",
      "libros": [ "Romeo y Julieta", "Hamlet", "Macbeth" ]
    },
    {
      "id_autor": 2,
      "nombre": "Gabriel García Márquez",
      "biografia": "Gabriel José de la Concordia García Márquez fue un escritor, guionista, editor y periodista colombiano. En 1982 recibió el Premio Nobel de Literatura. Fue conocido por su apodo Gabo y popularizó el realismo mágico.",
      "foto": "https://www.biografiasyvidas.com/biografia/g/fotos/garcia_marquez_gabriel.jpg",
      "libros": [ "Cien años de soledad", "El amor en los tiempos del cólera", "Crónica de una muerte anunciada" ]
    },
    {
      "id_autor": 3,
      "nombre": "Stephen King",
      "biografia": "Stephen Edwin King es un escritor estadounidense conocido por sus novelas de terror. Los libros de King han sido publicados en 56 idiomas, y ha vendido más de 350 millones de copias. Es considerado uno de los mejores escritores de historias de terror y misterio.",
      "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Comicon.jpg/220px-Stephen_King%2C_Comicon.jpg",
      "libros": [ "It", "El resplandor", "Carrie" ]
    },
    {
      "id_autor": 4,
      "nombre": "J. K. Rowling",
      "biografia": "Joanne Rowling, más conocida como J. K. Rowling, es una escritora, productora de cine y guionista británica, conocida por ser la autora de la serie de libros Harry Potter, que han superado los quinientos millones de ejemplares vendidos.",
      "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/220px-J._K._Rowling_2010.jpg",
      "libros": [ "Harry Potter y la piedra filosofal", "Harry Potter y la cámara secreta", "Harry Potter y el prisionero de Azkaban" ]
    },
    {
      "id_autor": 5,
      "nombre": "Agatha Christie",
      "biografia": "Agatha Mary Clarissa Miller, conocida como Agatha Christie, fue una escritora y dramaturga británica especializada en el género policial, por cuyo trabajo tuvo reconocimiento a nivel internacional. Es conocida como la Reina del Crimen.",
      "foto": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Agatha_Christie.png",
      "libros": [ "Asesinato en el Orient Express", "Diez negritos", "Asesinato en el campo de golf" ]
    },
    {
      "id_autor": 6,
      "nombre": "J. R. R. Tolkien",
      "biografia": "John Ronald Reuel Tolkien fue un filólogo, escritor y profesor universitario británico, conocido principalmente por ser el autor de las novelas clásicas de fantasía heroica El hobbit y El Señor de los Anillos.",
      "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/J._R._R._Tolkien%2C_ca._1925.jpg/1200px-J._R._R._Tolkien%2C_ca._1925.jpg",
      "libros": [ "El hobbit", "El Señor de los Anillos", "El Silmarillion" ]
    },
    {
      "id_autor": 7,
      "nombre": "Jane Austen",
      "biografia": "Jane Austen fue una novelista británica que vivió durante el período de la Regencia. La ironía que emplea para dotar de comicidad a sus novelas hace que Jane Austen sea considerada entre los precursores de la novela moderna.",
      "foto": "https://cdn.britannica.com/12/172012-050-DAA7CE6B/Jane-Austen-Cassandra-engraving-portrait-1810.jpg",
      "libros": [ "Orgullo y prejuicio", "Sentido y sensibilidad", "Emma" ]
    },
    {
      "id_autor": 8,
      "nombre": "George Orwell",
      "biografia": "Eric Arthur Blair, más conocido por su seudónimo George Orwell, fue un escritor y periodista británico. Es conocido por su defensa de la democracia y el socialismo, y por su oposición al totalitarismo.",
      "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/George_Orwell%2C_c._1940_%2841928180381%29.jpg/1200px-George_Orwell%2C_c._1940_%2841928180381%29.jpg",
      "libros": [ "1984", "Rebelión en la granja", "Homenaje a Cataluña" ]
    },
    {
      "id_autor": 9,
      "nombre": "Harper Lee",
      "biografia": "Nelle Harper Lee fue una escritora estadounidense conocida por su novela Matar a un ruiseñor, publicada en 1960. Ganó el Premio Pulitzer de Ficción en 1961.",
      "foto": "https://upload.wikimedia.org/wikipedia/commons/5/5f/HarperLee_2007Nov05.jpg",
      "libros": [ "Matar a un ruiseñor" ]
    },
    {
      "id_autor": 10,
      "nombre": "F. Scott Fitzgerald",
      "biografia": "Francis Scott Key Fitzgerald fue un novelista y escritor de relatos cortos estadounidense, ampliamente conocido por su obra maestra El gran Gatsby.",
      "foto": "https://upload.wikimedia.org/wikipedia/commons/5/5c/F_Scott_Fitzgerald_1921.jpg",
      "libros": [ "El gran Gatsby", "Suave es la noche", "El curioso caso de Benjamin Button" ]
    }
  ]

  const handleVerAutor = (autorID) => {
    navigate(`/author/${autorID}`);
  }

  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4 ">
        {autores.map((autor) => (
          <Card key={autor.id_autor}>
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
                src={autor.foto}
                alt="Imagen"
                className="h-60 w-60 rounded-full"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                onClick={() => handleVerAutor(autor.id_autor)}
              >
                Ver más
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}