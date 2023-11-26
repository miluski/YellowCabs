import Home from "./Home"
import Wallet from './Wallet';
import Map from "./Map";
import Account from './Account';
import * as React from 'react';
import { AntDesign, FontAwesome5, FontAwesome, Fontisto } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

interface RouteParams {
    rank?: string;
}

function BottomTabs() {
    const route = useRoute();
    const { rank } = route.params as RouteParams;
    return (
        <Tab.Navigator 
            initialRouteName="Główna" 
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    display: 'flex',
                    position: 'absolute',
                    elevation: 5,
                    height: 90,
                },
                tabBarLabelStyle: {
                    marginBottom: 20,
                    fontSize: 12
                },
                tabBarIconStyle: {
                    marginTop: 15,
                },
                headerShown: false,
                tabBarActiveTintColor: '#FFB700',
                tabBarInactiveTintColor: 'black',
            }}
        >
            <Tab.Screen
                name="Główna"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" color={color} size={35} />
                    )
                }}
                initialParams={{ rank }}
            />
            <Tab.Screen 
                name="Portfel" 
                component={Wallet}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Fontisto name="wallet" color={color} size={35} />
                    )
                }}
            />
            <Tab.Screen 
                name="Mapa" 
                component={Map}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="map-marked-alt" color={color} size={35} />
                    )
                }}
            />
            <Tab.Screen 
                name="Konto"
                component={Account}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user" color={color} size={35} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabs;