import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	panelMainView: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
		color: "white",
	},
	yellowCabsText: {
		paddingTop: "25%",
		alignSelf: "center",
		fontFamily: "DejaVuSans",
		fontSize: 45,
	},
	loginPanelLogo: {
		alignSelf: "center",
		alignContent: "center",
	},
	dataInputView: {
		paddingTop: "5%",
		alignSelf: "center",
		alignItems: "center",
	},
	inputFields: {
		borderRadius: 10,
	},
	formInputControlLabelText: {
		paddingTop: "2%",
		fontFamily: "DejaVuSans",
		fontSize: 18,
	},
	formInputErrorLabelText: {
		fontFamily: "DejaVuSans",
		fontSize: 15,
	},
	notRememberPasswordButton: {
		paddingLeft: "25%",
		paddingTop: 10,
	},
	notRememberPasswordButtonText: {
		color: "#707070",
		fontFamily: "DejaVuSans",
		fontSize: 15,
	},
	buttons: {
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 1,
		marginTop: "5%",
	},
	buttonText: {
		fontFamily: "DejaVuSans",
		fontSize: 20,
		color: "black",
	},
	recoverPasswordText: {
		alignSelf: "center",
		fontFamily: "DejaVuSans",
		fontSize: 18,
		paddingBottom: "10%",
	},
	recoverPasswordButton: {
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 1,
		marginTop: "20%",
		width: "95%",
		alignSelf: "center",
	},
});
export default styles;
