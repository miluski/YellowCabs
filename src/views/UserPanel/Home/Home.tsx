import React, { useEffect, useState } from "react";
import styles from "./styles";
import { TouchableWithoutFeedback } from "react-native";
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
} from "@gluestack-ui/themed";
import setActualUserLocation from "../../../functions/SetActualUserLocation";
import SearchBarView from "../../../components/SearchBarViewComponent";
import MapViewComponent from "../../../components/MapViewComponent";
interface RouteParams {
	userKey?: string;
	rank?: string;
	destination?: any;
	isRouteStarted?: boolean;
}
export default function Home() {
	const route = useRoute();
	let routedProps =
		route.params as RouteParams;
	if (routedProps.rank == "driver") return <DriverHome />;
	else return <PassengerHome props={routedProps}/>;
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
const PassengerHome = ({props}: any) => {
	const [userLocation, setUserLocation] = useState({});
	const [isRetrieved, setIsRetrieved] = useState(false);
	useEffect(() => {
		(async () => {
			await setActualUserLocation({ setUserLocation, setIsRetrieved });
		})();
	}, []);
	return (
		<View style={styles.mapTabView}>
			{isRetrieved ? (
				<PassengerMapView
					myLocalizationMarkerVisible={true}
					destinationLocalizationMarkerVisible={props.isRouteStarted}
					userLocation={userLocation}
					setUserLocation={setUserLocation}
					destination={props.destination}
					isRouteStarted={props.isRouteStarted}
					mapScreenName="HomeScreen"
				/>
			) : (
				<></>
			)}
		</View>
	);
};
const PassengerMapView = (props: {
	myLocalizationMarkerVisible : boolean;
	destinationLocalizationMarkerVisible : boolean | undefined;
	userLocation : any | undefined;
	setUserLocation : any | undefined;
	destination : any | undefined;
	isRouteStarted : any | undefined;
	mapScreenName: string | undefined;
}) => {
	return (
		<View style={styles.mapTabView}>
			<MapViewComponent {...props} />
			<SearchBarView setUserLocation={props.setUserLocation} />
			<BottomOptionsView />
		</View>
	);
};
const BottomOptionsView = () => {
	const [isRideStarted, setIsRideStarted] = useState(false);
	return (
		<View style={styles.bottomOptionsMainView}>
			{isRideStarted ? (
				<>
					<FromInput disabled={true} />
					<ToInput disabled={true} />
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
					<CancelRideButton setIsRideStarted={setIsRideStarted} />
				</>
			) : (
				<>
					<FromInput disabled={false} />
					<ToInput disabled={false} />
					<ChooseTaxiTypeView />
					<OrderTaxiButton setIsRideStarted={setIsRideStarted} />
				</>
			)}
		</View>
	);
};
const FromInput = (props: { disabled: boolean }) => {
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
				/>
			</Input>
			<Text style={styles.lineText}>|</Text>
		</View>
	);
};
const ToInput = (props: { disabled: boolean }) => {
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
				/>
			</Input>
		</View>
	);
};
const ChooseTaxiTypeView = () => {
	const [isStandardTaxi, setIsStandardTaxi] = useState(false);
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
				/>
				<TaxiTypeView
					type='Comfort'
					pricePerKilometer='9.99'
					isSelected={isComfortTaxi}
					setIsStandardTaxi={setIsStandardTaxi}
					setIsComfortTaxi={setIsComfortTaxi}
					setIsElectricEcoTaxi={setIsElectricEcoTaxi}
					setIsPremiumTaxi={setIsPremiumTaxi}
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
				/>
				<TaxiTypeView
					type='Premium'
					pricePerKilometer='19.99'
					isSelected={isPremiumTaxi}
					setIsStandardTaxi={setIsStandardTaxi}
					setIsComfortTaxi={setIsComfortTaxi}
					setIsElectricEcoTaxi={setIsElectricEcoTaxi}
					setIsPremiumTaxi={setIsPremiumTaxi}
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
						break;
					case "Comfort":
						props.setIsStandardTaxi(false);
						props.setIsComfortTaxi(true);
						props.setIsElectricEcoTaxi(false);
						props.setIsPremiumTaxi(false);
						break;
					case "Electric ECO":
						props.setIsStandardTaxi(false);
						props.setIsComfortTaxi(false);
						props.setIsElectricEcoTaxi(true);
						props.setIsPremiumTaxi(false);
						break;
					case "Premium":
						props.setIsStandardTaxi(false);
						props.setIsComfortTaxi(false);
						props.setIsElectricEcoTaxi(false);
						props.setIsPremiumTaxi(true);
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
const OrderTaxiButton = (props: { setIsRideStarted: any }) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.orderTaxiButton}
			onPress={() => {
				props.setIsRideStarted(true);
			}}>
			<ButtonText style={styles.buttonText}>Zamów taksówkę</ButtonText>
		</Button>
	);
};
const CancelRideButton = (props: { setIsRideStarted: any }) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.endRideButton}
			onPress={() => {
				props.setIsRideStarted(false);
			}}>
			<ButtonText style={styles.buttonText}>Zakończ Przejazd</ButtonText>
		</Button>
	);
};
