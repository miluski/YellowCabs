import React from "react";
import LoginPanel from "./LoginPanel";
import RegisterPanel from "./DriverRegisterPanel";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginPanel" component={LoginPanel} />
            <Stack.Screen name="RegisterPanel" component={RegisterPanel} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
