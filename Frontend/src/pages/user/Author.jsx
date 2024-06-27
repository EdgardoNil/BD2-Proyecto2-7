import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../ui/components/Card'

export const Author = () => {
  const { idAutor } = useParams();
  const [autor, setAutor] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/authors/${idAutor}`)
      .then((response) => response.json())
      .then((data) => {
        setAutor(data);
      });
  }
    , [idAutor]);

  return (
    <div className='grid grid-cols-5 p-4 gap-4 mt-4 mb-4 bg-bg-200'>
      <div className='col-span-5'>
        <h1 className='text-3xl font-bold text-center'>{autor.nombre}</h1>
      </div>
      <div className='col-span-2 bg-bg-300'>
        <div className='flex justify-center items-center'>
          <img
            src={autor.foto_url}
            alt='Imagen del autor'
            className='col-span-2  rounded-full justify-center items-center'
          />
        </div>
      </div>
      <div className='col-span-3'>
        <h1 className='text-2xl font-bold text-center'>Biografía</h1>
        <p className='text-md'>
          {autor.biografia}
        </p>
      </div>
      <div className='col-span-5'>
        <h1 className='text-2xl font-bold text-center'>Libros</h1>
        <div className='grid grid-cols-5 p-4 gap-4 '>
          {autor.libros.map((libro, index) => (
            <Card key={index}>
              <h1 className='text-2xl font-bold text-center'>{libro}</h1>
            </Card>
          ))
          }
        </div>
      </div>
    </div>
  )
}
