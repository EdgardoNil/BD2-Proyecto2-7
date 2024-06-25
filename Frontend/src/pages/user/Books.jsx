import { Card } from '../../ui/components/Card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const Books = () => {
  const navigate = useNavigate();
  //const [libros, setLibros] = useState([]);
  const [genero, setGenero] = useState([]);
  const { user } = useContext(AuthContext);

  const libros = [
    {
      "id_libro": 1,
      "titulo": "Romeo y Julieta",
      "autor": "Shakespeare",
      "descripcion": "Romeo y Julieta es una tragedia de William Shakespeare. Cuenta la historia de dos jóvenes enamorados que, a pesar de la oposición de sus familias, rivales entre sí, deciden casarse de forma clandestina y vivir juntos; sin embargo, la presión de esa rivalidad y una serie de fatalidades conducen a que la pareja elija el suicidio antes que vivir separados.",
      "genero": "Tragedia",
      "fecha_publicacion": "1597",
      "disponibilidad": true,
      "cantidad_stock": 10,
      "puntuacion_promedio": 4.5,
      "precio": 10.5,
      "imagen": "https://tienda.sophosenlinea.com/imagenes/9788416/978841677541.GIF"
    },
    {
      "id_libro": 2,
      "titulo": "Hamlet",
      "autor": "Shakespeare",
      "descripcion": "Hamlet, príncipe de Dinamarca es una tragedia de William Shakespeare. Su autor probablemente basó Hamlet en dos fuentes: la leyenda de Amleth y una obra perdida conocida como Ur-Hamlet. La obra fue escrita en algún momento entre 1599 y 1601.",
      "genero": "Tragedia",
      "fecha_publicacion": "1601",
      "disponibilidad": true,
      "cantidad_stock": 15,
      "puntuacion_promedio": 4.8,
      "precio": 12.5,
      "imagen": "https://tienda.sophosenlinea.com/imagenes/9786075/978607557106.GIF"
    },
    {
      "id_libro": 3,
      "titulo": "Macbeth",
      "autor": "Shakespeare",
      "descripcion": "Macbeth es una tragedia de William Shakespeare. Se cree que fue escrita entre 1603 y 1607, y fue publicada por primera vez en el Folio de 1623. La obra, que se desarrolla en Escocia, narra cómo Macbeth, un general del ejército escocés, asesina al rey Duncan para apoderarse del trono.",
      "genero": "Tragedia",
      "fecha_publicacion": "1606",
      "disponibilidad": true,
      "cantidad_stock": 20,
      "puntuacion_promedio": 4.7,
      "precio": 11.5,
      "imagen": "https://tienda.sophosenlinea.com/imagenes/9788416/978841677542.GIF"
    },
    {
      "id_libro": 4,
      "titulo": "Cien años de soledad",
      "autor": "Gabriel García Márquez",
      "descripcion": "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. Es considerada una obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español.",
      "genero": "Realismo mágico",
      "fecha_publicacion": "1967",
      "disponibilidad": true,
      "cantidad_stock": 25,
      "puntuacion_promedio": 4.9,
      "precio": 15.5,
      "imagen": "https://www.rae.es/sites/default/files/portada_cien_anos_de_soledad_0.jpg"
    }, 
    {
      "id_libro": 5,
      "titulo": "El amor en los tiempos del cólera",
      "autor": "Gabriel García Márquez",
      "descripcion": "El amor en los tiempos del cólera es una novela del escritor colombiano Gabriel García Márquez, publicada en 1985. Es considerada una de las obras más importantes de la literatura hispanoamericana del siglo XX.",
      "genero": "Realismo mágico",
      "fecha_publicacion": "1985",
      "disponibilidad": true,
      "cantidad_stock": 30,
      "puntuacion_promedio": 4.7,
      "precio": 13.5,
      "imagen": "https://upload.wikimedia.org/wikipedia/commons/e/e9/El_amor_en_los_tiempos_del_c%C3%B3lera.png"
    }];


  const [selectedGenero, setSelectedGenero] = useState('0');

  const handleSelectChange = (e) => {
    setSelectedGenero(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes acceder al valor seleccionado
    console.log('Genero seleccionado:', selectedGenero);
    /*fetch(`http://localhost:3000/MediCare/specialty/${selectedEspecialidad}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctores(data);
      });*/
  };

  /*useEffect(() => {
    fetch(`http://localhost:3000/MediCare/medic/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctores(data);
        const especialidadesSet = new Set();
        const especialidadesArray = [];

        data.forEach((doctor) => {
          if (!especialidadesSet.has(doctor.especialidad)) {
            especialidadesSet.add(doctor.especialidad);
            especialidadesArray.push({ ID: especialidadesArray.length, Nombre: doctor.especialidad });
          }
        });

        setEspecialidad(especialidadesArray);
      });
  }, [user.id]);*/

  const handleVerLibro = (bookID) => {
    navigate(`/book/${bookID}`);
  }

  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        <div className="col-span-3">
          <form className="flex" onSubmit={handleSubmit}>
            <select
              id="especialidad-select"
              name="especialidad-select"
              value={selectedGenero}
              onChange={handleSelectChange}
              className="bg-bg-300 border border-gray-300 text-text-100 block w-full p-2.5 rounded-md"
            >
              <option value="0">Selecciona un genero</option>
              {genero.map((n) => (
                <option key={n.ID} value={n.genero}>
                  {n.genero}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-primary-100 rounded-md w-20 disabled:bg-primary-300 text-text-100 font-bold ml-2"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-3 p-4 gap-4 ">
        {libros.map((libro) => (
          <Card key={libro.id_libro}>
            <h1 className="text-2xl font-bold text-center">
              {libro.titulo}
            </h1>
            <br />
            <div className="flex flex-col justify-center items-center mt-3 mb-3">
              <img
                src={libro.imagen}
                alt="Imagen"
                className="h-80 w-60 "
              />
            </div>
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Autor:</label>
              <h1 className="text-xl">
                {libro.autor}
              </h1>
            </div>
            <div className="col-span-3">
              <label className="text-xl font-bold mr-2">Descripción:</label>
              <p className="text-md">
                {libro.descripcion}
              </p>
            </div>
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Género:</label>
              <h1 className="text-xl">
                {libro.genero}
              </h1>
            </div>
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Fecha de publicación:</label>
              <h1 className="text-xl">
                {libro.fecha_publicacion}
              </h1>
            </div>
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Disponibilidad:</label>
              <h1 className="text-xl">
                {libro.disponibilidad ? 'Disponible' : 'No disponible'}
              </h1>
            </div>
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Cantidad en stock:</label>
              <h1 className="text-xl">
                {libro.cantidad_stock}
              </h1>
            </div>
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Puntuación promedio:</label>
              <h1 className="text-xl">
                {libro.puntuacion_promedio}
              </h1>
            </div>
            
            <div className="flex items-center justify-center">
              <button
                className="bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                onClick={() => handleVerLibro(libro.id_libro)}
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
