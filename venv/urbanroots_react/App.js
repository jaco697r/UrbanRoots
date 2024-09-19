import React from 'react';
import { UserProvider, useUserContext } from './context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './components/Login';
import CreateUserScreen from './components/CreateUser';
import HomeScreen from './components/Home';
import FindCommunity from './components/FindCommunity';
import Logout from './components/Logout';
import CreateCommunity from './components/CreateCommunity';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator
        screenOptions={{
          headerStyle: {
             backgroundColor: '#a3eb4b',
          },
          headerTintColor: '#fff',       
           headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
          <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
          <Drawer.Screen name="Find Community" component={FindCommunity} />
          <Drawer.Screen name="Create Community" component={CreateCommunity} />
          <Drawer.Screen name='Logout' component={Logout}/>
        </Drawer.Navigator>
      ) : (
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}