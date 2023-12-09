import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  ratingScrollView:{
    flex: 1
  },
  ratingHeader:{
    fontSize: 40,
    alignItems: "center",
    marginTop: 30,
  },
  singleRatingContainer:{
    width: 320,
    height: 210,
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
  },
  singleRatingContainerViewOnly:{
      width: 320,
      height: 200,
      borderWidth: 2,
      borderRadius: 20,
      marginTop: 10,
  },
  allInfoRating:{
    padding: 10,
    flexDirection: "row",
  },
  imageAvatar:{
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  nameRatings:{
    fontSize: 17,
    marginLeft: 10,
  },
  starsRating:{
    marginLeft: 10,
    flex:1,
    flexDirection: 'row',
  },
  yourOppinion:{
    fontSize: 13,
    marginLeft: 20,
  },
  ratingTextInput:{
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
  },
  buttonsRatingContainer:{
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },  
  skipButton:{
    width: 120,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  rateButton:{
    width: 120,
    borderRadius: 20,
    borderColor: "#FFB700",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default styles;