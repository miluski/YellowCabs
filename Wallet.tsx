import React from "react";
import { Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import  Operations from './Operations';
import styles from "./styles";
import { View, ScrollView } from "@gluestack-ui/themed";

function Wallet() {
    return <ScrollView>
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
                <FontAwesome name="angle-right" size={45} color="black" onPress={handlePress} />
              </View>
            </View>
        </View>
        <View style={styles.operationsContainer}>
          <Text style={styles.boldText}> Ostatnie operacje </Text>
          <Operations></Operations>
        </View>
        <View style={{height: 100}}></View>
    </ScrollView>
}

function handlePress() {
  console.log('angle clicked');
}

export default Wallet;