import * as React from "react";
import styles from "./styles";
import Home from "../views/UserPanel/Home/Home";
import Wallet from "../views/UserPanel/Wallet/Wallet";
import Map from "../views/UserPanel/Map/Map";
import UserProfile from "../views/UserPanel/UserProfile/UserProfile/UserProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
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
}
export default function BottomTabs() {
	const route = useRoute();
	const { rank, userKey, avatarLink, vibrations, notifications } =
		route.params as RouteParams;
	return (
		<Tab.Navigator
			initialRouteName='Główna'
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarStyle: styles.tabBarStyle,
				tabBarLabelStyle: styles.tabBarLabelStyle,
				tabBarIconStyle: styles.tabBarIconStyle,
				headerShown: false,
				tabBarActiveTintColor: "#FFB700",
				tabBarInactiveTintColor: "black",
			}}>
			<Tab.Screen
				name='Główna'
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<AntDesign
							name='home'
							color={color}
							size={35}
						/>
					),
				}}
				initialParams={{ userKey, rank, vibrations, notifications }}
			/>
			<Tab.Screen
				name='Portfel'
				component={Wallet}
				options={{
					tabBarIcon: ({ color }) => (
						<Fontisto
							name='wallet'
							color={color}
							size={35}
						/>
					),
				}}
				initialParams={{ userKey, vibrations, notifications }}
			/>
			<Tab.Screen
				name='Mapa'
				component={Map}
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome5
							name='map-marked-alt'
							color={color}
							size={35}
						/>
					),
				}}
				initialParams={{ rank, vibrations, notifications }}
			/>
			<Tab.Screen
				name='Konto'
				component={UserProfile}
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome
							name='user'
							color={color}
							size={35}
						/>
					),
				}}
				initialParams={{ rank, userKey, avatarLink, vibrations, notifications }}
			/>
		</Tab.Navigator>
	);
}
