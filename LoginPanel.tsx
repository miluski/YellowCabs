import * as Font from "expo-font";
import firebaseConfig from "./firebaseConfig";
import styles from "./styles";
import { config } from "@gluestack-ui/config";
import React, { useState } from "react";
import { get, getDatabase, orderByChild, query, ref } from "firebase/database";
import { View, Vibration, Alert } from "react-native";
import { GluestackUIProvider, ButtonGroup, Image, Text, Input} from "@gluestack-ui/themed";
import { Box, FormControl, FormControlError, FormControlErrorText} from "@gluestack-ui/themed";
import { Button, FormControlLabel, FormControlLabelText, InputField, ButtonText} from "@gluestack-ui/themed";
function LoginPanel({ navigation } : { navigation: any }) {
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
  }
  else{ 
    return <GluestackUIProvider config={config}>
        <Background navigation={navigation} />
    </GluestackUIProvider>;
  }
}
const Background = (props: { navigation: any }) => {
  return (
    <View style={styles.background}>
      <Logo />
      <Text style={styles.yellowcabs}>YellowCabs</Text>
      <MainView navigation={props.navigation} />
    </View>
  );
};
const Logo = () => {
  return (
    <Image
      size="xl"
      source={{
        uri: "https://i.ibb.co/hLT13mG/Zrzut-ekranu-2023-10-19-234035.png",
      }}
      style={styles.logo}
      alt="Logo"
    />
  );
};
const MainView = (props: { navigation: any }) => {
  return (
    <View style={styles.hintsView}>
      <DataForm navigation={props.navigation} />
    </View>
  );
};
const DataForm = (props: { navigation: any }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rank, setRank] = useState("driver");
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  return (
    <Box>
      <PhoneInput
        phoneNumber={phoneNumber}
        isInvalid={isInvalidPhone}
        setPhoneNumber={setPhoneNumber}
      />
      <PasswordInput
        password={password}
        isInvalid={isInvalidPassword}
        setPassword={setPassword}
      />
      <NotRememberPasswordHint navigation={props.navigation} />
      <LoginAsText />
      <SwitchableButtons setRank={setRank} />
      <LoginYourSelfButton
        onPress={() => {
          var isValidPhone = validatePhone(phoneNumber);
          var isValidPassword = validatePassword(password);
          setIsInvalidPhone(!isValidPhone);
          setIsInvalidPassword(!isValidPassword);
          if (isValidPhone && isValidPassword)
            HandleLoginButtonPress(
              phoneNumber,
              password,
              rank,
              props.navigation
            );
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
  return (
    <FormControl
      size="lg"
      isDisabled={false}
      isInvalid={props.isInvalid}
      isReadOnly={false}
      isRequired={false}
    >
      <PhoneLabel />
      <Input style={styles.inputFields}>
        <InputField
          type="text"
          value={props.phoneNumber}
          placeholder="123123123"
          onChangeText={(actualPhoneNumber) => {
            props.setPhoneNumber(actualPhoneNumber);
          }}
          selectionColor={"black"}
          keyboardType="numeric"
        />
      </Input>
      <PhoneBadInput />
    </FormControl>
  );
};
const PhoneLabel = () => {
  return (
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.phoneText}>
        Telefon
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const PhoneBadInput = () => {
  return (
    <FormControlError>
      <FormControlErrorText style={styles.errors}>
        Telefon musi mieć 9 cyfr!
      </FormControlErrorText>
    </FormControlError>
  );
};
const PasswordInput = (props: {
  password: string | undefined;
  isInvalid: boolean | undefined;
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
      <PasswordLabel />
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
const PasswordLabel = () => {
  return (
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.passwordText}>
        Hasło
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const PasswordBadInput = () => {
  return (
    <FormControlError>
      <FormControlErrorText style={styles.errors}>
        Hasło musi mieć 8 znaków!
      </FormControlErrorText>
    </FormControlError>
  );
};
const NotRememberPasswordHint = (props: {navigation: any}) => {
  return (
    <Button
      action={"secondary"}
      variant={"link"}
      size={"xs"}
      isDisabled={false}
      style={styles.passwordHint}
      onPress={() => {
        props.navigation.navigate('PasswordNotRemember');
      }}
    >
      <ButtonText style={styles.notRememberPasswordText}>
        Nie pamiętasz hasła?
      </ButtonText>
    </Button>
  );
};
const LoginAsText = () => {
  return <Text style={styles.loginAs}>Zaloguj się jako</Text>;
};
const SwitchableButtons = (props: { setRank: (arg0: string) => void }) => {
  const [driverButtonColor, setDriverButtonColor] = useState("#FFB700");
  const [passengerButtonColor, setPassengerButtonColor] = useState("white");
  return (
    <ButtonGroup
      style={{
        paddingTop: 10,
        paddingBottom: 30,
      }}
    >
      <Button
        bgColor={driverButtonColor}
        style={styles.buttons}
        onPress={() => {
          props.setRank("driver");
          setDriverButtonColor("#FFB700");
          setPassengerButtonColor("white");
        }}
      >
        <ButtonText style={styles.buttonText}>Kierowca</ButtonText>
      </Button>
      <Button
        bgColor={passengerButtonColor}
        style={styles.buttons}
        onPress={() => {
          props.setRank("passenger");
          setDriverButtonColor("white");
          setPassengerButtonColor("#FFB700");
        }}
      >
        <ButtonText style={styles.buttonText}>Pasażer</ButtonText>
      </Button>
    </ButtonGroup>
  );
};
const LoginYourSelfButton = (props: any) => {
  return (
    <Button bgColor="#FFB700" style={styles.buttons} onPress={props.onPress}>
      <ButtonText style={styles.buttonText}>Zaloguj</ButtonText>
    </Button>
  );
};
function HandleLoginButtonPress(
  phone: string,
  password: string,
  role: string,
  navigation: any
) {
  const parsedPhoneNumber = parseInt(phone);
  GetUserRequest(parsedPhoneNumber, password, role, navigation);
}
function validatePhone(phone: string) {
  return phone.length == 9;
}
function validatePassword(password: string) {
  return password.length >= 8;
}
async function GetUserRequest(
  phone: number,
  password: string,
  role: string,
  navigation: any
) {
  const database = getDatabase(firebaseConfig);
  const usersLocation = ref(database, "users");
  const userQuery = query(usersLocation, orderByChild("phone"));
  const snapshot = await get(userQuery);
  if (snapshot.exists()) {
    const users = snapshot.val();
    const user = Object.values(users).find((userData: any) => {
      return userData.phone === phone;
    });
    if (user) {
      const validate = Object.values(users).find((userData: any) => {
        if (userData.role != "driver")
          return (
            userData.phone === phone &&
            userData.password === password &&
            userData.role === role
          );
        else
          return (
            userData.phone === phone &&
            userData.password === password
          );
      });
      if (validate) ShowAlert("Sukces", "Pomyślnie zalogowano!");
      else {
        ShowAlert("Błąd", "Wprowadzono błędne dane logowania!");
      }
    } else {
      HandleRegistration(role, navigation);
    }
  } else {
    HandleRegistration(role, navigation);
  }
}
function HandleRegistration(role: string, navigation: any) {
  switch(role) {
    case 'driver':
      navigation.navigate("DriverRegisterPanel");
    break;
    case 'passenger':
      navigation.navigate("PassengerRegisterPanel");
    break;
  }
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
export default LoginPanel;
