import React from 'react';
import { useUserContext } from '../context';
import { logoutUser } from './api';
import { useEffect } from 'react';

export default function Logout() {
  const { token, setToken } = useUserContext();
  const { setUser } = useUserContext();

  useEffect(() => {
    console.log('Logout component mounted');
    console.log('**********token logout**********');
    console.log(token);

    logoutUser(token);
    setToken('')
    setUser('')
  }, []);

}