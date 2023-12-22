import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
	settingsScrollView: {
		marginTop: "10%",
	},
	accountSettingsText: {
		alignSelf: "center",
		fontFamily: "DejaVuSans-ExtraLight",
		fontSize: 35,
		paddingTop: 20,
		marginBottom: 25,
	},
	mainPanelView: {
		alignItems: "center",
	},
	textAndAvatarView: {
		alignItems: "center",
	},
	nameSurnameText: {
		fontFamily: "DejaVuSans",
		fontSize: 22,
		fontWeight: "bold",
	},
	rankText: {
		fontFamily: "DejaVuSans",
		fontSize: 15,
	},
	imageView: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	userAvatar: {
		width: 100,
		height: 100,
		resizeMode: "cover",
		borderRadius: 50,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: "center",
	},
	bottomUnderLineView: {
		borderBottomWidth: 2,
		width: windowWidth / 1.3,
	},
	switchOptionView: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "75%",
		alignItems: "center",
	},
	switchButtonStyle: {
		marginLeft: 10,
	},
	actionButtons: {
		marginBottom: "5%",
		width: windowWidth / 1.5,
		alignSelf: "center",
		borderColor: "#FFB700",
		borderRadius: 20,
		borderWidth: 2,
		backgroundColor: "white",
		marginTop: "5%",
	},
	changeProfilePhotoButtonText: {
		color: "black",
		fontFamily: "DejaVuSans",
		fontSize: 12,
		width: "95%",
		textAlign: "center",
	},
	confirmButtonText: {
		color: "black",
		fontFamily: "DejaVuSans",
		fontSize: 12,
	},
	inputDataBox: {
		paddingHorizontal: "10%",
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
