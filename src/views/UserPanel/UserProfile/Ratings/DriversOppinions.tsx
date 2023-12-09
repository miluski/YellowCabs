import { Text } from 'react-native';
import styles from "./styles"
import { View, ScrollView, Image, Button, ButtonText } from "@gluestack-ui/themed";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput } from 'react-native';
import React from "react";

const DriverOppinions = () => {
  //const ratingCompleted = (rating) => {
    //console.log("Rating = " + rating)
  //}

  const driversRatings = [
    { name: 'Michał', surname: 'Kowalski', oppinion:'Dobry kierowca', rating:3 },
    { name: 'Jan', surname: 'Jan', oppinion:'Dobry kierowca', rating:5 },
  ];

  return (
    <>
        <View style={styles.ratingHeader}>
          <Text style={styles.ratingHeader}>Moje Oceny</Text>
        </View>
    {driversRatings.map((driver) => (
        <View>
        
        <View style={styles.singleRatingContainerViewOnly}>
          <View style={styles.allInfoRating}>
            <View>
              <Image source={{ uri: 'https://images.pexels.com/photos/5835419/pexels-photo-5835419.jpeg' }} style={styles.imageAvatar}/>
            </View>
          <View>
            <View>  
              <Text style={{ fontSize: 20, marginLeft: 10 }}>
                  {driver.name} {driver.surname}
              </Text>
            </View>

            <View style={styles.starsRating}>
              <AirbnbRating
                showRating={false}
                size={30}
                isDisabled={true}
                defaultRating={driver.rating}
              />
            </View>
          </View>
          </View>

          <View>
            <Text style={styles.yourOppinion}>Opinia:</Text>
            <Text style={styles.yourOppinion}>{driver.oppinion}</Text>
          </View>

        </View>
        </View>
        ))}
    </>
  );

};

export default DriverOppinions;