import Home from "./Home"
import Wallet from './Wallet';
import Map from "./Map";
import Account from './Account';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator initialRouteName="Głowna" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Główna" component={Home} />
            <Tab.Screen name="Portfel" component={Wallet} />
            <Tab.Screen name="Mapa" component={Map} />
            <Tab.Screen name="Konto" component={Account} />
        </Tab.Navigator>
    );
}

export default BottomTabs;