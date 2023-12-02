import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  singleContractStack: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2.5,
    marginBottom: 25,
    alignContent: 'center',
    alignItems: 'center'
  },
  contractContentView: {
    flexDirection: 'row', 
    marginTop: 15
  },
  pinIcon: {
    marginRight: 35,
    marginTop: 10
  },
  fromToTextsView: {
    flexDirection: 'column'
  },
  kilometersText: {
    color: '#FFB700', 
    marginLeft: 15, 
    marginTop: 15
  },
  routeIsOnMapText: {
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 15,
    fontFamily: 'DejaVuSans',
    fontSize: 15
  },
  checkMapText: {
    alignSelf: 'center',
    fontFamily: 'DejaVuSans',
    fontSize: 13
  },
  paddingBottomView: {
    height: 75
  },
  contractButtons: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  contractRefuseButton: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 130,
    maxWidth: 130,
    backgroundColor: 'white',
    marginRight: 5
  },
  contractRefuseButtonText: {
    color: 'black', 
    fontFamily: 'DejaVuSans', 
    fontSize: 12
  },
  contractAcceptButton: {
    borderColor: '#FFB700',
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 130,
    maxWidth: 130,
    backgroundColor: 'white',
    marginLeft: 5
  },
  contractAcceptButtonText: {
    color: 'black', 
    fontFamily: 'DejaVuSans', 
    fontSize: 12
  },
  acceptedButtonView: {
    flexDirection:'column'
  },
  acceptedButton: {
    alignSelf:'center',
    marginTop: 15,
    marginBottom: 15,
    borderColor: '#FFB700',
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 150,
    maxWidth: 150,
    backgroundColor: 'white'
  },
  acceptedButtonText: {
    color: 'black', 
    fontFamily: 'DejaVuSans', 
    fontSize: 12
  },
  homeScrollView: {
    marginRight: windowWidth/14,
    marginLeft: windowWidth/14,
    flex: 1
  },
  myOrdersText: {
    fontFamily: 'DejaVuSans',
    fontSize: 32,
    alignSelf: 'center',
    paddingTop: 10,
    marginTop: 75,
    marginBottom: 30
  },
  map: {
    width: '100%',
    height: '40%',
  },
  mapSearchInput: {
    borderRadius: 20,
    margin: 50,
    borderColor: 'gray',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    flex: 1
  },
  searchInputComponentsView:{
    position: 'absolute', 
    top: 10, 
    width: '100%', 
    flex: 1
  },
  searchIcon: {
    marginTop: 5
  },
  bottomOptionsMainView: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%', 
    height: '65%',
    borderRadius: 50
  },
  fromInput: {
    borderColor:'white', 
    marginTop: '5%',
    marginLeft: '5%'
  },
  toInput: {
    borderColor:'white', 
    marginLeft: '5%'
  },
  fromInputView: {
    width: '100%', 
    left: '5%'
  },
  toInputView: {
    width: '100%', 
    left: '5%'
  },
  lineText: {
    marginLeft: '7.5%',
    marginBottom: -2,
    marginTop: -12
  },
  fromIcon: {
    marginTop: 5,
    marginRight: 10
  },
  toIcon: {
    marginTop: 5,
    marginRight: 10
  },
  orderTaxiButton: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    marginLeft: '10%',
    marginRight: '10%'
  },
  endRideButton: {
    borderRadius: 20,
    borderColor: '#FFB700',
    borderWidth: 1,
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
    color: 'black', 
    fontFamily: 'DejaVuSans', 
    fontSize: 12,
    textAlign: "center",
    backgroundColor: 'white'
  },
  buttonText: {
    fontFamily: 'DejaVuSans',
    fontSize: 20,
    color: 'black'
  },
  mainTaxiViewsView: {
    flexDirection: 'column',
    justifyContent:'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  taxiTypeView: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 13,
    minWidth: '37%',
    margin: '3%',
    marginBottom: '2%'
  },
  selectedTaxiTypeView: {
    borderRadius: 10,
    borderColor: '#FFB700',
    borderWidth: 1,
    padding: 13,
    minWidth: '37%',
    margin: '3%',
    marginBottom: '2%'
  },
  typeText: {
    alignSelf: 'center',
    marginBottom: '2%'
  },
  topTaxiTypeViews: {
    flexDirection: 'row'
  },
  bottomTaxiTypeViews: {
    flexDirection: 'row'
  },
  yourRouteIsPlacedText: {
    alignSelf: 'center',
    fontFamily: 'DejaVuSans', 
    fontSize: 13
  },
  weWillInformYouText: {
    marginLeft: '10%',
    fontFamily: 'DejaVuSans', 
    fontSize: 13,
    marginBottom: '5%'
  },
  driverIsOnRouteText: {
    marginLeft: '10%',
    fontFamily: 'DejaVuSans', 
    fontSize: 13,
    marginTop: '8%'
  }
});
export default styles;