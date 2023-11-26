import React from "react";
import { ScrollView, Text } from "@gluestack-ui/themed";
import { useRoute } from '@react-navigation/native';
import styles from "./styles";

interface RouteParams {
    rank?: string;
}

function Home(navigation: {navigation: any}) {
    const route = useRoute();
    const { rank } = route.params as RouteParams;
    if(rank=='driver')
        return <DriverHome/>;
    else
        return <PassengerHome/>;
}

const DriverHome = () => {
    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.topCenterText}>Moje zlecenia</Text>
        </ScrollView>
    )
}


const PassengerHome = () => {
    return (
        <ScrollView>
            
        </ScrollView>
    )
}

export default Home;