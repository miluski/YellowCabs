import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    scrollHistory:{
        alignItems: "center"
      },
      viewMonth:{
        alignItems: "center"
      },
      travelTitle:{
        alignSelf:'center', 
        marginBottom: 10,
        fontSize: 28,
      },
      travelTitleFirst:{
        alignSelf:'center', 
        marginTop: 30,
        fontSize: 28,
      },
      singleTrip:{
        marginTop: 10,
        width: 300,
        height: 70,
        borderRadius: 25,
        borderColor: "#FFB700",
        borderWidth: 2,
        flexDirection: 'row'
      },
      travelPin:{
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#FFB700",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
        marginLeft: 8,
      },
      tripTextMonth:{
        alignSelf:'center', 
        marginTop: 14,
        fontSize: 22,
      },
      tripTextDest:{
        marginLeft: 12,
        marginTop: 14,
        fontSize: 13,
      },
      tripTextDate:{
        marginLeft: 12,
        fontSize: 13,
      }
});
export default styles;