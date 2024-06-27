
import { useEffect, useState } from 'react';
import { Card } from '../../ui/components/Card'
import { useParams } from 'react-router-dom';

export const Book = () => {
  const { idLibro } = useParams();
  const [libro, setLibro] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/books/${idLibro}`)
      .then((response) => response.json())
      .then((data) => {
        setLibro(data);
      });
  }
    , []);

  return (
    <div className='grid grid-cols-5 p-4 gap-4 mt-4 mb-4 bg-bg-200'>
      <div className='col-span-5'>
        <h1 className='text-3xl font-bold text-center'>{libro.titulo}</h1>
      </div>
      <div className='col-span-2 bg-bg-300'>
        <div className='flex justify-center items-center'>
          <img
            src={libro.imagen_url}
            alt='Imagen del autor'
            className='col-span-2 justify-center items-center h-80 w-60 '
          />
        </div>
      </div>
      <div className='col-span-3 p-4 bg-bg-300'>
        <h1 className='text-xl font-bold text-center'>Descripción</h1>
        <p className='text-md'>
          {libro.descripcion}
        </p>
        <div className='grid grid-cols-2 gap-4 mt-2'>
          <div className='col-span1 bg-bg-300'>
            <h3 className='text-xl font-bold text-center'>Autor</h3>
            {libro.autor}
          </div>
          <div className='col-span1'>
            <h1 className='text-xl font-bold text-center'>Genero</h1>
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
        <h1 className='text-2xl font-bold text-center'>Reseñas</h1>
        <div className='grid grid-cols-5 p-4 gap-4 '>
          {['Muy bueno',].map((resena, index) => (
            <Card key={index}>
              <h1 className='text-2xl font-bold text-center'>{resena}</h1>
            </Card>
          ))
          }
        </div>
      </div>
    </div>
  )
}
