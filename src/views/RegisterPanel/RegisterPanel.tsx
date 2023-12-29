import * as Font from "expo-font";
import styles from "./styles";
import showAlert from "../../functions/ShowAlert";
import validatePhone from "../../functions/ValidatePhone";
import validateName from "../../functions/ValidateName";
import validatePassword from "../../functions/ValidatePassword";
import validateSurname from "../../functions/ValidateSurname";
import getGeneratedSecret from "../../functions/GetGeneratedSecred";
import validateRepeatedPassword from "../../functions/ValidateRepeatedPassword";
import { config } from "@gluestack-ui/config";
import { FirebaseApiCredentials } from "../../../api.config";
import { BadInput } from "../../components/BadInput";
import { Label } from "../../components/Label";
import { PasswordInput } from "../../components/PasswordInput";
import { NameInput } from "../../components/NameInput";
import { PhoneInput } from "../../components/PhoneInput";
import { SurnameInput } from "../../components/SurnameInput";
import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import {
	Button,
	GluestackUIProvider,
	Text,
	Box,
	FormControl,
	ButtonGroup,
	Input,
	InputField,
	ButtonText,
	RadioGroup,
	CircleIcon,
	Radio,
	RadioIcon,
	RadioIndicator,
	RadioLabel,
	ScrollView,
	HStack,
} from "@gluestack-ui/themed";
export default function RegisterPanel({ navigation }: { navigation: any }) {
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
		<ScrollView style={styles.mainPanelView}>
			<Text style={styles.registerYourSelfText}>Zarejestruj się</Text>
			<Text style={styles.topTexts}>Nie masz jeszcze konta?</Text>
			<Text style={styles.topTexts}>Utwórz je za darmo</Text>
			<MainView navigation={props.navigation} />
		</ScrollView>
	);
};
const MainView = (props: { navigation: any }) => {
	const [rank, setRank] = useState("passenger");
	const [isDriver, setIsDriver] = useState(false);
	return (
		<View style={styles.dataInputView}>
			<Label hintText='Wybierz typ konta' />
			<SwitchableButtons
				setRank={setRank}
				setIsDriver={setIsDriver}
			/>
			<DataForm
				navigation={props.navigation}
				isDriver={isDriver}
			/>
		</View>
	);
};
const DataForm = (props: { navigation: any; isDriver: boolean }) => {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [voivodeship, setVoivodeship] = useState("");
	const [driverlicense, setDriverlicense] = useState("");
	const [cardid, setCardid] = useState("");
	const [password, setPassword] = useState("");
	const [phoneErrorMessage, setPhoneErrorMessage] = useState(
		"Wprowadzony numer telefonu jest nieprawidłowy!"
	);
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const [isInvalidName, setIsInvalidName] = useState(false);
	const [isInvalidSurname, setIsInvalidSurname] = useState(false);
	const [isInvalidPhone, setIsInvalidPhone] = useState(false);
	const [isInvalidVoivodeship, setIsInvalidVoivodeship] = useState(false);
	const [isInvalidDriverlicense, setIsInvalidDriverlicense] = useState(false);
	const [isInvalidCardid, setIsInvalidCardid] = useState(false);
	const [isInvalidPassword, setIsInvalidPassword] = useState(false);
	const [isInvalidRepeatedPassword, setIsInvalidRepeatedPassword] =
		useState(false);
	const [isAgreementNotChecked, setIsAgreementNotChecked] = useState(true);
	return (
		<Box style={styles.dataFormBox}>
			<NameInput
				name={name}
				isInvalid={isInvalidName}
				setName={setName}
			/>
			<SurnameInput
				surname={surname}
				isInvalid={isInvalidSurname}
				setSurname={setSurname}
			/>
			<PhoneInput
				phoneNumber={phoneNumber}
				errorMessage={phoneErrorMessage}
				isInvalid={isInvalidPhone}
				setPhoneNumber={setPhoneNumber}
				value={undefined}
			/>
			<VoivodeshipInput
				voivodeship={voivodeship}
				isInvalid={isInvalidVoivodeship}
				setVoivodeship={setVoivodeship}
			/>
			{props.isDriver && (
				<>
					<DriverLicenseInput
						driverlicense={driverlicense}
						isInvalid={isInvalidDriverlicense}
						setDriverlicense={setDriverlicense}
					/>
					<CardIdInput
						cardid={cardid}
						isInvalid={isInvalidCardid}
						setCardid={setCardid}
					/>
				</>
			)}
			<PasswordInput
				password={password}
				errorText={"Wprowadzone hasło jest nieprawidłowe!"}
				hintText={"Hasło"}
				isInvalid={isInvalidPassword}
				setPassword={setPassword}
			/>
			<PasswordInput
				password={repeatedPassword}
				errorText={"Wprowadzone hasło jest nieprawidłowe!"}
				hintText={"Powtórz hasło"}
				isInvalid={isInvalidRepeatedPassword}
				setPassword={setRepeatedPassword}
			/>
			<AgreementRadioButton
				isAgreementNotChecked={isAgreementNotChecked}
				setIsAgreementNotChecked={setIsAgreementNotChecked}
			/>
			<CreateAccountButton
				onPress={async () => {
					let isValidPhone = validatePhone(phoneNumber);
					const isPhoneExists = await getIsUserExists(parseInt(phoneNumber));
					if (isPhoneExists) {
						setPhoneErrorMessage("Podany numer telefonu już posiada konto!");
						isValidPhone = false;
					}
					const isValidName = validateName(name);
					const isValidSurname = validateSurname(surname);
					const isValidVoivodeship = validateVoivodeship(voivodeship);
					const isValidDriverLicense = validateDriverLicense(driverlicense);
					const isValidCardid = validateCardId(cardid);
					const isValidPassword = validatePassword(password);
					const isValidRepeatedPassword =
						validateRepeatedPassword(password, repeatedPassword) &&
						validatePassword(repeatedPassword);
					const generatedSecret = getGeneratedSecret(8);
					setIsInvalidName(!isValidName);
					setIsInvalidSurname(!isValidSurname);
					setIsInvalidPhone(!isValidPhone);
					setIsInvalidVoivodeship(!isValidVoivodeship);
					setIsInvalidDriverlicense(!isValidDriverLicense);
					setIsInvalidCardid(!isValidCardid);
					setIsInvalidPassword(!isValidPassword);
					setIsInvalidRepeatedPassword(!isValidRepeatedPassword);
					if (
						!isPhoneExists &&
						isValidName &&
						isValidSurname &&
						isValidPhone &&
						isValidVoivodeship &&
						isValidDriverLicense &&
						isValidCardid &&
						isValidPassword &&
						isValidRepeatedPassword &&
						!isAgreementNotChecked &&
						props.isDriver
					) {
						const dataObject = {
							name: name,
							surname: surname,
							phone: phoneNumber,
							voivodeship: voivodeship,
							driverlicense: driverlicense.toUpperCase(),
							cardid: cardid.toUpperCase(),
							password: password,
							agreement: !isAgreementNotChecked,
							role: "driver",
							secretPassword: generatedSecret,
							vibrations: "yes",
							notifications: "yes",
							accountBilance: 0.0,
						};
						await registerUser(dataObject, props.navigation, generatedSecret);
					} else if (
						!isPhoneExists &&
						isValidName &&
						isValidSurname &&
						isValidPhone &&
						isValidVoivodeship &&
						isValidPassword &&
						isValidRepeatedPassword &&
						!isAgreementNotChecked &&
						!props.isDriver
					) {
						const dataObject = {
							name: name,
							surname: surname,
							phone: phoneNumber,
							voivodeship: voivodeship,
							password: password,
							agreement: !isAgreementNotChecked,
							role: "passenger",
							secretPassword: generatedSecret,
							vibrations: "yes",
							notifications: "yes",
							accountBilance: 0.0,
						};
						await registerUser(dataObject, props.navigation, generatedSecret);
					}
				}}
			/>
			<Text style={styles.creatingNewAccountText}>
				Tworząc nowe konto będą obowiązywać Cię
			</Text>
			<BottomInformation navigation={props.navigation} />
		</Box>
	);
};
const SwitchableButtons = (props: {
	setRank: (arg0: string) => void;
	setIsDriver: (arg0: boolean) => void;
}) => {
	const [driverButtonColor, setDriverButtonColor] = useState("white");
	const [passengerButtonColor, setPassengerButtonColor] = useState("#FFB700");
	return (
		<ButtonGroup style={styles.driverPassengerSwitchButtonGroup}>
			<Button
				bgColor={passengerButtonColor}
				style={styles.buttons}
				onPress={() => {
					props.setRank("passenger");
					setDriverButtonColor("white");
					setPassengerButtonColor("#FFB700");
					props.setIsDriver(false);
				}}>
				<ButtonText style={styles.buttonText}>Pasażer</ButtonText>
			</Button>
			<Button
				bgColor={driverButtonColor}
				style={styles.buttons}
				onPress={() => {
					props.setRank("driver");
					setDriverButtonColor("#FFB700");
					setPassengerButtonColor("white");
					props.setIsDriver(true);
				}}>
				<ButtonText style={styles.buttonText}>Kierowca</ButtonText>
			</Button>
		</ButtonGroup>
	);
};
const VoivodeshipInput = (props: {
	voivodeship: string | undefined;
	isInvalid: boolean | undefined;
	setVoivodeship: (arg0: string) => void;
}) => {
	return (
		<FormControl
			size='lg'
			isDisabled={false}
			isInvalid={props.isInvalid}
			isReadOnly={false}
			isRequired={false}>
			<Label hintText='Województwo' />
			<Input style={styles.inputFields}>
				<InputField
					type='text'
					value={props.voivodeship}
					placeholder='Świętokrzyskie'
					onChangeText={(actualVoviodeship) => {
						props.setVoivodeship(actualVoviodeship);
					}}
					selectionColor={"black"}
				/>
			</Input>
			<BadInput hintText='Wprowadzone województwo jest nieprawidłowe!' />
		</FormControl>
	);
};
const DriverLicenseInput = (props: {
	driverlicense: string | undefined;
	isInvalid: boolean | undefined;
	setDriverlicense: (arg0: string) => void;
}) => {
	return (
		<FormControl
			size='lg'
			isDisabled={false}
			isInvalid={props.isInvalid}
			isReadOnly={false}
			isRequired={false}>
			<Label hintText='Numer prawa jazdy' />
			<Input style={styles.inputFields}>
				<InputField
					type='text'
					value={props.driverlicense}
					placeholder='C1234567'
					onChangeText={(actualDriverlicense) => {
						props.setDriverlicense(actualDriverlicense);
					}}
					selectionColor={"black"}
				/>
			</Input>
			<BadInput hintText='Wprowadzone prawo jazdy jest nieprawidłowe!' />
		</FormControl>
	);
};
const CardIdInput = (props: {
	cardid: string | undefined;
	isInvalid: boolean | undefined;
	setCardid: (arg0: string) => void;
}) => {
	return (
		<FormControl
			size='lg'
			isDisabled={false}
			isInvalid={props.isInvalid}
			isReadOnly={false}
			isRequired={false}>
			<Label hintText='Numer dowodu osobistego' />
			<Input style={styles.inputFields}>
				<InputField
					type='text'
					value={props.cardid}
					placeholder='COS 224422'
					onChangeText={(actualCardid) => {
						props.setCardid(actualCardid);
					}}
					selectionColor={"black"}
				/>
			</Input>
			<BadInput hintText='Wprowadzony dowód osobisty jest nieprawidłowy!' />
		</FormControl>
	);
};
const AgreementRadioButton = (props: {
	isAgreementNotChecked: boolean | undefined;
	setIsAgreementNotChecked: any | undefined;
}) => {
	const [values, setValues] = useState("");
	const [color, setColor] = useState("red");
	const handleRadioChange = () => {
		setValues("Agree");
		props.setIsAgreementNotChecked(false);
		setColor("black");
	};
	return (
		<RadioGroup
			value={values}
			borderColor='black'
			onChange={handleRadioChange}>
			<Radio
				value='Agree'
				size='md'
				isInvalid={props.isAgreementNotChecked}
				isDisabled={false}
				onChange={handleRadioChange}>
				<RadioIndicator
					mr={"$1"}
					borderColor={color}>
					<RadioIcon
						as={CircleIcon}
						style={styles.circleIcon}
					/>
				</RadioIndicator>
				<RadioLabel style={styles.agreementText}>
					Wyrażam zgodę na otrzymywanie na podany numer połączeń telefonicznych
					oraz wiadomości SMS w tym za pośrednictwem systemów automatycznych od
					YellowCabs i połączeń firmowych
				</RadioLabel>
			</Radio>
		</RadioGroup>
	);
};
const CreateAccountButton = (props: any) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.registerButton}
			onPress={props.onPress}>
			<ButtonText style={styles.buttonText}>Utwórz konto</ButtonText>
		</Button>
	);
};
const BottomInformation = (props: { navigation: any }) => {
	return (
		<HStack
			space='xs'
			style={styles.policyPrivacyTermsAndConditionsStack}>
			<TermAndConditionsButton navigation={props.navigation} />
			<Text style={styles.andConnectorText}>i</Text>
			<PrivacyPolicyButton navigation={props.navigation} />
		</HStack>
	);
};
const TermAndConditionsButton = (props: { navigation: any }) => {
	return (
		<TouchableWithoutFeedback>
			<Button
				action={"secondary"}
				variant={"link"}
				size={"xs"}
				isDisabled={false}
				style={styles.policyPrivacyTermsAndConditionsButtons}
				onPress={() => {
					props.navigation.navigate("TermsAndConditions");
				}}>
				<ButtonText style={styles.rulesAndTermsButtonText}>
					Zasady & Warunki
				</ButtonText>
			</Button>
		</TouchableWithoutFeedback>
	);
};
const PrivacyPolicyButton = (props: { navigation: any }) => {
	return (
		<TouchableWithoutFeedback>
			<Button
				action={"secondary"}
				variant={"link"}
				size={"xs"}
				isDisabled={false}
				style={styles.policyPrivacyTermsAndConditionsButtons}
				onPress={() => {
					props.navigation.navigate("PrivacyPolicy");
				}}>
				<ButtonText style={styles.privacyPolicyButtonText}>
					Polityka prywatności
				</ButtonText>
			</Button>
		</TouchableWithoutFeedback>
	);
};
async function getIsUserExists(phone: number) {
	const requestURL = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(requestURL);
		const data = await response.json();
		for (const userKey in data) {
			const user = data[userKey];
			if (user.phone == phone) return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
}
async function registerUser(data: any, navigation: any, secret: string) {
	const requestURL = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const postResponse = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (postResponse.ok) {
			showAlert(
				"Sukces",
				"Pomyślnie zarejestrowano konto!\nTwój sekret to: " +
					secret +
					"\nZapisz go w bezpiecznym miejscu!",
				"yes"
			);
			navigation.navigate("PrivacyPolicy", {
				previousScreenName: "RegisterPanel",
			});
		} else {
			showAlert("Błąd", "Wystąpił nieoczekiwany błąd!", "yes");
		}
	} catch (error) {
		console.error(error);
		return false;
	}
}
function validateVoivodeship(voivodeship: string) {
	let voivodeships: string[] = [
		"dolnośląskie",
		"kujawsko-pomorskie",
		"lubelskie",
		"lubuskie",
		"łódzkie",
		"małopolskie",
		"mazowieckie",
		"opolskie",
		"podkarpackie",
		"podlaskie",
		"pomorskie",
		"śląskie",
		"świętokrzyskie",
		"warmińsko-mazurskie",
		"wielkopolskie",
		"zachodniopomorskie",
	];
	for (let i = 0; i < 16; i++)
		if (voivodeships[i] == voivodeship.toLowerCase()) return true;
	return false;
}
function validateDriverLicense(driverLicense: string) {
	const driverLicensePattern = /^[a-zA-Z]{1}\d{7}$/;
	return driverLicense.length === 8 && driverLicensePattern.test(driverLicense);
}
function validateCardId(cardId: string) {
	const cardIdPattern = /^[a-zA-Z]{3}\s\d{6}$/;
	return cardId.length === 10 && cardIdPattern.test(cardId);
}
