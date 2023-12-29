import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Text } from "react-native";
import { FirebaseApiCredentials } from "../../../../api.config";
import { useRoute } from "@react-navigation/native";
interface OperationsData {
	date: string;
	cost: number;
	type: string;
}
interface RouteParams {
	userKey: string;
}
export default function Operations() {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	const [operationsData, setOperationsData] = useState<OperationsData[]>([]);
	useEffect(() => {
		(async () => {
			const retrievedOperations = await getOperations(routedParams.userKey);
			if (retrievedOperations)
				setOperationsData(Object.values(retrievedOperations));
			else setOperationsData([]);
		})();
	}, []);
	return (
		<>
			{operationsData
				.sort((a, b) => {
					const dateComparison =
						new Date(b.date).getTime() - new Date(a.date).getTime();
					return dateComparison !== 0 ? dateComparison : a.cost - b.cost;
				})
				.map((operation, index) => (
					<Text
						key={index}
						style={styles.singleOperationText}>
						<Text style={{ fontSize: 13 }}>
							{" "}
							Data operacji: {operation.date}{" "}
						</Text>
						<Text style={{ fontSize: 14 }}>
							{" "}
							{operation.type === "inflow" ? "		Wpływy:" : "		Wydatki:"}{" "}
						</Text>
						<Text
							style={{ color: operation.type === "inflow" ? "green" : "red" }}>
							{" "}
							{Math.round(operation.cost)} zł
						</Text>
					</Text>
				))}
		</>
	);
}
async function getOperations(userKey: string) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/transactions/${userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
	return null;
}
