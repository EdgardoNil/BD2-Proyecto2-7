const api = 'http://127.0.0.1:5000';

export const createBook = async (data) => {
  try {
    const response = await fetch(api + '/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
  
    return response.json();

  } catch (e) {
    return {
      exito: false,
      e
    }
  }
};

export const getBooks = async () => {
    try {
      const response = await fetch(api + '/books');
    
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
    
      return response.json();
  
    } catch (e) {
      return {
        exito: false,
        e
      }
    }
  };

  export const deleteBook = async (idBook) => {
    try {
        const response = await fetch(api + `/books/${idBook}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        return response.json();
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
  };