import {  StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: 'white'
  },
  yellowcabs: {
    paddingTop: 100,
    alignSelf: 'center',
    fontFamily: 'DejaVuSans',
    fontSize: 45
  },
  logo: {
    alignSelf: 'center',
    alignContent: 'center',
  },
  hintsView: {
    paddingTop: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  phoneText: {
    fontFamily: 'DejaVuSans',
    fontSize: 18
  },
  inputFields: {
    borderRadius: 10,
  },
  labelText: {
    paddingTop: 10,
    fontFamily: 'DejaVuSans',
    fontSize: 18
  },
  hint: {
    paddingLeft: 100,
    paddingTop: 10
  },
  linkButtonText: {
    color: '#707070',
    fontFamily: 'DejaVuSans',
    fontSize: 15
  },
  loginAs: {
    fontFamily: 'DejaVuSans',
    fontSize: 18,
    paddingTop: 20,
    alignSelf: 'flex-start'
  },
  buttons: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20
  },
  buttonText: {
    fontFamily: 'DejaVuSans',
    fontSize: 20,
    color: 'black'
  },
  errors: {
    fontFamily: 'DejaVuSans',
    fontSize: 15
  },
  recoverPassword: {
    alignSelf: 'center',
    fontFamily: 'DejaVuSans',
    fontSize: 18, 
    paddingBottom: 50
  },
  functionButton: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 75,
    width: 275,
    alignSelf: 'center'
  },
  registerButton: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 25,
    width: 275,
    alignSelf: 'center'
  },
  topCenterText: {
    fontFamily: 'DejaVuSans',
    fontSize: 32,
    alignSelf: 'center',
    paddingTop: 10,
    marginTop: 75,
    marginBottom: 30
  },
  invitationTexts: {
    fontFamily: 'DejaVuSans',
    fontSize: 16,
    alignSelf: 'center'
  },
  radioLabelText: {
    fontFamily: 'DejaVuSans',
    fontSize: 8,
    alignSelf: 'center',
    flexWrap: 'wrap',
    borderWidth: 0,
    maxWidth: windowWidth-75,
    marginTop: 25
  },
  registerScrollView: {
    flex: 1,
    centerContent: true
  },
  registrationHStack: {
    paddingBottom: 50,
    alignItems: 'baseline'
  },
  rulesAndTermsButton: {
    alignSelf: 'center',
    color: '#707070',
    fontFamily: 'DejaVuSans',
    fontSize: 12,
    marginLeft: -windowWidth/5
  },
  privacyPolicyButton: {
    alignSelf: 'center',
    color: '#707070',
    fontFamily: 'DejaVuSans',
    fontSize: 12
  },
  registerBottomHint: {
    marginTop: 10,
    fontFamily: 'DejaVuSans',
    fontSize: 13
  },
  circleIcon: {
    width: 10, 
    height: 10, 
    color: 'black',
    borderColor: 'black'
  },
  scrollView: {
    flex: 1,
    color: 'white'
  },
  contract: {
    borderRadius: 20,
    borderColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
export default styles;