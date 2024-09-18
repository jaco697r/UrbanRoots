import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Login'
import { useUserContext } from '../context';


export default function Main(){
    const userContext = useUserContext();
    if (!userContext.user) {
    return <LoginScreen/>
      }
}

