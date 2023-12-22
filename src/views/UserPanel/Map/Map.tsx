import styles from "./styles";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Callout, Marker } from "react-native-maps";
import { EvilIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Spinner, Text, View } from "@gluestack-ui/themed";
import { GoogleApiCredentials } from "../../../../api.config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import searchLocationBarStyles from "./searchLocationBarStyles";
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
			<View style={styles.mapTabView}>
			  <Spinner />
			</View>
		  )}
		</>
	  );
}
async function setActualUserLocation(props:{setUserLocation: any, setIsRetrieved: any}) {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status === "granted") {
		const retrievedData = await Location.getCurrentPositionAsync({});
		props.setUserLocation({
			latitude: retrievedData.coords.latitude,
			longitude: retrievedData.coords.longitude,
		});
	} else {
		props.setUserLocation({
			latitude: 61.38240449755151,
			longitude: 16.001379122266677,
		});
	}
	props.setIsRetrieved(true);
}
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
			/>
			<SearchBarView setUserLocation={props.setUserLocation} />
		</View>
	);
};
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
			/>
			<SearchBarView setUserLocation={props.setUserLocation} />
		</View>
	);
};
const MapViewComponent = (props: {
	myLocalizationMarkerVisible: boolean;
	destinationLocalizationMarkerVisible: boolean | undefined;
	isRouteStarted: boolean | undefined;
	userLocation: any;
	destination: any;
}) => {
	return (
		<MapView
			style={styles.map}
			region={{
				latitude: props.userLocation.latitude,
				longitude: props.userLocation.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}>
			{props.isRouteStarted ? (
				<MapViewDirections
					origin={props.userLocation}
					destination={props.destination}
					apikey={GoogleApiCredentials.apiKey}
					strokeWidth={3}
					strokeColor='hotpink'
				/>
			) : (
				<></>
			)}
			{props.myLocalizationMarkerVisible ? (
				<>
					<Marker
						coordinate={props.userLocation}
						title='Marker Title'
						description='Marker Description'>
						<Callout tooltip={true}>
							<View>
								<Text>Moja lokalizacja</Text>
							</View>
						</Callout>
					</Marker>
					{props.destinationLocalizationMarkerVisible ? (
						<>
							<Marker
								coordinate={props.destination}
								title='Marker Title'
								description='Marker Description'>
								<Callout tooltip={true}>
									<View>
										<Text>Miejsce spotkania</Text>
									</View>
								</Callout>
							</Marker>
						</>
					) : (
						<></>
					)}
				</>
			) : (
				<></>
			)}
		</MapView>
	);
};
const SearchBarView = ({ setUserLocation }: any) => {
	return (
		<View style={styles.searchInputComponentsView}>
			<GooglePlacesAutocomplete
				placeholder='Szukaj Miejsca'
				onPress={async (details) => {
					if (details) {
						const endPointUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${details.place_id}&key=${GoogleApiCredentials.apiKey}`;
						const response = await fetch(endPointUrl);
						const retrievedResults = await response.json();
						setUserLocation({
							latitude: retrievedResults.results[0].geometry.location.lat,
							longitude: retrievedResults.results[0].geometry.location.lng,
						});
					}
				}}
				query={{
					key: `${GoogleApiCredentials.apiKey}`,
					language: "pl",
				}}
				styles={searchLocationBarStyles}
				renderLeftButton={SearchIcon}
			/>
		</View>
	);
};
const SearchIcon = () => {
	return (
		<EvilIcons
			style={styles.searchIcon}
			name='search'
			size={32}
			color='black'
		/>
	);
};
