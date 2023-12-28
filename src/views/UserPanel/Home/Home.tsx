import React, { useEffect, useState } from "react";
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
import SearchBarView from "../../../components/SearchBarViewComponent";
import MapViewComponent from "../../../components/MapViewComponent";
import {
	FirebaseApiCredentials,
	GoogleApiCredentials,
} from "../../../../api.config";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import getActualAccountBilance from "../../../functions/getActualAccountBilance";
import storeRouteCredentials from "../../../functions/storeRouteCredentials";
import setActualUserLocation from "../../../functions/setActualUserLocation";
interface RouteParams {
	rank?: string;
	destination?: any;
	isRouteStarted?: boolean;
	myLocalizationMarkerVisible?: boolean;
	userLocation?: any;
	userKey?: string;
}
export default function Home({ navigation }: { navigation: any }) {
	const route = useRoute();
	let routedProps = route.params as RouteParams;
	const [accountBilance, setAccountBilance] = useState(null);
	useEffect(() => {
		(async () => {
			setAccountBilance(await getActualAccountBilance(routedProps.userKey));
		})();
	}, []);
	if (accountBilance != null) {
		const passengerHomeProps = {
			...routedProps,
			accountBilance: accountBilance,
			navigation,
		};
		if (routedProps.rank == "driver") return <DriverHome />;
		else return <PassengerHome {...passengerHomeProps} />;
	} else return <></>;
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
const PassengerHome = (props: any) => {
	const [userLocation, setUserLocation] = useState({});
	const [destination, setDestination] = useState({});
	const [isRetrieved, setIsRetrieved] = useState(false);
	const [isRouteStarted, setIsRouteStarted] = useState(false);
	const [userLocationDescription, setUserLocationDescription] = useState("");
	const [destinationDescription, setDestinationDescription] = useState("");
	const [
		hasToCheckIsOrderRefusedByDriver,
		setHasToCheckIsOrderRefusedByDriver,
	] = useState(false);
	const [coursePrice, setCoursePrice] = useState(0.0);
	if (hasToCheckIsOrderRefusedByDriver) {
		setHasToCheckIsOrderRefusedByDriver(false);
		setTimeout(() => {
			setHasToCheckIsOrderRefusedByDriver(true);
		}, 2000);
		(async () => {
			await handleCheckIsOrderRefused({
				...props,
				setIsRouteStarted: setIsRouteStarted,
			});
		})();
	}
	useEffect(() => {
		(async () => {
			const isRideAlreadyStarted = await checkIfRideIsAlreadyStarted({
				userKey: props.userKey,
				setUserLocation: setUserLocation,
				setUserLocationDescription: setUserLocationDescription,
				setDestination: setDestination,
				setDestinationDescription: setDestinationDescription,
				setIsRouteStarted: setIsRouteStarted,
				setIsRetrieved: setIsRetrieved,
				setHasToCheckIsOrderRefusedByDriver:
					setHasToCheckIsOrderRefusedByDriver,
				hasToCheckIsOrderRefusedByDriver: hasToCheckIsOrderRefusedByDriver,
				rank: props.rank,
				setCoursePrice: setCoursePrice,
			});
			if (!isRideAlreadyStarted)
				await setActualUserLocation({
					setUserLocation,
					setIsRetrieved,
					setUserLocationDescription,
				});
		})();
	}, []);
	const passengerMapViewProps = {
		myLocalizationMarkerVisible: true,
		userLocation: userLocation,
		setUserLocation: setUserLocation,
		destination: destination,
		setDestination: setDestination,
		isRouteStarted: isRouteStarted,
		setIsRouteStarted: setIsRouteStarted,
		mapScreenName: "HomeScreen",
		userKey: props.userKey,
		navigation: props.navigation,
		accountBilance: props.accountBilance,
		rank: props.rank,
		setUserLocationDescription: setUserLocationDescription,
		setDestinationDescription: setDestinationDescription,
		destinationDescription: destinationDescription,
		userLocationDescription: userLocationDescription,
		setHasToCheckIsOrderRefusedByDriver: setHasToCheckIsOrderRefusedByDriver,
		setCoursePrice: setCoursePrice,
		coursePrice: coursePrice,
	};
	return (
		<>
			{isRetrieved ? (
				<View style={styles.mapTabView}>
					<PassengerMapView {...passengerMapViewProps} />
				</View>
			) : (
				<></>
			)}
		</>
	);
};
const PassengerMapView = (props: any) => {
	return (
		<View style={styles.mapTabView}>
			<MapViewComponent {...props} />
			{props.isRouteStarted ? (
				<></>
			) : (
				<SearchBarView setUserLocation={props.setUserLocation} />
			)}
			<BottomOptionsView {...props} />
		</View>
	);
};
const BottomOptionsView = (props: any) => {
	const [pricePerKilometer, setPricePerKilometer] = useState(4.99);
	return (
		<View style={styles.bottomOptionsMainView}>
			{props.isRouteStarted ? (
				<>
					<FromInput
						disabled={true}
						userLocationDescription={props.userLocationDescription}
						setUserLocation={props.setUserLocation}
						setUserLocationDescription={props.setUserLocationDescription}
					/>
					<ToInput
						disabled={true}
						setDestination={props.setDestination}
						destinationDescription={props.destinationDescription}
						setDestinationDescription={props.setDestinationDescription}
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
					<CancelRideButton
						setIsRouteStarted={props.setIsRouteStarted}
						rank={props.rank}
						userKey={props.userKey}
						accountBilance={props.accountBilance}
						coursePrice={props.coursePrice}
						fromDescription={props.userLocationDescription}
						toDescription={props.destinationDescription}
					/>
				</>
			) : (
				<>
					<FromInput
						disabled={false}
						userLocationDescription={props.userLocationDescription}
						setUserLocation={props.setUserLocation}
						setUserLocationDescription={props.setUserLocationDescription}
					/>
					<ToInput
						disabled={false}
						setDestination={props.setDestination}
						destinationDescription={props.destinationDescription}
						setDestinationDescription={props.setDestinationDescription}
					/>
					<ChooseTaxiTypeView setPricePerKilometer={setPricePerKilometer} />
					<OrderTaxiButton
						setIsRouteStarted={props.setIsRouteStarted}
						userKey={props.userKey}
						from={{
							...props.userLocation,
							description: props.userLocationDescription,
						}}
						to={{
							...props.destination,
							description: props.destinationDescription,
						}}
						pricePerKilometer={pricePerKilometer}
						navigation={props.navigation}
						accountBilance={props.accountBilance}
						rank={props.rank}
						setCoursePrice={props.setCoursePrice}
						setHasToCheckIsOrderRefusedByDriver={
							props.setHasToCheckIsOrderRefusedByDriver
						}
					/>
				</>
			)}
		</View>
	);
};
const FromInput = (props: any) => {
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
						props.setUserLocationDescription(actualDescription);
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
					value={props.userLocationDescription}
				/>
			</Input>
			<FlatList
				data={suggestions}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }: any) => (
					<TouchableOpacity
						onPress={async () => {
							props.setUserLocationDescription(item);
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
const ToInput = (props: any) => {
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
						props.setDestinationDescription(actualDescription);
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
					value={props.destinationDescription}
				/>
			</Input>
			<FlatList
				data={suggestions}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }: any) => (
					<TouchableOpacity
						onPress={async () => {
							props.setDestinationDescription(item);
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
const findPlace = async (props: any) => {
	const endpointUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${props.searchedPlaceDescription}&language=pl&key=${GoogleApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
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
async function checkIfRideIsAlreadyStarted(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		for (const orderKey in data) {
			const order = data[orderKey];
			if (order.assignedClientUserKey === props.userKey) {
				props.setIsRouteStarted(true);
				props.setHasToCheckIsOrderRefusedByDriver(true);
				props.setUserLocationDescription(order.from.description);
				props.setUserLocation(order.from);
				props.setDestinationDescription(order.to.description);
				props.setDestination(order.to);
				props.setIsRetrieved(true);
				props.setCoursePrice(order.price);
				const routeCredentials = {
					myLocalizationMarkerVisible: true,
					isRouteStarted: true,
					from: order.from,
					to: order.to,
					rank: props.rank,
				};
				await storeRouteCredentials(routeCredentials);
				return true;
			}
		}
	} catch (error) {
		console.log(error);
	}
	return false;
}
async function getLocationFromName(locationName: string) {
	const endpointUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${GoogleApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
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
	type: string;
	pricePerKilometer: string;
	isSelected: boolean;
	setIsStandardTaxi: any;
	setIsComfortTaxi: any;
	setIsElectricEcoTaxi: any;
	setIsPremiumTaxi: any;
	setPricePerKilometer: any;
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
const OrderTaxiButton = (props: any) => {
	const routeTechnicalCredentials = async () => {
		return await calculateCoursePrice({ ...props });
	};
	return (
		<Button
			bgColor='#FFB700'
			style={styles.orderTaxiButton}
			onPress={async () => {
				if (
					props.to.latitude &&
					props.from.latitude &&
					props.to.description &&
					props.from.description
				) {
					const credentials = await routeTechnicalCredentials();
					props.setCoursePrice(credentials.coursePrice);
					if (credentials.coursePrice != 0.0 && credentials.kilometers != 0.0) {
						if (props.accountBilance >= credentials.coursePrice) {
							const routeCredentials = {
								...props,
								myLocalizationMarkerVisible: true,
								isRouteStarted: true,
							};
							await storeRouteCredentials(routeCredentials);
							handleOrderTaxiButtonPress({
								assignedClientUserKey: props.userKey,
								assignedDriverUserKey: null,
								from: props.from,
								to: props.to,
								price: credentials.coursePrice,
								kilometers: credentials.kilometers,
							});
							props.setIsRouteStarted(true);
							props.setHasToCheckIsOrderRefusedByDriver(true);
						} else {
							ShowAlert("Błąd", "Nie masz wystarczających środków na koncie!");
						}
					} else {
						ShowAlert(
							"Błąd",
							"Nie można wytyczyć trasy do miejsca docelowego!"
						);
					}
				} else {
					ShowAlert(
						"Błąd",
						"Proszę uzupełnić miejsce docelowe/startowe podróży!"
					);
				}
			}}>
			<ButtonText style={styles.buttonText}>Zamów taksówkę</ButtonText>
		</Button>
	);
};
const CancelRideButton = (props: any) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.endRideButton}
			onPress={async () => {
				props.setIsRouteStarted(false);
				const routeCredentials = {
					myLocalizationMarkerVisible: true,
					isRouteStarted: false,
					from: { latitude: 0.0, longitude: 0.0, description: "" },
					to: { latitude: 0.0, longitude: 0.0, description: "" },
					rank: props.rank,
				};
				await storeRouteCredentials(routeCredentials);
				await handleCancelTaxiButtonPress({ ...props });
			}}>
			<ButtonText style={styles.buttonText}>Zakończ Przejazd</ButtonText>
		</Button>
	);
};
async function handleCheckIsOrderRefused(props: any) {
	const isOrderRefused = await checkIsOrderRefusedByDriver(props.userKey);
	if (isOrderRefused) {
		props.setIsRouteStarted(false);
		const routeCredentials = {
			myLocalizationMarkerVisible: true,
			isRouteStarted: false,
			from: { latitude: 0.0, longitude: 0.0, description: "" },
			to: { latitude: 0.0, longitude: 0.0, description: "" },
			rank: props.rank,
		};
		await storeRouteCredentials(routeCredentials);
	}
}
async function calculateCoursePrice(props: any) {
	const endpointUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${props.from.latitude},${props.from.longitude}&
	destinations=${props.to.latitude},${props.to.longitude}&key=${GoogleApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		if (data.status === "OK") {
			const kilometers = data.rows[0].elements[0].distance.value / 1000;
			return {
				kilometers: kilometers,
				coursePrice: props.pricePerKilometer * kilometers,
			};
		}
	} catch (error) {
		console.log("Błąd:", error);
	}
	return { kilometers: 0.0, coursePrice: 0.0 };
}
async function handleOrderTaxiButtonPress(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		await fetch(endpointUrl, {
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
async function handleCancelTaxiButtonPress(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		for (const orderKey in data) {
			if (
				data[orderKey].assignedClientUserKey === props.userKey &&
				data[orderKey].assignedDriverUserKey
			) {
				await decrementUserAccountBilance({ ...props });
				await incrementDriverAccountBilance({
					...props,
					driverUserKey: data[orderKey].assignedDriverUserKey,
				});
				await addUserTransaction({ ...props, type: "outflow" });
				await addUserTransaction({
					userKey: data[orderKey].assignedDriverUserKey,
					coursePrice: props.coursePrice,
					type: "inflow",
				});
				await addTravelToUserTravelHistory({ ...props });
				await addTravelToUserTravelHistory({ 
					userKey: data[orderKey].assignedDriverUserKey,
					fromDescription: props.fromDescription,
					toDescription: props.toDescription
				});
				await addPassengerRating({
					userKey: props.userKey,
					driverUserKey: data[orderKey].assignedDriverUserKey,
				});
				await removeTaxiOrder(orderKey);
			} else if (
				data[orderKey].assignedClientUserKey === props.userKey &&
				!data[orderKey].assignedDriverUserKey
			) {
				await removeTaxiOrder(orderKey);
			}
		}
	} catch (error) {
		console.log(error);
	}
}
async function removeTaxiOrder(orderKey: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders/${orderKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		await fetch(endpointUrl, {
			method: "DELETE",
		});
	} catch (error) {
		console.error(error);
	}
}
async function decrementUserAccountBilance(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users/${props.userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	const updatedUserObject = {
		accountBilance: Number(props.accountBilance) - Number(props.coursePrice),
	};
	try {
		await fetch(endpointUrl, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(updatedUserObject),
		});
	} catch (error) {
		console.error(error);
	}
}
async function incrementDriverAccountBilance(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users/${props.driverUserKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	const accountBilance = await getDriverAccountBilance({ ...props });
	const updatedUserObject = {
		accountBilance: Number(accountBilance) + Number(props.coursePrice),
	};
	try {
		await fetch(endpointUrl, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(updatedUserObject),
		});
	} catch (error) {
		console.error(error);
	}
}
async function getDriverAccountBilance(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users/${props.driverUserKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		return data.accountBilance;
	} catch (error) {
		console.log(error);
	}
	return 0.0;
}
async function addUserTransaction(props: any) {
	const actualDate = new Date();
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/transactions/${props.userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	const actualMonth = actualDate.getMonth() + 1;
	const formattedDate =
		actualDate.getDate() + "-" + actualMonth + "-" + actualDate.getFullYear();
	const userTransactionObject = {
		date: formattedDate,
		cost: props.coursePrice,
		type: props.type,
	};
	try {
		await fetch(endpointUrl, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(userTransactionObject),
		});
	} catch (error) {
		console.log(error);
	}
}
async function addTravelToUserTravelHistory(props: any) {
	const actualDate = new Date();
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/travelhistories/${props.userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	const userTravelHistoryObject = {
		from: props.fromDescription,
		to: props.toDescription,
		day: actualDate.getDate(),
		month: actualDate.getMonth() + 1,
		year: actualDate.getFullYear(),
		hourAndMinute: actualDate.getHours() + ":" + actualDate.getMinutes(),
	};
	try {
		await fetch(endpointUrl, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(userTravelHistoryObject),
		});
	} catch (error) {
		console.error(error);
	}
}
async function addPassengerRating(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/ratings/${props.userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	const driverCredentials = await getDriverCredentials(props.driverUserKey);
	const driverAvatarLink = await getDriverAvatarLink(props.driverUserKey);
	const passengerRatingObject = {
		name: driverCredentials?.name,
		surname: driverCredentials?.surname,
		avatarLink: driverAvatarLink,
		driverUserKey: props.driverUserKey,
		numberOfStars: 1,
		opinion: "",
	};
	try {
		await fetch(endpointUrl, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(passengerRatingObject),
		});
	} catch (error) {
		console.log(error);
	}
}
async function getDriverCredentials(driverUserKey: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		for (const userKey in data) {
			if (userKey === driverUserKey) {
				const user = data[userKey];
				return {
					name: user.name,
					surname: user.surname,
				};
			}
		}
	} catch (error) {
		console.log(error);
	}
}
async function getDriverAvatarLink(driverUserKey: any) {
	initializeApp(FirebaseApiCredentials);
	const storage = getStorage();
	const starsRef = ref(storage, `images/${driverUserKey}/avatar.jpg`);
	let url =
		"https://st3.depositphotos.com/1767687/17621/v/450/depositphotos_176214104-stock-illustration-default-avatar-profile-icon.jpg";
	try {
		url = await getDownloadURL(starsRef);
	} catch (error) {
		console.log("Not existing user avatar, setting default");
	}
	return url;
}
async function checkIsOrderRefusedByDriver(userKey: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		for (const orderKey in data) {
			if (data[orderKey].assignedClientUserKey === userKey) return false;
		}
	} catch (error) {
		console.error(error);
	}
	return true;
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
