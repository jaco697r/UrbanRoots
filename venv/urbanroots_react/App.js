import React from 'react';
import { UserProvider, useUserContext } from './context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './components/Login';
import CreateUserScreen from './components/CreateUser';
import HomeScreen from './components/Home';
import FindCommunity from './components/FindCommunity';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>        
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Find Community" component={FindCommunity} />
        </Drawer.Navigator>
            {/* <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Find Community"
              component={FindCommunity}
              options={{ headerShown: true }}
            /> */}
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
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