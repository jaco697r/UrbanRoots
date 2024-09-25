import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';
import { createNewUser } from './api';
import LoginScreen from './Login';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import icon from '../assets/urbanrootslogo.png';

export default function CreateUserScreen() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [error, setError] = useState('');
  const [back, setBack] = useState(false);
  const navigation = useNavigation();

  const createUser = async () => {
    if (!username || !password || !passwordAgain) {
      setError('Please enter both username and password');
      return;
    }
    if (password != passwordAgain) {
        setError('The two provided passwords were not the same');
        return;
    }
    try {
      const data = await createNewUser(username, password);
      console.log(data)
      Alert.alert('User Created', `Welcome, ${data.user.username}`);
      setBack('true')

      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

    useEffect(() => {
      if (back) {
        navigation.navigate('Login');
      }
    }, [back]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={icon} style={styles.logo}/>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setusername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
      />
    <TextInput
        style={styles.input}
        placeholder="Password Again"
        value={passwordAgain}
        onChangeText={setPasswordAgain}
        secureTextEntry
        textContentType="password"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Create" onPress={createUser} />
      <Text style={styles.createUserText} onPress={() => setBack(true)}>Back</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#FAFFFF',
    paddingTop: '1%'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputspecial: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },  
  createUserText: {
    color: 'lightblue',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 17
  },
  logo:{
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '50%',
    height: '50%',
    marginBottom: '10%'
  }
});
