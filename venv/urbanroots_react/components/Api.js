const apiRoot = "http://192.168.1.217:8000";

export const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${apiRoot}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || 'Invalid email or password');
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || 'An error occurred');
    }
  };

export const createNewUser = async (email, password) => {
  try {
    const response = await fetch(`${apiRoot}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log(data)
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Invalid email or password');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'An error occurred');
  }
};