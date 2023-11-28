import React from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


function UserProfile(navigation: {navigation: any}) {
    return <View style={styles.allContainer}>
      <View style={styles.profileInfo}>
        <View style={styles.namebox}>  
          <Text style={styles.normalText}>Szymon Pies</Text>
          <Text style={styles.boldText}>Pasażer</Text>
        </View>
        <View >
          <Image source={{ uri: 'https://images.pexels.com/photos/5835419/pexels-photo-5835419.jpeg' }} style={styles.image}/>
        </View>
      </View>
        
      <View style={styles.tools}>
            <View style={styles.toolsContainer} >
              <View style={styles.leftIcon}> 
                <FontAwesome name="star-half-empty" size={35} color="black" />
              </View>
              <View> 
                <Text style={styles.content}> Moje Oceny </Text>
              </View>
              <View> 
                <FontAwesome name="angle-right" size={45} color="black" />
              </View>
            </View>

            <View style={styles.toolsContainer} >
              <View style={styles.leftIcon}> 
                <Ionicons name="settings-outline" size={35} color="black" />
              </View>
              <View> 
                <Text style={styles.content}> Ustawienia </Text>
              </View>
              <View> 
                <FontAwesome name="angle-right" size={45} color="black" />
              </View>
            </View>

            <View style={styles.toolsContainer} >
              <View style={styles.leftIcon}> 
                <Octicons name="history" size={35} color="black" />
              </View>
              <View> 
                <Text style={styles.content}> Historia Podróży </Text>
              </View>
              <View> 
                <FontAwesome name="angle-right" size={45} color="black" />
              </View>
            </View>

            <View style={styles.toolsContainer} >
              <View style={styles.leftIcon}> 
                <AntDesign name="logout" size={33} color="black" />
              </View>
              <View style={styles.logoutIcon}> 
                <Text style={styles.content}> Wyloguj </Text>
              </View>
            </View>

      </View>

        
    </View>
}

const styles = StyleSheet.create({
  allContainer: {
    alignItems: 'center'
  },
  normalText:{
    fontWeight: 'normal',
    fontSize: 22,
  },
  boldText:{
    fontWeight: 'bold',
    fontSize: 15,
  },
  profileInfo:{
    marginTop: 100,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  image:{
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  namebox:{
    width: 200,
  },
  tools:{
    paddingTop: 20,
    height: 350
  },
   toolsContainer:{
    marginTop: 20,
    flex: 1,
    flexDirection: 'row', 
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftIcon:{
    paddingRight: 30,
  },
  content:{
    fontWeight: 'normal',
    fontSize: 20,
    paddingRight: 30,
  },
  logoutIcon:{
    fontWeight: 'normal',
    fontSize: 20,
    flex: 1,
  }



});

export default UserProfile;