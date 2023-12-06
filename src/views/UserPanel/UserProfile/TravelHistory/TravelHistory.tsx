import styles from "./styles";
import { View, ScrollView, Text } from "@gluestack-ui/themed";
import React from "react";
import {  StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function TravelHistory() {
    return (
        <ScrollView style={styles.scrollHistory}>
        <View>
          <Text style={styles.travelTitleFirst}>Historia</Text>
          <Text style={styles.travelTitle}>moich podróży</Text>
        </View>

        <View style={styles.viewMonth}>
            <Text style={styles.tripTextMonth}>Październik</Text>
          <View style={styles.singleTrip}> 
            <View style={styles.travelPin}>
              <Feather name="map-pin" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.tripTextDest}>Z Los Angeles do San fransisco</Text>
              <Text style={styles.tripTextDate}>23.10.2023 15:45</Text>
            </View>
          </View>

          <View style={styles.singleTrip}> 
            <View style={styles.travelPin}>
              <Feather name="map-pin" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.tripTextDest}>Z Los Angeles do San fransisco</Text>
              <Text style={styles.tripTextDate}>23.10.2023 11:45</Text>
            </View>
          </View>
        </View>

        <View style={styles.viewMonth}>
            <Text style={styles.tripTextMonth}>Wrzesień</Text>
          <View style={styles.singleTrip}> 
            <View style={styles.travelPin}>
              <Feather name="map-pin" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.tripTextDest}>Z Los Angeles do San fransisco</Text>
              <Text style={styles.tripTextDate}>23.10.2023 15:45</Text>
            </View>
          </View>
        </View>
        </ScrollView>
    )
}