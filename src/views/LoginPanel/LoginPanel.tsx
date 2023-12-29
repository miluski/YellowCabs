import * as Font from "expo-font";
import styles from "./styles";
import showAlert from "../../functions/ShowAlert";
import validatePhone from "../../functions/ValidatePhone";
import validatePassword from "../../functions/ValidatePassword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { initializeApp } from "firebase/app";
import { config } from "@gluestack-ui/config";
import { FirebaseApiCredentials } from "../../../api.config";
import React, { useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import {
	GluestackUIProvider,
	Image,
	Text,
	Box,
	Button,
	ButtonText,
} from "@gluestack-ui/themed";
import { PhoneInput } from "../../components/PhoneInput";
import { PasswordInput } from "../../components/PasswordInput";
export default function LoginPanel({ navigation }: { navigation: any }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const loadCustomFont = async () => {
		await Font.loadAsync({
			"DejaVuSans-Bold": require("../../assets/fonts/DejaVuSans-Bold.ttf"),
			DejaVuSans: require("../../assets/fonts/DejaVuSans.ttf"),
			"DejaVuSans-ExtraLight": require("../../assets/fonts/DejaVuSans-ExtraLight.ttf"),
		});
	};
	loadCustomFont().then(() => {
		setIsLoaded(true);
	});
	if (!isLoaded) {
		return null;
	} else {
		return (
			<GluestackUIProvider config={config}>
				<Background navigation={navigation} />
			</GluestackUIProvider>
		);
	}
}
const Background = (props: { navigation: any }) => {
	return (
		<View style={styles.panelMainView}>
			<Logo />
			<Text style={styles.yellowCabsText}>YellowCabs</Text>
			<MainView navigation={props.navigation} />
		</View>
	);
};
const Logo = () => {
	return (
		<Image
			size='xl'
			source={{
				uri: "https://i.ibb.co/hLT13mG/Zrzut-ekranu-2023-10-19-234035.png",
			}}
			style={styles.loginPanelLogo}
			alt='Logo'
		/>
	);
};
const MainView = (props: { navigation: any }) => {
	return (
		<View style={styles.dataInputView}>
			<DataForm navigation={props.navigation} />
		</View>
	);
};
const DataForm = (props: { navigation: any }) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [errorText, setErrorText] = useState("Hasło musi mieć 8 znaków!");
	const [isInvalidPhone, setIsInvalidPhone] = useState(false);
	const [isInvalidPassword, setIsInvalidPassword] = useState(false);
	return (
		<Box>
			<PhoneInput
				phoneNumber={phoneNumber}
				isInvalid={isInvalidPhone}
				setPhoneNumber={setPhoneNumber}
				errorMessage={"Wprowadzony numer telefonu jest nieprawidłowy!"}
				value={undefined}
			/>
			<PasswordInput
				password={password}
				isInvalid={isInvalidPassword}
				errorText={errorText}
				setPassword={setPassword}
				hintText={"Hasło"}
			/>
			<NotRememberPasswordHint navigation={props.navigation} />
			<LoginYourSelfButton
				onPress={async () => {
					const providedData = {
						phone: phoneNumber,
						password: password,
						navigation: props.navigation,
					};
					var isValidPhone = validatePhone(phoneNumber);
					var isValidPassword = validatePassword(password);
					if (!isValidPassword)
						setErrorText("Wprowadzone hasło jest nieprawidłowe!");
					setIsInvalidPhone(!isValidPhone);
					setIsInvalidPassword(!isValidPassword);
					if (isValidPhone && isValidPassword)
						await handleLoginButtonPress(
							providedData,
							props.navigation,
							setPhoneNumber,
							setPassword
						);
				}}
			/>
			<RegisterYourSelfButton navigation={props.navigation} />
		</Box>
	);
};
const NotRememberPasswordHint = (props: { navigation: any }) => {
	return (
		<Button
			action={"secondary"}
			variant={"link"}
			size={"xs"}
			isDisabled={false}
			style={styles.notRememberPasswordButton}
			onPress={() => {
				props.navigation.navigate("PasswordNotRemember");
			}}>
			<ButtonText style={styles.notRememberPasswordButtonText}>
				Nie pamiętasz hasła?
			</ButtonText>
		</Button>
	);
};
const LoginYourSelfButton = (props: any) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.buttons}
			onPress={props.onPress}>
			<ButtonText style={styles.buttonText}>Zaloguj</ButtonText>
		</Button>
	);
};
const RegisterYourSelfButton = (props: { navigation: any }) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.buttons}
			onPress={() => {
				props.navigation.navigate("RegisterPanel");
			}}>
			<ButtonText style={styles.buttonText}>Zarejestruj się</ButtonText>
		</Button>
	);
};
async function handleLoginButtonPress(
	providedData: any,
	navigation: any,
	setPhoneNumber: any,
	setPassword: any
) {
	await resetMapCredentialsAsyncStorageObject(providedData.rank);
	const requestURL = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	fetch(requestURL)
		.then((response) => {
			return response.json();
		})
		.then(async (data) => {
			await handleRetrievedData(
				data,
				providedData,
				navigation,
				setPhoneNumber,
				setPassword
			);
		})
		.catch((error) => {
			console.log(error);
		});
}
async function resetMapCredentialsAsyncStorageObject(rank: string) {
	try {
		await AsyncStorage.setItem(
			"MapCredentialsList",
			JSON.stringify({
				myLocalizationMarkerVisible: false,
				isRouteStarted: false,
				userLocation: {
					latitude: 0.0,
					longitude: 0.0,
					description: "",
				},
				destination: {
					latitude: 0.0,
					longitude: 0.0,
					description: "",
				},
				rank: rank,
			})
		);
	} catch (error) {
		console.log(error);
	}
}
async function handleRetrievedData(
	data: any,
	providedData: any,
	navigation: any,
	setPhoneNumber: any,
	setPassword: any
) {
	const parsedPhone = parseInt(providedData.phone);
	let foundedUserPhone = false;
	for (const userKey in data) {
		const user = data[userKey];
		if (isUserFounded(user.phone, parsedPhone)) {
			foundedUserPhone = true;
			if (checkPassword(user.password, providedData.password)) {
				const avatarUrl = await getAvatarUrl(userKey);
				setPhoneNumber("");
				setPassword("");
				navigation.navigate("MainPanel", {
					rank: user.role,
					userKey: userKey,
					avatarLink: avatarUrl,
					vibrations: String(user.vibrations),
					notifications: String(user.notifications),
					destination: {
						latitude: 0.0,
						longitude: 0.0,
					},
					isRouteStarted: false,
				});
				return;
			} else if (foundedUserPhone)
				showAlert("Błąd", "Wprowadzono nieprawidłowe dane!", "yes");
		}
	}
	if (!foundedUserPhone)
		showAlert("Błąd", "Konto o podanym numerze telefonu nie istnieje!", "yes");
}
async function getAvatarUrl(userKey: string) {
	initializeApp(FirebaseApiCredentials);
	const storage = getStorage();
	const starsRef = ref(storage, `images/${userKey}/avatar.jpg`);
	let url =
		"https://st3.depositphotos.com/1767687/17621/v/450/depositphotos_176214104-stock-illustration-default-avatar-profile-icon.jpg";
	try {
		url = await getDownloadURL(starsRef);
	} catch (error) {
		console.log("Not existing user avatar, setting default");
	}
	return url;
}
function isUserFounded(phone: number, providedPhone: number) {
	return phone == providedPhone;
}
function checkPassword(password: string, providedPassword: string) {
	return password == providedPassword;
}
