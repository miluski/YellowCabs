import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { AirbnbRating } from "react-native-ratings";
import { FirebaseApiCredentials } from "../../../../../api.config";
import React, { useEffect, useState } from "react";
import { View, Image, Text } from "@gluestack-ui/themed";
interface RouteParams {
	userKey?: string;
}
interface DriversOpinions {
	name: string;
	surname: string;
	opinion: string;
	rating: number;
	avatarLink: string;
}
export default function DriverOpinions() {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	const [driversRatings, setDriversRatings] = useState<DriversOpinions[]>([]);
	useEffect(() => {
		(async () => {
			const retrievedDriverRatings = await getDriverRatings(
				routedParams.userKey
			);
			if (retrievedDriverRatings)
				setDriversRatings(Object.values(retrievedDriverRatings));
			else setDriversRatings([]);
		})();
	}, []);
	return (
		<>
			<MyRatesView />
			<View style={styles.allRatingContainer}>
				{driversRatings.map((driver, index) => (
					<View key={index}>
						<View style={styles.singleRatingContainerViewOnly}>
							<View style={styles.allInfoRating}>
								<DriverAvatarView {...driver} />
								<View>
									<NameSurnameView {...driver} />
									<StarsRatingView {...driver} />
								</View>
							</View>
							<OpinionView {...driver} />
						</View>
					</View>
				))}
			</View>
			<View style={styles.paddingBottomView} />
		</>
	);
}
const MyRatesView = () => {
	return (
		<View style={styles.ratingHeader}>
			<Text style={styles.ratingHeader}>Moje Oceny</Text>
		</View>
	);
};
const NameSurnameView = (driver: any) => {
	return (
		<View>
			<Text style={styles.nameSurnameText}>
				{driver.name} {driver.surname}
			</Text>
		</View>
	);
};
const DriverAvatarView = (driver: any) => {
	return (
		<View>
			<Image
				source={{
					uri: driver.avatarLink,
				}}
				style={styles.imageAvatar}
				alt='Zdjecie pasazera'
			/>
		</View>
	);
};
const StarsRatingView = (driver: any) => {
	return (
		<View style={styles.starsRating}>
			<AirbnbRating
				showRating={false}
				size={30}
				isDisabled={true}
				defaultRating={driver.rating}
			/>
		</View>
	);
};
const OpinionView = (driver: any) => {
	return (
		<View>
			<Text style={styles.yourOpinion}>Opinia:</Text>
			<Text style={styles.yourOpinion}>{driver.opinion}</Text>
		</View>
	);
};
async function getDriverRatings(userKey: string | undefined) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/ratings/${userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
