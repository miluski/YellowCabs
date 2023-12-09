import React from 'react';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { Text, View } from '@gluestack-ui/themed';
export default function Travel() {
    const travelsData = [
        { from: 'Los Angeles', to: 'San Francisco', day: '23', month: '10', year: '2023', hourAndMinute: '15:45' },
        { from: 'Los Angeles', to: 'San Francisco', day: '24', month: '10', year: '2023', hourAndMinute: '16:45' },
        { from: 'Los Angeles', to: 'San Francisco', day: '25', month: '10', year: '2023', hourAndMinute: '17:45' },
        { from: 'Los Angeles', to: 'San Francisco', day: '26', month: '10', year: '2023', hourAndMinute: '18:45' },
        { from: 'Los Angeles', to: 'San Francisco', day: '27', month: '10', year: '2023', hourAndMinute: '19:45' },
        { from: 'San Francisco', to: 'Los Angeles', day: '23', month: '11', year: '2023', hourAndMinute: '08:45' },
        { from: 'San Francisco', to: 'Los Angeles', day: '23', month: '11', year: '2023', hourAndMinute: '07:45' },
        { from: 'San Francisco', to: 'Los Angeles', day: '23', month: '11', year: '2023', hourAndMinute: '06:45' },
        { from: 'San Francisco', to: 'Los Angeles', day: '23', month: '11', year: '2023', hourAndMinute: '05:45' },
        { from: 'San Francisco', to: 'Los Angeles', day: '23', month: '11', year: '2023', hourAndMinute: '04:45' }
    ];
    const groupedTravels: any = {};
    travelsData.forEach((travel) => {
        const monthKey = `${travel.year}-${travel.month}`;
        if (!groupedTravels[monthKey]) {
            groupedTravels[monthKey] = [];
        }
        groupedTravels[monthKey].push(travel);
    });
    return (
        <>
            {Object.entries(groupedTravels).map(([monthKey, monthTravels]) => (
                <View key={monthKey} style={styles.viewMonth}>
                    <Text style={styles.tripTextMonth}>
                        {new Date(`${monthKey}-01`).toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() +
                        new Date(`${monthKey}-01`).toLocaleString('default', { month: 'long' }).slice(1)}
                    </Text>
                    {(monthTravels as Array<any>).map((travel, index) => (
                        <View key={index} style={styles.singleTrip}>
                            <View style={styles.travelPin}>
                                <Feather name="map-pin" size={24} color="black" />
                            </View>
                            <View>
                                <Text style={styles.tripTextDest}>
                                    Z {travel.from} do {travel.to}
                                </Text>
                                <Text style={styles.tripTextDate}>
                                    {travel.day}.{travel.month}.{travel.year} {travel.hourAndMinute}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </>
    );
}