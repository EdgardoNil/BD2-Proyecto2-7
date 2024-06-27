import { Card } from '../../ui/components/Card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const Books = () => {
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const { user } = useContext(AuthContext);

  const [selectedGenero, setSelectedGenero] = useState('0');

  const handleSelectChange = (e) => {
    setSelectedGenero(e.target.value);
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    const searchText = event.target.searchText.value;
    console.log(searchText);
  }

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

  useEffect(() => {
    fetch(`http://localhost:5000/books`)
      .then((response) => response.json())
      .then((data) => {
        setLibros(data);
      });
  }, []);

  const handleVerLibro = (bookID) => {
    navigate(`/book/${bookID}`);
  }

  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        <div className="col-span-2">
          <form className="flex" onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Buscar por título o autor"
              className="bg-bg-300 border border-gray-300 text-text-100 block w-full p-2.5 placeholder-text-100 rounded-md"
              name="searchText"
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-primary-100 rounded-md w-20 disabled:bg-primary-300 text-text-100 font-bold ml-2"
            >
              Buscar
            </button>
          </form>
        </div>
        <div className="col-span-1">
          <form className="flex" onSubmit={handleSubmit}>
            <select
              id="especialidad-select"
              name="especialidad-select"
              value={selectedGenero}
              onChange={handleSelectChange}
              className="bg-bg-300 border border-gray-300 text-text-100 block w-full p-2.5 rounded-md"
            >
              <option value="0">Filtrar</option>
                <option key="1" value="genero">
                  Género (A-Z)
                </option>
                <option key="2" value="precio">
                  Precio (Menor a Mayor)
                </option>
                <option key="3" value="puntuacion">
                  Puntuación
                </option>
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
          <Card key={libro._id}>
            <h1 className="text-2xl font-bold text-center">
              {libro.titulo}
            </h1>
            <br />
            <div className="flex flex-col justify-center items-center mt-3 mb-3">
              <img
                src={libro.imagen_url}
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
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Género:</label>
              <h1 className="text-xl">
                {libro.genero}
              </h1>
            </div>
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Precio:</label>
              <h1 className="text-xl">
                {libro.precio}
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                onClick={() => handleVerLibro(libro._id)}
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
