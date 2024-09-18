// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UserProvider } from './context.js';
import Main from './components/Main.js';

export default function App() {
  return (

    <View style={styles.container}>
      <UserProvider>
        <Main/>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
