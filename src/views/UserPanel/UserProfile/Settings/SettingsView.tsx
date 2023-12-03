import styles from "./styles";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import { Alert, Vibration } from "react-native";
import { Button, Text, Box, FormControl, FormControlError, Switch } from "@gluestack-ui/themed";
import { FormControlErrorText, FormControlLabel, FormControlLabelText, Input} from "@gluestack-ui/themed";
import { InputField, ButtonText, ScrollView, View, Image } from "@gluestack-ui/themed";
interface RouteParams {
    phoneNumber?: string;
    rank?: string;
    name?: string;
    surname?: string;
    avatarLink?: string;
    vibrations?: string;
    notifications?: string;
}
export default function SettingsView({navigation}: any) {
  const route = useRoute();
  const { rank, name, surname, phoneNumber, avatarLink, vibrations, notifications } = route.params as RouteParams;
  let finalRank = 'Pasażer';
  if(rank=='driver')
    finalRank = 'Kierowca';
  let finalVibrations = false;
  let finalNotifications = false;
  if(vibrations=='yes')
    finalVibrations = true;
  if(notifications=='yes')
    finalNotifications = true;
  const [phone, setPhone] = useState(phoneNumber);
  const [newName, setName] = useState(name);
  const [newSurname, setSurname] = useState(surname);
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [actualizePersonalData, setActualizePersonalData] = useState(false);
  const [isVibrationSwitchChecked, setIsVibrationSwitchChecked] = useState(finalVibrations); 
  const [isNotificationsSwitchChecked, setIsNotificationsSwitchChecked] = useState(finalNotifications);
  if(newName && newSurname && phone) {
    return (
      <ScrollView style={styles.settingsScrollView}>
        <Text style={styles.accountSettingsText}>Ustawienia konta</Text>
        <View style={styles.mainPanelView}>
            <TextAndAvatarView 
              name={newName}
              surname={newSurname}
              finalRank={finalRank}
              avatarLink={avatarLink}
            />
            <NotificationsSwitchOption 
              setIsChecked={setIsNotificationsSwitchChecked}
              isChecked={isNotificationsSwitchChecked}
            />
            <VibrationsSwitchOption 
              setIsChecked={setIsVibrationSwitchChecked}
              isChecked={isVibrationSwitchChecked}
            />
            {isNotificationsSwitchChecked!=finalNotifications || isVibrationSwitchChecked!=finalVibrations?
              <ConfirmButton 
                onPress={() => {
                  HandleChangeAppSettings(String(isVibrationSwitchChecked), String(isNotificationsSwitchChecked), phoneNumber, navigation);
                }}
              />
              :
              <></>
            }
            <ChangeProfilePhotoButton/>
            <ActualizePersonalDataSwitchButton
              actualizePersonalData={actualizePersonalData}
              setActualizePersonalData={setActualizePersonalData}
            />
            {actualizePersonalData?
              <DataForm
                name={newName}
                surname={newSurname}
                phone={phone}
                oldPhone={phoneNumber}
                password={password}
                repeatedPassword={repeatedPassword}
                setName={setName}
                setSurname={setSurname}
                setPhone={setPhone}
                setPassword={setPassword}
                setRepeatedPassword={setRepeatedPassword}
                navigation={navigation}
              />
              :
              <></>
            }
        </View>
      </ScrollView>
    ) 
  }
}
const TextAndAvatarView = (props:{
  name : string | undefined,
  surname: string | undefined,
  finalRank: string | undefined,
  avatarLink: string | undefined
}) => {
  return (
    <View style={styles.textAndAvatarView}> 
      <Text style={styles.nameSurnameText}>{props.name} {props.surname}</Text>
      <Text style={styles.rankText}>{props.finalRank}</Text>
      <View style={styles.imageView}>
          <Image 
            source={{ 
              uri: props.avatarLink 
            }} 
            style={styles.userAvatar} 
            alt="User Avatar"
          />
      </View>
      <View style={styles.bottomUnderLineView}/>
    </View>
  );
}
const NotificationsSwitchOption = (props: {
  setIsChecked: any,
  isChecked: any
}) => {
  return (
    <View style={styles.switchOptionView}>
      <Text>Powiadomienia</Text>
      <Switch style={styles.switchButtonStyle}
          trackColor={{
            false: '#767577', 
            true: '#33cc00'
          }}
          thumbColor={isEnabled() ? 
            '#f5dd4b' : 
            '#f4f3f4'
          }
          isDisabled={false}
          value={props.isChecked}
          size="md"
          onChange={()=>{
            props.setIsChecked(!props.isChecked);
          }}
      />
    </View>
  );
}
const VibrationsSwitchOption = (props: {
  setIsChecked: any,
  isChecked: any
}) => {
  return (
    <View style={styles.switchOptionView}>
      <Text>Wibracje</Text>
      <Switch style={styles.switchButtonStyle} 
          trackColor={{
            false: '#767577', 
            true: '#33cc00'
          }}
          thumbColor={isEnabled() ? 
            '#f5dd4b' : 
            '#f4f3f4'
          }
          isDisabled={false}
          value={props.isChecked}
          size="md"
          onChange={()=>{
            props.setIsChecked(!props.isChecked);
          }}
      />
    </View>
  );
}
const ChangeProfilePhotoButton = () => {
  return (
    <Button 
      style={styles.actionButtons}
      onPress={async () => {
        await handleChangeProfilePhoto();
      }}
    >
      <Feather 
        name="upload-cloud" 
        size={24} 
        color="black" 
      />
      <ButtonText style={styles.changeProfilePhotoButtonText}>
        Zmień zdjęcie profilowe
      </ButtonText>
    </Button>
  );
}
const ActualizePersonalDataSwitchButton = (props: {
  actualizePersonalData: boolean,
  setActualizePersonalData: any
}) => {
  return (
    <View style={styles.switchOptionView}>
      <Text>Zaktualizuj dane osobowe</Text>
      <Switch style={styles.switchButtonStyle}
          trackColor={{
            false: '#767577', 
            true: '#33cc00'
          }}
          thumbColor={isEnabled() ? 
            '#f5dd4b' : 
            '#f4f3f4'
          }
          isDisabled={false}
          isChecked={true}
          onChange={()=>{
            props.setActualizePersonalData(!props.actualizePersonalData)
          }}
          size="md"
      />
    </View>
  );
}
const DataForm = (props: {
  name: string,
  surname: string,
  phone: string,
  oldPhone: string | undefined,
  password: string,
  repeatedPassword: string,
  setName: any | undefined,
  setSurname: any | undefined,
  setPhone: any | undefined,
  setPassword: any | undefined,
  setRepeatedPassword: any | undefined,
  navigation: any
}) => {
  const dataToUpdate = {
    name: props.name,
    surname: props.surname,
    phone: props.phone,
    password: props.password,
    repeatedPassword: props.repeatedPassword
  };
  return (
    <Box style={styles.inputDataBox}>
      <NameInput 
        name={props.name} 
        setName={props.setName} 
      />
      <SurnameInput 
        surname={props.surname} 
        setSurname={props.setSurname} 
      />
      <PhoneInput 
        phoneNumber={props.phone} 
        setPhoneNumber={props.setPhone} 
      />
      <PasswordInput 
        password={props.password} 
        hintText={"Hasło"} 
        setPassword={props.setPassword} 
      />
      <PasswordInput 
        password={props.repeatedPassword} 
        hintText={"Powtórz hasło"} 
        setPassword={props.setRepeatedPassword} 
      />
      <ConfirmButton onPress={() => {
          if(validateData(dataToUpdate.name) && validateData(dataToUpdate.surname) &&
            validatePhone(dataToUpdate.phone) && validatePassword(dataToUpdate.password) && 
            validateRepeatedPassword(dataToUpdate.password, dataToUpdate.repeatedPassword))
            HandleEditData(dataToUpdate, props.oldPhone, true, props.navigation);
          else if(validateData(dataToUpdate.name) && validateData(dataToUpdate.surname) &&
          validatePhone(dataToUpdate.phone))
            HandleEditData(dataToUpdate, props.oldPhone, false, props.navigation);
          else
            ShowAlert("Błąd", "Wypełnij poprawnie wszystkie pola");
        }} 
      />
    </Box>
  );
}
const NameInput = (props: {
    name: string | undefined;
    setName: (arg0: string) => void;
}) => {
  return (
    <FormControl 
      size="lg" 
      isDisabled={false}
      isReadOnly={false} 
      isRequired={false}
    >
      <Label hintText="Imię"/>
      <Input style={styles.inputFields}>
        <InputField 
          type="text" 
          value={props.name} 
          placeholder="Adam" 
          onChangeText={actualName => {
            props.setName(actualName);
          }} 
          selectionColor={"black"} 
        />
      </Input>
      <BadInput hintText="Wprowadzone imię jest nieprawidłowe!"/>
    </FormControl>
  );
};
const SurnameInput = (props: {
  surname: string | undefined;
  setSurname: (arg0: string) => void;
}) => {
  return (
    <FormControl 
      size="lg" 
      isDisabled={false} 
      isReadOnly={false} 
      isRequired={false}
    >
      <Label hintText="Nazwisko"/>
      <Input style={styles.inputFields}>
        <InputField 
          type="text" 
          value={props.surname} 
          placeholder="Kielecki" 
          onChangeText={actualSurname => {
            props.setSurname(actualSurname);
          }} 
          selectionColor={"black"} 
        />
      </Input>
      <BadInput hintText="Wprowadzone nazwisko jest nieprawidłowe!"/>
    </FormControl>
  );
};
const PhoneInput = (props: {
  phoneNumber: string | undefined;
  setPhoneNumber: (arg0: string) => void;
}) => {
  return( 
    <FormControl 
      size="lg" 
      isDisabled={false} 
      isReadOnly={false} 
      isRequired={false}
    >
      <Label hintText="Numer telefonu" />
      <Input style={styles.inputFields}>
        <InputField 
          type="text" 
          value={props.phoneNumber} 
          placeholder="123123123" 
          onChangeText={actualPhoneNumber => {
            props.setPhoneNumber(String(actualPhoneNumber));
          }} 
          selectionColor={"black"} 
          keyboardType="numeric" 
        />
      </Input>
    </FormControl>
  );
};
const PasswordInput = (props: {
  password: string | undefined;
  hintText: string;
  setPassword: (arg0: string) => void;
}) => {
  return (
    <FormControl
      size="lg"
      isDisabled={false}
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
    </FormControl>
  );
};
const ConfirmButton = (props: any) => {
  return (
    <Button
      bgColor="#FFB700"
      style={styles.actionButtons}
      onPress={props.onPress}
    >
      <ButtonText style={styles.confirmButtonText}>
        Zatwierdź
      </ButtonText>
    </Button>
  );
};
const Label = (props: {hintText: string}) => {
  return (
    <FormControlLabel mb="$1">
      <FormControlLabelText style={styles.formInputControlLabelText}>
        <Text>{props.hintText}</Text>
      </FormControlLabelText>
    </FormControlLabel>
  );
};
const BadInput = (props: {hintText: string | undefined}) => {
  return (
    <FormControlError>
      <FormControlErrorText style={styles.formInputErrorLabelText}>
        {props.hintText}
      </FormControlErrorText>
    </FormControlError>
  );
};
function validateData(data: string) {
  return data.length>=3;
}
function validatePhone(phone: string) {
  var phonePattern = /^[0-9]{9}$/;
  return phone.length == 9 && phonePattern.test(phone);
}
function validatePassword(password: string) {
  var passPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return password.length>=8 && passPattern.test(password);
}
function validateRepeatedPassword(password: string, repeatedPassword: string) {
  return repeatedPassword===password;
}
async function handleChangeProfilePhoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
}
async function HandleEditData(
  dataToUpdate: any | undefined,
  oldPhone: string | undefined,
  hasPassword: boolean | undefined,
  navigation: any
) {
  try {
    const firebaseDatabaseURL = 'https://yellowcabs-default-rtdb.europe-west1.firebasedatabase.app';
    const databasePath = '/users.json';
    const apiKey = 'AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ';
    const requestURL = `${firebaseDatabaseURL}${databasePath}?key=${apiKey}`;
    const response = await fetch(requestURL);
    const data = await response.json();
    const userKey = GetUserKey(oldPhone, data);
    if (userKey !== null) {
      const updatedUserData = {
        ...(hasPassword
          ? { password: dataToUpdate.password, repeatedPassword: dataToUpdate.repeatedPassword }
          : {}),
        name: dataToUpdate.name,
        surname: dataToUpdate.surname,
        phone: dataToUpdate.phone,
      };
      const url = `${firebaseDatabaseURL}/users/${userKey}.json?key=${apiKey}`;
      const putResponse = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });
      if (putResponse.ok) {
        ShowAlert("Sukces", "Wybrane dane zostały zaktualizowane pomyślnie!");
        navigation.navigate("Główna", {
          name: dataToUpdate.name,
          surname: dataToUpdate.surname,
          phone: dataToUpdate.phone,
        });
      } else {
        ShowAlert("Błąd", "Wystąpił nieoczekiwany błąd!");
      }
    } else {
      ShowAlert("Błąd", "Wystąpił nieoczekiwany błąd!");
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
async function HandleChangeAppSettings(
  vibration: string | undefined, 
  notifications: string | undefined,
  oldPhone: string | undefined,
  navigation: any
) {
  const firebaseDatabaseURL = 'https://yellowcabs-default-rtdb.europe-west1.firebasedatabase.app';
  const databasePath = '/users.json';
  const apiKey = 'AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ';
  const requestURL = `${firebaseDatabaseURL}${databasePath}?key=${apiKey}`;
  const response = await fetch(requestURL);
  const data = await response.json();
  const userKey = GetUserKey(oldPhone, data);
  let finalNotifications = "no";
  let finalVibrations = "no";
  if(notifications=="true")
    finalNotifications = "yes";
  if(vibration=="true")
    finalVibrations = "yes";
  if (userKey !== null) {
    const updatedUserData = {
      vibrations: finalVibrations,
      notifications: finalNotifications
    };
    const url = `${firebaseDatabaseURL}/users/${userKey}.json?key=${apiKey}`;
    const putResponse = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });
    if (putResponse.ok) {
      ShowAlert("Sukces", "Wybrane dane zostały zaktualizowane pomyślnie! \nNastąpi wylogowanie celem zaktualizowania ustawień!");
      navigation.navigate("LoginPanel");
    } else {
      ShowAlert("Błąd", "Wystąpił nieoczekiwany błąd!");
    }
  } else {
    ShowAlert("Błąd", "Wystąpił nieoczekiwany błąd!");
  }
}
function GetUserKey(phone: string | undefined, data: any) {
  for (const userKey in data) {
    const user = data[userKey];
    if (user.phone == phone) {
      return userKey;
    }
  }
  return '';
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