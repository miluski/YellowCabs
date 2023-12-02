import styles from "./styles";
import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import { Button, Text, Box, FormControl, FormControlError, ButtonGroup, Switch } from "@gluestack-ui/themed";
import { FormControlErrorText, FormControlLabel, FormControlLabelText, Input} from "@gluestack-ui/themed";
import { InputField, ButtonText, ScrollView, View, Image } from "@gluestack-ui/themed";
interface RouteParams {
    rank?: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    avatarLink?: string;
}
export default function SettingsView() {
    const route = useRoute();
    const { rank, name, surname, phoneNumber, avatarLink } = route.params as RouteParams;
    const [phone, setPhone] = useState(phoneNumber);
    const [newName, setName] = useState(name);
    const [newSurname, setSurname] = useState(surname);
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [actualizePersonalData, setActualizePersonalData] = useState(false);
    let finalRank = 'Pasażer';
    if(rank=='driver')
      finalRank = 'Kierowca';
    return (
      <ScrollView style={styles.settingsScrollView}>
        <Text style={styles.accountSettingsText}>Ustawienia konta</Text>
        <View style={styles.mainPanelView}>
            <TextAndAvatarView 
              name={name}
              surname={surname}
              finalRank={finalRank}
              avatarLink={avatarLink}
            />
            <NotificationsSwitchOption/>
            <VibrationsSwitchOption/>
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
                password={password}
                repeatedPassword={repeatedPassword}
                setName={setName}
                setSurname={setSurname}
                setPhone={setPhone}
                setPassword={setPassword}
                setRepeatedPassword={setRepeatedPassword}
              />
              :
              <></>
            }
        </View>
      </ScrollView>
    )
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
const NotificationsSwitchOption = () => {
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
          isChecked={true}
          size="md"
      />
    </View>
  );
}
const VibrationsSwitchOption = () => {
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
          isChecked={true}
          size="md"
      />
    </View>
  );
}
const ChangeProfilePhotoButton = () => {
  return (
    <Button 
      style={styles.actionButtons}
      onPress={() => {
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
  name: string | undefined,
  surname: string | undefined,
  phone: string | undefined,
  password: string | undefined,
  repeatedPassword: string | undefined,
  setName: any | undefined,
  setSurname: any | undefined,
  setPhone: any | undefined,
  setPassword: any | undefined,
  setRepeatedPassword: any | undefined
}) => {
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
      <ConfirmButton onPress={()=>{}} />
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