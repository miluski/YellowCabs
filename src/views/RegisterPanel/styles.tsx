import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainPanelView: {
    flex: 1,
    centerContent: true
  },
  registerYourSelfText: {
    fontFamily: 'DejaVuSans',
    fontSize: 32,
    alignSelf: 'center',
    paddingTop: 10,
    marginTop: 75,
    marginBottom: 30
  },
  topTexts: {
    fontFamily: 'DejaVuSans',
    fontSize: 16,
    alignSelf: 'center'
  },
  dataInputView: {
    paddingTop: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  dataFormBox: {
    paddingHorizontal: 30
  },
  creatingNewAccountText: {
    marginTop: 10,
    fontFamily: 'DejaVuSans',
    fontSize: 13
  },
  driverPassengerSwitchButtonGroup: {
    paddingTop: 10,
    paddingBottom: 30
  },
  buttons: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20
  },
  buttonText: {
    fontFamily: 'DejaVuSans',
    fontSize: 20,
    color: 'black'
  },
  inputFields: {
    borderRadius: 10,
  },
  circleIcon: {
    width: 10, 
    height: 10, 
    color: 'black',
    borderColor: 'black'
  },
  policyPrivacyTermsAndConditionsStack: {
    paddingBottom: 50,
    alignItems: 'baseline'
  },
  policyPrivacyTermsAndConditionsButtons: {
    paddingLeft: 100,
    paddingTop: 10
  },
  andConnectorText: {
    marginRight: -100
  },
  rulesAndTermsButtonText: {
    alignSelf: 'center',
    color: '#707070',
    fontFamily: 'DejaVuSans',
    fontSize: 12,
    marginLeft: -windowWidth/5
  },
  privacyPolicyButtonText: {
    alignSelf: 'center',
    color: '#707070',
    fontFamily: 'DejaVuSans',
    fontSize: 12
  },
  formInputControlLabelText: {
    paddingTop: 10,
    fontFamily: 'DejaVuSans',
    fontSize: 18
  },
  formInputErrorLabelText: {
    fontFamily: 'DejaVuSans',
    fontSize: 15
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
  agreementText: {
    fontFamily: 'DejaVuSans',
    fontSize: 8,
    alignSelf: 'center',
    flexWrap: 'wrap',
    borderWidth: 0,
    maxWidth: windowWidth-75,
    marginTop: 25
  },
  termsAndPrivacyHeaderFirst: {
    alignSelf: 'center',
    fontFamily: 'DejaVuSans',
    fontSize: 25,
    paddingTop: 5,
    paddingBottom: 10,
  },
  termsAndPrivacyHeader: {
    alignSelf: 'center',
    fontFamily: 'DejaVuSans',
    fontSize: 25,
    paddingTop: 30,
    paddingBottom: 10,
  },
  termsAndPrivacyHeaderLine: {
    alignSelf: 'center',
    fontFamily: 'DejaVuSans',
    fontSize: 25,
    paddingTop: 4,
    paddingBottom: 10,
  },
  termsAndPrivacyText: {
    fontFamily: 'DejaVuSans',
    fontSize: 15,
    marginLeft: 15,
  },
  termsAndPrivacyBackButtons: {
    marginBottom: 25,
    width: 300,
    alignSelf: 'center',
    borderColor: '#FFB700',
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#FFB700',
    marginTop: 25
  },
  termsAndPrivacyBackButtonsText: {
    color: 'black', 
    fontFamily: 'DejaVuSans', 
    fontSize: 22,
    textAlign: 'center'
  },
  headerTerms:{
    fontFamily: 'DejaVuSans',
    fontSize: 28,
    alignItems: 'center',
    paddingTop: 5,
  },
  termsAppView:{
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textSmallTerms:{
    fontFamily: 'DejaVuSans',
    fontSize: 15,
  },
  termsAppScrollView:{
    marginRight: windowWidth/20,
    marginLeft: windowWidth/20,
    flex: 1
  }
});
export default styles;