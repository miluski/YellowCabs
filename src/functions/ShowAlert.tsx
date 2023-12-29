import { Alert, Vibration } from "react-native";
export default function showAlert(
	title: string,
	message: string,
	vibrationsPermission: string
) {
	vibrationsPermission === "yes" ? Vibration.vibrate(500) : null;
	Alert.alert(title, message, [
		{
			text: "Ok",
			style: "cancel",
		},
	]);
}
