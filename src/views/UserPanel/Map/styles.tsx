import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	mapTabView: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
	mapSearchInput: {
		borderRadius: 20,
		margin: "13%",
		borderColor: "gray",
		backgroundColor: "#FFF",
		borderWidth: 1,
		height: 45,
		paddingHorizontal: 10,
		flex: 1,
	},
	searchInputComponentsView: {
		position: "absolute",
		top: 10,
		width: "100%",
		flex: 1,
	},
	searchIcon: {
		marginTop: 5,
	},
});
export default styles;
