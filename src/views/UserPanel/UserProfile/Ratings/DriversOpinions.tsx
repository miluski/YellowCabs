import styles from "./styles";
import { View, Image, Text } from "@gluestack-ui/themed";
import { AirbnbRating } from "react-native-ratings";
import React from "react";

const DriverOpinions = () => {
  //const ratingCompleted = (rating) => {
  //console.log("Rating = " + rating)
  //}

  const driversRatings = [
    { name: "Michał", surname: "Kowalski", oppinion: "Dobry kierowca", rating: 3 },
    { name: "Jan", surname: "Jan", oppinion: "Dobry kierowca", rating: 5 },
    { name: "Jan", surname: "Jan", oppinion: "Dobry kierowca", rating: 5 },
    { name: "Jan", surname: "Jan", oppinion: "Dobry kierowca", rating: 5 },
  ];

  return (
    <>
      <View style={styles.ratingHeader}>
        <Text style={styles.ratingHeader}>Moje Oceny</Text>
      </View>
      <View style={styles.allRatingContainer}>
      {driversRatings.map((driver, index) => (
        <View>
          <View style={styles.singleRatingContainerViewOnly}>
            <View style={styles.allInfoRating}>
              <View>
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/5835419/pexels-photo-5835419.jpeg",
                  }}
                  style={styles.imageAvatar}
                  alt="Zdjecie pasazera"
                />
              </View>
              <View>
                <View>
                  <Text style={{ fontSize: 20, marginLeft: 10 }} key={index}>
                    {driver.name} {driver.surname}
                  </Text>
                </View>

                <View style={styles.starsRating} key={index}>
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
      </View>
    </>
  );
};
export default DriverOpinions;