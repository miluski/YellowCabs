import React from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Image } from '@gluestack-ui/themed';
import MapViewDirections from 'react-native-maps-directions';
function Panel() {
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
const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const Background = () => {
  return <View style={styles.back}>
    <Logo/>
    <MapView style={styles.map} initialRegion={{
          latitude: 37.3318456,
          longitude: -122.0296002,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
      <MapViewDirections
      origin={origin}
      destination={destination}
      apikey={"AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ"}
      strokeWidth={3}
      strokeColor="hotpink"
    />
    </MapView>
  </View>;
};
const Logo = () => {
  return <Image size="2xl" source={{
    uri: "https://serwisyprawne.pl/images/fx/crop,800,450/479445"
  }} 
  alt = "Logo"
  />;
};
export default Panel;

