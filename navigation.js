import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import SendEmailScreen from './screens/SendEmailScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
        <Stack.Screen name="Send Email" component={SendEmailScreen} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
