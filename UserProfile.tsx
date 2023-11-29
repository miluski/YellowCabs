import React from "react";
import { View, Text, Image } from "@gluestack-ui/themed";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import styles from "./styles";

interface RouteParams {
  rank?: string;
  name?: string;
  surname?: string;
  phone?: number;
  avatarLink?: string;
}

function UserProfile(props:{navigation: any}) {
    const route = useRoute();
    const { rank, name, surname, phone, avatarLink } = route.params as RouteParams;
    let finalRank = 'Pasażer';
    if(rank=='driver')
      finalRank = 'Kierowca';
    return <View style={styles.allContainer}>
      <View style={styles.profileInfo}>
        <View style={styles.namebox}>  
          <Text style={styles.normalText}>{name} {surname}</Text>
          <Text style={styles.boldText}>{finalRank}</Text>
        </View>
        <View>
          <Image source={{ uri: avatarLink }} style={styles.image} alt="User Avatar"/>
        </View>
      </View>
        
      <View style={styles.tools}>
            <View style={styles.toolsContainer} >
              <View style={styles.leftIcon}> 
                <FontAwesome name="star-half-empty" size={35} color="black" />
              </View>
              <View> 
                <Text style={styles.content} onPress={()=>{handleMyRatings(props.navigation)}}> Moje Oceny </Text>
              </View>
              <View> 
                <FontAwesome name="angle-right" size={45} color="black" onPress={()=>{handleMyRatings(props.navigation)}} />
              </View>
            </View>

            <View style={styles.toolsContainer} >
              <View style={styles.leftIcon}> 
                <Ionicons name="settings-outline" size={35} color="black" />
              </View>
              <View> 
                <Text style={styles.content} onPress={()=>{handleSettings(props.navigation)}}> Ustawienia </Text>
              </View>
              <View> 
                <FontAwesome name="angle-right" size={45} color="black" onPress={()=>{handleSettings(props.navigation)}} />
              </View>
            </View>

            <View style={styles.toolsContainer} >
              <View style={styles.leftIcon}> 
                <Octicons name="history" size={35} color="black" />
              </View>
              <View> 
                <Text style={styles.content} onPress={()=>{handleTravelHistory(props.navigation)}}> Historia Podróży </Text>
              </View>
              <View> 
                <FontAwesome name="angle-right" size={45} color="black" onPress={()=>{handleTravelHistory(props.navigation)}} />
              </View>
            </View>

            <View style={styles.toolsContainer} >
              <View style={styles.leftIcon}> 
                <AntDesign name="logout" size={33} color="black" />
              </View>
              <View style={styles.logoutIcon}> 
                <Text style={styles.content} onPress={()=>{handleLogout(props.navigation)}}> Wyloguj </Text>
              </View>
            </View>

      </View> 

    </View>
}

function handleMyRatings(navigation: any): void {
  navigation.navigate("RatingsView");
}

function handleSettings(navigation: any): void {
  navigation.navigate("SettingsView");
}

function handleTravelHistory(navigation: any): void {
  navigation.navigate("TravelHistory");
}

function handleLogout(navigation: any): void {
  navigation.navigate("LoginPanel");
}

export default UserProfile;