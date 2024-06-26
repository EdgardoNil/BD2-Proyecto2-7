const api = 'http://localhost:3000/MediCare';

export const createUser = async (data) => {
  try {
    const response = await fetch(api + '/createUsuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();

  } catch (e) {
    return {
      exito: false,
      e
    }
  }
};

export const login = async (data) => {
  const response = await fetch(api + '/obtenerUsuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};