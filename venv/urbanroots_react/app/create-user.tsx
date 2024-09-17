import { Image, View, Text, StyleSheet, Platform, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
  return (
    <ThemedView style={styles.stepContainer}>
    <ThemedText type="subtitle">Create user</ThemedText>
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
    <TextInput
      placeholder="Password Again"
      value={passwordAgain}
      style={styles.input}
      onChangeText={(value) => setPasswordAgain(value)}
      textContentType = "password"
      secureTextEntry
      />
    <Button
      title="Create"
      onPress={() => Create()}
    />
  </ThemedView>
  );
}

function Create(){

}


// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';

// export default function FetchData() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Use your Django server IP address or "10.0.2.2" for Android Emulator
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://192.168.x.x:8000/api/endpoint/');  // Your Django API
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const json = await response.json();
//         setData(json);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" />;
//   }

//   if (error) {
//     return <Text>Error: {error.message}</Text>;
//   }

//   return (
//     <View>
//       <Text>{JSON.stringify(data)}</Text>
//     </View>
//   );
// }




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
  