import * as Font from "expo-font";
import styles from "./styles";
import showAlert from "../../functions/ShowAlert";
import getGeneratedSecret from "../../functions/GetGeneratedSecred";
import validatePhone from "../../functions/ValidatePhone";
import validateRepeatedPassword from "../../functions/ValidateRepeatedPassword";
import validatePassword from "../../functions/ValidatePassword";
import { View } from "react-native";
import { PasswordInput } from "../../components/PasswordInput";
import { PhoneInput } from "../../components/PhoneInput";
import { FirebaseApiCredentials } from "../../../api.config";
import React, { useState } from "react";
import {
	Text,
	Input,
	Box,
	FormControl,
	FormControlError,
	FormControlErrorText,
	Button,
	FormControlLabel,
	FormControlLabelText,
	InputField,
	ButtonText,
} from "@gluestack-ui/themed";
export default function PasswordNotRemember({
	navigation,
}: {
	navigation: any;
}) {
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
			<View style={styles.panelMainView}>
				<Text style={styles.recoverPasswordText}>Przywracanie hasła</Text>
				<View style={styles.dataInputView}>
					<Box>
						<DataForm navigation={navigation} />
					</Box>
				</View>
			</View>
		);
	}
}
const DataForm = (props: { navigation: any }) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [secretPassword, setSecretPassword] = useState("");
	const [password, setPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const [isInvalidPhone, setIsInvalidPhone] = useState(false);
	const [isInvalidPassword, setIsInvalidPassword] = useState(false);
	const [isInvalidRepeatedPassword, setIsInvalidRepeatedPassword] =
		useState(false);
	const [isInvalidSecretPassword, setIsInvalidSecretPassword] = useState(false);
	return (
		<Box>
			<PhoneInput
				phoneNumber={phoneNumber}
				isInvalid={isInvalidPhone}
				setPhoneNumber={setPhoneNumber}
				errorMessage={"Wprowadzony telefon jest nieprawidłowy!"}
				value={undefined}
			/>
			<SecretPasswordInput
				secretPassword={secretPassword}
				isInvalid={isInvalidSecretPassword}
				setSecretPassword={setSecretPassword}
			/>
			<PasswordInput
				password={password}
				hintText={"Nowe Hasło"}
				isInvalid={isInvalidPassword}
				setPassword={setPassword}
				errorText={"Wprowadzone hasło jest nieprawidłowe!"}
			/>
			<PasswordInput
				password={repeatedPassword}
				hintText={"Powtórz nowe Hasło"}
				isInvalid={isInvalidRepeatedPassword}
				setPassword={setRepeatedPassword}
				errorText={"Wprowadzone hasło jest nieprawidłowe!"}
			/>
			<RecoverPasswordButton
				onPress={async () => {
					const isValidPhone = await validatePhone(phoneNumber);
					const isValidSecretPassword = await validateSecretPassword(
						secretPassword,
						phoneNumber
					);
					const isValidPassword = validatePassword(password);
					const isValidRepeatedPassword =
						validateRepeatedPassword(password, repeatedPassword) &&
						validatePassword(repeatedPassword);
					setIsInvalidPhone(!isValidPhone);
					setIsInvalidPassword(!isValidPassword);
					setIsInvalidRepeatedPassword(!isValidRepeatedPassword);
					setIsInvalidSecretPassword(!isValidSecretPassword);
					if (
						isValidPhone &&
						isValidSecretPassword &&
						isValidPassword &&
						isValidRepeatedPassword
					)
						await handlePasswordRecovery(
							parseInt(phoneNumber),
							password,
							props.navigation
						);
				}}
			/>
		</Box>
	);
};
const SecretPasswordInput = (props: {
	secretPassword: string | undefined;
	isInvalid: boolean | undefined;
	setSecretPassword: (arg0: string) => void;
}) => {
	return (
		<FormControl
			size='lg'
			isDisabled={false}
			isInvalid={props.isInvalid}
			isReadOnly={false}
			isRequired={false}>
			<SecretPasswordLabel />
			<Input style={styles.inputFields}>
				<InputField
					type='text'
					placeholder='Tutaj wpisz sekretne hasło'
					value={props.secretPassword}
					onChangeText={(actualSecretPassword) => {
						props.setSecretPassword(actualSecretPassword);
					}}
					selectionColor={"black"}
				/>
			</Input>
			<SecretPasswordBadInput />
		</FormControl>
	);
};
const SecretPasswordLabel = () => {
	return (
		<FormControlLabel mb='$1'>
			<FormControlLabelText style={styles.formInputControlLabelText}>
				Sekretne Hasło
			</FormControlLabelText>
		</FormControlLabel>
	);
};
const SecretPasswordBadInput = () => {
	return (
		<FormControlError>
			<FormControlErrorText style={styles.formInputErrorLabelText}>
				Wprowadzony sekret jest nieprawidłowy!
			</FormControlErrorText>
		</FormControlError>
	);
};
const RecoverPasswordButton = (props: any) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.recoverPasswordButton}
			onPress={props.onPress}>
			<ButtonText style={styles.buttonText}>Przywróć hasło</ButtonText>
		</Button>
	);
};
async function validateSecretPassword(secretPassword: string, phone: string) {
	try {
		let dataArray: string[] = [secretPassword, phone];
		const result = await getDataFromDatabase("secretPassword", dataArray);
		return secretPassword.length == 8 && result;
	} catch (error) {
		console.error(error);
		return false;
	}
}
async function getDataFromDatabase(dataType: any, providedData: any[]) {
	const getendpointUrl = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(getendpointUrl);
		const data = await response.json();
		return handleRetrievedData(data, providedData, dataType);
	} catch (error) {
		console.error(error);
		return false;
	}
}
async function handlePasswordRecovery(
	phone: number,
	newPassword: string,
	navigation: any
) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	let dataArray: number[] = [phone, 0];
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		const userKey = handleRetrievedData(data, dataArray, "userKey") as string;
		data[userKey].password = newPassword;
		data[userKey].secretPassword = getGeneratedSecret(8);
		actualizeUserPassword({
			...data[userKey],
			navigation: navigation,
			userKey: userKey,
		});
	} catch (error) {
		console.error(error);
		return false;
	}
}
async function actualizeUserPassword(props: any) {
	const data = {
		password: props.password,
		secretPassword: props.secretPassword,
	};
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users/${props.userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const putResponse = await fetch(endpointUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (putResponse.ok) {
			showAlert(
				"Sukces",
				"Pomyślnie odzyskano hasło!\nTwój nowy sekret to: " +
					props.secretPassword +
					"\nZapisz go w bezpiecznym miejscu!",
				props.vibrations
			);
			props.navigation.navigate("LoginPanel");
		} else showAlert("Błąd", "Wystąpił nieoczekiwany błąd!", props.vibrations);
	} catch (error) {
		console.error(error);
		return false;
	}
}
function handleRetrievedData(data: any, providedData: any[], dataType: string) {
	let isUserFounded = false;
	for (const userKey in data) {
		const user = data[userKey];
		switch (dataType) {
			case "phone":
				parseInt(providedData[0]) == user.phone ? (isUserFounded = true) : null;
			case "secretPassword":
				if (user.phone == providedData[1]) {
					return providedData[0] == user.secretPassword;
				}
			case "userKey":
				if (parseInt(providedData[0]) == user.phone) return userKey;
		}
	}
	return isUserFounded;
}
