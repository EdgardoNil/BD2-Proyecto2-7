
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Book = () => {
    const { idLibro } = useParams();
    
    useEffect(() => {
        console.log('ID Libro', idLibro);
    }
    , [idLibro]);
    
    return (
      <div>Book - User Libro ID {idLibro}</div>
    )
  }
  