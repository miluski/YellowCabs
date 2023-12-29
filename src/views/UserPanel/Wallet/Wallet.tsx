import styles from "./styles";
import Operations from "./Operations";
import getActualAccountBilance from "../../../functions/GetActualAccountBilance";
import { useRoute } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "@gluestack-ui/themed";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
interface RouteParams {
	userKey: string;
	vibrations: string;
	notifications: string;
}
export default function Wallet({ navigation }: { navigation: any }) {
	const route = useRoute();
	const routedParams = route.params as RouteParams;
	const [accountBilance, setAccountBilance] = useState(0.0);
	useEffect(() => {
		(async () => {
			setAccountBilance(await getActualAccountBilance(routedParams.userKey));
		})();
	}, []);
	return (
		<ScrollView>
			<Text style={styles.yourWalletText}>Twój portfel</Text>
			<AccountBalanceView accountBilance={accountBilance} />
			<TopUpAccountView
				navigation={navigation}
				userKey={routedParams.userKey}
				vibrations={routedParams.vibrations}
				notifications={routedParams.notifications}
				accountBilance={accountBilance}
			/>
			<View style={styles.operationsView}>
				<Text style={styles.lastOperationsText}> Ostatnie operacje </Text>
				<Operations></Operations>
			</View>
			<View style={styles.paddingBottomView}></View>
		</ScrollView>
	);
}
const AccountBalanceView = (props: { accountBilance: any }) => {
	return (
		<View style={styles.accountBalanceView}>
			<View style={styles.accountBalanceDetailsView}>
				<Text style={styles.accountBilanceTexts}> Bilans konta </Text>
				<Text style={styles.accountBilanceTexts}>
					{" "}
					{Math.round(props.accountBilance)} zł{" "}
				</Text>
			</View>
			<View style={styles.walletIconView}>
				<Ionicons
					name='ios-wallet-outline'
					size={90}
					color='black'
				/>
			</View>
		</View>
	);
};
const TopUpAccountView = (props: {
	navigation: any;
	userKey: string;
	accountBilance: any;
	vibrations: string;
	notifications: string;
}) => {
	return (
		<View style={styles.topUpAccountView}>
			<Text style={styles.topUpAccountText}> Doładuj konto </Text>
			<View style={styles.scanQrCodeView}>
				<CameraIconView />
				<ScanQrCodeTextView {...props} />
				<AngleIconView {...props} />
			</View>
		</View>
	);
};
const CameraIconView = () => {
	return (
		<View style={styles.cameraIconView}>
			<AntDesign
				name='camerao'
				size={35}
				color='black'
			/>
		</View>
	);
};
const ScanQrCodeTextView = (props: any) => {
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				props.navigation.navigate("CameraView", {
					userKey: props.userKey,
					accountBilance: props.accountBilance,
					vibrations: props.vibrations,
					notifications: props.notifications,
				});
			}}>
			<Text style={styles.scanQrCodeText}>Skanuj kod QR</Text>
		</TouchableWithoutFeedback>
	);
};
const AngleIconView = (props: any) => {
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				props.navigation.navigate("CameraView", {
					userKey: props.userKey,
					accountBilance: props.accountBilance,
					vibrations: props.vibrations,
					notifications: props.notifications,
				});
			}}>
			<FontAwesome
				name='angle-right'
				size={45}
				color='black'
			/>
		</TouchableWithoutFeedback>
	);
};
