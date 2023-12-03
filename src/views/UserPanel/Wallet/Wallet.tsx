import React from "react";
import styles from "./styles";
import  Operations from './Operations';
import { Text, View, ScrollView } from "@gluestack-ui/themed";
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from "react-native";
export default function Wallet() {
  return(
    <ScrollView>
      <Text style={styles.yourWalletText}>Twój portfel</Text>
      <AccountBalanceView/>
      <TopUpAccountView/>
      <View style={styles.operationsView}>
        <Text style={styles.lastOperationsText}> Ostatnie operacje </Text>
        <Operations></Operations>
      </View>
      <View style={styles.paddingBottomView}></View>
    </ScrollView>
  );
}
const AccountBalanceView = () => { 
  return (
    <View style={styles.accountBalanceView}>
      <View style={styles.accountBalanceDetailsView}>
        <Text style={styles.accountBilanceTexts}> Bilans konta </Text>
        <Text style={styles.accountBilanceTexts}> 32.28 zł </Text>
      </View>
      <View style={styles.walletIconView}>
        <Ionicons 
          name="ios-wallet-outline" 
          size={90} 
          color="black" 
        />
      </View>
    </View>
  );
}
const TopUpAccountView = () => {
  return (
    <View style={styles.topUpAccountView}>
      <Text style={styles.topUpAccountText}> Doładuj konto </Text>
        <View style={styles.scanQrCodeView} >
          <CameraIconView/>
          <ScanQrCodeTextView/>
          <AngleIconView/>
        </View>
    </View>
  );
}
const CameraIconView = () => {
  return (
    <View style={styles.cameraIconView}> 
      <AntDesign 
        name="camerao" 
        size={35} 
        color="black" 
      />
    </View>
  );
}
const ScanQrCodeTextView = () => {
  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
        <Text 
          style={styles.scanQrCodeText} 
        > 
          Skanuj kod QR 
        </Text>
    </TouchableWithoutFeedback>
  );
}
const AngleIconView = () => {
  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
      <FontAwesome 
        name="angle-right" 
        size={45} 
        color="black" 
      />
    </TouchableWithoutFeedback>
  );
}
function handlePress() {
  console.log('');
}