import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
	mainPanelView: {
		flex: 1,
	},
	registerYourSelfText: {
		fontFamily: "DejaVuSans",
		fontSize: 32,
		alignSelf: "center",
		paddingTop: "4%",
		marginTop: "15%",
		marginBottom: "10%",
	},
	topTexts: {
		fontFamily: "DejaVuSans",
		fontSize: 16,
		alignSelf: "center",
	},
	dataInputView: {
		paddingTop: "7%",
		alignSelf: "center",
		alignItems: "center",
	},
	dataFormBox: {
		paddingHorizontal: "8.5%",
	},
	creatingNewAccountText: {
		marginTop: "2%",
		alignSelf: "center",
		fontFamily: "DejaVuSans",
		fontSize: 13,
	},
	driverPassengerSwitchButtonGroup: {
		paddingTop: "2%",
		paddingBottom: "5%",
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
	inputFields: {
		borderRadius: 10,
	},
	circleIcon: {
		width: 10,
		height: 10,
		color: "black",
		borderColor: "black",
	},
	policyPrivacyTermsAndConditionsStack: {
		paddingBottom: "7%",
		alignItems: "baseline",
	},
	policyPrivacyTermsAndConditionsButtons: {
		paddingLeft: "32%",
		paddingTop: "2%",
	},
	andConnectorText: {
		marginRight: "-31%",
	},
	rulesAndTermsButtonText: {
		alignSelf: "center",
		color: "#707070",
		fontFamily: "DejaVuSans",
		fontSize: 12,
		marginLeft: -windowWidth / 5,
	},
	privacyPolicyButtonText: {
		alignSelf: "center",
		color: "#707070",
		fontFamily: "DejaVuSans",
		fontSize: 12,
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
	registerButton: {
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 1,
		marginTop: 25,
		marginBottom: 25,
		width: windowWidth / 1.5,
		alignSelf: "center",
	},
	agreementText: {
		fontFamily: "DejaVuSans",
		fontSize: 8,
		alignSelf: "center",
		flexWrap: "wrap",
		borderWidth: 0,
		maxWidth: windowWidth - 75,
		marginTop: 25,
	},
	termsAndPrivacyHeaderFirst: {
		alignSelf: "center",
		fontFamily: "DejaVuSans",
		fontSize: 25,
		paddingTop: 5,
		paddingBottom: 10,
	},
	termsAndPrivacyHeader: {
		alignSelf: "center",
		fontFamily: "DejaVuSans",
		fontSize: 25,
		paddingTop: 30,
		paddingBottom: 10,
	},
	termsAndPrivacyHeaderLine: {
		alignSelf: "center",
		fontFamily: "DejaVuSans",
		fontSize: 25,
		paddingTop: 4,
		paddingBottom: 10,
	},
	termsAndPrivacyText: {
		fontFamily: "DejaVuSans",
		fontSize: 15,
		marginLeft: 15,
	},
	termsAndPrivacyBackButtons: {
		marginBottom: "5%",
		width: windowWidth / 1.5,
		alignSelf: "center",
		borderColor: "black",
		borderRadius: 20,
		borderWidth: 1,
		backgroundColor: "#FFB700",
		marginTop: "5%",
	},
	termsAndPrivacyBackButtonsText: {
		color: "black",
		fontFamily: "DejaVuSans",
		fontSize: 22,
		textAlign: "center",
	},
	headerTerms: {
		fontFamily: "DejaVuSans",
		fontSize: 28,
		alignItems: "center",
		paddingTop: 5,
	},
	termsAppView: {
		paddingTop: "15%",
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 10,
	},
	textSmallTerms: {
		fontFamily: "DejaVuSans",
		fontSize: 15,
	},
	termsAppScrollView: {
		marginRight: windowWidth / 20,
		marginLeft: windowWidth / 20,
		flex: 1,
	},
});
export default styles;
