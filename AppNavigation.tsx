import React from "react";
import LoginPanel from "./LoginPanel";
import DriverRegisterPanel from "./DriverRegisterPanel";
import PassengerRegisterPanel from "./PassengerRegisterPanel";
import PasswordNotRemember from "./PasswordNotRemember";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginPanel" component={LoginPanel} />
            <Stack.Screen name="DriverRegisterPanel" component={DriverRegisterPanel} />
            <Stack.Screen name="PassengerRegisterPanel" component={PassengerRegisterPanel} />
            <Stack.Screen name="PasswordNotRemember" component={PasswordNotRemember} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}