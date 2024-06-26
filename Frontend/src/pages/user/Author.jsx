
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Author = () => {
    const { idAutor } = useParams();
    
    useEffect(() => {
        console.log('ID AUTOR', idAutor);
    }
    , [idAutor]);
    
    return (
      <div>Author - User CON ID {idAutor}</div>
    )
  }
  