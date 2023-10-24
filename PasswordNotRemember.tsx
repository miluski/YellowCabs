import * as Font from 'expo-font';
import firebaseConfig from "./firebaseConfig";
import styles from "./styles";
import { config } from "@gluestack-ui/config";
import React, { useState } from "react";
import { get, getDatabase, orderByChild, query, ref } from "firebase/database";
import { View, Vibration, Alert } from "react-native";
import { GluestackUIProvider, Text, Input } from "@gluestack-ui/themed";
import { Box, FormControl, FormControlError, FormControlErrorText } from "@gluestack-ui/themed";
import { Button, FormControlLabel, FormControlLabelText, InputField, ButtonText } from "@gluestack-ui/themed";
function PasswordNotRemember({
  navigation
}: {
  navigation: any;
}) {
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
  if (!isLoaded) {
    return null;
  } else {
    return <GluestackUIProvider config={config}>
        <View style={styles.background}>
        <Text style={styles.recoverPassword}>Przywracanie hasła</Text>
          <View style={styles.hintsView}>
            <Box>
              <DataForm />
            </Box>
          </View>
        </View>
    </GluestackUIProvider>;
  }
}
const DataForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secretPassword, setSecretPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidRepeatedPassword, setIsInvalidRepeatedPassword] = useState(false);
  const [isInvalidSecretPassword, setIsInvalidSecretPassword] = useState(false);
  return <Box>
    <PhoneInput phoneNumber={phoneNumber} isInvalid={isInvalidPhone} setPhoneNumber={setPhoneNumber} />
    <SecretPasswordInput secretPassword={secretPassword} isInvalid={isInvalidSecretPassword} setSecretPassword={setSecretPassword} />
    <PasswordInput password={password} hintText={"Nowe Hasło"} isInvalid={isInvalidPassword} setPassword={setPassword} />
    <PasswordInput password={repeatedPassword} hintText={"Powtórz nowe Hasło"} isInvalid={isInvalidRepeatedPassword} setPassword={setRepeatedPassword} />
    <RecoverPasswordButton onPress={()=>{
      var isValidPhone = validatePhone(phoneNumber);
      var isValidPassword = validatePassword(password);
      var isValidRepeatedPassword = validateRepeatedPassword(password, repeatedPassword) && validatePassword(repeatedPassword);
      var isValidSecretPassword = validateSecretPassword(secretPassword);
      setIsInvalidPhone(!isValidPhone);
      setIsInvalidPassword(!isValidPassword);
      setIsInvalidRepeatedPassword(!isValidRepeatedPassword);
      setIsInvalidSecretPassword(!isValidSecretPassword);
      if(isValidPhone && isValidPassword && isValidRepeatedPassword && isValidSecretPassword){
          Vibration.vibrate(500);
    }}}
     />
  </Box>;
};
const PhoneInput = (props: {
  phoneNumber: string | undefined;
  isInvalid: boolean | undefined;
  setPhoneNumber: (arg0: string) => void;
}) => {
  return <FormControl size="lg" isDisabled={false} isInvalid={props.isInvalid} isReadOnly={false} isRequired={false}>
    <PhoneLabel />
    <Input style={styles.inputFields}>
      <InputField type="text" value={props.phoneNumber} placeholder="123123123" onChangeText={actualPhoneNumber => {
        props.setPhoneNumber(actualPhoneNumber);
      }} selectionColor={"black"} keyboardType="numeric" />
    </Input>
    <PhoneBadInput />
  </FormControl>;
};
const PhoneLabel = () => {
  return <FormControlLabel mb="$1">
    <FormControlLabelText style={styles.phoneText}>
      Numer telefonu
    </FormControlLabelText>
  </FormControlLabel>;
};
const PhoneBadInput = () => {
  return <FormControlError>
    <FormControlErrorText style={styles.errors}>
      Telefon musi mieć 9 cyfr!
    </FormControlErrorText>
  </FormControlError>;
};
const SecretPasswordInput = (props: {
  secretPassword: string | undefined;
  isInvalid: boolean | undefined;
  setSecretPassword: (arg0: string) => void;
}) => {
  return (
    <FormControl
      size="lg"
      isDisabled={false}
      isInvalid={props.isInvalid}
      isReadOnly={false}
      isRequired={false}
    >
      <SecretPasswordLabel/>
      <Input style={styles.inputFields}>
        <InputField
          type="text"
          placeholder="Tutaj wpisz sekretne hasło"
          value={props.secretPassword}
          onChangeText={(actualSecretPassword) => {
            props.setSecretPassword(actualSecretPassword);
          }}
          selectionColor={"black"}
        />
      </Input>
      <SecretPasswordBadInput />
    </FormControl>
  );
};
const SecretPasswordLabel = () => {
  return (
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.passwordText}>
        Sekretne Hasło
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const SecretPasswordBadInput = () => {
  return (
    <FormControlError>
      <FormControlErrorText style={styles.errors}>
        Hasło musi mieć 8 znaków!
      </FormControlErrorText>
    </FormControlError>
  );
};
const PasswordInput = (props: {
  password: string | undefined;
  isInvalid: boolean | undefined;
  hintText: string;
  setPassword: (arg0: string) => void;
}) => {
  return (
    <FormControl
      size="lg"
      isDisabled={false}
      isInvalid={props.isInvalid}
      isReadOnly={false}
      isRequired={false}
    >
      <PasswordLabel hintText={props.hintText}/>
      <Input style={styles.inputFields}>
        <InputField
          type="password"
          placeholder="********"
          value={props.password}
          onChangeText={(actualPassword) => {
            props.setPassword(actualPassword);
          }}
          selectionColor={"black"}
        />
      </Input>
      <PasswordBadInput />
    </FormControl>
  );
};
const PasswordLabel = (props: {hintText: string}) => {
  return (
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.passwordText}>
        <Text>{props.hintText}</Text>
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const PasswordBadInput = () => {
  return (
    <FormControlError>
      <FormControlErrorText style={styles.errors}>
        Wprowadzone hasła różnią się!
      </FormControlErrorText>
    </FormControlError>
  );
};
const RecoverPasswordButton = (props: any) => {
  return (
    <Button bgColor="#FFB700" style={styles.recoverPasswordButton} onPress={props.onPress}>
      <ButtonText style={styles.buttonText}>Przywróć hasło</ButtonText>
    </Button>
  );
};
function validatePhone(phone: string) {
  return phone.length==9;
}
function validatePassword(password: string) {
  return password.length>=8;
}
function validateRepeatedPassword(password: string, repeatedPassword: string) {
  console.log(repeatedPassword===password);
  return repeatedPassword===password;
}
function validateSecretPassword(secretPassword: string) {
  //todo: get z bazy
  return true;
}
function ShowAlert(title: string, message: string) {
  Vibration.vibrate(500);
  Alert.alert(title, message, [
    {
      text: "Ok",
      style: "cancel",
    },
  ]);
}
export default PasswordNotRemember;