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
		marginTop: "2%"
	},
	spinner: {
		alignSelf: "center",
		width: "100%",
		height: "100%",
	},
});
export default styles;
