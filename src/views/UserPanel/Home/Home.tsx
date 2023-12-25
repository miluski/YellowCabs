import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import {
	Alert,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Vibration,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Contract } from "./Contract";
import { Entypo, Feather } from "@expo/vector-icons";
import {
	Button,
	Input,
	InputField,
	InputSlot,
	ScrollView,
	Text,
	View,
	ButtonText,
	FlatList,
} from "@gluestack-ui/themed";
import setActualUserLocation from "../../../functions/SetActualUserLocation";
import SearchBarView from "../../../components/SearchBarViewComponent";
import MapViewComponent from "../../../components/MapViewComponent";
import {
	FirebaseApiCredentials,
	GoogleApiCredentials,
} from "../../../../api.config";
interface RouteParams {
	userKey?: string;
	rank?: string;
}
export default function Home({ navigation }: any) {
	const route = useRoute();
	let routedProps = route.params as RouteParams;
	if (routedProps.rank == "driver") return <DriverHome />;
	else return <PassengerHome props={routedProps} />;
}
const DriverHome = () => {
	return (
		<ScrollView>
			<View style={styles.homeScrollView}>
				<Text style={styles.myOrdersText}>Moje zlecenia</Text>
				<Contract />
			</View>
		</ScrollView>
	);
};
const PassengerHome = ({ props }: any) => {
	const [userLocation, setUserLocation] = useState({});
	const [destination, setDestination] = useState({});
	const [isRetrieved, setIsRetrieved] = useState(false);
	const [isRouteStarted, setIsRouteStarted] = useState(false);
	useEffect(() => {
		(async () => {
			await setActualUserLocation({ setUserLocation, setIsRetrieved });
		})();
	}, []);
	return (
		<>
			{isRetrieved ? (
				<View style={styles.mapTabView}>
					<PassengerMapView
						myLocalizationMarkerVisible={true}
						destinationLocalizationMarkerVisible={props.isRouteStarted}
						userLocation={userLocation}
						setUserLocation={setUserLocation}
						destination={destination}
						setDestination={setDestination}
						isRouteStarted={isRouteStarted}
						setIsRouteStarted={setIsRouteStarted}
						mapScreenName='HomeScreen'
						userKey={props.userKey}
					/>
				</View>
			) : (
				<></>
			)}
		</>
	);
};
const PassengerMapView = (props: {
	myLocalizationMarkerVisible: boolean;
	destinationLocalizationMarkerVisible: boolean | undefined;
	userLocation: any | undefined;
	setUserLocation: any | undefined;
	destination: any | undefined;
	setDestination: any | undefined;
	isRouteStarted: any | undefined;
	setIsRouteStarted: any | undefined;
	mapScreenName: string | undefined;
	userKey: string | undefined;
}) => {
	return (
		<View style={styles.mapTabView}>
			<MapViewComponent {...props} />
			<SearchBarView setUserLocation={props.setUserLocation} />
			<BottomOptionsView {...props} />
		</View>
	);
};
const BottomOptionsView = (props: {
	isRouteStarted: any | undefined;
	setIsRouteStarted: any | undefined;
	userLocation: any | undefined;
	setUserLocation: any | undefined;
	destination: any | undefined;
	setDestination: any | undefined;
	userKey: string | undefined;
}) => {
	const [pricePerKilometer, setPricePerKilometer] = useState(4.99);
	return (
		<View style={styles.bottomOptionsMainView}>
			{props.isRouteStarted ? (
				<>
					<FromInput
						disabled={true}
						userLocationDescription={props.userLocation.description}
						setUserLocation={props.setUserLocation}
					/>
					<ToInput
						disabled={true}
						setDestination={props.setDestination}
					/>
					<Text style={styles.driverIsOnRouteText}>
						Kierowca już jest w drodze.
					</Text>
					<Text style={styles.weWillInformYouText}>
						Poinformujemy Cię gdy dotrze do Ciebie.
					</Text>
					<Text style={styles.yourRouteIsPlacedText}>
						Twoja trasa została zaznaczona na mapie
					</Text>
					<Text style={styles.checkMapText}>Sprawdź mapę</Text>
					<CancelRideButton setIsRouteStarted={props.setIsRouteStarted} />
				</>
			) : (
				<>
					<FromInput
						disabled={false}
						userLocationDescription={props.userLocation.description}
						setUserLocation={props.setUserLocation}
					/>
					<ToInput
						disabled={false}
						setDestination={props.setDestination}
					/>
					<ChooseTaxiTypeView setPricePerKilometer={setPricePerKilometer} />
					<OrderTaxiButton
						setIsRouteStarted={props.setIsRouteStarted}
						userKey={props.userKey}
						from={props.userLocation}
						to={props.destination}
						pricePerKilometer={pricePerKilometer}
					/>
				</>
			)}
		</View>
	);
};
const FromInput = (props: {
	disabled: boolean;
	userLocationDescription: string;
	setUserLocation: any;
}) => {
	const [placeDescription, setPlaceDescription] = useState(
		props.userLocationDescription
	);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	return (
		<View style={styles.fromInputView}>
			<Input
				style={styles.fromInput}
				variant='underlined'
				size='md'
				isDisabled={props.disabled}
				isInvalid={false}
				isReadOnly={false}>
				<InputSlot pl='$3'>
					<Entypo
						name='circle'
						size={24}
						color='black'
						style={styles.fromIcon}
					/>
				</InputSlot>
				<InputField
					placeholder='Z: San Jose'
					selectionColor={"black"}
					onChangeText={async (actualDescription) => {
						setPlaceDescription(actualDescription);
						if (actualDescription) {
							await findPlace({
								searchedPlaceDescription: actualDescription,
								setSuggestions: setSuggestions,
							});
						} else {
							setSuggestions([]);
							actualDescription = "";
						}
					}}
					value={placeDescription}
				/>
			</Input>
			<FlatList
				data={suggestions}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }: any) => (
					<TouchableOpacity
						onPress={async () => {
							setPlaceDescription(item);
							setSuggestions([]);
							const location = await getLocationFromName(item);
							props.setUserLocation(location);
						}}>
						<Text>{item}</Text>
					</TouchableOpacity>
				)}
				style={styles.suggestionsFlatList}
			/>
			<Text style={styles.lineText}>|</Text>
		</View>
	);
};
const ToInput = (props: { disabled: boolean; setDestination: any }) => {
	const [placeDescription, setPlaceDescription] = useState<string>("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	return (
		<View style={styles.toInputView}>
			<Input
				style={styles.toInput}
				variant='underlined'
				size='md'
				isDisabled={props.disabled}
				isInvalid={false}
				isReadOnly={false}>
				<InputSlot pl='$3'>
					<Feather
						name='map-pin'
						size={24}
						color='black'
						style={styles.toIcon}
					/>
				</InputSlot>
				<InputField
					placeholder='Do: San Francisco'
					selectionColor={"black"}
					onChangeText={async (actualDescription) => {
						setPlaceDescription(actualDescription);
						if (actualDescription) {
							await findPlace({
								searchedPlaceDescription: actualDescription,
								setSuggestions: setSuggestions,
							});
						} else {
							setSuggestions([]);
							actualDescription = "";
						}
					}}
					value={placeDescription}
				/>
			</Input>
			<FlatList
				data={suggestions}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }: any) => (
					<TouchableOpacity
						onPress={async () => {
							setPlaceDescription(item);
							setSuggestions([]);
							const location = await getLocationFromName(item);
							props.setDestination(location);
						}}>
						<Text>{item}</Text>
					</TouchableOpacity>
				)}
				style={styles.suggestionsFlatList}
			/>
		</View>
	);
};
const findPlace = async (props: {
	searchedPlaceDescription: any;
	setSuggestions: any;
}) => {
	const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${props.searchedPlaceDescription}&language=pl&key=${GoogleApiCredentials.apiKey}`;
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.status === "OK") {
			const suggestions = data.predictions
				.map(({ description }: any) => description)
				.filter((description: string) => description.length <= 100);
			props.setSuggestions(suggestions.slice(0, 2));
		}
	} catch (error) {
		console.log("Błąd:", error);
	}
};
async function getLocationFromName(locationName: any) {
	const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${GoogleApiCredentials.apiKey}`;
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.status === "OK" && data.results.length > 0) {
			const { lat, lng } = data.results[0].geometry.location;
			return { latitude: lat, longitude: lng };
		} else {
			console.error("Geocoding API returned zero results or an error.");
			return null;
		}
	} catch (error) {
		console.error("Error fetching geocoding data:", error);
		return null;
	}
}
const ChooseTaxiTypeView = (props: { setPricePerKilometer: any }) => {
	const [isStandardTaxi, setIsStandardTaxi] = useState(true);
	const [isComfortTaxi, setIsComfortTaxi] = useState(false);
	const [isElectricEcoTaxi, setIsElectricEcoTaxi] = useState(false);
	const [isPremiumTaxi, setIsPremiumTaxi] = useState(false);
	return (
		<View style={styles.mainTaxiViewsView}>
			<View style={styles.topTaxiTypeViews}>
				<TaxiTypeView
					type='Standard'
					pricePerKilometer='4.99'
					isSelected={isStandardTaxi}
					setIsStandardTaxi={setIsStandardTaxi}
					setIsComfortTaxi={setIsComfortTaxi}
					setIsElectricEcoTaxi={setIsElectricEcoTaxi}
					setIsPremiumTaxi={setIsPremiumTaxi}
					setPricePerKilometer={props.setPricePerKilometer}
				/>
				<TaxiTypeView
					type='Comfort'
					pricePerKilometer='9.99'
					isSelected={isComfortTaxi}
					setIsStandardTaxi={setIsStandardTaxi}
					setIsComfortTaxi={setIsComfortTaxi}
					setIsElectricEcoTaxi={setIsElectricEcoTaxi}
					setIsPremiumTaxi={setIsPremiumTaxi}
					setPricePerKilometer={props.setPricePerKilometer}
				/>
			</View>
			<View style={styles.bottomTaxiTypeViews}>
				<TaxiTypeView
					type='Electric ECO'
					pricePerKilometer='11.99'
					isSelected={isElectricEcoTaxi}
					setIsStandardTaxi={setIsStandardTaxi}
					setIsComfortTaxi={setIsComfortTaxi}
					setIsElectricEcoTaxi={setIsElectricEcoTaxi}
					setIsPremiumTaxi={setIsPremiumTaxi}
					setPricePerKilometer={props.setPricePerKilometer}
				/>
				<TaxiTypeView
					type='Premium'
					pricePerKilometer='19.99'
					isSelected={isPremiumTaxi}
					setIsStandardTaxi={setIsStandardTaxi}
					setIsComfortTaxi={setIsComfortTaxi}
					setIsElectricEcoTaxi={setIsElectricEcoTaxi}
					setIsPremiumTaxi={setIsPremiumTaxi}
					setPricePerKilometer={props.setPricePerKilometer}
				/>
			</View>
		</View>
	);
};
const TaxiTypeView = (props: {
	type: string | undefined;
	pricePerKilometer: string | undefined;
	isSelected: boolean | undefined;
	setIsStandardTaxi: Function;
	setIsComfortTaxi: Function;
	setIsElectricEcoTaxi: Function;
	setIsPremiumTaxi: Function;
	setPricePerKilometer: Function;
}) => {
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				switch (props.type) {
					case "Standard":
						props.setIsStandardTaxi(true);
						props.setIsComfortTaxi(false);
						props.setIsElectricEcoTaxi(false);
						props.setIsPremiumTaxi(false);
						props.setPricePerKilometer(4.99);
						break;
					case "Comfort":
						props.setIsStandardTaxi(false);
						props.setIsComfortTaxi(true);
						props.setIsElectricEcoTaxi(false);
						props.setIsPremiumTaxi(false);
						props.setPricePerKilometer(9.99);
						break;
					case "Electric ECO":
						props.setIsStandardTaxi(false);
						props.setIsComfortTaxi(false);
						props.setIsElectricEcoTaxi(true);
						props.setIsPremiumTaxi(false);
						props.setPricePerKilometer(11.99);
						break;
					case "Premium":
						props.setIsStandardTaxi(false);
						props.setIsComfortTaxi(false);
						props.setIsElectricEcoTaxi(false);
						props.setIsPremiumTaxi(true);
						props.setPricePerKilometer(19.99);
						break;
				}
			}}>
			{props.isSelected ? (
				<View style={styles.selectedTaxiTypeView}>
					<Text style={styles.typeText}> {props.type} </Text>
					<Text style={styles.typeText}>
						{" "}
						{props.pricePerKilometer} zł / km{" "}
					</Text>
				</View>
			) : (
				<View style={styles.taxiTypeView}>
					<Text style={styles.typeText}> {props.type} </Text>
					<Text style={styles.typeText}>
						{" "}
						{props.pricePerKilometer} zł / km{" "}
					</Text>
				</View>
			)}
		</TouchableWithoutFeedback>
	);
};
const OrderTaxiButton = (props: {
	setIsRouteStarted: any;
	userKey: any;
	from: any;
	to: any;
	pricePerKilometer: any;
}) => {
	const finalPrice = async () => {
		return await calculateCoursePrice({ ...props });
	};
	return (
		<Button
			bgColor='#FFB700'
			style={styles.orderTaxiButton}
			onPress={async () => {
				if (props.to && props.from) {
					props.setIsRouteStarted(true);
					handleOrderTaxiButtonPress({
						assignedClientUserKey: props.userKey,
						assignedDriverUserKey: null,
						from: {
							latitude: props.from.latitude,
							longitude: props.from.longitude,
						},
						to: {
							latitude: props.to.latitude,
							longitude: props.to.longitude,
						},
						price: await finalPrice(),
					});
				} else {
					ShowAlert("Błąd", "Proszę uzupełnić miejsce docelowe podróży!");
				}
			}}>
			<ButtonText style={styles.buttonText}>Zamów taksówkę</ButtonText>
		</Button>
	);
};
async function calculateCoursePrice(props: {
	pricePerKilometer: any;
	from: any;
	to: any;
}) {
	const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${props.from.latitude},${props.from.longitude}&
	destinations=${props.to.latitude},${props.to.longitude}&key=${GoogleApiCredentials.apiKey}`;
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.status === "OK") {
			const kilometers = data.rows[0].elements[0].distance.value / 1000;
			return props.pricePerKilometer * kilometers;
		}
	} catch (error) {
		console.log("Błąd:", error);
	}
	return 0.0;
}
const CancelRideButton = (props: { setIsRouteStarted: any }) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.endRideButton}
			onPress={() => {
				props.setIsRouteStarted(false);
			}}>
			<ButtonText style={styles.buttonText}>Zakończ Przejazd</ButtonText>
		</Button>
	);
};
async function handleOrderTaxiButtonPress(props: {
	assignedClientUserKey: any;
	assignedDriverUserKey: any;
	from: object;
	to: object;
	price: any;
}) {
	const requestURL = `${FirebaseApiCredentials.databaseURL}/orders.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(props),
		});
	} catch (error) {
		console.error(error);
	}
}
function ShowAlert(title: string, message: string) {
	Vibration.vibrate(500);
	Alert.alert(title, message, [
		{
			text: "Ok",
			style: "cancel",
		},
	]);
}
