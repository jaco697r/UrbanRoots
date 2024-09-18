import React, { useState } from 'react';
import { View, Image, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { loginUser } from './api';
import CreateUserScreen from './CreateUser';
import { useNavigation } from '@react-navigation/native';
import icon from '../assets/urbanrootslogo.png';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showCreateUser, setShowCreateUser] = useState(false);
  const navigation = useNavigation();


  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password')
      return;
    }

    try {
      const data = await loginUser(email, password);
      console.log(data)
      // Alert.alert('Login Successful', `Welcome back, ${data.user.email}`)

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
      {/* <Text style={styles.title}>Login</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
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
    backgroundColor: 'white'
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
    width: '30%',
    height: '30%'
  }
});
