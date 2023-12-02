import * as Font from "expo-font";
import styles from "./styles";
import React, { useState } from "react";
import { config } from "@gluestack-ui/config";
import { View, Vibration, Alert } from "react-native";
import { GluestackUIProvider, Image, Text, Input } from "@gluestack-ui/themed";
import { Box, FormControl, FormControlError, FormControlErrorText } from "@gluestack-ui/themed";
import { Button, FormControlLabel, FormControlLabelText, InputField, ButtonText } from "@gluestack-ui/themed";
export default function LoginPanel({
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
        <Background navigation={navigation} />
      </GluestackUIProvider>
    );
  }
}
const Background = (props: {
  navigation: any;
}) => {
  return( 
    <View style={styles.panelMainView}>
      <Logo />
      <Text style={styles.yellowCabsText}>YellowCabs</Text>
      <MainView navigation={props.navigation} />
    </View>
  );
};
const Logo = () => {
  return( 
    <Image 
      size="xl" 
      source={{ 
        uri: "https://i.ibb.co/hLT13mG/Zrzut-ekranu-2023-10-19-234035.png"
      }}
      style={styles.loginPanelLogo} alt="Logo" 
    />
  );
};
const MainView = (props: {
  navigation: any;
}) => {
  return ( 
    <View style={styles.dataInputView}>
      <DataForm navigation={props.navigation} />
    </View>
  );
};
const DataForm = (props: {
  navigation: any;
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("Hasło musi mieć 8 znaków!");
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  return( 
    <Box>
      <PhoneInput 
        phoneNumber={phoneNumber} 
        isInvalid={isInvalidPhone} 
        setPhoneNumber={setPhoneNumber} 
      />
      <PasswordInput 
        password={password} 
        isInvalid={isInvalidPassword} 
        errorText={errorText} 
        setPassword={setPassword} 
      />
      <NotRememberPasswordHint navigation={props.navigation} />
      <LoginYourSelfButton 
        onPress={
          async () => {
            const providedData = {
              phone: phoneNumber,
              password: password,
              navigation: props.navigation
            };
            var isValidPhone = validatePhone(phoneNumber);
            var isValidPassword = validatePassword(password);
            var isPasswordSecure = validateSecureOfPassword(password);
            if (!isValidPassword) setErrorText("Hasło musi mieć 8 znaków!");
            else if (!isPasswordSecure) setErrorText("Hasło musi mieć 1 znak specjalny\ncyfrę i dużą literę!");
            setIsInvalidPhone(!isValidPhone);
            setIsInvalidPassword(!isValidPassword || !isPasswordSecure);
            if (isValidPhone && isValidPassword && isPasswordSecure) await HandleLoginButtonPress(providedData, props.navigation, setPhoneNumber, setPassword);
          }
        } 
      />
      <RegisterYourSelfButton navigation={props.navigation}/>
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
      <Label hintText="Telefon" />
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
      <BadInput errorText="Telefon musi mieć 9 cyfr!" />
    </FormControl>
  );
};
const PasswordInput = (props: {
  password: string | undefined;
  errorText: string | undefined;
  isInvalid: boolean | undefined;
  setPassword: (arg0: string) => void;
}) => {
  return(
    <FormControl 
      size="lg" 
      isDisabled={false} 
      isInvalid={props.isInvalid} 
      isReadOnly={false} 
      isRequired={false}
    >
      <Label hintText="Hasło" />
      <Input style={styles.inputFields}>
        <InputField 
          type="password"
          placeholder="********"
          value={props.password}
          onChangeText={actualPassword => {
            props.setPassword(actualPassword);
          }} 
          selectionColor={"black"}
        />
      </Input>
      <BadInput errorText={props.errorText} />
    </FormControl>
  );
};
const Label = (props: {hintText: string | undefined; }) => {
  return ( 
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.formInputControlLabelText}>
        {props.hintText}
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const BadInput = (props: {
  errorText: string | undefined;
}) => {
  return( 
    <FormControlError>
      <FormControlErrorText style={styles.formInputErrorLabelText}>
        {props.errorText}
      </FormControlErrorText>
    </FormControlError>
  );
};
const NotRememberPasswordHint = (props: {
  navigation: any;
}) => {
  return (
     <Button
      action={"secondary"}
      variant={"link"}
      size={"xs"} 
      isDisabled={false} 
      style={styles.notRememberPasswordButton} 
      onPress={() => {
        props.navigation.navigate('PasswordNotRemember');
      }}
    >
      <ButtonText style={styles.notRememberPasswordButtonText}>
        Nie pamiętasz hasła?
      </ButtonText>
    </Button>
  );
};
const LoginYourSelfButton = (props: any) => {
  return(
    <Button
      bgColor="#FFB700"
      style={styles.buttons} 
      onPress={props.onPress}
    >
      <ButtonText style={styles.buttonText}>Zaloguj</ButtonText>
    </Button>
  );
};
const RegisterYourSelfButton = (props: {
  navigation: any;
}) => {
  return( 
    <Button 
      bgColor="#FFB700" 
      style={styles.buttons} 
      onPress={() => {
        props.navigation.navigate('RegisterPanel')
      }}
    >
      <ButtonText style={styles.buttonText}>Zarejestruj się</ButtonText>
    </Button>
  );
}
function validatePhone(phone: string) {
  var phonePattern = /^[0-9]{9}$/;
  return phone.length == 9 && phonePattern.test(phone);
}
function validatePassword(password: string) {
  return password.length >= 8;
}
function validateSecureOfPassword(password: string) {
  var passPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passPattern.test(password);
}
async function HandleLoginButtonPress(
  providedData: any, 
  navigation: any, 
  setPhoneNumber: any, 
  setPassword: any
) {
  const firebaseDatabaseURL = 'https://yellowcabs-default-rtdb.europe-west1.firebasedatabase.app';
  const databasePath = '/users.json';
  const apiKey = 'AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ';
  const getRequestURL = `${firebaseDatabaseURL}${databasePath}?key=${apiKey}`;
  fetch(getRequestURL).then(response => {
    return response.json();
  }).then(async data => {
    await HandleRetrievedData(data, providedData, navigation, setPhoneNumber, setPassword);
  }).catch(error => {
    console.log(error);
  });
}
async function HandleRetrievedData(
  data: any, 
  providedData: any, 
  navigation: any, 
  setPhoneNumber: any, 
  setPassword: any
) {
  const parsedPhone = parseInt(providedData.phone);
  for (const userKey in data) {
    const user = data[userKey];
    if (IsUserFounded(user.phone, parsedPhone)) {
      if (checkPassword(user.password, providedData.password)) { 
        setPhoneNumber('');
        setPassword('');
        navigation.navigate("MainPanel", {
          rank: user.role,
          name: user.name,
          surname: user.surname,
          phoneNumber: String(user.phone),
          avatarLink: user.avatarLink
      });
    }
      else ShowAlert("Błąd", "Wprowadzono nieprawidłowe dane!");
    }
  }
}
function IsUserFounded(phone: number, providedPhone: number) {
  return phone === providedPhone;
}
function checkPassword(password: string, providedPassword: string) {
  return password === providedPassword;
}
function ShowAlert(title: string, message: string) {
  Vibration.vibrate(500);
  Alert.alert(title, message, [{
    text: "Ok",
    style: "cancel"
  }]);
}