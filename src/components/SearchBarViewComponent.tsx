import { View } from "@gluestack-ui/themed";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GoogleApiCredentials } from "../../api.config";
import searchLocationBarStyles from "../views/UserPanel/Map/searchLocationBarStyles";
import styles from "./styles";
import { EvilIcons } from "@expo/vector-icons";
export default function SearchBarView({ setUserLocation }: any) {
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
}
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
