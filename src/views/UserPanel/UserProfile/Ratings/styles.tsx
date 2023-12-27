import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	ratingScrollView: {
		flex: 1,
	},
	allRatingContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	ratingHeader: {
		fontSize: 20,
		alignItems: "center",
		fontFamily: "DejaVuSans",
		marginTop: 40,
	},
	singleRatingContainer: {
		width: 320,
		height: 220,
		borderWidth: 2,
		borderRadius: 20,
		marginTop: 20,
	},
	singleRatingContainerViewOnly: {
		width: 320,
		height: 200,
		borderWidth: 2,
		borderRadius: 20,
		marginTop: 20,
	},
	allInfoRating: {
		padding: 10,
		flexDirection: "row",
	},
	imageAvatar: {
		width: 70,
		height: 70,
		resizeMode: "cover",
		borderRadius: 50,
	},
	nameRatings: {
		fontSize: 17,
		marginLeft: 10,
	},
	starsRating: {
		marginLeft: 10,
		flex: 1,
		flexDirection: "row",
	},
	yourOpinion: {
		fontSize: 13,
		marginLeft: 20,
	},
	ratingTextInput: {
		borderWidth: 1,
		marginLeft: 20,
		marginRight: 20,
		height: 40,
	},
	buttonsRatingContainer: {
		flex: 1,
		flexDirection: "row",
		marginTop: 10,
		justifyContent: "space-between",
		marginLeft: 20,
		marginRight: 20,
	},
	skipButton: {
		width: 120,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		borderColor: "#707070",
		borderWidth: 2,
	},
	rateButton: {
		width: 120,
		borderRadius: 20,
		borderColor: "#FFB700",
		backgroundColor: "transparent",
		borderWidth: 2,
		justifyContent: "center",
		alignItems: "center",
	},
});
export default styles;
