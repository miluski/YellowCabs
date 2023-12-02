import * as Font from 'expo-font';
import styles from "./styles";
import React, { useState } from "react";
import { config } from "@gluestack-ui/config";
import { View, Vibration, Alert } from "react-native";
import { GluestackUIProvider, Text, Input } from "@gluestack-ui/themed";
import { Box, FormControl, FormControlError, FormControlErrorText } from "@gluestack-ui/themed";
import { Button, FormControlLabel, FormControlLabelText, InputField, ButtonText } from "@gluestack-ui/themed";
export default function PasswordNotRemember({
  navigation
}: {
  navigation: any;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const loadCustomFont = async () => {
    await Font.loadAsync({
      'DejaVuSans-Bold': require('../../assets/fonts/DejaVuSans-Bold.ttf'),
      'DejaVuSans': require('../../assets/fonts/DejaVuSans.ttf'),
      'DejaVuSans-ExtraLight': require('../../assets/fonts/DejaVuSans-ExtraLight.ttf')
    });
  };
  loadCustomFont().then(() => {
    setIsLoaded(true);
  });
  if (!isLoaded) {
    return null;
  } else {
    return( 
      <GluestackUIProvider config={config}>
        <View style={styles.panelMainView}>
          <Text style={styles.recoverPasswordText}>Przywracanie hasła</Text>
            <View style={styles.dataInputView}>
              <Box>
                <DataForm navigation={navigation}/>
              </Box>
            </View>
        </View>
      </GluestackUIProvider>
    );
  }
}
const DataForm = (props: {navigation: any}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secretPassword, setSecretPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidRepeatedPassword, setIsInvalidRepeatedPassword] = useState(false);
  const [isInvalidSecretPassword, setIsInvalidSecretPassword] = useState(false);
  return( 
    <Box>
      <PhoneInput 
        phoneNumber={phoneNumber} 
        isInvalid={isInvalidPhone} 
        setPhoneNumber={setPhoneNumber} 
      />
      <SecretPasswordInput 
        secretPassword={secretPassword} 
        isInvalid={isInvalidSecretPassword} 
        setSecretPassword={setSecretPassword} 
      />
      <PasswordInput 
        password={password} 
        hintText={"Nowe Hasło"} 
        isInvalid={isInvalidPassword} 
        setPassword={setPassword} 
      />
      <PasswordInput 
        password={repeatedPassword} 
        hintText={"Powtórz nowe Hasło"} 
        isInvalid={isInvalidRepeatedPassword} 
        setPassword={setRepeatedPassword} 
      />
      <RecoverPasswordButton 
        onPress={async ()=>{
          const isValidPhone = await validatePhone(phoneNumber);
          const isValidSecretPassword = await validateSecretPassword(secretPassword, phoneNumber);
          const isValidPassword = validatePassword(password);
          const isValidRepeatedPassword = validateRepeatedPassword(password, repeatedPassword) && validatePassword(repeatedPassword);
          setIsInvalidPhone(!isValidPhone);
          setIsInvalidPassword(!isValidPassword);
          setIsInvalidRepeatedPassword(!isValidRepeatedPassword);
          setIsInvalidSecretPassword(!isValidSecretPassword);
          if(isValidPhone && isValidSecretPassword && isValidPassword && isValidRepeatedPassword)
            await HandlePasswordRecovery(parseInt(phoneNumber), password, props.navigation);
        }}
      />
    </Box>
  );
};
const PhoneInput = (props: {
  phoneNumber: string | undefined;
  isInvalid: boolean | undefined;
  setPhoneNumber: (arg0: string) => void;
}) => {
  return( 
    <FormControl 
      size="lg" 
      isDisabled={false} 
      isInvalid={props.isInvalid} 
      isReadOnly={false} 
      isRequired={false}
    >
      <PhoneLabel/>
      <Input style={styles.inputFields}>
        <InputField 
          type="text" 
          value={props.phoneNumber} 
          placeholder="123123123" 
          onChangeText={actualPhoneNumber => {
            props.setPhoneNumber(actualPhoneNumber);
          }} 
          selectionColor={"black"} 
          keyboardType="numeric" 
        />
      </Input>
      <PhoneBadInput/>
    </FormControl>
  );
};
const PhoneLabel = () => {
  return( 
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.formInputControlLabelText}>
        Numer telefonu
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const PhoneBadInput = () => {
  return( 
    <FormControlError>
      <FormControlErrorText style={styles.formInputErrorLabelText}>
        Wprowadzony telefon jest nieprawidłowy!
      </FormControlErrorText>
    </FormControlError>
  );
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
      <FormControlLabelText style={styles.formInputControlLabelText}>
        Sekretne Hasło
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const SecretPasswordBadInput = () => {
  return (
    <FormControlError>
      <FormControlErrorText style={styles.formInputErrorLabelText}>
        Wprowadzony sekret jest nieprawidłowy!
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
      <PasswordBadInput/>
    </FormControl>
  );
};
const PasswordLabel = (props: {hintText: string}) => {
  return (
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.formInputControlLabelText}>
        <Text>{props.hintText}</Text>
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const PasswordBadInput = () => {
  return (
    <FormControlError>
      <FormControlErrorText style={styles.formInputErrorLabelText}>
        Wprowadzone hasło jest nieprawidłowe!
      </FormControlErrorText>
    </FormControlError>
  );
};
const RecoverPasswordButton = (props: any) => {
  return (
    <Button 
      bgColor="#FFB700" 
      style={styles.recoverPasswordButton} 
      onPress={props.onPress}
    >
      <ButtonText style={styles.buttonText}>Przywróć hasło</ButtonText>
    </Button>
  );
};
async function validatePhone(phone: string) {
  try {
    let dataArray: string[] = [phone, ""];
    const result = await getDataFromDatabase('phone', dataArray);
    return phone.length == 9 && result;
  } catch (error) {
    console.error(error);
    return false;
  }
}
async function validateSecretPassword(secretPassword: string, phone: string) {
  try {
    let dataArray: string[] = [secretPassword, phone];
    const result = await getDataFromDatabase('secretPassword', dataArray);
    return secretPassword.length == 8 && result;
  } catch (error) {
    console.error(error);
    return false;
  }
}
function validatePassword(password: string) {
  var passPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return password.length>=8 && passPattern.test(password);
}
function validateRepeatedPassword(password: string, repeatedPassword: string) {
  return repeatedPassword===password;
}
async function getDataFromDatabase(dataType: any, providedData: any[]) {
  const firebaseDatabaseURL = 'https://yellowcabs-default-rtdb.europe-west1.firebasedatabase.app';
  const databasePath = '/users.json'; 
  const apiKey = 'AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ';
  const getRequestURL = `${firebaseDatabaseURL}${databasePath}?key=${apiKey}`;
  try {
    const response = await fetch(getRequestURL);
    const data = await response.json();
    return HandleRetrievedData(data, providedData, dataType);
  } catch (error) {
    console.error(error);
    return false;
  }
}
function HandleRetrievedData(data: any, providedData: any[], dataType: string) : any {
  let isValid = false;
  for(const userKey in data) {
    const user = data[userKey];
    switch(dataType) {
      case 'phone':
        isValid = parseInt(providedData[0]) == user.phone;
        if(isValid)
          return isValid;
      break;
      case 'secretPassword':
        isValid = providedData[0] == user.secretPassword && parseInt(providedData[1]) == user.phone;
        if(isValid)
          return isValid;
      break;
      case 'userKey':
        isValid = parseInt(providedData[0]) == user.phone;
        if(isValid)
          return userKey;
      break;
    }
  }
  return isValid;
}
async function HandlePasswordRecovery(phone: number, newPassword: string, navigation: any) {
  const firebaseDatabaseURL = 'https://yellowcabs-default-rtdb.europe-west1.firebasedatabase.app';
  const databasePath = '/users.json'; 
  const apiKey = 'AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ';
  const requestURL = `${firebaseDatabaseURL}${databasePath}?key=${apiKey}`;
  const generatedSecret = getSecret(8);
  let dataArray: number[] = [phone, 0];
  try {
    const response = await fetch(requestURL);
    const data = await response.json();
    const userKey = HandleRetrievedData(data, dataArray, 'userKey');
    data[userKey].password = newPassword;
    data[userKey].secretPassword = generatedSecret;
    const putResponse = await fetch(requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });
    if (putResponse.ok) {
      ShowAlert("Sukces", "Pomyślnie odzyskano hasło!\nTwój nowy sekret to: " + generatedSecret +"\nZapisz go w bezpiecznym miejscu!");
      navigation.navigate('LoginPanel');
    }
    else
      ShowAlert("Błąd", "Wystąpił nieoczekiwany błąd!");
  } catch (error) {
    console.error(error);
    return false;
  }
}
function getSecret(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) 
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
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