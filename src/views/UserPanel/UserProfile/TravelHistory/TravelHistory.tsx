import React from "react";
import styles from "./styles";
import Travel from "./Travel";
import { View, ScrollView, Text } from "@gluestack-ui/themed";
export default function TravelHistory() {
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
