import React from "react";
import styles from "./styles";
import { Text } from "react-native";
const Operations = () => {
	const operationsData = [
		{ date: "23-11-2023", cost: "23.64zł" },
		{ date: "22-11-2023", cost: "21.72zł" },
		{ date: "21-11-2023", cost: "12.14zł" },
		{ date: "20-11-2023", cost: "23.64zł" },
		{ date: "19-11-2023", cost: "21.72zł" },
		{ date: "18-11-2023", cost: "12.14zł" },
		{ date: "17-11-2023", cost: "23.64zł" },
		{ date: "16-11-2023", cost: "21.72zł" },
		{ date: "15-11-2023", cost: "12.14zł" },
		{ date: "14-10-2023", cost: "23.64zł" },
		{ date: "13-10-2023", cost: "21.72zł" },
		{ date: "12-10-2023", cost: "12.14zł" },
		{ date: "11-10-2023", cost: "23.64zł" },
		{ date: "10-10-2023", cost: "21.72zł" },
		{ date: "09-10-2023", cost: "12.14zł" },
		{ date: "08-10-2023", cost: "23.64zł" },
		{ date: "07-10-2023", cost: "21.72zł" },
	];
	return (
		<>
			{operationsData.map((operation, index) => (
				<Text key={index} style={styles.singleOperationText}>
				Przejazd: {operation.date} - Koszt: {operation.cost}
			  </Text>
			))}
		</>
	);
};
export default Operations;
