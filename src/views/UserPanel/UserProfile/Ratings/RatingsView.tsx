import { ScrollView } from "@gluestack-ui/themed";
import DriversRatings from "./DriversRatings";
import DriverOpinions from "./DriversOpinions";
import React from "react";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
interface RouteParams {
	rank?: string;
	userKey?: string;
	name?: string;
	surname?: string;
	avatarLink?: string;
}
export default function RatingsView() {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	return (
		<ScrollView style={styles.ratingScrollView}>
			{routedParams.rank == "driver" ? <DriverOpinions /> : <DriversRatings />}
		</ScrollView>
	);
}
