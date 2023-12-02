import React from "react";
import LoginPanel from "../views/LoginPanel/LoginPanel";
import RegisterPanel from "../views/RegisterPanel/RegisterPanel";
import PasswordNotRemember from "../views/LoginPanel/PasswordNotRemember";
import TermsAndConditions from "../views/RegisterPanel/TermsAndConditions";
import PrivacyPolicy from "../views/RegisterPanel/PrivacyPolicy";
import AccountNavigation from "./AccountStackNavigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="LoginPanel" 
              component={LoginPanel} 
            />
            <Stack.Screen 
              name="RegisterPanel" 
              component={RegisterPanel} 
            />
            <Stack.Screen 
              name="PasswordNotRemember" 
              component={PasswordNotRemember} 
            />
            <Stack.Screen 
              name="PrivacyPolicy" 
              component={PrivacyPolicy} 
            />
            <Stack.Screen 
              name="TermsAndConditions" 
              component={TermsAndConditions} 
            />
            <Stack.Screen 
              name="MainPanel" 
              component={AccountNavigation} 
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}