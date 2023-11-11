import * as Font from "expo-font";
import styles from "./styles";
import React, { useState } from "react";
import { config } from "@gluestack-ui/config";
import { Alert, Vibration, View } from "react-native";
import { Button, GluestackUIProvider, Text, Box, FormControl, FormControlError, ButtonGroup } from "@gluestack-ui/themed";
import { FormControlErrorText, FormControlLabel, FormControlLabelText, Input} from "@gluestack-ui/themed";
import { InputField, ButtonText, RadioGroup, CircleIcon, Radio, RadioIcon, RadioIndicator, RadioLabel, ScrollView, HStack } from "@gluestack-ui/themed";
function RegisterPanel({ navigation } : { navigation: any }) {
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
    <ScrollView style={styles.registerScrollView}>
      <Text style={styles.registerText}>Zarejestruj się</Text>
      <Text style={styles.invitationTexts}>Nie masz jeszcze konta?</Text>
      <Text style={styles.invitationTexts}>Utwórz je za darmo</Text>
      <MainView navigation={props.navigation} />
    </ScrollView>
  );
};
const MainView = (props: { navigation: any }) => {
  const [rank, setRank] = useState("passenger");
  const [isDriver, setIsDriver] = useState(false);
  return (
    <View style={styles.hintsView}>
      <Label hintText="Wybierz typ konta"/>
      <SwitchableButtons setRank={setRank} setIsDriver={setIsDriver}/>
      <DataForm navigation={props.navigation} isDriver={isDriver}/>       
    </View>
  );
};
const DataForm = (props: { navigation: any, isDriver: boolean }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [voivodeship, setVoivodeship] = useState("");
  const [driverlicense, setDriverlicense] = useState("");
  const [cardid, setCardid] = useState("");
  const [password, setPassword] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("Wprowadzony numer telefonu jest nieprawidłowy!");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("Wprowadzone hasło jest nieprawidłowe!");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidSurname, setIsInvalidSurname] = useState(false);
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isInvalidVoivodeship, setIsInvalidVoivodeship] = useState(false);
  const [isInvalidDriverlicense, setIsInvalidDriverlicense] = useState(false);
  const [isInvalidCardid, setIsInvalidCardid] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidRepeatedPassword, setIsInvalidRepeatedPassword] = useState(false);
  const [isAgreementNotChecked, setIsAgreementNotChecked] = useState(true);
  return (
    <Box style={{paddingHorizontal: 30}}>
      <NameInput name={name} isInvalid={isInvalidName} setName={setName} />
      <SurnameInput surname={surname} isInvalid={isInvalidSurname} setSurname={setSurname} />
      <PhoneInput phoneNumber={phoneNumber} errorMessage={phoneErrorMessage} isInvalid={isInvalidPhone} setPhoneNumber={setPhoneNumber} />
      <VoivodeshipInput voivodeship={voivodeship} isInvalid={isInvalidVoivodeship} setVoivodeship={setVoivodeship} />
      {props.isDriver&&(
      <>
        <DriverLicenseInput driverlicense={driverlicense} isInvalid={isInvalidDriverlicense} setDriverlicense={setDriverlicense} />
        <CardIdInput cardid={cardid} isInvalid={isInvalidCardid} setCardid={setCardid} />
      </>)
      }
      <PasswordInput password={password} errorText={passwordErrorMessage} hintText={"Hasło"} isInvalid={isInvalidPassword} setPassword={setPassword} />
      <PasswordInput password={repeatedPassword} errorText={passwordErrorMessage} hintText={"Powtórz hasło"} isInvalid={isInvalidRepeatedPassword} setPassword={setRepeatedPassword} />
      <AgreementRadioButton isAgreementNotChecked={isAgreementNotChecked} setIsAgreementNotChecked={setIsAgreementNotChecked} />
      <CreateAccountButton onPress={async ()=> {
        const isPhoneExists = await checkIfUserExists(parseInt(phoneNumber));
        if(isPhoneExists)
          setPhoneErrorMessage("Podany numer telefonu już posiada konto!");
        const isValidName = validateData(name);
        const isValidSurname = validateData(surname);
        const isValidPhone = validatePhone(phoneNumber);
        const isValidVoivodeship = validateVoivodeship(voivodeship);
        const isValidDriverLicense = validateDriverLicense(driverlicense);
        const isValidCardid = validateCardId(cardid);
        const isValidPassword = validatePassword(password);
        const isValidRepeatedPassword = validateRepeatedPassword(password, repeatedPassword) && validatePassword(repeatedPassword);
        const isPasswordSecure = validateSecureOfPassword(password);
        const generatedSecret = getSecret(8);
        if(!isPasswordSecure && isValidPassword)
          setPasswordErrorMessage("Hasło musi mieć 1 znak specjalny\ncyfrę i dużą literę!");
        if(!isValidRepeatedPassword && isValidPassword)
          setPasswordErrorMessage("Wprowadzone hasło różni się od oryginału!");
        setIsInvalidName(!isValidName);
        setIsInvalidSurname(!isValidSurname);
        setIsInvalidPhone(!isValidPhone || isPhoneExists);
        setIsInvalidVoivodeship(!isValidVoivodeship);
        setIsInvalidDriverlicense(!isValidDriverLicense);
        setIsInvalidCardid(!isValidCardid);
        setIsInvalidPassword(!isValidPassword || !isPasswordSecure);
        setIsInvalidRepeatedPassword(!isValidRepeatedPassword || !isPasswordSecure);
        if(!isPhoneExists && isValidName && isValidSurname && isValidPhone && isValidVoivodeship && isValidDriverLicense && isValidCardid && isValidPassword && isValidRepeatedPassword && isPasswordSecure && !isAgreementNotChecked && props.isDriver) {
          const dataObject = {
            name: name,
            surname: surname,
            phone: parseInt(phoneNumber),
            voivodeship: voivodeship,
            driverlicense: driverlicense.toUpperCase(),
            cardid: cardid.toUpperCase(), 
            password: password,
            agreement: !isAgreementNotChecked,
            role: 'driver',
            secretPassword: generatedSecret
          };
          await registerUser(dataObject, props.navigation, generatedSecret);
        }
        else if(!isPhoneExists && isValidName && isValidSurname && isValidPhone && isValidVoivodeship && isValidPassword && isValidRepeatedPassword && isPasswordSecure && !isAgreementNotChecked && !props.isDriver) {
          const dataObject = {
            name: name,
            surname: surname,
            phone: parseInt(phoneNumber),
            voivodeship: voivodeship,
            password: password,
            agreement: !isAgreementNotChecked,
            role: 'passenger',
            secretPassword: generatedSecret
          };
          await registerUser(dataObject, props.navigation, generatedSecret);
        }
      }}/>
      <Text style={styles.registerBottomHint}>Tworząc nowe konto będą obowiązywać Cię</Text>
      <BottomInformation navigation={props.navigation} />
    </Box>
  );
};
const SwitchableButtons = (props: {
  setRank: (arg0: string) => void;
  setIsDriver: (arg0: boolean) => void;
}) => {
  const [driverButtonColor, setDriverButtonColor] = useState("white");
  const [passengerButtonColor, setPassengerButtonColor] = useState("#FFB700");
  return <ButtonGroup style={{
    paddingTop: 10,
    paddingBottom: 30
  }}>
    <Button bgColor={passengerButtonColor} style={styles.buttons} onPress={() => {
      props.setRank("passenger");
      setDriverButtonColor("white");
      setPassengerButtonColor("#FFB700");
      props.setIsDriver(false);
    }}>
      <ButtonText style={styles.buttonText}>Pasażer</ButtonText>
    </Button>
    <Button bgColor={driverButtonColor} style={styles.buttons} onPress={() => {
      props.setRank("driver");
      setDriverButtonColor("#FFB700");
      setPassengerButtonColor("white");
      props.setIsDriver(true);
    }}>
      <ButtonText style={styles.buttonText}>Kierowca</ButtonText>
    </Button>
  </ButtonGroup>;
};
const NameInput = (props: {
  name: string | undefined;
  isInvalid: boolean | undefined;
  setName: (arg0: string) => void;
}) => {
  return (
    <FormControl size="lg" isDisabled={false} isInvalid={props.isInvalid} isReadOnly={false} isRequired={false}>
      <Label hintText="Imię"/>
      <Input style={styles.inputFields}>
        <InputField type="text" value={props.name} placeholder="Adam" onChangeText={actualName => {
          props.setName(actualName);
        }} selectionColor={"black"} />
      </Input>
      <BadInput hintText="Wprowadzone imię jest nieprawidłowe!" />
    </FormControl>
  );
};
const SurnameInput = (props: {
  surname: string | undefined;
  isInvalid: boolean | undefined;
  setSurname: (arg0: string) => void;
}) => {
  return (
    <FormControl size="lg" isDisabled={false} isInvalid={props.isInvalid} isReadOnly={false} isRequired={false}>
      <Label hintText="Nazwisko" />
      <Input style={styles.inputFields}>
        <InputField type="text" value={props.surname} placeholder="Kielecki" onChangeText={actualSurname => {
          props.setSurname(actualSurname);
        }} selectionColor={"black"} />
      </Input>
      <BadInput hintText="Wprowadzone nazwisko jest nieprawidłowe!" />
    </FormControl>
  );
};
const PhoneInput = (props: {
  phoneNumber: string | undefined;
  errorMessage: string | undefined;
  isInvalid: boolean | undefined;
  setPhoneNumber: (arg0: string) => void;
}) => {
  return <FormControl size="lg" isDisabled={false} isInvalid={props.isInvalid} isReadOnly={false} isRequired={false}>
    <Label hintText="Numer telefonu" />
    <Input style={styles.inputFields}>
      <InputField type="text" value={props.phoneNumber} placeholder="123123123" onChangeText={actualPhoneNumber => {
        props.setPhoneNumber(actualPhoneNumber);
      }} selectionColor={"black"} keyboardType="numeric" />
    </Input>
    <BadInput hintText={props.errorMessage}/>
  </FormControl>;
};
const VoivodeshipInput = (props: {
  voivodeship: string | undefined;
  isInvalid: boolean | undefined;
  setVoivodeship: (arg0: string) => void;
}) => {
  return (
    <FormControl size="lg" isDisabled={false} isInvalid={props.isInvalid} isReadOnly={false} isRequired={false}>
      <Label hintText="Województwo"/>
      <Input style={styles.inputFields}>
        <InputField type="text" value={props.voivodeship} placeholder="Świętokrzyskie" onChangeText={actualVoviodeship => {
          props.setVoivodeship(actualVoviodeship);
        }} selectionColor={"black"} />
      </Input>
      <BadInput hintText="Wprowadzone województwo jest nieprawidłowe!" />
    </FormControl>
  );
};
const DriverLicenseInput = (props: {
  driverlicense: string | undefined;
  isInvalid: boolean | undefined;
  setDriverlicense: (arg0: string) => void;
}) => {
  return (
    <FormControl size="lg" isDisabled={false} isInvalid={props.isInvalid} isReadOnly={false} isRequired={false}>
      <Label hintText="Numer prawa jazdy"/>
      <Input style={styles.inputFields}>
        <InputField type="text" value={props.driverlicense} placeholder="C1234567" onChangeText={actualDriverlicense => {
          props.setDriverlicense(actualDriverlicense);
        }} selectionColor={"black"} />
      </Input>
      <BadInput hintText="Wprowadzone prawo jazdy jest nieprawidłowe!" />
    </FormControl>
  );
};
const CardIdInput = (props: {
  cardid: string | undefined;
  isInvalid: boolean | undefined;
  setCardid: (arg0: string) => void;
}) => {
  return (
    <FormControl size="lg" isDisabled={false} isInvalid={props.isInvalid} isReadOnly={false} isRequired={false}>
      <Label hintText="Numer dowodu osobistego"/>
      <Input style={styles.inputFields}>
        <InputField type="text" value={props.cardid} placeholder="COS 224422" onChangeText={actualCardid => {
          props.setCardid(actualCardid);
        }} selectionColor={"black"} />
      </Input>
      <BadInput hintText="Wprowadzony dowód osobisty jest nieprawidłowy!" />
    </FormControl>
  );
};
const PasswordInput = (props: {
  password: string | undefined;
  errorText: string | undefined;
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
      <Label hintText={props.hintText}/>
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
      <BadInput hintText={props.errorText}/>
    </FormControl>
  );
};
const AgreementRadioButton = (props: {isAgreementNotChecked: boolean | undefined, setIsAgreementNotChecked: any | undefined}) => {
  const [values, setValues] = useState("");
  const [color, setColor] = useState('red');
  const handleRadioChange = () => {
    setValues("Agree");
    props.setIsAgreementNotChecked(false);
    setColor('black');
  };
  return (
    <RadioGroup value={values} borderColor="black" onChange={handleRadioChange}>
      <Radio value="Agree" size="md" isInvalid={props.isAgreementNotChecked} isDisabled={false} onChange={handleRadioChange}>
        <RadioIndicator mr={"$1"} borderColor={color}>
          <RadioIcon as={CircleIcon} style={styles.circleIcon} />
        </RadioIndicator>
        <RadioLabel style={styles.radioLabelText}>Wyrażam zgodę na otrzymywanie na podany numer połączeń telefonicznych 
        oraz wiadomości SMS w tym za pośrednictwem systemów automatycznych od YellowCabs i połączeń firmowych</RadioLabel>
      </Radio>
    </RadioGroup>
  );
};
const CreateAccountButton = (props: any) => {
  return (
    <Button bgColor="#FFB700" style={styles.registerButton} onPress={props.onPress}>
      <ButtonText style={styles.buttonText}>Utwórz konto</ButtonText>
    </Button>
  );
};
const BottomInformation = (props: {
  navigation: any;}) => {
  return (
      <HStack space="xs" style={styles.registrationHStack}>
        <Button action={"secondary"} variant={"link"} size={"xs"} isDisabled={false} style={styles.hint} onPress={() => {
        props.navigation.navigate('TermsAndConditions');
      }}>
        <ButtonText style={styles.rulesAndTermsButton}>
          Zasady & Warunki
        </ButtonText>
      </Button>
      <Text style={{marginRight: -100}}>i</Text>
      <Button action={"secondary"} variant={"link"} size={"xs"} isDisabled={false} style={styles.hint} onPress={() => {
      props.navigation.navigate('PrivacyPolicy');
      }}>
        <ButtonText style={styles.privacyPolicyButton}>
          Polityka prywatności
        </ButtonText>
      </Button>
    </HStack>
  );
};
const Label = (props: {hintText: string}) => {
  return (
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.labelText}>
        <Text>{props.hintText}</Text>
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const BadInput = (props: {hintText: string | undefined}) => {
  return (
    <FormControlError>
      <FormControlErrorText style={styles.errors}>
        {props.hintText}
      </FormControlErrorText>
    </FormControlError>
  );
};
async function checkIfUserExists(phone: number) {
  const firebaseDatabaseURL = 'https://yellowcabs-default-rtdb.europe-west1.firebasedatabase.app';
  const databasePath = '/users.json'; 
  const apiKey = 'AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ';
  const getRequestURL = `${firebaseDatabaseURL}${databasePath}?key=${apiKey}`;
  try {
    const response = await fetch(getRequestURL);
    const data = await response.json();
    for(const userKey in data) {
      const user = data[userKey];
      if(user.phone===phone)
        return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
async function registerUser(data: any, navigation: any, secret: string) {
  const firebaseDatabaseURL = 'https://yellowcabs-default-rtdb.europe-west1.firebasedatabase.app';
  const databasePath = '/users.json'; 
  const apiKey = 'AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ';
  const requestURL = `${firebaseDatabaseURL}${databasePath}?key=${apiKey}`;
  try {
    const postResponse = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });
    if (postResponse.ok) {
      ShowAlert("Sukces", "Pomyślnie zarejestrowano konto!\nTwój sekret to: " + secret +"\nZapisz go w bezpiecznym miejscu!");
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
function validateData(data: string) {
  return data.length>=3;
}
function validatePhone(phone: string) {
  var phonePattern = /^[0-9]{9}$/;
  return phone.length == 9 && phonePattern.test(phone);
}
function validateVoivodeship(voivodeship: string) {
  let voivodeships: string[] = ['dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie', 'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'];
  for(let i=0; i<16; i++) 
    if(voivodeships[i]==voivodeship.toLowerCase())
      return true;
  return false;
}
function validatePassword(password: string) {
  return password.length >= 8;
}
function validateRepeatedPassword(password: string, repeatedPassword: string) {
  return repeatedPassword===password;
}
function validateSecureOfPassword(password: string) {
  var passPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passPattern.test(password);
}
function validateDriverLicense(driverLicense: string) {
  const driverLicensePattern = /^[a-zA-Z]{1}\d{7}$/;
  return driverLicense.length === 8 && driverLicensePattern.test(driverLicense);
}
function validateCardId(cardId: string) {
  const cardIdPattern = /^[a-zA-Z]{3}\s\d{6}$/;
  return cardId.length === 10 && cardIdPattern.test(cardId);
}
export default RegisterPanel;