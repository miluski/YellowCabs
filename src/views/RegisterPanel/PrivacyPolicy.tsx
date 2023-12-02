import * as Font from "expo-font";
import styles from "./styles";
import React, { useState } from "react";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, View, Text } from "@gluestack-ui/themed";
export default function PrivacyPolicy({ navigation } : { navigation: any }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadCustomFont = async () => {
    await Font.loadAsync({
      'DejaVuSans-Bold': require('../../assets/fonts/DejaVuSans-Bold.ttf'),
      'DejaVuSans': require('../../assets/fonts/DejaVuSans.ttf'),
      'DejaVuSans-ExtraLight': require('../../assets/fonts/DejaVuSans-ExtraLight.ttf')
    });
  };
  loadCustomFont().then(() => {
    setIsLoaded(true);
  });
  if (!isLoaded) {
    return null;
  }
  else { 
    return (
      <GluestackUIProvider config={config}>
        <View style={styles.mainPanelView}>
          <Text style={{alignSelf: 'center'}}>Nie zaimplementowane</Text>
        </View>
      </GluestackUIProvider>
    );
  }
}