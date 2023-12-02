import React from "react";
import styles from "./styles";
import { useRoute } from '@react-navigation/native';
import { View, Text, Image } from "@gluestack-ui/themed";
import { Ionicons, AntDesign, FontAwesome, Octicons } from '@expo/vector-icons';
interface RouteParams {
  rank?: string;
  name?: string;
  surname?: string;
  phone?: string;
  avatarLink?: string;
}
export default function UserProfile(props:{navigation: any}) {
    const route = useRoute();
    const { rank, name, surname, phone, avatarLink } = route.params as RouteParams;
    let finalRank = 'Pasażer';
    if(rank=='driver')
      finalRank = 'Kierowca';
    return(
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
      />
    </View>
    );
}
const ProfileInfoView = (props:{
  name: string | undefined,
  surname: string | undefined,
  rank: string | undefined,
  avatarLink: string | undefined
}) => {
  return (
    <View style={styles.profileInfoView}>
      <View style={styles.nameSurnameRankView}>  
        <Text style={styles.nameSurnameText}>{props.name} {props.surname}</Text>
        <Text style={styles.rankText}>{props.rank}</Text>
      </View>
      <View>
        <Image 
          source={{ 
            uri: props.avatarLink 
          }} 
          style={styles.userImage} 
          alt="User Avatar"
        />
      </View>
    </View>
  );
}
const MenuOptionView = (props:{
  navigation: any,
  phone: string | undefined
}) => {
  return (
    <View style={styles.menuOptionsView}>
      <MyRatingsView navigation={props.navigation}/>
      <SettingsView 
        navigation={props.navigation}
        phone={props.phone}
      />
      <TravelHistoryView navigation={props.navigation}/>
      <LogoutView navigation={props.navigation}/>
    </View> 
  );
}
const MyRatingsView = (props:{navigation: any}) => {
  return (
    <View style={styles.menuOptionView} >
      <View style={styles.leftIconView}> 
        <FontAwesome 
          name="star-half-empty" 
          size={35} 
          color="black" 
        />
      </View>
      <View> 
        <Text 
          style={styles.menuOptionText} 
          onPress={()=>{
            handleMyRatings(props.navigation)
          }}
        > 
          Moje Oceny 
        </Text>
      </View>
      <View> 
        <FontAwesome 
          name="angle-right" 
          size={45} 
          color="black" 
          onPress={()=>{
            handleMyRatings(props.navigation)
          }} 
        />
      </View>
    </View>
  );
}
const SettingsView = (props:{
  navigation: any,
  phone: string | undefined
}) => {
  return (
    <View style={styles.menuOptionView} >
      <View style={styles.leftIconView}> 
        <Ionicons 
          name="settings-outline" 
          size={35} 
          color="black" 
        />
      </View>
      <View> 
        <Text 
          style={styles.menuOptionText} 
          onPress={()=>{
            handleSettings(props.navigation, props.phone)
          }}
        > 
          Ustawienia 
        </Text>
      </View>
      <View> 
        <FontAwesome 
          name="angle-right" 
          size={45} 
          color="black" 
          onPress={()=>{
            handleSettings(props.navigation, props.phone)
          }} 
        />
      </View>
    </View>
  );
}
const TravelHistoryView = (props:{navigation: any}) => {
  return (
    <View style={styles.menuOptionView} >
      <View style={styles.leftIconView}> 
        <Octicons 
          name="history" 
          size={35} 
          color="black" 
        />
      </View>
      <View> 
        <Text 
          style={styles.menuOptionBottomText} 
          onPress={()=>{
            handleTravelHistory(props.navigation)
          }}
        > 
          Historia Podróży 
        </Text>
      </View>
      <View> 
          <FontAwesome 
            name="angle-right" 
            size={45} 
            color="black" 
            onPress={()=>{
              handleTravelHistory(props.navigation)
            }}
          />
      </View>
    </View>
  );
}
const LogoutView = (props:{navigation: any}) => {
  return (
    <View style={styles.menuOptionView} >
      <View style={styles.leftIconView}> 
        <AntDesign 
        name="logout" 
        size={33} 
        color="black" />
      </View>
      <View style={styles.logoutView}> 
        <Text 
          style={styles.menuOptionBottomText} 
          onPress={()=>{
            handleLogout(props.navigation)
          }}
        > 
          Wyloguj 
        </Text>
      </View>
    </View>
  );
}
function handleMyRatings(navigation: any) {
  navigation.navigate("RatingsView");
}
function handleSettings(navigation: any, phone: string | undefined) {
  navigation.navigate("SettingsView", {
    phone: phone
  });
}
function handleTravelHistory(navigation: any) {
  navigation.navigate("TravelHistory");
}
function handleLogout(navigation: any) {
  navigation.navigate("LoginPanel");
}