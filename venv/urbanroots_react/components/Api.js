import { useUserContext } from '../context';

const apiRoot = "http://192.168.1.217:8000";



export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${apiRoot}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.detail || 'Invalid username or password');
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || 'An error occurred');
    }
  };

export const createNewUser = async (username, password) => {
  try {
    const response = await fetch(`${apiRoot}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log(data)
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Invalid username or password');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'An error occurred');
  }
};


export const logoutUser = async (token) => {
  try {
    console.log('Attempting to logout...')
    const response = await fetch(`${apiRoot}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    console.log('BEFORE RESPONSE')
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Something went wrong');
    }
    console.log('Logout successful');
    return data;
  } catch (error) {
    console.log('Error during logout:', error);
  }
};


export const createCommunity = async (communityData) => {
  console.log(communityData)
  try {
    console.log('Attempting to create community..')
    const response = await fetch(`${apiRoot}/api/createCommunity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${communityData.token}`,
      },
      body: JSON.stringify({
        token: communityData.token,
        name: communityData.communityName,
        description: communityData.description,
        city: communityData.city,
        max_participants: communityData.max_participants,
        min_kg_crops_per_person: communityData.min_kg_crops_per_person
      }),
    });
    console.log('BEFORE RESPONSE')
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Something went wrong');
    }
    console.log('Community Created');
    return data;
  } catch (error) {
    console.log('Error during community creation:', error);
  }
};

export const fetchCommunities = async (request) => {
  console.log(request)
    try {
      const response = await fetch(`${apiRoot}/api/myCommunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${request.token}`,
        },
        body: JSON.stringify({
          token: request.token,
        }),
      });
    // Make sure the response is awaited and fully processed
    const data = await response.json();  // Ensure you are properly awaiting the JSON parsing
    console.log("DATA received on frontend:", data);  // Log the actual data received in the frontend

    return data;
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
};