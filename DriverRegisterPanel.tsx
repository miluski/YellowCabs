import * as Font from "expo-font";
import styles from "./styles";
import React, { useState } from "react";
import { config } from "@gluestack-ui/config";
import { View } from "react-native";
import { GluestackUIProvider, Image, Text, Box } from "@gluestack-ui/themed";
function DriverRegisterPanel({ navigation } : { navigation: any }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadCustomFont = async () => {
    await Font.loadAsync({
      'DejaVuSans-Bold': require('./assets/fonts/DejaVuSans-Bold.ttf'),
      'DejaVuSans': require('./assets/fonts/DejaVuSans.ttf'),
      'DejaVuSans-ExtraLight': require('./assets/fonts/DejaVuSans-ExtraLight.ttf')
    });
  };
  loadCustomFont().then(() => {
    setIsLoaded(true);
  });
  if (!isLoaded) {
    return null;
  }
  else{ 
    return <GluestackUIProvider config={config}>
        <Background navigation={navigation} />
    </GluestackUIProvider>;
  }
}
const Background = (props: { navigation: any }) => {
  return (
    <View style={styles.background}>
      <Logo />
      <Text style={styles.yellowcabs}>YellowCabs</Text>
      <MainView navigation={props.navigation} />
    </View>
  );
};
const Logo = () => {
  return (
    <Image
      size="xl"
      source={{
        uri: "https://i.ibb.co/hLT13mG/Zrzut-ekranu-2023-10-19-234035.png",
      }}
      style={styles.logo}
      alt="Logo"
    />
  );
};
const MainView = (props: { navigation: any }) => {
  return (
    <View style={styles.hintsView}>
      <DataForm navigation={props.navigation} />
    </View>
  );
};
const DataForm = (props: { navigation: any }) => {
  return (
    <Box>
     
    </Box>
  );
};
export default DriverRegisterPanel;
