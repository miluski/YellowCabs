import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "@gluestack-ui/themed";
import { useRoute } from "@react-navigation/native";
import { FirebaseApiCredentials } from "../../../../../api.config";
interface TravelsData {
	from: string;
	to: string;
	day: number;
	month: number;
	year: number;
	hourAndMinute: string;
}
interface RouteParams {
	userKey: string;
}
export default function Travel() {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	const [travelsData, setTravelsData] = useState<TravelsData[]>([]);
	useEffect(() => {
		(async () => {
			const retrievedTravelData = await getTravelsData(routedParams.userKey);
			if (retrievedTravelData)
				setTravelsData(Object.values(retrievedTravelData));
			else setTravelsData([]);
		})();
	}, []);
	const groupedTravels: any = {};
	travelsData.forEach((travel) => {
		const monthKey = `${travel.year}-${travel.month}`;
		if (!groupedTravels[monthKey]) {
			groupedTravels[monthKey] = [];
		}
		groupedTravels[monthKey].push(travel);
	});
	return (
		<>
			{Object.entries(groupedTravels).map(([monthKey, monthTravels]) => (
				<View
					key={monthKey}
					style={styles.viewMonth}>
					<Text style={styles.tripTextMonth}>
						{new Date(`${monthKey}-01`)
							.toLocaleString("default", { month: "long" })
							.charAt(0)
							.toUpperCase() +
							new Date(`${monthKey}-01`)
								.toLocaleString("default", { month: "long" })
								.slice(1)}
					</Text>
					{(monthTravels as Array<any>)
						.sort((a, b) => {
							const aHourAndMinute = parseTime(a.hourAndMinute);
							const bHourAndMinute = parseTime(b.hourAndMinute);
							return (
								new Date(
									b.day,
									b.month,
									b.year,
									bHourAndMinute.hour,
									bHourAndMinute.minute
								).getTime() -
								new Date(
									a.day,
									a.month,
									a.year,
									aHourAndMinute.hour,
									aHourAndMinute.minute
								).getTime()
							);
						})
						.map((travel, index) => (
							<View
								key={index}
								style={styles.singleTrip}>
								<View style={styles.travelPin}>
									<Feather
										name='map-pin'
										size={24}
										color='black'
									/>
								</View>
								<View style={styles.textContainerView}>
									<Text
										style={styles.tripTextDest}>
										Z: {travel.from}
									</Text>
									<Text
										style={styles.tripDestinationTextDest}>
										Do: {travel.to}
									</Text>
									<Text style={styles.tripTextDate}>
										{travel.day}.{travel.month}.{travel.year}{" "}
										{travel.hourAndMinute}
									</Text>
								</View>
							</View>
						))}
				</View>
			))}
		</>
	);
}
const parseTime = (timeString: string) => {
	const [hour, minute] = timeString.split(":").map(Number);
	return { hour, minute };
};
async function getTravelsData(userKey: string) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/travelhistories/${userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
	return null;
}
