import React from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Image } from '@gluestack-ui/themed';
function App() {
  return <GluestackUIProvider config={config}>
    <Background />
  </GluestackUIProvider>;
}
const styles = StyleSheet.create({
  back: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  map: {
    width: '100%',
    height: '100%',
  },
});
const Background = () => {
  return <View style={styles.back}>
    <Logo/>
    <MapView style={styles.map} />
  </View>;
};
const Logo = () => {
  return <Image size="2xl" source={{
    uri: "https://serwisyprawne.pl/images/fx/crop,800,450/479445"
  }} 
  alt = "Logo"
  />;
};
export default App;