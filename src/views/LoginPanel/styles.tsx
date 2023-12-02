import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  panelMainView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: 'white'
  },
  yellowCabsText: {
    paddingTop: 100,
    alignSelf: 'center',
    fontFamily: 'DejaVuSans',
    fontSize: 45
  },
  loginPanelLogo: {
    alignSelf: 'center',
    alignContent: 'center',
  },
  dataInputView: {
    paddingTop: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  inputFields: {
    borderRadius: 10,
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
  notRememberPasswordButton: {
    paddingLeft: 100,
    paddingTop: 10
  },
  notRememberPasswordButtonText: {
    color: '#707070',
    fontFamily: 'DejaVuSans',
    fontSize: 15
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
  recoverPasswordText: {
    alignSelf: 'center',
    fontFamily: 'DejaVuSans',
    fontSize: 18, 
    paddingBottom: 50
  },
  recoverPasswordButton: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 75,
    width: 275,
    alignSelf: 'center'
  }
});
export default styles;