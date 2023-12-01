import React from "react";
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RatingsView from "./RatingsView";
import SettingsView from "./SettingsView";
import TravelHistory from "./TravelHistory";
import BottomTabs from "./AppBottomNavigation";
const Stack = createStackNavigator();
interface RouteParams {
    rank?: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    avatarLink?: string;
}
export default function AccountNavigation() {
    const route = useRoute();
    const { rank, name, surname, phoneNumber, avatarLink } = route.params as RouteParams;
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Account">
            <Stack.Screen name="Account" component={BottomTabs} initialParams={{ rank, name, surname, phoneNumber, avatarLink }} />
            <Stack.Screen name="RatingsView" component={RatingsView} initialParams={{ rank, name, surname, phoneNumber }} />
            <Stack.Screen name="SettingsView" component={SettingsView} initialParams={{ rank, name, surname, phoneNumber, avatarLink }} />
            <Stack.Screen name="TravelHistory" component={TravelHistory} initialParams={{ rank, name, surname, phoneNumber }} />
        </Stack.Navigator>
    );
}