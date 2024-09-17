import { Image, Alert, StyleSheet, Platform, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { router, useRouter } from 'expo-router'; 
// import { useNavigation } from '@react-navigation/native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/urbanrootslogo.png')}
          style={styles.urbanrootslogo}
        />
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Login or Create user</ThemedText>
        <TextInput
          placeholder="Username"
          value={username}
          style={styles.input}
          onChangeText={(value) => setUsername(value)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          textContentType = "password"
          secureTextEntry
          />
        <ThemedText
          type="link"
          onPress={() => router.push('/create-user')}  // Navigate to Create User page
        >
          Create new account
        </ThemedText>
        <Button
          title="Login"
          onPress={() => Login()}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

function Login() {
  const showAlert = () => {
    Alert.alert(
      'Alert Title',    // Title of the alert
      'This is the message for the alert',  // Message of the alert
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true }  // Determines if pressing outside dismisses the alert
    );
  };

  showAlert()
  
  router.push('/homescreen')
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  urbanrootslogo: {
    height: 250,
    width: 420,
    bottom: 0,
    left: 0,
    position: 'relative',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});
