import * as Location from "expo-location";

export default async function setActualUserLocation(props: {
	setUserLocation: any;
	setIsRetrieved: any;
}) {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status === "granted") {
		const retrievedData = await Location.getCurrentPositionAsync({});
		props.setUserLocation({
			latitude: retrievedData.coords.latitude,
			longitude: retrievedData.coords.longitude,
		});
	} else {
		props.setUserLocation({
			latitude: 37.422, 
			longitude: -122.084,
		});
	}
	props.setIsRetrieved(true);
}
