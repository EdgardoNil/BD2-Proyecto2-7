import { Card } from '../../ui/components/Card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const Authors = () => {
  const navigate = useNavigate();
  const [autores, setAutores] = useState([]);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    fetch(`http://localhost:5000/authors`)
      .then((response) => response.json())
      .then((data) => {
        setAutores(data);
      });
  }, []);

  const handleVerAutor = (autorID) => {
    navigate(`/author/${autorID}`);
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
            <div className="flex items-center justify-center">
              <button
                className="bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                onClick={() => handleVerAutor(autor._id)}
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