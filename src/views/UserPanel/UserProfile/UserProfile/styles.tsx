import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	mainPanelView: {
		alignItems: "center",
	},
	profileInfoView: {
		marginTop: "25%",
		paddingBottom: "10%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: 2,
	},
	nameSurnameRankView: {
		width: "50%",
	},
	userImage: {
		width: 100,
		height: 100,
		resizeMode: "cover",
		borderRadius: 50,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: "center",
	},
	menuOptionView: {
		marginTop: 20,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	leftIconView: {
		paddingRight: 30,
	},
	menuOptionsView: {
		paddingTop: 20,
		height: "50%",
	},
	menuOptionText: {
		fontWeight: "normal",
		fontSize: 20,
		paddingRight: 30,
		marginLeft: -20,
	},
	menuOptionBottomText: {
		fontWeight: "normal",
		fontSize: 20,
		paddingRight: 30,
		marginLeft: 15,
	},
	logoutView: {
		fontWeight: "normal",
		fontSize: 20,
		flex: 1,
	},
	rankText: {
		fontFamily: "DejaVuSans",
		fontSize: 18,
	},
	nameSurnameText: {
		fontFamily: "DejaVuSans",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
});
export default styles;
