import MapViewDirections from "react-native-maps-directions";
import MapView, { Callout, Marker } from "react-native-maps";
import React from "react";
import { View, Text } from "@gluestack-ui/themed";
import { GoogleApiCredentials } from "../../api.config";
import styles from "./styles";
export default function MapViewComponent(props: {
	myLocalizationMarkerVisible: boolean;
	destinationLocalizationMarkerVisible: boolean | undefined;
	isRouteStarted: boolean | undefined;
	userLocation: any;
	destination: any;
    mapScreenName: string | undefined;
}) {
	return (
		<MapView
			style={props.mapScreenName=="HomeScreen"?(styles.homeMap):(styles.map)}
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
}
