import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Text, Button, ButtonText, VStack, View } from "@gluestack-ui/themed";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FirebaseApiCredentials } from "../../../../api.config";
import { useRoute } from "@react-navigation/native";
import storeRouteCredentials from "../../../functions/storeRouteCredentials";
interface Contract {
	assignedDriverUserKey: string;
	assignedClientUserKey: string;
	from: any;
	to: any;
	kilometers: number;
}
interface RouteParams {
	userKey: string;
}
export const Contract = () => {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	const driverUserKey = routedParams.userKey;
	const [contractsData, setContractsData] = useState<Contract[]>([]);
	const [isAccepted, setIsAccepted] = useState(false);
	const [isFetched, setIsFetched] = useState(false);
	useEffect(() => {
		(async () => {
			const checkIfDriverHasActiveRoutes = await checkIfDriverHasNotEndedRoute({
				driverUserKey: driverUserKey,
				setContractsData: setContractsData,
				setIsAccepted: setIsAccepted,
			});
			if (!checkIfDriverHasActiveRoutes) {
				const retrievedContracts = await getContracts();
				if (retrievedContracts) {
					const contractsArray = Object.values(
						retrievedContracts
					) as Contract[];
					setContractsData(
						contractsArray.filter(
							(contract) => contract.assignedDriverUserKey === undefined
						)
					);
				} else {
					setContractsData([]);
				}
			}
			setIsFetched(true);
		})();
	}, []);
	return (
		<>
			{isFetched ? (
				<View>
					{contractsData.map((contract, index) => (
						<VStack
							space='xs'
							key={index}
							style={styles.singleContractStack}>
							<SingleContractView {...contract} />
							{isAccepted ? (
								<AcceptedButtons />
							) : (
								<NotAcceptedButtons
									userKey={contract.assignedClientUserKey}
									driverUserKey={driverUserKey}
									contractsData={contractsData}
									setContractsData={setContractsData}
									setIsAccepted={setIsAccepted}
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
			) : (
				<></>
			)}
		</>
	);
};
const SingleContractView = (contract: any) => {
	return (
		<View style={styles.contractContentView}>
			<SimpleLineIcons
				name='pin'
				size={32}
				color='black'
				style={styles.pinIcon}
			/>
			<View style={styles.fromToTextsView}>
				<Text>Z: {contract.from.description} </Text>
				<Text>Do: {contract.to.description} </Text>
			</View>
			<Text style={styles.kilometersText}>
				{Math.round(contract.kilometers)}km
			</Text>
		</View>
	);
};
const NotAcceptedButtons = (props: {
	userKey: string;
	driverUserKey: string;
	contractsData: any;
	setContractsData: Function;
	setIsAccepted: Function;
	contract: any;
}) => {
	return (
		<View style={styles.contractButtons}>
			<Button
				style={styles.contractRefuseButton}
				onPress={() => {
					handleRefusePress({ ...props });
				}}>
				<ButtonText style={styles.contractRefuseButtonText}>Odrzuć</ButtonText>
			</Button>
			<Button
				style={styles.contractAcceptButton}
				onPress={() => {
					handleAcceptPress({ ...props });
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
async function checkIfDriverHasNotEndedRoute(props: any) {
	const contracts = await getContracts();
	for (const contractKey in contracts) {
		if (contracts[contractKey].assignedDriverUserKey === props.driverUserKey) {
			props.setContractsData([contracts[contractKey]]);
			props.setIsAccepted(true);
			console.log(contracts[contractKey]);
			const routeCredentials = {
				myLocalizationMarkerVisible: true,
				isRouteStarted: true,
				from: contracts[contractKey].from,
				to: contracts[contractKey].to,
				rank: props.rank,
			};
			await storeRouteCredentials(routeCredentials);
			return true;
		}
	}
	return false;
}
async function getContracts() {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}
async function handleRefusePress(props: any) {
	const orderKey = await getOrderKey({ ...props });
	if (orderKey) {
		const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders/${orderKey}.json?key=${FirebaseApiCredentials.apiKey}`;
		try {
			await fetch(endpointUrl, {
				method: "DELETE",
			});
			const retrievedContracts = await getContracts();
			if (retrievedContracts)
				props.setContractsData(Object.values(retrievedContracts));
			else props.setContractsData([]);
		} catch (error) {
			console.error(error);
		}
	}
}
async function handleAcceptPress(props: any) {
	const acceptedContract = props.contractsData.find(
		(contract: any) => contract.assignedClientUserKey === props.userKey
	);
	if (acceptedContract) {
		props.setContractsData([acceptedContract]);
		props.setIsAccepted(true);
		const orderKey = await getOrderKey({ ...props });
		await patchOrderDetails({
			orderKey: orderKey,
			assignedDriverUserKey: props.driverUserKey,
		});
		const routeCredentials = {
			myLocalizationMarkerVisible: true,
			isRouteStarted: true,
			from: props.contract.from,
			to: props.contract.to,
			rank: props.rank,
		};
		await storeRouteCredentials(routeCredentials);
	} else {
		console.error(`Contract with id ${props.userKey} not found.`);
	}
}
async function getOrderKey(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		for (const orderKey in data) {
			if (data[orderKey].assignedClientUserKey == props.userKey)
				return orderKey;
		}
	} catch (error) {
		console.error(error);
	}
	return null;
}
async function patchOrderDetails(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/orders/${props.orderKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		await fetch(endpointUrl, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				assignedDriverUserKey: props.assignedDriverUserKey,
			}),
		});
	} catch (error) {
		console.error(error);
	}
}
