import React from 'react';
import { useUserContext } from '../context';
import { logoutUser } from './api';
import { useEffect } from 'react';

export default function Logout() {
  const { token, setToken } = useUserContext();
  const { setUser } = useUserContext();

  useEffect(() => {
    logoutUser(token);
    setToken('')
    setUser('')
  }, []);

}