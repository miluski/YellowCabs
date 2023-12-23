import styles from "./styles";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View } from "@gluestack-ui/themed";
import MapViewComponent from "../../../components/MapViewComponent";
import setActualUserLocation from "../../../functions/SetActualUserLocation";
import SearchBarView from "../../../components/SearchBarViewComponent";
interface RouteParams {
	rank?: string;
	destination?: any;
	isRouteStarted?: boolean;
}
export default function Map() {
	const route = useRoute();
	let { rank, destination, isRouteStarted } =
		route.params as RouteParams;
	const [userLocation, setUserLocation] = useState({});
	const [isRetrieved, setIsRetrieved] = useState(false);
	useEffect(() => {
		(async () => {
			await setActualUserLocation({setUserLocation, setIsRetrieved});
		})();
	}, []);
	return (
		<>
		  {isRetrieved ? (
			<>
			  {rank === "driver" ? (
				<DriverMapView
				  userLocation={userLocation}
				  setUserLocation={setUserLocation}
				  destination={destination}
				  isRouteStarted={isRouteStarted}
				/>
			  ) : (
				<PassengerMapView
				  userLocation={userLocation}
				  setUserLocation={setUserLocation}
				  destination={destination}
				  isRouteStarted={isRouteStarted}
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
				destinationLocalizationMarkerVisible={false}
				userLocation={props.userLocation}
				destination={props.destination}
				isRouteStarted={props.isRouteStarted}
				mapScreenName="MapScreen"
			/>
			<SearchBarView setUserLocation={props.setUserLocation} />
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
				destinationLocalizationMarkerVisible={props.isRouteStarted}
				userLocation={props.userLocation}
				destination={props.destination}
				isRouteStarted={props.isRouteStarted}
				mapScreenName="MapScreen"
			/>
			<SearchBarView setUserLocation={props.setUserLocation} />
		</View>
	);
};
