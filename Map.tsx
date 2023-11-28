import React from "react";
import MapView from "react-native-maps";
import styles from "./styles";
import MapViewDirections from "react-native-maps-directions";
import { Input, InputSlot, InputIcon, SearchIcon, InputField } from "@gluestack-ui/themed";

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

function Map() {
    return (
        <>
        <Input>
            <InputSlot pl="$3">
                <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField placeholder="Search..." />
        </Input>
        <MapView 
            style={styles.map} 
            initialRegion={{
                latitude: 37.3318456,
                longitude: -122.0296002,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={"AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ"}
                strokeWidth={3}
                strokeColor="hotpink"
            />
        </MapView>
        </>
    )
}

export default Map;