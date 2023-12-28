import styles from "./styles";
import { View, Image, Button, ButtonText, Text } from "@gluestack-ui/themed";
import { AirbnbRating } from "react-native-ratings";
import { TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FirebaseApiCredentials } from "../../../../../api.config";
interface RouteParams {
	userKey?: string;
	name?: string;
	surname?: string;
	avatarLink?: string;
}
interface DriversRatings {
	name: string;
	surname: string;
	driverUserKey: string;
	avatarLink: string;
	numberOfStars: number;
	opinion: string;
}
export default function DriversRatings() {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	const [driversRatings, setDriversRatings] = useState<
		Record<string, DriversRatings>
	>({});
	useEffect(() => {
		(async () => {
			const retrievedDriversRatings = await getDriversRatings(
				routedParams.userKey
			);
			if (retrievedDriversRatings) setDriversRatings(retrievedDriversRatings);
			else setDriversRatings({});
		})();
	}, []);
	return (
		<>
			<HeaderView />
			<View style={styles.allRatingContainer}>
				{Object.entries(driversRatings).map(([nodeKey, driver], index) => (
					<View key={index}>
						<View style={styles.singleRatingContainer}>
							<View style={styles.allInfoRating}>
								<DriverAvatarView avatarLink={driver.avatarLink} />
								<View>
									<DriverNameSurnameView {...driver} />
									<StarsRatingView
										numberOfStars={driver.numberOfStars}
										setDriversRatings={setDriversRatings}
										opinionKey={nodeKey}
									/>
								</View>
							</View>
							<RatingButtonsView
								nodeKey={nodeKey}
								opinion={driver.opinion}
								numberOfStars={driver.numberOfStars}
								driverUserKey={driver.driverUserKey}
								userKey={routedParams.userKey}
								userName={routedParams.name}
								userSurname={routedParams.surname}
								avatarLink={routedParams.avatarLink}
								setDriverRatings={setDriversRatings}
							/>
							<YourOpinionView
								opinion={driver.opinion}
								setDriversRatings={setDriversRatings}
								opinionKey={nodeKey}
							/>
						</View>
					</View>
				))}
			</View>
			<View style={styles.paddingBottomView} />
		</>
	);
}
const HeaderView = () => {
	return (
		<View style={styles.ratingHeader}>
			<Text style={styles.ratingHeader}>Oceń Kierowce</Text>
		</View>
	);
};
const DriverAvatarView = (props: { avatarLink: string }) => {
	return (
		<View>
			<Image
				source={{
					uri: props.avatarLink,
				}}
				style={styles.imageAvatar}
				alt='Zdjecie kierowcy'
			/>
		</View>
	);
};
const DriverNameSurnameView = (driver: any) => {
	return (
		<View>
			<Text style={styles.nameSurnameText}>
				{driver.name} {driver.surname}
			</Text>
		</View>
	);
};
const StarsRatingView = (props: {
	numberOfStars: number;
	opinionKey: string | undefined;
	setDriversRatings: Function;
}) => {
	return (
		<View style={styles.starsRating}>
			<AirbnbRating
				showRating={false}
				size={30}
				onFinishRating={(numberOfStars) => {
					props.setDriversRatings((prevDriversRatings: any) =>
						Object.keys(prevDriversRatings).reduce(
							(updatedRatings: any, ratingKey) => {
								if (ratingKey === props.opinionKey) {
									updatedRatings[ratingKey] = {
										...prevDriversRatings[ratingKey],
										numberOfStars: numberOfStars,
									};
								} else {
									updatedRatings[ratingKey] = prevDriversRatings[ratingKey];
								}
								return updatedRatings;
							},
							{}
						)
					);
				}}
				defaultRating={props.numberOfStars}
			/>
		</View>
	);
};
const YourOpinionView = (props: {
	opinion: string;
	opinionKey: string | undefined;
	setDriversRatings: Function;
}) => {
	return (
		<View>
			<Text style={styles.yourOpinion}>Twoja opinia:</Text>
			<TextInput
				style={styles.ratingTextInput}
				onChangeText={(actualOpinion) => {
					props.setDriversRatings((prevDriversRatings: any) =>
						Object.keys(prevDriversRatings).reduce(
							(updatedRatings: any, ratingKey) => {
								if (ratingKey === props.opinionKey) {
									updatedRatings[ratingKey] = {
										...prevDriversRatings[ratingKey],
										opinion: actualOpinion,
									};
								} else {
									updatedRatings[ratingKey] = prevDriversRatings[ratingKey];
								}
								return updatedRatings;
							},
							{}
						)
					);
				}}
				defaultValue={props.opinion}
				selectionColor={"black"}
			/>
		</View>
	);
};
const RatingButtonsView = (props: {
	nodeKey: string;
	numberOfStars: number;
	opinion: string;
	driverUserKey: string;
	userKey: string | undefined;
	userName: string | undefined;
	userSurname: string | undefined;
	avatarLink: string | undefined;
	setDriverRatings: Function;
}) => {
	return (
		<View style={styles.buttonsRatingContainer}>
			<Button
				style={styles.skipButton}
				onPress={async () => {
					await handleSkipOpinion({ ...props });
				}}>
				<ButtonText style={styles.ratingsButtonsText}>Pomiń</ButtonText>
			</Button>
			<Button
				style={styles.rateButton}
				onPress={async () => {
					await handleAcceptOpinion({ ...props });
					await handleSkipOpinion({ ...props });
				}}>
				<ButtonText style={styles.ratingsButtonsText}>Oceń</ButtonText>
			</Button>
		</View>
	);
};
async function getDriversRatings(userKey: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/ratings/${userKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		const response = await fetch(endpointUrl);
		const data = response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
	return null;
}
async function handleSkipOpinion(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/ratings/${props.userKey}/${props.nodeKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		await fetch(endpointUrl, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
		const retrievedDriversRatings = await getDriversRatings(props.userKey);
		if (retrievedDriversRatings)
			props.setDriverRatings(retrievedDriversRatings);
		else props.setDriverRatings({});
	} catch (error) {
		console.error(error);
	}
}
async function handleAcceptOpinion(props: any) {
	const endpointUrl = `${FirebaseApiCredentials.databaseURL}/ratings/${props.driverUserKey}.json?key=${FirebaseApiCredentials.apiKey}`;
	try {
		await fetch(endpointUrl, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name: props.userName,
				surname: props.userSurname,
				opinion: props.opinion,
				rating: props.numberOfStars,
				avatarLink: props.avatarLink,
			}),
		});
		const retrievedDriversRatings = await getDriversRatings(props.userKey);
		if (retrievedDriversRatings)
			props.setDriverRatings(retrievedDriversRatings);
		else props.setDriverRatings({});
	} catch (error) {
		console.error(error);
	}
}
