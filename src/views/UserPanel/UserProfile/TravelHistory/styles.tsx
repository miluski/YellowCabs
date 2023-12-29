import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
	scrollHistory: {
		flex: 1,
	},
	viewMonth: {
		alignItems: "center",
	},
	travelTitle: {
		alignSelf: "center",
		marginBottom: 10,
		padding: "2%",
		fontSize: 28,
	},
	travelTitleFirst: {
		alignSelf: "center",
		marginTop: "15%",
		padding: "2%",
		fontSize: 28,
	},
	singleTrip: {
		marginTop: 10,
		width: "90%",
		borderRadius: 25,
		borderColor: "black",
		borderWidth: 2,
		flexDirection: 'row',
    	alignItems: 'center',
	},
	travelPin: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: "#FFB700",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
		marginLeft: 8,
	},
	tripTextMonth: {
		alignSelf: "center",
		marginTop: 14,
		fontSize: 22,
	},
	tripTextDest: {
		marginLeft: 12,
		marginTop: 14,
		fontSize: 13,
	},
	tripDestinationTextDest: {
		marginLeft: 12,
		fontSize: 13,
		flexGrow: 1,
	},
	tripTextDate: {
		marginLeft: 12,
		fontSize: 13,
		marginBottom: 12,
		flexGrow: 1
	},
	paddingBottomView: {
		height: 75,
	},
	textContainerView: {
		flexWrap: 'wrap',
		flexDirection: "row",
		width: "65%"
	}
});
export default styles;
