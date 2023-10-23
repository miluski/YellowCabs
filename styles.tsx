import { StyleSheet } from 'react-native';
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
    alignSelf: 'center'
  },
  dataForm: {
  },
  phoneText: {
    fontFamily: 'DejaVuSans',
    fontSize: 18
  },
  inputFields: {
    borderRadius: 10,
  },
  passwordText: {
    paddingTop: 10,
    fontFamily: 'DejaVuSans',
    fontSize: 18
  },
  passwordHint: {
    paddingLeft: 100,
    paddingTop: 10
  },
  notRememberPasswordText: {
    color: '#707070',
    fontFamily: 'DejaVuSans',
    fontSize: 15
  },
  loginAs: {
    fontFamily: 'DejaVuSans',
    fontSize: 18,
    paddingTop: 20
  },
  buttons: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1
  },
  buttonText: {
    fontFamily: 'DejaVuSans',
    fontSize: 20,
    color: 'black'
  },
  errors: {
    fontFamily: 'DejaVuSans',
    fontSize: 15
  }
});
export default styles;