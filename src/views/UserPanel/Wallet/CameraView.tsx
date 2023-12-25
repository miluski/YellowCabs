import React, { useState, useEffect } from "react";
import { Text, View } from "@gluestack-ui/themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import styles from "./styles";
export default function App() {
	const [hasPermission, setHasPermission] = useState();
	useEffect(() => {
		async () => {
			await setBarCodeScannerPermissions(setHasPermission);
		};
	}, []);
	return hasPermission === null || hasPermission === false ? (
		<View style={styles.cameraMainView}>
			<Text>Nie udzielono dostępu do kamery!</Text>
		</View>
	) : (
		<View style={styles.cameraMainView}>
			<BarCodeScanner
				onBarCodeScanned={handleBarCodeScanned}
			/>
		</View>
	);
}

async function setBarCodeScannerPermissions({ setHasPermission }: any) {
	setHasPermission(await BarCodeScanner.requestPermissionsAsync());
}

const handleBarCodeScanned = (props: { type: any; data: any }) => {
  alert(
    `Bar code with type ${props.type} and data ${props.data} has been scanned!`
  );
};
