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
        min_kg_crops_per_person: communityData.min_kg_crops_per_person,
        cycle_duration_days: communityData.cycle_duration_days,
        invite_only: communityData.inviteOnly
      }),
    });
    console.log('BEFORE RESPONSE')
    const data = await response.json();
    if (!response.ok) {
      console.log('Error from backend:', data);
      if (data['name'] == "community with this name already exists."){
        return 'unique_name_constraint'
      }      
      for (const [key, value] of Object.entries(data)) {
        if (value.includes("This field may not be blank.")) {
          console.log(`Field: ${key}, Error: ${value}`);
          return { [key]: value[0], 'code':'required_missing' };
        }
      }
      throw new Error(data.detail || 'Something went wrong');
    }
    console.log('Community Created');
    return data;
  } catch (error) {
    console.log('Error during community creation:', error)
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
    const data = await response.json(); 
    console.log("DATA received on frontend:", data);

    return data;
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
};