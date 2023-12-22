import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
	yourWalletText: {
		fontFamily: "DejaVuSans",
		paddingTop: "25%",
		fontSize: 45,
		textAlign: "center",
	},
	accountBalanceView: {
		marginTop: "5%",
		margin: 20,
		fontSize: 20,
		padding: 10,
		paddingTop: 30,
		paddingBottom: 30,
		heigth: "50%",
		borderRadius: 25,
		borderWidth: 5,
		borderColor: "#FFB700",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 20,
	},
	accountBalanceDetailsView: {
		width: "65%",
		height: windowHeight / 7,
		alignItems: "center",
		justifyContent: "center",
	},
	accountBilanceTexts: {
		fontFamily: "DejaVuSans",
		fontSize: 18,
	},
	walletIconView: {
		width: 100,
		height: 100,
		marginRight: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	topUpAccountView: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	topUpAccountText: {
		fontFamily: "DejaVuSans",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	scanQrCodeView: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	cameraIconView: {
		paddingRight: 70,
	},
	scanQrCodeText: {
		fontWeight: "normal",
		fontSize: 20,
		paddingRight: 70,
	},
	operationsView: {
		paddingLeft: 20,
		marginTop: 10,
	},
	singleOperationText: {
		fontWeight: "normal",
		fontSize: 20,
		paddingTop: 7,
		color: "red",
	},
	lastOperationsText: {
		fontFamily: "DejaVuSans",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	paddingBottomView: {
		height: 100,
	},
});
export default styles;
