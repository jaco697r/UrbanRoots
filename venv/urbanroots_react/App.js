// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { UserProvider } from './context.js';
import Main from './components/Main.js';
import LoginScreen from './components/Login.js';
import CreateUserScreen from './components/CreateUser.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return (
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Create User" 
              component={CreateUserScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen 
              name="Main" 
              component={Main}
              // options={{ title: 'Main Page' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
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
