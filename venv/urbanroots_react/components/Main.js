import React from 'react';
import { View, Text } from 'react-native';
import { useUserContext } from '../context';
import LoginScreen from './Login';
// import HomeScreen from './Home';

export default function Main() {
  const { user } = useUserContext()

  if (!user) {
    return <LoginScreen />
  }

  return <HomeScreen />
}