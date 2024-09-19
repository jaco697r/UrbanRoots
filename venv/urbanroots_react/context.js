import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  user: undefined,
  token: undefined,
  setUser: () => {},
  setToken: () => {},
});

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </UserContext.Provider>
  );
}