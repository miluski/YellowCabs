import React, { useState } from "react";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { View, Text, Image } from "@gluestack-ui/themed";
import { Ionicons, AntDesign, FontAwesome, Octicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { FirebaseApiCredentials } from "../../../../../api.config";
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
	const { rank, userKey, avatarLink, vibrations, notifications } =
		route.params as RouteParams;
	let finalRank = "Pasażer";
	if (rank == "driver") finalRank = "Kierowca";
	SetUserData(userKey, setName, setSurname, setPhone);
	return (
		<View style={styles.mainPanelView}>
			<ProfileInfoView
				name={name}
				surname={surname}
				rank={finalRank}
				avatarLink={avatarLink}
			/>
			<MenuOptionView
				navigation={props.navigation}
				phone={phone}
				name={name}
				surname={surname}
				userKey={userKey}
				avatarLink={avatarLink}
				vibrations={vibrations}
				notifications={notifications}
				rank={rank}
			/>
		</View>
	);
}
async function SetUserData(
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
const ProfileInfoView = (props: {
	name: string | undefined;
	surname: string | undefined;
	rank: string | undefined;
	avatarLink: string | undefined;
}) => {
	return (
		<View style={styles.profileInfoView}>
			<View style={styles.nameSurnameRankView}>
				<Text style={styles.nameSurnameText}>
					{props.name} {props.surname}
				</Text>
				<Text style={styles.rankText}>{props.rank}</Text>
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
const MenuOptionView = (props: {
	navigation: any;
	phone: string | undefined;
	name: string | undefined;
	surname: string | undefined;
	userKey: string | undefined;
	avatarLink: string | undefined;
	vibrations: string | undefined;
	notifications: string | undefined;
	rank: string | undefined;
}) => {
	return (
		<View style={styles.menuOptionsView}>
			<MyRatingsView
				navigation={props.navigation}
				rank={props.rank}
			/>
			<SettingsView
				navigation={props.navigation}
				phone={props.phone}
				name={props.name}
				surname={props.surname}
				userKey={props.userKey}
				avatarLink={props.avatarLink}
				vibrations={props.vibrations}
				notifications={props.notifications}
			/>
			<TravelHistoryView navigation={props.navigation} />
			<LogoutView navigation={props.navigation} />
		</View>
	);
};
const MyRatingsView = (props: {
	navigation: any;
	rank: string | undefined;
}) => {
	return (
		<TouchableWithoutFeedback
			style={styles.menuOptionView}
			onPress={() => {
				handleMyRatings(props.navigation, props.rank);
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
				<View>
					<FontAwesome
						name='angle-right'
						size={45}
						color='black'
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};
const SettingsView = (props: {
	navigation: any;
	phone: string | undefined;
	name: string | undefined;
	surname: string | undefined;
	userKey: string | undefined;
	avatarLink: string | undefined;
	vibrations: string | undefined;
	notifications: string | undefined;
}) => {
	return (
		<TouchableWithoutFeedback
			style={styles.menuOptionView}
			onPress={() => {
				handleSettings(
					props.navigation,
					props.phone,
					props.name,
					props.surname,
					props.userKey,
					props.avatarLink,
					props.vibrations,
					props.notifications
				);
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
				<View>
					<FontAwesome
						name='angle-right'
						size={45}
						color='black'
					/>
				</View>
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
				<View>
					<FontAwesome
						name='angle-right'
						size={45}
						color='black'
					/>
				</View>
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
function handleMyRatings(navigation: any, rank: string | undefined) {
	navigation.navigate("RatingsView", {
		rank: rank,
	});
}
function handleSettings(
	navigation: any,
	phone: string | undefined,
	name: string | undefined,
	surname: string | undefined,
	userKey: string | undefined,
	avatarLink: string | undefined,
	vibrations: string | undefined,
	notifications: string | undefined
) {
	navigation.navigate("SettingsView", {
		phoneNumber: phone,
		name: name,
		surname: surname,
		userKey: userKey,
		avatarLink: avatarLink,
		vibrations: vibrations,
		notifications: notifications,
	});
}
function handleTravelHistory(navigation: any) {
	navigation.navigate("TravelHistory");
}
function handleLogout(navigation: any) {
	navigation.navigate("LoginPanel");
}
