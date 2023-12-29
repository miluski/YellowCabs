import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native";
import { FirebaseApiCredentials } from "../../../../../api.config";
import React, { useState } from "react";
import { View, Text, Image } from "@gluestack-ui/themed";
import { Ionicons, AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
interface RouteParams {
	rank?: string;
	userKey?: string;
	avatarLink?: string;
	vibrations?: string;
	notifications?: string;
}
export default function UserProfile(props: { navigation: any }) {
	const route = useRoute();
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const routedParams = route.params as RouteParams;
	let finalRank = "Pasażer";
	if (routedParams.rank == "driver") finalRank = "Kierowca";
	const userProps = {
		userKey: routedParams.userKey,
		avatarLink: routedParams.avatarLink,
		vibrations: routedParams.vibrations,
		notifications: routedParams.notifications,
		rank: routedParams.rank,
		finalRank: finalRank,
		name: name,
		surname: surname,
		phone: phone,
		navigation: props.navigation,
	};
	setUserData(routedParams.userKey, setName, setSurname, setPhone);
	return (
		<View style={styles.mainPanelView}>
			<ProfileInfoView {...userProps} />
			<MenuOptionView {...userProps} />
		</View>
	);
}
async function setUserData(
	userKey: string | undefined,
	setName: Function,
	setSurname: Function,
	setPhone: Function
) {
	const getRequestURL = `${FirebaseApiCredentials.databaseURL}/users.json?key=${FirebaseApiCredentials.apiKey}`;
	const response = await fetch(getRequestURL);
	const data = await response.json();
	if (userKey) {
		const userData = data[userKey];
		setName(userData.name);
		setSurname(userData.surname);
		setPhone(String(userData.phone));
	} else return "";
}
const ProfileInfoView = (props: any) => {
	return (
		<View style={styles.profileInfoView}>
			<View style={styles.nameSurnameRankView}>
				<Text style={styles.nameSurnameText}>
					{props.name} {props.surname}
				</Text>
				<Text style={styles.rankText}>{props.finalRank}</Text>
			</View>
			<View>
				<Image
					source={{
						uri: props.avatarLink,
					}}
					style={styles.userImage}
					alt='User Avatar'
				/>
			</View>
		</View>
	);
};
const MenuOptionView = (props: any) => {
	return (
		<View style={styles.menuOptionsView}>
			<MyRatingsView {...props} />
			<SettingsView {...props} />
			<TravelHistoryView navigation={props.navigation} />
			<LogoutView navigation={props.navigation} />
		</View>
	);
};
const MyRatingsView = (props: any) => {
	return (
		<TouchableWithoutFeedback
			style={styles.menuOptionView}
			onPress={() => {
				handleMyRatings({ ...props });
			}}>
			<View style={styles.menuOptionView}>
				<View style={styles.leftIconView}>
					<FontAwesome
						name='star-half-empty'
						size={35}
						color='black'
					/>
				</View>
				<View>
					<Text style={styles.menuOptionText}>Moje Oceny</Text>
				</View>
				<AngleRightIcon />
			</View>
		</TouchableWithoutFeedback>
	);
};
const SettingsView = (props: any) => {
	return (
		<TouchableWithoutFeedback
			style={styles.menuOptionView}
			onPress={() => {
				handleSettings({ ...props });
			}}>
			<View style={styles.menuOptionView}>
				<View style={styles.leftIconView}>
					<Ionicons
						name='settings-outline'
						size={35}
						color='black'
					/>
				</View>
				<View>
					<Text style={styles.menuSettingsOptionText}>Ustawienia</Text>
				</View>
				<AngleRightIcon />
			</View>
		</TouchableWithoutFeedback>
	);
};
const TravelHistoryView = (props: { navigation: any }) => {
	return (
		<TouchableWithoutFeedback
			style={styles.menuOptionView}
			onPress={() => {
				handleTravelHistory(props.navigation);
			}}>
			<View style={styles.menuOptionView}>
				<View style={styles.leftIconView}>
					<Octicons
						name='history'
						size={35}
						color='black'
					/>
				</View>
				<View>
					<Text style={styles.menuOptionBottomText}>Historia Podróży</Text>
				</View>
				<AngleRightIcon />
			</View>
		</TouchableWithoutFeedback>
	);
};
const LogoutView = (props: { navigation: any }) => {
	return (
		<TouchableWithoutFeedback
			style={styles.menuOptionView}
			onPress={() => {
				handleLogout(props.navigation);
			}}>
			<View style={styles.menuOptionView}>
				<View style={styles.leftIconView}>
					<AntDesign
						name='logout'
						size={33}
						color='black'
					/>
				</View>
				<View style={styles.logoutView}>
					<Text style={styles.menuOptionBottomText}>Wyloguj</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};
const AngleRightIcon = () => {
	return (
		<View>
			<FontAwesome
				name='angle-right'
				size={45}
				color='black'
			/>
		</View>
	);
};
function handleMyRatings(props: any) {
	props.navigation.navigate("RatingsView", {
		rank: props.rank,
		name: props.name,
		surname: props.surname,
		avatarLink: props.avatarLink,
	});
}
function handleSettings(props: any) {
	props.navigation.navigate("SettingsView", {
		phoneNumber: props.phone,
		name: props.name,
		surname: props.surname,
		userKey: props.userKey,
		avatarLink: props.avatarLink,
		vibrations: props.vibrations,
		notifications: props.notifications,
	});
}
function handleTravelHistory(navigation: any) {
	navigation.navigate("TravelHistory");
}
function handleLogout(navigation: any) {
	navigation.navigate("LoginPanel");
}
