import styles from "./styles";
import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { GoogleApiCredentials } from "../../api.config";
import { View, Text } from "@gluestack-ui/themed";
import MapView, { Callout, Marker } from "react-native-maps";
export default function MapViewComponent(props: {
	myLocalizationMarkerVisible: boolean;
	isRouteStarted: boolean | undefined;
	userLocation: any;
	destination: any;
	mapScreenName: string;
}) {
	return (
		<MapView
			style={props.mapScreenName == "HomeScreen" ? styles.homeMap : styles.map}
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
								<Text>Miejsce startu</Text>
							</View>
						</Callout>
					</Marker>
					{props.isRouteStarted ? (
						<>
							<Marker
								coordinate={props.destination}
								title='Marker Title'
								description='Marker Description'>
								<Callout tooltip={true}>
									<View>
										<Text>Miejsce docelowe</Text>
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
}
