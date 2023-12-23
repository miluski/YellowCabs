import React from "react";
import styles from "./styles";
import { Text } from "react-native";
const Operations = () => {
	const operationsData = [
		{ date: "23-11-2023", cost: "23.64zł", type: "inflow" },
		{ date: "22-11-2023", cost: "21.72zł", type: "inflow" },
		{ date: "21-11-2023", cost: "12.14zł", type: "outflow" },
		{ date: "20-11-2023", cost: "23.64zł", type: "inflow" },
		{ date: "19-11-2023", cost: "21.72zł", type: "outflow" },
		{ date: "18-11-2023", cost: "12.14zł", type: "outflow" },
		{ date: "17-11-2023", cost: "23.64zł", type: "outflow" },
		{ date: "16-11-2023", cost: "21.72zł", type: "inflow" },
		{ date: "15-11-2023", cost: "12.14zł", type: "inflow" },
		{ date: "14-10-2023", cost: "23.64zł", type: "outflow" },
		{ date: "13-10-2023", cost: "21.72zł", type: "inflow" },
		{ date: "12-10-2023", cost: "12.14zł", type: "outflow" },
		{ date: "11-10-2023", cost: "23.64zł", type: "inflow" },
		{ date: "10-10-2023", cost: "21.72zł", type: "outflow" },
		{ date: "09-10-2023", cost: "12.14zł", type: "inflow" },
		{ date: "08-10-2023", cost: "23.64zł", type: "inflow" },
		{ date: "07-10-2023", cost: "21.72zł", type: "outflow" },
	];
	return (
		<>
			{operationsData.map((operation, index) => (
			<Text key={index} style={styles.singleOperationText}>
				<Text style={{fontSize: 13}}> Przejazd: {operation.date} </Text>   
				<Text style={{color: operation.type === 'inflow' ? 'green' : 'red'}}>   Koszt: {operation.cost}</Text>
			</Text>
			))}
		</>
	);
};
export default Operations;