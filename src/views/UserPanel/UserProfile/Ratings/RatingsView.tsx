import { View, ScrollView, Text, Image, Button, ButtonText } from "@gluestack-ui/themed";
import { Rating, AirbnbRating } from 'react-native-ratings';
import DriversRatings from "./DriversRatings";
import DriverOppinions from "./DriversOppinions";
import { TextInput } from 'react-native';
import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import styles from "./styles";

interface RouteParams {
    rank?: string;
}

export default function RatingsView() {
    const route = useRoute();
    const { rank } = route.params as RouteParams;
    const [isDriverDetected, setIsDriverDetected] = useState(false);

    return (
      <ScrollView style={styles.ratingScrollView}>
        if(rank=='driver'){
          <DriversRatings/>
        }
        else{ 
          <DriverOppinions/> 
        }
      </ScrollView>
    )
}
