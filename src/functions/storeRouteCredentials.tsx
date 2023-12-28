import AsyncStorage from "@react-native-async-storage/async-storage";
export default async function storeRouteCredentials(props: any) {
	try {
		await AsyncStorage.setItem(
			"MapCredentialsList",
			JSON.stringify({
				myLocalizationMarkerVisible: props.myLocalizationMarkerVisible,
				isRouteStarted: props.isRouteStarted,
				userLocation: {
					latitude: props.from.latitude,
					longitude: props.from.longitude,
				},
				destination: {
					latitude: props.to.latitude,
					longitude: props.to.longitude,
				},
				rank: props.rank,
			})
		);
	} catch (error) {
		console.log(error);
	}
}
