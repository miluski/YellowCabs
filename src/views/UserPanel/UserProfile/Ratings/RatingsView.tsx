import { ScrollView } from "@gluestack-ui/themed";
import DriversRatings from "./DriversRatings";
import DriverOpinions from "./DriversOpinions";
import React from "react";
import { useRoute } from '@react-navigation/native';
import styles from "./styles";
interface RouteParams {
    rank?: string;
}
export default function RatingsView() {
    const route = useRoute();
    const { rank } = route.params as RouteParams;
    return (
      <ScrollView style={styles.ratingScrollView}>
        {rank=='driver'?
            <DriverOpinions/> 
            :
            <DriversRatings/>
        }
      </ScrollView>
    )
}
