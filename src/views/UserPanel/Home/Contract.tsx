import React, { useState } from "react";
import styles from "./styles";
import { Text, Button, ButtonText, VStack, View } from "@gluestack-ui/themed";
import { SimpleLineIcons } from "@expo/vector-icons";
export const Contract = () => {
	// TODO: Backend z bazy (JSON pobierany za pomocą get z bazy)
	const initialContractsData = [
		{ id: 1, from: "San Francisco", to: "San Jose", km: 32 },
		{ id: 2, from: "San Francisco", to: "Mill valley", km: 32 },
		{ id: 3, from: "Los Angeles", to: "Salinas", km: 32 },
		{ id: 4, from: "San Francisco", to: "San Jose", km: 32 },
		{ id: 5, from: "San Francisco", to: "Mill valley", km: 32 },
		{ id: 6, from: "Los Angeles", to: "Salinas", km: 32 },
		{ id: 7, from: "San Francisco", to: "San Jose", km: 32 },
		{ id: 8, from: "San Francisco", to: "Mill valley", km: 32 },
		{ id: 9, from: "Los Angeles", to: "Salinas", km: 32 },
		{ id: 10, from: "San Francisco", to: "San Jose", km: 32 },
		{ id: 11, from: "San Francisco", to: "Mill valley", km: 32 },
	];
	const [contractsData, setContractsData] = useState(initialContractsData);
	const [isAccepted, setIsAccepted] = useState(false);
	return (
		<View>
			{contractsData.map((contract, index) => (
				<VStack
					space='xs'
					key={index}
					style={styles.singleContractStack}>
					<View style={styles.contractContentView}>
						<SimpleLineIcons
							name='pin'
							size={32}
							color='black'
							style={styles.pinIcon}
						/>
						<View style={styles.fromToTextsView}>
							<Text>Z: {contract.from} </Text>
							<Text>Do: {contract.to} </Text>
						</View>
						<Text style={styles.kilometersText}>{contract.km}km</Text>
					</View>
					{isAccepted ? (
						<AcceptedButtons />
					) : (
						<NotAcceptedButtons
							handleRefusePress={handleRefusePress}
							handleAcceptPress={handleAcceptPress}
							index={index}
							contract={contract}
						/>
					)}
				</VStack>
			))}
			{isAccepted ? (
				<>
					<Text style={styles.routeIsOnMapText}>
						Trasa została wyznaczona na mapie
					</Text>
					<Text style={styles.checkMapText}>Sprawdź mapę</Text>
				</>
			) : (
				<View style={styles.paddingBottomView} />
			)}
		</View>
	);
	function handleRefusePress(index: any) {
		console.log("");
	}
	function handleAcceptPress(id: number) {
		const acceptedContract = contractsData.find(
			(contract) => contract.id === id
		);
		if (acceptedContract) {
			setContractsData([acceptedContract]);
			setIsAccepted(true);
			console.log(id);
		} else {
			console.error(`Contract with id ${id} not found.`);
		}
	}
};
const NotAcceptedButtons = (props: {
	handleRefusePress: any;
	handleAcceptPress: any;
	index: any;
	contract: any;
}) => {
	return (
		<View style={styles.contractButtons}>
			<Button
				style={styles.contractRefuseButton}
				onPress={() => {
					props.handleRefusePress(props.index);
				}}>
				<ButtonText style={styles.contractRefuseButtonText}>Odrzuć</ButtonText>
			</Button>
			<Button
				style={styles.contractAcceptButton}
				onPress={() => {
					props.handleAcceptPress(props.contract.id);
				}}>
				<ButtonText style={styles.contractAcceptButtonText}>
					Akceptuj
				</ButtonText>
			</Button>
		</View>
	);
};
const AcceptedButtons = () => {
	return (
		<View style={styles.acceptedButtonView}>
			<Button style={styles.acceptedButton}>
				<ButtonText style={styles.acceptedButtonText}>Zaakceptowano</ButtonText>
			</Button>
		</View>
	);
};
