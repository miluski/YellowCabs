import React from "react";
import RatingsView from "../views/UserPanel/UserProfile/Ratings/RatingsView";
import SettingsView from "../views/UserPanel/UserProfile/Settings/SettingsView";
import TravelHistory from "../views/UserPanel/UserProfile/TravelHistory/TravelHistory";
import CameraView from "../views/UserPanel/Wallet/CameraView";
import BottomTabs from "./AppBottomNavigation";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
interface RouteParams {
	rank?: string;
	userKey?: string;
	avatarLink?: string;
	vibrations?: string;
	notifications?: string;
	destination?: any;
	isRouteStarted?: boolean;
	userLocation? : any;
	myLocalizationMarkerVisible? : boolean;
}
export default function UserTabsStackNavigation() {
	const route = useRoute();
	const routedParams =
		route.params as RouteParams;
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='Account'>
			<Stack.Screen
				name='Account'
				component={BottomTabs}
				initialParams={routedParams}
			/>
			<Stack.Screen
				name='RatingsView'
				component={RatingsView}
				initialParams={routedParams}
			/>
			<Stack.Screen
				name='SettingsView'
				component={SettingsView}
				initialParams={routedParams}
			/>
			<Stack.Screen
				name='TravelHistory'
				component={TravelHistory}
				initialParams={routedParams}
			/>
			<Stack.Screen
				name='CameraView'
				component={CameraView}
			/>
		</Stack.Navigator>
	);
}
