import styles from "./styles";
import MapViewComponent from "../../../components/MapView";
import SearchBarView from "../../../components/SearchBarView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setActualUserLocation from "../../../functions/SetActualUserLocation";
import { View } from "@gluestack-ui/themed";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
			const jsonValue = await AsyncStorage.getItem("MapCredentialsList");
			const routedMapCredentials =
				jsonValue != null ? JSON.parse(jsonValue) : null;
			if (
				routedMapCredentials != null &&
				routedMapCredentials.isRouteStarted == true
			) {
				setMapCredentials(routedMapCredentials);
				setUserLocation(routedMapCredentials.userLocation);
				setIsRetrieved(true);
			} else
				await setActualUserLocation({
					setUserLocation,
					setIsRetrieved,
					setUserLocationDescription,
				});
		})();
	}, []);
	return (
		<>
			{isRetrieved ? (
				<MapView
					userLocation={userLocation}
					setUserLocation={setUserLocation}
					destination={mapCredentials.destination}
					isRouteStarted={mapCredentials.isRouteStarted}
				/>
			) : (
				<></>
			)}
		</>
	);
}
const MapView = (props: {
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
