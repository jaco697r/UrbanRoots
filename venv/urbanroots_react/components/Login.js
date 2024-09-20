import React, { useState } from 'react';
import { View, Image, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { loginUser } from './api';
import { useNavigation } from '@react-navigation/native';
import icon from '../assets/urbanrootslogo.png';
import { useUserContext } from '../context';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, setToken } = useUserContext();
  const [showCreateUser, setShowCreateUser] = useState(false);
  const navigation = useNavigation();


  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password')
      return;
    }

    try {
      const data = await loginUser(username, password);
      Alert.alert('Login Successful', `Welcome back, ${data.user.username}`)
      setUser(data.user);
      setToken(data.token);
      console.log('User context updated:', data.user);
      console.log('Token context updated:', data.token);

      setError('')
    } catch (error) {
      setError(error.message)
    }
  };

  if (showCreateUser) {
    console.log('HANDLECREATE USE2')
    setShowCreateUser(false)
    navigation.navigate('Create User'); 
  };

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.logo}/>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.createUserText} onPress={() => setShowCreateUser(true)}>Create User</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#FAFFFF'
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
    // marginBottom: '10%',
    width: '60%',
    height: '60%'
  }
});
