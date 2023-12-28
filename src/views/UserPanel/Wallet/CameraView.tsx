import React, { useState, useEffect } from "react";
import { Alert, Text, Vibration, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { FirebaseApiCredentials } from "../../../../api.config";
interface RouteParams {
	userKey: string;
	accountBilance: number;
}
export default function App({ navigation }: { navigation: any }) {
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
	return (
		<>
			{hasPermission === null || hasPermission === false ? (
				<Text>Brak permisji do użytku aparatu</Text>
			) : (
				<View style={styles.cameraContainer}>
					<BarCodeScanner
						onBarCodeScanned={(qrCode) => {
								if (!isScanned) {
									handleBarCodeScanned(
										qrCode,
										routedParams.userKey,
										routedParams.accountBilance,
										isScanned,
										setIsScanned,
										navigation
									);
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
const handleBarCodeScanned = (
	qrCode: any,
	userKey: string,
	accountBilance: number,
	isScanned: boolean,
	setIsScanned: Function,
	navigation: any
) => {
	if (isScanned) {
		return;
	} else {
		const parts = qrCode.data.split("-");
		(async () => {
			const isValidQrCode = await isQrCodeValid(parts, qrCode.data);
			if (isValidQrCode && !isScanned) {
        const finalAccountBilance = Number(accountBilance) + Number(parts[2]);
				await addFundsToUserWallet(userKey, finalAccountBilance);
				await addUserTransaction({
					userKey: userKey,
					addedFunds: parts[2],
				});
				await addExpiredQrCode(qrCode.data);
				navigation.navigate("Portfel", {
          userKey: userKey,
          accountBilance: finalAccountBilance,
        });
        ShowAlert("Sukces", "Zasilono konto środkami o wartości " + parts[2] + " zł!");
			} else {
				ShowAlert("Błąd", "Zeskanowany kod QR jest nieprawidłowy!");
				setTimeout(() => {
					setIsScanned(false);
				}, 2000);
			}
		})();
	}
};
async function isQrCodeValid(qrCodeParts: any, qrCode: any) {
	console.log(await checkIfQrCodeIsUsedInThePast(qrCode));
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
			console.log(qrCode, data[qrCodeKey].qrCode);
			if (data[qrCodeKey].qrCode === qrCode) return true;
		}
	} catch (error) {
		console.error(error);
	}
	return false;
}
async function addFundsToUserWallet(
	userKey: string,
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
		actualDate.getDate() +
		" - " +
		actualMonth +
		" - " +
		actualDate.getFullYear();
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
function ShowAlert(title: string, message: string) {
	Vibration.vibrate(500);
	Alert.alert(title, message, [
		{
			text: "Ok",
			style: "cancel",
		},
	]);
}
