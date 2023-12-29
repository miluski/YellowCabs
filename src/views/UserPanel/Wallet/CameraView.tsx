import styles from "./styles";
import showAlert from "../../../functions/ShowAlert";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { FirebaseApiCredentials } from "../../../../api.config";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
interface RouteParams {
	userKey?: string;
	accountBilance?: number;
	vibrations?: string;
	notifications?: string;
}
export default function CameraView({ navigation }: { navigation: any }) {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	const [hasPermission, setHasPermission] = useState(false);
	const [isScanned, setIsScanned] = useState(false);
	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);
	const cameraViewPropsObject = {
		userKey: routedParams.userKey,
		accountBilance: routedParams.accountBilance,
		vibrations: routedParams.vibrations,
		notifications: routedParams.notifications,
		isScanned: isScanned,
		setIsScanned: setIsScanned,
		navigation: navigation,
	};
	return (
		<>
			{hasPermission === null || hasPermission === false ? (
				<Text>Brak permisji do użytku aparatu</Text>
			) : (
				<View style={styles.cameraContainer}>
					<BarCodeScanner
						onBarCodeScanned={(qrCode: any) => {
							if (!isScanned) {
								handleBarCodeScanned({
									...cameraViewPropsObject,
									qrCode: qrCode,
								});
								setIsScanned(true);
							}
						}}
						style={styles.qrCodeScannerContainer}
					/>
					<Ionicons
						name='md-scan-outline'
						size={350}
						color='red'
						style={styles.scanOutlineIcon}
					/>
				</View>
			)}
		</>
	);
}
const handleBarCodeScanned = (props: any) => {
	if (props.isScanned) {
		return;
	} else {
		const parts = props.qrCode.data.split("-");
		(async () => {
			const isValidQrCode = await isQrCodeValid(parts, props.qrCode.data);
			if (isValidQrCode && !props.isScanned) {
				const finalAccountBilance =
					Number(props.accountBilance) + Number(parts[2]);
				await addFundsToUserWallet(props.userKey, finalAccountBilance);
				await addUserTransaction({
					userKey: props.userKey,
					addedFunds: parts[2],
				});
				await addExpiredQrCode(props.qrCode.data);
				props.notifications === "yes"
					? showAlert(
							"Sukces",
							"Zasilono konto środkami o wartości " + parts[2] + " zł!",
							props.vibrations
					  )
					: null;
				props.navigation.navigate("Główna");
			} else {
				showAlert(
					"Błąd",
					"Zeskanowany kod QR jest nieprawidłowy!",
					props.vibrations
				);
				setTimeout(() => {
					props.setIsScanned(false);
				}, 2000);
			}
		})();
	}
};
async function isQrCodeValid(qrCodeParts: any, qrCode: any) {
	return (
		isQrCodePartsLengthValid(qrCodeParts) &&
		isQrCodeFlagPartValid(qrCodeParts[0]) &&
		isQrCodeAmountPartValid(qrCodeParts[2]) &&
		isQrCodeDatePartNotExpired(qrCodeParts[3]) &&
		isQrCodeChecksumPartValid(qrCodeParts[4]) &&
		(!(await checkIfQrCodeIsUsedInThePast(qrCode)) ||
			isQrCodeUniversalOrNot(qrCodeParts[1]))
	);
}
function isQrCodePartsLengthValid(qrCodeParts: any): boolean {
	return qrCodeParts.length === 5;
}
function isQrCodeFlagPartValid(flagQrCodePart: string): boolean {
	return flagQrCodePart === "JSQR" || flagQrCodePart === "MSQR";
}
function isQrCodeAmountPartValid(amountQrCodePart: string): boolean {
	const regexDigitsPattern = /^\d+$/;
	return regexDigitsPattern.test(amountQrCodePart);
}
function isQrCodeDatePartNotExpired(dateQrCodePart: any): boolean {
	const currentDate = new Date();
	const expiryDate = new Date(
		dateQrCodePart.substring(0, 4),
		dateQrCodePart.substring(4, 6) - 1,
		dateQrCodePart.substring(6, 8)
	);
	return currentDate < expiryDate;
}
function isQrCodeChecksumPartValid(checksumQrCodePart: string) {
	return checksumQrCodePart === "1a2b3c4d" || checksumQrCodePart === "4a3b2c1d";
}
function isQrCodeUniversalOrNot(checkIfQrCodeIsUniversalPart: any) {
	const regexDigitsPattern = /^\d+$/;
	return (
		regexDigitsPattern.test(checkIfQrCodeIsUniversalPart) &&
		(checkIfQrCodeIsUniversalPart === "1" ||
			checkIfQrCodeIsUniversalPart === "2" ||
			checkIfQrCodeIsUniversalPart === "3" ||
			checkIfQrCodeIsUniversalPart === "4")
	);
}
async function checkIfQrCodeIsUsedInThePast(qrCode: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/expiredQrCodes.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		for (const qrCodeKey in data) {
			if (data[qrCodeKey].qrCode === qrCode) return true;
		}
	} catch (error) {
		console.error(error);
	}
	return false;
}
async function addFundsToUserWallet(
	userKey: string | undefined,
	finalAccountBilance: number
) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/users/${userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		await fetch(endpointUrl, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				accountBilance: finalAccountBilance,
			}),
		});
	} catch (error) {
		console.log(error);
	}
}
async function addUserTransaction(props: any) {
	const actualDate = new Date();
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/transactions/${props.userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	const actualMonth = actualDate.getMonth() + 1;
	const formattedDate =
		actualDate.getDate() + "-" + actualMonth + "-" + actualDate.getFullYear();
	const userTransactionObject = {
		date: formattedDate,
		cost: props.addedFunds,
		type: "inflow",
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
async function addExpiredQrCode(qrCode: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/expiredQrCodes.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		await fetch(endpointUrl, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				qrCode: qrCode,
			}),
		});
	} catch (error) {
		console.error(error);
	}
}
