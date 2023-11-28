import React from "react";
import { ScrollView, Text, View } from "@gluestack-ui/themed";
import { useRoute } from '@react-navigation/native';
import styles from "./styles";
import { Contract } from "./Contract";

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
        <ScrollView>
            <View style={styles.contractsScrollView}>
                <Text style={styles.topCenterText}>Moje zlecenia</Text>
                <Contract></Contract>
            </View>
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