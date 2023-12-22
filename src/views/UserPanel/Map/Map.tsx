import styles from "./styles";
import React from "react";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Callout, Marker } from "react-native-maps";
import { EvilIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Input, InputField, InputSlot, Text, View } from "@gluestack-ui/themed";
import { GoogleMapsApiCredentials } from "../../../../api.config";
const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
interface RouteParams {
	rank?: string;
}
export default function Map() {
	const route = useRoute();
	let { rank } = route.params as RouteParams;
	return <>{rank === "driver" ? <DriverMapView /> : <PassengerMapView />}</>;
}
const DriverMapView = () => {
	return (
		<View style={styles.mapTabView}>
			<MapViewComponent markerVisible={true} />
			<SearchBarView />
		</View>
	);
};
const PassengerMapView = () => {
	return (
		<View style={styles.mapTabView}>
			<MapViewComponent markerVisible={false} />
			<SearchBarView />
		</View>
	);
};
const MapViewComponent = (props: { markerVisible: boolean }) => {
	return (
		<MapView
			style={styles.map}
			initialRegion={{
				latitude: 37.3318456,
				longitude: -122.0296002,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}>
			<MapViewDirections
				origin={origin}
				destination={destination}
				apikey={GoogleMapsApiCredentials.apiKey}
				strokeWidth={3}
				strokeColor='hotpink'
			/>
			{props.markerVisible ? (
				<>
					<Marker
						coordinate={destination}
						title='Marker Title'
						description='Marker Description'>
						<Callout tooltip={true}>
							<View>
								<Text>Miejsce spotkania</Text>
							</View>
						</Callout>
					</Marker>
					<Marker
						coordinate={origin}
						title='Marker Title'
						description='Marker Description'>
						<Callout tooltip={true}>
							<View>
								<Text>Moja lokalizacja</Text>
							</View>
						</Callout>
					</Marker>
				</>
			) : (
				<></>
			)}
		</MapView>
	);
};
const SearchBarView = () => {
	return (
		<View style={styles.searchInputComponentsView}>
			<Input style={styles.mapSearchInput}>
				<InputSlot pl='$3'>
					<EvilIcons
						style={styles.searchIcon}
						name='search'
						size={32}
						color='black'
					/>
				</InputSlot>
				<InputField
					placeholder='Szukaj miejsca'
					selectionColor={"black"}
				/>
			</Input>
		</View>
	);
};
