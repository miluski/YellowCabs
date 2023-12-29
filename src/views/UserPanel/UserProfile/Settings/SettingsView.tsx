import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import showAlert from "../../../../functions/ShowAlert";
import validatePassword from "../../../../functions/ValidatePassword";
import validatePhone from "../../../../functions/ValidatePhone";
import validateRepeatedPassword from "../../../../functions/ValidateRepeatedPassword";
import validateName from "../../../../functions/ValidateName";
import validateSurname from "../../../../functions/ValidateSurname";
import { useRoute } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { Feather } from "@expo/vector-icons";
import { NameInput } from "../../../../components/NameInput";
import { PasswordInput } from "../../../../components/PasswordInput";
import { PhoneInput } from "../../../../components/PhoneInput";
import { SurnameInput } from "../../../../components/SurnameInput";
import { FirebaseApiCredentials } from "../../../../../api.config";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
	Button,
	Text,
	Box,
	Switch,
	ButtonText,
	ScrollView,
	View,
	Image,
} from "@gluestack-ui/themed";
interface RouteParams {
	phoneNumber: string;
	rank?: string;
	name?: string;
	surname?: string;
	avatarLink?: string;
	vibrations?: string;
	notifications?: string;
}
export default function SettingsView({ navigation }: any) {
	let finalRank = "Pasażer";
	let finalVibrations = false;
	let finalNotifications = false;
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	if (routedParams.rank == "driver") finalRank = "Kierowca";
	if (routedParams.vibrations == "yes") finalVibrations = true;
	if (routedParams.notifications == "yes") finalNotifications = true;
	const [phone, setPhone] = useState(routedParams.phoneNumber);
	const [newName, setName] = useState(routedParams.name);
	const [newSurname, setSurname] = useState(routedParams.surname);
	const [password, setPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");
	const [actualizePersonalData, setActualizePersonalData] = useState(false);
	const [isVibrationSwitchChecked, setIsVibrationSwitchChecked] =
		useState(finalVibrations);
	const [isNotificationsSwitchChecked, setIsNotificationsSwitchChecked] =
		useState(finalNotifications);
	const [userKey, setUserKey] = useState("");
	useEffect(()=>{
		(async() => {
			const retrievedUserKey = await getUserKey(routedParams.phoneNumber);
			setUserKey(retrievedUserKey);
		})();
	},[]);
	if (userKey != null) {
		const settingsUserObject = {
			userKey: userKey,
			name: newName,
			surname: newSurname,
			finalRank: finalRank,
			avatarLink: routedParams.avatarLink,
			oldPhoneNumber: routedParams.phoneNumber,
			notifications: routedParams.notifications,
			vibrations: routedParams.vibrations,
			phoneNumber: phone,
			password: password,
			repeatedPassword: repeatedPassword,
			isNotificationsSwitchChecked: isNotificationsSwitchChecked,
			isVibrationSwitchChecked: isVibrationSwitchChecked,
			actualizePersonalData: actualizePersonalData,
			setIsNotificationsSwitchChecked: setIsNotificationsSwitchChecked,
			setIsVibrationSwitchChecked: setIsVibrationSwitchChecked,
			setActualizePersonalData: setActualizePersonalData,
			setName: setName,
			setSurname: setSurname,
			setPhone: setPhone,
			setPassword: setPassword,
			setRepeatedPassword: setRepeatedPassword,
			navigation: navigation,
		};
		return (
			<ScrollView style={styles.settingsScrollView}>
				<Text style={styles.accountSettingsText}>Ustawienia konta</Text>
				<View style={styles.mainPanelView}>
					<TextAndAvatarView {...settingsUserObject} />
					<NotificationsSwitchOption {...settingsUserObject} />
					<VibrationsSwitchOption {...settingsUserObject} />
					{isNotificationsSwitchChecked != finalNotifications ||
					isVibrationSwitchChecked != finalVibrations ? (
						<ConfirmButton
							onPress={() => {
								handleChangeAppSettings({ ...settingsUserObject });
							}}
						/>
					) : (
						<></>
					)}
					<ChangeProfilePhotoButton {...settingsUserObject} />
					<ActualizePersonalDataSwitchButton {...settingsUserObject} />
					{actualizePersonalData ? <DataForm {...settingsUserObject} /> : <></>}
				</View>
			</ScrollView>
		);
	}
	else return <></>;
}
const TextAndAvatarView = (props: any) => {
	return (
		<View style={styles.textAndAvatarView}>
			<Text style={styles.nameSurnameText}>
				{props.name} {props.surname}
			</Text>
			<Text style={styles.rankText}>{props.finalRank}</Text>
			<View style={styles.imageView}>
				<Image
					source={{
						uri: props.avatarLink,
					}}
					style={styles.userAvatar}
					alt='User Avatar'
				/>
			</View>
			<View style={styles.bottomUnderLineView} />
		</View>
	);
};
const NotificationsSwitchOption = (props: any) => {
	return (
		<View style={styles.switchOptionView}>
			<Text>Powiadomienia</Text>
			<Switch
				style={styles.switchButtonStyle}
				trackColor={{
					false: "#767577",
					true: "#33cc00",
				}}
				thumbColor={isEnabled() ? "#f5dd4b" : "#f4f3f4"}
				isDisabled={false}
				value={props.isNotificationsSwitchChecked}
				size='md'
				onChange={() => {
					props.setIsNotificationsSwitchChecked(
						!props.isNotificationsSwitchChecked
					);
				}}
			/>
		</View>
	);
};
const VibrationsSwitchOption = (props: any) => {
	return (
		<View style={styles.switchOptionView}>
			<Text>Wibracje</Text>
			<Switch
				style={styles.switchButtonStyle}
				trackColor={{
					false: "#767577",
					true: "#33cc00",
				}}
				thumbColor={isEnabled() ? "#f5dd4b" : "#f4f3f4"}
				isDisabled={false}
				value={props.isVibrationSwitchChecked}
				size='md'
				onChange={() => {
					props.setIsVibrationSwitchChecked(!props.isVibrationSwitchChecked);
				}}
			/>
		</View>
	);
};
const ChangeProfilePhotoButton = (props: any) => {
	return (
		<Button
			style={styles.actionButtons}
			onPress={async () => {
				await handleChangeProfilePhoto(props);
			}}>
			<Feather
				name='upload-cloud'
				size={24}
				color='black'
			/>
			<ButtonText style={styles.changeProfilePhotoButtonText}>
				Zmień zdjęcie profilowe
			</ButtonText>
		</Button>
	);
};
const ActualizePersonalDataSwitchButton = (props: any) => {
	return (
		<View style={styles.switchOptionView}>
			<Text>Zaktualizuj dane osobowe</Text>
			<Switch
				style={styles.switchButtonStyle}
				trackColor={{
					false: "#767577",
					true: "#33cc00",
				}}
				thumbColor={isEnabled() ? "#f5dd4b" : "#f4f3f4"}
				isDisabled={false}
				isChecked={true}
				onChange={() => {
					props.setActualizePersonalData(!props.actualizePersonalData);
				}}
				size='md'
			/>
		</View>
	);
};
const DataForm = (props: any) => {
	return (
		<Box style={styles.inputDataBox}>
			<NameInput
				name={props.name}
				setName={props.setName}
				isInvalid={undefined}
			/>
			<SurnameInput
				surname={props.surname}
				setSurname={props.setSurname}
				isInvalid={undefined}
			/>
			<PhoneInput
				phoneNumber={props.phone}
				setPhoneNumber={props.setPhone}
				value={props.oldPhoneNumber}
				errorMessage={undefined}
				isInvalid={undefined}
			/>
			<PasswordInput
				password={props.password}
				hintText={"Hasło"}
				setPassword={props.setPassword}
				errorText={undefined}
				isInvalid={undefined}
			/>
			<PasswordInput
				password={props.repeatedPassword}
				hintText={"Powtórz hasło"}
				setPassword={props.setRepeatedPassword}
				errorText={undefined}
				isInvalid={undefined}
			/>
			<ConfirmButton
				onPress={() => {
					if (
						(props.password || props.repeatedPassword) &&
						validatePassword(props.password) &&
						validatePassword(props.repeatedPassword) &&
						validateRepeatedPassword(props.password, props.repeatedPassword) &&
						validateName(props.name) &&
						validateSurname(props.surname) &&
						validatePhone(props.phoneNumber)
					) {
						handleEditData({ ...props, hasPassword: true });

					} else if (
						!props.password &&
						!props.repeatedPassword &&
						validateName(props.name) &&
						validateSurname(props.surname) &&
						validatePhone(props.phoneNumber)
					) {
						handleEditData({ ...props, hasPassword: false });
					} else
						showAlert(
							"Błąd",
							"Wypełnij poprawnie wszystkie pola",
							props.vibrations
						);
				}}
			/>
		</Box>
	);
};
const ConfirmButton = (props: any) => {
	return (
		<Button
			bgColor='#FFB700'
			style={styles.actionButtons}
			onPress={props.onPress}>
			<ButtonText style={styles.confirmButtonText}>Zatwierdź</ButtonText>
		</Button>
	);
};
async function handleChangeProfilePhoto(props: any) {
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.All,
		allowsEditing: true,
		aspect: [4, 3],
		quality: 1,
	});
	if (!result.canceled) {
		initializeApp(FirebaseApiCredentials);
		const response = await fetch(result.assets[0].uri);
		const blob = await response.blob();
		const storage = getStorage();
		const storageRef = ref(storage, `images/${props.userKey}/avatar.jpg`);
		const metadata = {
			contentType: "image/jpeg",
		};
		uploadBytes(storageRef, blob, metadata);
		if (props.notifications === "yes") {
			showAlert(
				"Sukces",
				"Pomyślnio zmieniono zdjęcie profilowe! \nNastąpi wylogowanie celem zaktualizowania ustawień!",
				props.vibrations
			);
		}
		props.navigation.navigate("LoginPanel");
	}
}
async function handleEditData(props: any) {
	try {
		if (props.userKey !== null) {
			const updatedUserData = {
				...(props.hasPassword
					? {
							password: props.password
					  }
					: {}),
				name: props.name,
				surname: props.surname,
				phone: props.phoneNumber,
			};
			const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users/${props.userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
			const putResponse = await fetch(endpointUrl, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedUserData),
			});
			if (putResponse.ok) {
				if (props.notifications === "yes") {
					showAlert(
						"Sukces",
						"Wybrane dane zostały zaktualizowane pomyślnie!",
						props.vibrations
					);
				}
				props.navigation.navigate("Główna", {
					name: props.name,
					surname: props.surname,
					phone: props.phoneNumber,
				});
			} else {
				showAlert("Błąd", "Wystąpił nieoczekiwany błąd!", props.vibrations);
			}
		} else {
			showAlert("Błąd", "Wystąpił nieoczekiwany błąd!", props.vibrations);
		}
	} catch (error) {
		console.error(error);
		return false;
	}
}
async function handleChangeAppSettings(props: any) {
	let finalNotifications = "no";
	let finalVibrations = "no";
	if (props.isNotificationsSwitchChecked == true) finalNotifications = "yes";
	if (props.isVibrationSwitchChecked == true) finalVibrations = "yes";
	if (props.userKey !== null) {
		const updatedUserData = {
			vibrations: finalVibrations,
			notifications: finalNotifications,
		};
		const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users/${props.userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
		const putResponse = await fetch(endpointUrl, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUserData),
		});
		if (putResponse.ok) {
			if (finalNotifications === "yes") {
				showAlert(
					"Sukces",
					"Wybrane dane zostały zaktualizowane pomyślnie! \nNastąpi wylogowanie celem zaktualizowania ustawień!",
					finalVibrations
				);
			}
			props.navigation.navigate("LoginPanel");
		} else {
			showAlert("Błąd", "Wystąpił nieoczekiwany błąd!", finalVibrations);
		}
	} else {
		showAlert("Błąd", "Wystąpił nieoczekiwany błąd!", finalVibrations);
	}
}
async function getUserKey(phone: string) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		for (const userKey in data) {
			const user = data[userKey];
			if (user.phone == phone) {
				return userKey;
			}
		}
	} catch (error) {
		console.error(error);
	}
	return "";
}
