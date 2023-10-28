import React from "react";
import LoginPanel from "./LoginPanel";
import DriverRegisterPanel from "./DriverRegisterPanel";
import PassengerRegisterPanel from "./PassengerRegisterPanel";
import PasswordNotRemember from "./PasswordNotRemember";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
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
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
