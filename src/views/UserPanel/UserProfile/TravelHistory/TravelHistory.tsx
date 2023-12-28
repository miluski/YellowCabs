import React from "react";
import styles from "./styles";
import Travel from "./Travel";
import { View, ScrollView, Text } from "@gluestack-ui/themed";
import { useRoute } from "@react-navigation/native";
interface RouteParams {
	userKey: string;
}
export default function TravelHistory() {
	const route = useRoute();
	route.params as RouteParams;
	return (
		<ScrollView style={styles.scrollHistory}>
			<View>
				<Text style={styles.travelTitleFirst}>Historia</Text>
				<Text style={styles.travelTitle}>moich podróży</Text>
			</View>
			<Travel />
			<View style={styles.paddingBottomView} />
		</ScrollView>
	);
}
