import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Auth Stack */}
        <Stack.Screen name="Auth" component={AuthStack} />
        {/* App Stack */}
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      {/* Login and Register screens */}
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Tab.Navigator>
      {/* App screens with bottom navigation */}
    </Tab.Navigator>
  );
}

export default Navigation;
