import { useEffect, useState,useContext } from 'react';
import { Card } from '../../ui/components/Card';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Rating2 from 'react-rating';
import { AuthContext } from "../../auth";

export const Book = () => {
  const { idLibro } = useParams();
  const [libro, setLibro] = useState({});
  const [nuevaResena, setNuevaResena] = useState('');
  const [nuevaPuntuacion, setNuevaPuntuacion] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${idLibro}`)
      .then((response) => response.json())
      .then((data) => {
        setLibro(data);
      });
  }, [idLibro]);

  const renderStars = (puntuacion) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= puntuacion ? 'text-yellow-500' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  const handleAgregarResena = () => {
    fetch(`http://localhost:5000/books/${idLibro}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({usuario_id: user.id, texto: nuevaResena, puntuacion: nuevaPuntuacion}),
    })
      .then((response) => response.json())
      .then((data) => {
        // refrescar la pagina
        window.location.reload();
      }
      );
  };

  return (
    <div className='grid grid-cols-5 p-4 gap-4 mt-4 mb-4 bg-bg-200'>
      <div className='col-span-5'>
        <h1 className='text-3xl font-bold text-center'>{libro.titulo}</h1>
      </div>
      <div className='col-span-2'>
        <div className='flex justify-center items-center'>
          <img
            src={libro.imagen_url}
            alt='Imagen del autor'
            className='col-span-2 justify-center items-center h-80 w-60 '
          />
        </div>
      </div>
      <div className='col-span-3 p-4 '>
        <h1 className='text-xl font-bold text-center'>Descripción</h1>
        <p className='text-md'>
          {libro.descripcion}
        </p>
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='col-span1 '>
            <h3 className='text-xl font-bold text-center'>Autor</h3>
            {libro.autor}
          </div>
          <div className='col-span1'>
            <h1 className='text-xl font-bold text-center'>Género</h1>
            {libro.genero}
          </div>
          <div className='col-span1 '>
            <h1 className='text-xl font-bold text-center'>Fecha de publicación</h1>
            {libro.fecha_publicacion}
          </div>
          <div className='col-span1 '>
            <h1 className='text-xl font-bold text-center '>Puntuación Promedio</h1>
            {libro.puntuacion_promedio}
          </div>
          <div className='col-span1'>
            <h1 className='text-xl font-bold text-center'>Disponible</h1>
            {libro.disponibilidad ? 'Sí' : 'No'}
          </div>
          <div className='col-span1'>
            <h1 className='text-xl font-bold text-center'>Stock</h1>
            {libro.cantidad_stock + ' unidades'}
          </div>
        </div>
      </div>
      <div className='col-span-5'>
        <div className='grid grid-cols-6 p-4 gap-4 mt-4'>
          <div className='col-span-3'>
            <h1 className='text-2xl font-bold text-center'>Reseñas</h1>
            <div className='grid grid-cols-2 p-4 gap-4 '>
              {libro.resenas && libro.resenas.length > 0 ? (
                libro.resenas.map((resena, index) => (
                  <Card key={index}>
                    <h1 className='text-2xl font-bold text-center'>{resena.usuario_nombre}</h1>
                    <p className='text-md'>{"\"" + resena.texto + "\""}</p>
                    <div className='flex justify-center'>
                      {renderStars(resena.puntuacion)}
                    </div>
                  </Card>
                ))
              ) : (
                <p className='text-md text-center col-span-5'>No hay reseñas disponibles</p>
              )}
            </div>
          </div>
          <div className='col-span-3'>
            <h1 className='text-2xl font-bold text-center'>Agregar Reseña</h1>
            <div className='flex flex-col justify-center items-center mt-3 mb-3'>
              <textarea
                className='w-full h-40 border-2 border-primary-100 rounded-md p-2'
                placeholder='Escribe tu reseña aquí'
                value={nuevaResena}
                onChange={(e) => setNuevaResena(e.target.value)}
              />
              <Rating2
                emptySymbol={<FontAwesomeIcon icon={faStar} className='text-gray-300' />}
                fullSymbol={<FontAwesomeIcon icon={faStar} className='text-yellow-500' />}
                initialRating={nuevaPuntuacion}
                onChange={(value) => setNuevaPuntuacion(value)}
                className='my-2'
              />
              <button
                className='bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold'
                onClick={handleAgregarResena}
                disabled={!nuevaResena || nuevaPuntuacion === 0}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
