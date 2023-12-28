import styles from "./styles";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View } from "@gluestack-ui/themed";
import MapViewComponent from "../../../components/MapViewComponent";
import setActualUserLocation from "../../../functions/setActualUserLocation";
import SearchBarView from "../../../components/SearchBarViewComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
interface RouteParams {
	rank?: string;
	destination?: any;
	isRouteStarted?: boolean;
	myLocalizationMarkerVisible?: boolean;
	userLocation?: any;
}
export default function Map() {
	const route = useRoute();
	let routedParams = route.params as RouteParams;
	const [userLocation, setUserLocation] = useState(routedParams.userLocation);
	const [isRetrieved, setIsRetrieved] = useState(false);
	const [mapCredentials, setMapCredentials] = useState(routedParams);
	const [userLocationDescription, setUserLocationDescription] = useState("");
	useEffect(() => {
		(async () => {
			const jsonValue = await AsyncStorage.getItem('MapCredentialsList')
			const routedMapCredentials = jsonValue!=null ? JSON.parse(jsonValue) : null;
			if(routedMapCredentials!=null && routedMapCredentials.isRouteStarted==true) {
				setMapCredentials(routedMapCredentials);
				setUserLocation(routedMapCredentials.userLocation);
				setIsRetrieved(true);
			}
			else
				await setActualUserLocation({ setUserLocation, setIsRetrieved, setUserLocationDescription});
		})();
	}, []);
	return (
		<>
			{isRetrieved ? (
				<>
					{routedParams.rank === "driver" ? (
						<DriverMapView
							userLocation={userLocation}
							setUserLocation={setUserLocation}
							destination={mapCredentials.destination}
							isRouteStarted={mapCredentials.isRouteStarted}
						/>
					) : (
						<PassengerMapView
							userLocation={userLocation}
							setUserLocation={setUserLocation}
							destination={mapCredentials.destination}
							isRouteStarted={mapCredentials.isRouteStarted}
						/>
					)}
				</>
			) : (
				<></>
			)}
		</>
	);
}
const PassengerMapView = (props: {
	userLocation: any;
	setUserLocation: any;
	destination: any;
	isRouteStarted: boolean | undefined;
}) => {
	return (
		<View style={styles.mapTabView}>
			<MapViewComponent
				myLocalizationMarkerVisible={true}
				userLocation={props.userLocation}
				destination={props.destination}
				isRouteStarted={props.isRouteStarted}
				mapScreenName='MapScreen'
			/>
			{props.isRouteStarted ? (
				<></>
			) : (
				<SearchBarView setUserLocation={props.setUserLocation} />
			)}
		</View>
	);
};
const DriverMapView = (props: {
	userLocation: any;
	setUserLocation: any;
	destination: any;
	isRouteStarted: boolean | undefined;
}) => {
	return (
		<View style={styles.mapTabView}>
			<MapViewComponent
				myLocalizationMarkerVisible={true}
				userLocation={props.userLocation}
				destination={props.destination}
				isRouteStarted={props.isRouteStarted}
				mapScreenName='MapScreen'
			/>
			{props.isRouteStarted ? (
				<></>
			) : (
				<SearchBarView setUserLocation={props.setUserLocation} />
			)}
		</View>
	);
};
