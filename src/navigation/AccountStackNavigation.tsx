import React, { useEffect } from "react";
import RatingsView from "../views/UserPanel/UserProfile/Ratings/RatingsView";
import SettingsView from "../views/UserPanel/UserProfile/Settings/SettingsView";
import TravelHistory from "../views/UserPanel/UserProfile/TravelHistory/TravelHistory";
import BottomTabs from "./AppBottomNavigation";
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
interface RouteParams {
    rank?: string;
    userKey?: string;
    avatarLink?: string;
    vibrations?: string;
    notifications?: string;
}
export default function AccountNavigation() {
    const route = useRoute();
    const { rank, userKey, avatarLink, vibrations, notifications } = route.params as RouteParams;  
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false 
            }} 
            initialRouteName="Account"
        >
            <Stack.Screen 
                name="Account" 
                component={BottomTabs} 
                initialParams={{ 
                    rank, 
                    userKey,
                    avatarLink,
                    vibrations,
                    notifications
                }} 
            />
            <Stack.Screen 
                name="RatingsView" 
                component={RatingsView} 
                initialParams={{ 
                    rank, 
                    userKey,
                    vibrations,
                    notifications
                }} 
            />
            <Stack.Screen 
                name="SettingsView" 
                component={SettingsView} 
                initialParams={{ 
                    rank, 
                    userKey,
                    avatarLink,
                    vibrations,
                    notifications
                }} 
            />
            <Stack.Screen 
                name="TravelHistory" 
                component={TravelHistory} 
                initialParams={{ 
                    rank, 
                    userKey,
                    vibrations,
                    notifications
                }} 
            />
        </Stack.Navigator>
    );
}