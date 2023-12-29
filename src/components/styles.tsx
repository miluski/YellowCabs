import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	mapTabView: {
		flex: 1,
	},
	homeMap: {
		width: "100%",
		height: "50%",
	},
	map: {
		width: "100%",
		height: "100%",
	},
	searchInputComponentsView: {
		position: "absolute",
		top: 10,
		width: "100%",
	},
	searchIcon: {
		marginTop: "2%",
	},
	spinner: {
		alignSelf: "center",
		width: "100%",
		height: "100%",
	},
	inputFields: {
		borderRadius: 10,
	},
	formInputControlLabelText: {
		paddingTop: 10,
		fontFamily: "DejaVuSans",
		fontSize: 18,
	},
	formInputErrorLabelText: {
		fontFamily: "DejaVuSans",
		fontSize: 15,
	},
});
export default styles;
