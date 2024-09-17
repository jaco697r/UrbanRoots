// import { Image, StyleSheet, Platform, TextInput, Button } from 'react-native';
// import React, { useState } from 'react';
// // import { useNavigation } from '@react-navigation/native';
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Link } from 'expo-router';

// export default function LoginScreen() {
//   const [text, setText] = useState('');
  
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/urbanrootslogo.png')}
//           style={styles.urbanrootslogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Login or Create user</ThemedText>
//         <TextInput
//           placeholder="Username"
//           value={text}
//           style={styles.input}
//           onChangeText={(value) => setText(value)}
//         />
//         <TextInput
//           placeholder="Password"
//           value={text}
//           style={styles.input}
//           onChangeText={(value) => setText(value)}
//           />
//         <ThemedText type='link'>
//           Create new account
//         </ThemedText>
//         <Button
//           title="Login"
//           onPress={() => Login}
//         />
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// function Login() {
//   // <Link href="/HomeScreen">Home</Link>
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   urbanrootslogo: {
//     height: 250,
//     width: 420,
//     bottom: 0,
//     left: 0,
//     position: 'relative',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 10,
//   },
// });
