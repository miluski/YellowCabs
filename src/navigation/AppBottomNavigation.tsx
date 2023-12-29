import * as React from "react";
import styles from "./styles";
import Home from "../views/UserPanel/Home/Home";
import Wallet from "../views/UserPanel/Wallet/Wallet";
import Map from "../views/UserPanel/Map/Map";
import UserProfile from "../views/UserPanel/UserProfile/UserProfile/UserProfile";
import { useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	AntDesign,
	FontAwesome5,
	FontAwesome,
	Fontisto,
} from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
interface RouteParams {
	rank?: string;
	userKey?: string;
	avatarLink?: string;
	vibrations?: string;
	notifications?: string;
	destination?: any;
	isRouteStarted?: boolean;
	userLocation?: any;
	myLocalizationMarkerVisible?: boolean;
}
const tabNavigatorScreenOptions = {
	tabBarHideOnKeyboard: true,
	tabBarStyle: styles.tabBarStyle,
	tabBarLabelStyle: styles.tabBarLabelStyle,
	tabBarIconStyle: styles.tabBarIconStyle,
	headerShown: false,
	tabBarActiveTintColor: "#FFB700",
	tabBarInactiveTintColor: "black",
};
export default function BottomTabs() {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	return (
		<Tab.Navigator
			initialRouteName='Główna'
			screenOptions={tabNavigatorScreenOptions}>
			<Tab.Screen
				name='Główna'
				component={Home}
				options={{
					tabBarIcon: ({ color }) => <HomeIcon color={color} />,
					unmountOnBlur: true,
				}}
				initialParams={routedParams}
			/>
			<Tab.Screen
				name='Portfel'
				component={Wallet}
				options={{
					tabBarIcon: ({ color }) => <WalletIcon color={color} />,
					unmountOnBlur: true,
				}}
				initialParams={routedParams}
			/>
			<Tab.Screen
				name='Mapa'
				component={Map}
				options={{
					tabBarIcon: ({ color }) => <MapIcon color={color} />,
					unmountOnBlur: true,
				}}
				initialParams={routedParams}
			/>
			<Tab.Screen
				name='Konto'
				component={UserProfile}
				options={{
					tabBarIcon: ({ color }) => <AccountIcon color={color} />,
				}}
				initialParams={routedParams}
			/>
		</Tab.Navigator>
	);
}
const HomeIcon = ({ color }: any) => {
	return (
		<AntDesign
			name='home'
			color={color}
			size={35}
		/>
	);
};
const WalletIcon = ({ color }: any) => {
	return (
		<Fontisto
			name='wallet'
			color={color}
			size={35}
		/>
	);
};
const MapIcon = ({ color }: any) => {
	return (
		<FontAwesome5
			name='map-marked-alt'
			color={color}
			size={35}
		/>
	);
};
const AccountIcon = ({ color }: any) => {
	return (
		<FontAwesome
			name='user'
			color={color}
			size={35}
		/>
	);
};
