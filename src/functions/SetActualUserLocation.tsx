import * as Location from "expo-location";
import { GoogleApiCredentials } from "../../api.config";
export default async function setActualUserLocation(props: {
	setUserLocation: any;
	setIsRetrieved: any;
	setUserLocationDescription: any;
}) {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status === "granted") {
		const retrievedLocation = await Location.getCurrentPositionAsync({});
		if (retrievedLocation) {
			const neededProps = {
				...props,
				retrievedLocation: retrievedLocation,
			};
			const retrievedLocationName = await retrieveLocationDescription({
				...neededProps,
			});
			props.setUserLocation({
				latitude: retrievedLocation.coords.latitude,
				longitude: retrievedLocation.coords.longitude,
				description: retrievedLocationName,
			});
			props.setUserLocationDescription(retrievedLocationName);
		}
	} else {
		props.setUserLocation({
			latitude: 37.422,
			longitude: -122.084,
			description: "San Jose",
		});
	}
	props.setIsRetrieved(true);
}
async function retrieveLocationDescription(props: any) {
	const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${props.retrievedLocation.coords.latitude}%2C${props.retrievedLocation.coords.longitude}
	&radius=2000&key=${GoogleApiCredentials.apiKey}`;
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.status === "OK") {
			return data.results[0].name;
		} else {
			console.error("Błąd podczas pobierania sugestii miejsc:", data.status);
		}
	} catch (error) {
		console.error("Błąd:", error);
	}
	return "";
}
