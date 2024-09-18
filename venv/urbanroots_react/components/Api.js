const apiRoot = "http://192.168.1.217:8000";

export const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${apiRoot}/api/login/login_and_get_token`, {
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