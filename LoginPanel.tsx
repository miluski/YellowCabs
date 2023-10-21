import { AlertIcon, AlertText, InfoIcon } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { View, StyleSheet, Alert} from 'react-native';
import { GluestackUIProvider, ButtonGroup, Image, Text, Input, AlertCircleIcon, Box, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, Button, FormControlLabel, FormControlLabelText, InputField, ButtonText } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import * as Font from 'expo-font';
function LoginPanel() {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadCustomFont = async () => {
    await Font.loadAsync({
      'DejaVuSans-Bold': require('./assets/fonts/DejaVuSans-Bold.ttf'),
      'DejaVuSans': require('./assets/fonts/DejaVuSans.ttf'),
      'DejaVuSans-ExtraLight': require('./assets/fonts/DejaVuSans-ExtraLight.ttf')
    });
  };
  loadCustomFont().then(() => {
    setIsLoaded(true);
  });
  if (isLoaded) {
    return <GluestackUIProvider config={config}>
      <Background />
    </GluestackUIProvider>;
  }
}
const Background = () => {
  return <View style={styles.background}>
    <Logo />
    <Text style={styles.yellowcabs}>YellowCabs</Text>
    <Hints />
  </View>;
};
const Logo = () => {
  return <Image size="xl" source={{
    uri: "https://i.ibb.co/hLT13mG/Zrzut-ekranu-2023-10-19-234035.png"
  }} style={styles.logo} alt="Logo" />;
};
const Hints = () => {
  return <View style={styles.hintsView}>
    <DataForm />
  </View>;
};
const DataForm = () => {
  return <Box style={styles.dataForm}>
    <FormControl size="lg" isDisabled={false} isInvalid={false} isReadOnly={false} isRequired={false}>
      <FormControlLabel mb="$1">
        <FormControlLabelText style={styles.phoneText}>Telefon</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField type="text" placeholder="+48 123 123 123" style={styles.inputFields} selectionColor={'black'} />
      </Input>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          Numer telefonu składać się z conajmniej 6 cyfr!
        </FormControlErrorText>
      </FormControlError>
      <FormControlLabel mb="$1">
        <FormControlLabelText style={styles.passwordText}>Hasło</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputField type="password" placeholder="********" style={styles.inputFields} selectionColor={'black'} />
      </Input>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          Hasło musi składać się z conajmniej 8 znaków!
        </FormControlErrorText>
      </FormControlError>
      <NotRememberPasswordHint />
      <LoginAsText />
      <SwitchableButtons />
      <LoginYourSelfButton />
    </FormControl>
  </Box>;
};
const NotRememberPasswordHint = () => {
  return <Button action={"secondary"} variant={"link"} size={"xs"} isDisabled={false} style={styles.passwordHint} onPress={() =>{
    Alert.alert('', 'Not implemented yet!', [
      {text: 'OK'},
    ]);
  }}>
    <ButtonText style={styles.notRememberPasswordText}>
      Nie pamiętasz hasła?
    </ButtonText>
  </Button>;
};
const LoginAsText = () => {
  return <Text style={styles.loginAs}>
    Zaloguj się jako
  </Text>;
};
const SwitchableButtons = () => {
  const [driverButtonColor, setDriverButtonColor] = useState('#FFB700');
  const [passengerButtonColor, setPassengerButtonColor] = useState('white');
  return <ButtonGroup style={{
    paddingTop: 10,
    paddingBottom: 30
  }}>
    <Button bgColor={driverButtonColor} style={styles.buttons} onPress={() => {
      setDriverButtonColor('#FFB700');
      setPassengerButtonColor('white');
    }}>
      <ButtonText style={styles.buttonText}>Kierowca</ButtonText>
    </Button>
    <Button bgColor={passengerButtonColor} style={styles.buttons} onPress={() => {
      setDriverButtonColor('white');
      setPassengerButtonColor('#FFB700');
    }}>
      <ButtonText style={styles.buttonText}>Pasażer</ButtonText>
    </Button>
  </ButtonGroup>;
};
const LoginYourSelfButton = () => {
  return <Button bgColor='#FFB700' style={styles.buttons} onPress={()=>{Alert.alert('', 'Not implemented yet!', [
    {text: 'OK'},
  ]);}}>
    <ButtonText style={styles.buttonText}>Zaloguj</ButtonText>
  </Button>;
};
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
    alignSelf: 'center'
  },
  hintsView: {
    paddingTop: 20,
    paddingLeft: 30
  },
  dataForm: {
    paddingLeft: 20
  },
  phoneText: {
    fontFamily: 'DejaVuSans',
    fontSize: 18
  },
  inputFields: {
    borderRadius: 10
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
  }
});
export default LoginPanel;