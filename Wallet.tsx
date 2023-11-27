import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Operations from "./Operations.js";


function Wallet(navigation: {navigation: any}) {
    return <View style={styles.allContainer}>
        <Text style={styles.header}>Twój portfel</Text>
        
        <View style={styles.yborder}>
          <View style={styles.box1}>
            <Text style={styles.normalText}> Bilans konta </Text>
            <Text style={styles.normalText}> 32.28 zł </Text>
          </View>
          <View style={styles.box2}>
            <Ionicons name="ios-wallet-outline" size={90} color="black" />
          </View>
        </View>

        <View style={styles.topupAccount}>
          <Text style={styles.boldText}> Doładuj konto </Text>
            <View style={styles.scanContainer} >
              <View style={styles.cameraIcon}> 
                <AntDesign name="camerao" size={35} color="black" />
              </View>
              <View> 
                <Text style={styles.scanQR}> Skanuj kod QR </Text>
              </View>
              <View> 
                <FontAwesome name="angle-right" size={45} color="black" />
              </View>
            </View>
        </View>

        <View style={styles.operationsContainer}>
          <Text style={styles.boldText}> Ostatnie operacje </Text>
          <Operations></Operations>
        </View>

    </View>
}

const styles = StyleSheet.create({
  allContainer: {
  },
  header: {
    fontFamily: 'DejaVuSans',
    paddingTop: 90,
    fontSize: 45,
    textAlign: "center"
  },
  normalText: {
    fontFamily: 'DejaVuSans',
    fontSize: 25
  },
  boldText: {
    fontFamily: 'DejaVuSans',
    fontSize: 18,
    fontWeight: 'bold'
  },
  yborder: {
    marginTop: 40,
    margin: 20,
    fontSize: 20,
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    heigth: 200,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#FFB700',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  box1: {
    width: 200,
    height: 100,
    alignItems: "center",
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  box2: {
    width: 100,
    height: 100,
    marginRight: 15,
    alignItems: "center",
    justifyContent: 'center',
    //backgroundColor: 'blue'
  },
  topupAccount:{
    paddingLeft: 20,
    paddingRight: 20
  },
  scanContainer:{
    marginTop: 10,
    flexDirection: 'row', 
    alignItems: "center",
  },
  cameraIcon:{
    paddingRight: 70
  },
  scanQR:{
    fontWeight: 'normal',
    fontSize: 20,
    paddingRight: 70,
  },
  operationsContainer: {
    paddingLeft: 20,
    marginTop: 10,
  },
  singleOperation: {
    fontWeight: 'normal',
    fontSize: 20,
    paddingTop: 7,
    color: 'red'
  },

});

export default Wallet;