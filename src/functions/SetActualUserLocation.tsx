import * as Location from "expo-location";
import { GoogleApiCredentials } from "../../api.config";

export default async function setActualUserLocation(props: {
	setUserLocation: any;
	setIsRetrieved: any;
	setUserLocationDescription: any;
}) {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status === "granted") {
		const retrievedData = await Location.getCurrentPositionAsync({});
		if(retrievedData) {
			const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${retrievedData.coords.latitude}%2C${retrievedData.coords.longitude}
			&radius=2000&key=${GoogleApiCredentials.apiKey}`;
			try {
				const response = await fetch(apiUrl);
				const data = await response.json();
				if (data.status === "OK") {
					props.setUserLocation({
						latitude: retrievedData.coords.latitude,
						longitude: retrievedData.coords.longitude,
						description: data.results[0].name,
					});
					props.setUserLocationDescription(data.results[0].name);
				} else {
					console.error("Błąd podczas pobierania sugestii miejsc:", data.status);
				}
			} catch (error) {
				console.error("Błąd:", error);
			}
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
