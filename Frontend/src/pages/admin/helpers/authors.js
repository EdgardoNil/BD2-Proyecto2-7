const api = 'http://127.0.0.1:5000';

export const createAuthor = async (data) => {
  try {
    const response = await fetch(api + '/authors', {
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

export const getAuthors = async () => {
  try {
    const response = await fetch(api + '/authors');

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

export const deleteAuthor = async (idAuthor) => {
  try {
    const response = await fetch(api + `/authors/${idAuthor}`, {
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