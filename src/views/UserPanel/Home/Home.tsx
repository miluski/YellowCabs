import React, { useState } from "react";
import styles from "./styles";
import MapViewDirections from "react-native-maps-directions";
import { TouchableWithoutFeedback } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Contract } from "./Contract";
import { EvilIcons, Entypo, Feather } from "@expo/vector-icons";
import MapView, { Callout, Marker } from "react-native-maps";
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
import { GoogleApiCredentials } from "../../../../api.config";
const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
interface RouteParams {
	userKey?: string;
	rank?: string;
}
export default function Home() {
	const route = useRoute();
	const { userKey, rank } = route.params as RouteParams;
	if (rank == "driver") return <DriverHome />;
	else return <PassengerHome />;
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
const PassengerHome = () => {
	return (
		<>
			<MapViewComponent markerVisible={false} />
			<SearchBarView />
			<BottomOptionsView />
		</>
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
				apikey={GoogleApiCredentials.apiKey}
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
const BottomOptionsView = () => {
	const [isRideStarted, setIsRideStarted] = useState(false);
	return isRideStarted ? (
		<View style={styles.bottomOptionsMainView}>
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
		</View>
	) : (
		<View style={styles.bottomOptionsMainView}>
			<FromInput disabled={false} />
			<ToInput disabled={false} />
			<ChooseTaxiTypeView />
			<OrderTaxiButton setIsRideStarted={setIsRideStarted} />
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
