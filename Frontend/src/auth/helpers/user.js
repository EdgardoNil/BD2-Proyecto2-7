const api = 'http://127.0.0.1:5000';

export const createUser = async (data) => {
  try {
    const response = await fetch(api + '/users', {
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

export const login = async (data) => {
  const response = await fetch(api + '/login', {
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
};