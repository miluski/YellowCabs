import styles from "./styles";
import { View, Image, Button, ButtonText, Text } from "@gluestack-ui/themed";
import { AirbnbRating } from "react-native-ratings";
import { TextInput } from "react-native";
import React from "react";

const DriversRatings = () => {
	//const ratingCompleted = (rating) => {
	//console.log("Rating = " + rating)
	//}

	const driversRatings = [
		{ name: "Michał", surname: "Adamski" },
		{ name: "Wojciech", surname: "Krzysztof" },
	];

	return (
		<>
			<View style={styles.ratingHeader}>
				<Text style={styles.ratingHeader}>Oceń Kierowce</Text>
			</View>
			<View style={styles.allRatingContainer}>
				{driversRatings.map((driver, index) => (
					<View key={index}>
						<View style={styles.singleRatingContainer}>
							<View style={styles.allInfoRating}>
								<View>
									<Image
										source={{
											uri: "https://images.pexels.com/photos/5835419/pexels-photo-5835419.jpeg",
										}}
										style={styles.imageAvatar}
										alt='Zdjecie kierowcy'
									/>
								</View>
								<View>
									<View>
										<Text style={{ fontSize: 20, marginLeft: 10 }}>
											{driver.name} {driver.surname}
										</Text>
									</View>

									<View style={styles.starsRating}>
										<AirbnbRating
											showRating={false}
											size={30}
											//onFinishRating={ratingCompleted}
										/>
									</View>
								</View>
							</View>

							<View>
								<Text style={styles.yourOpinion}>Twoja opinia:</Text>
								<TextInput style={styles.ratingTextInput} />
							</View>

							<View style={styles.buttonsRatingContainer}>
								<Button
									style={styles.skipButton}
									//onPress={() => {props.navigation.navigate('gdziesnawigacja');}}
								>
									<ButtonText style={{ color: "black" }}>Pomiń</ButtonText>
								</Button>
								<Button
									style={styles.rateButton}
									//onPress={() => {props.navigation.navigate('gdziesnawigacja');}}
								>
									<ButtonText style={{ color: "black" }}>Oceń</ButtonText>
								</Button>
							</View>
						</View>
					</View>
				))}
			</View>
		</>
	);
};
export default DriversRatings;
