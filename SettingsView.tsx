import * as Font from "expo-font";
import styles from "./styles";
import React, { useState } from "react";
import { config } from "@gluestack-ui/config";
import { Alert, Vibration } from "react-native";
import { Button, GluestackUIProvider, Text, Box, FormControl, FormControlError, ButtonGroup, Switch } from "@gluestack-ui/themed";
import { FormControlErrorText, FormControlLabel, FormControlLabelText, Input} from "@gluestack-ui/themed";
import { InputField, ButtonText, RadioGroup, CircleIcon, Radio, RadioIcon, RadioIndicator, RadioLabel, ScrollView, View, Image } from "@gluestack-ui/themed";
import { useRoute } from '@react-navigation/native';
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

interface RouteParams {
    rank?: string;
    name?: string;
    surname?: string;
    id?: number;
    avatarLink?: string;
  }

export default function SettingsView() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const route = useRoute();
    const { rank, name, surname, id, avatarLink } = route.params as RouteParams;
    const [newName, setName] = useState(name);
    const [newSurname, setSurname] = useState(surname);
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    let finalRank = 'Pasażer';
    if(rank=='driver')
      finalRank = 'Kierowca';
    return (
        <ScrollView style={{marginTop: 50}}>
            <Text style={styles.accountSettings}>Ustawienia konta</Text>
            <View style={styles.allContainer}>
                <View style={{alignItems:'center'}}>
                    <View>  
                        <Text style={{fontFamily: 'DejaVuSans', fontSize: 18, fontWeight: 'bold'}}>{name} {surname}</Text>
                        <Text style={{fontFamily: 'DejaVuSans', fontSize: 15, marginLeft: 25}}>{finalRank}</Text>
                    </View>
                    <View style={{borderBottomWidth: 2}}>
                        <Image source={{ uri: avatarLink }} style={styles.image} alt="User Avatar"/>
                    </View>
                </View>
                <View flexDirection="row" style={{alignItems:'center'}}>
                    <Text>Powiadomienia</Text>
                    <Switch 
                        trackColor={{false: '#767577', true: '#33cc00'}}
                        thumbColor={isEnabled() ? '#f5dd4b' : '#f4f3f4'}
                        isDisabled={false}
                        isChecked={true}
                        size="md"
                    />
                </View>
                <View flexDirection="row" style={{alignItems:'center'}}>
                    <Text>Wibracje</Text>
                    <Switch 
                        trackColor={{false: '#767577', true: '#33cc00'}}
                        thumbColor={isEnabled() ? '#f5dd4b' : '#f4f3f4'}
                        isDisabled={false}
                        isChecked={true}
                        size="md"
                    />
                </View>
                <Button 
                    style={styles.changeAccountPhoto}
                    onPress={() => {
                    }}
                >
                    <ButtonText 
                    style={{
                        color: 'black', 
                        fontFamily: 'DejaVuSans', 
                        fontSize: 12
                    }}
                    >
                    Zmień zdjęcie profilowe
                    </ButtonText>
                </Button>
                <View flexDirection="row" style={{alignItems:'center'}}>
                    <Text>Zaktualizuj dane osobowe</Text>
                    <Switch 
                        trackColor={{false: '#767577', true: '#33cc00'}}
                        thumbColor={isEnabled() ? '#f5dd4b' : '#f4f3f4'}
                        isDisabled={false}
                        isChecked={true}
                        size="md"
                    />
                </View>
                <Box style={{paddingHorizontal: 30}}>
                <NameInput name={name} setName={setName} />
                <SurnameInput surname={surname} setSurname={setSurname} />
                <PhoneInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                <PasswordInput password={password} hintText={"Hasło"} setPassword={setPassword} />
                <PasswordInput password={repeatedPassword} hintText={"Powtórz hasło"} setPassword={setRepeatedPassword} />
                <ConfirmButton onPress={console.log('test')} />
                </Box>
            </View>
        </ScrollView>
    )
}
const NameInput = (props: {
    name: string | undefined;
    setName: (arg0: string) => void;
  }) => {
    return (
      <FormControl size="lg" isDisabled={false} isReadOnly={false} isRequired={false}>
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
    setSurname: (arg0: string) => void;
  }) => {
    return (
      <FormControl size="lg" isDisabled={false} isReadOnly={false} isRequired={false}>
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
    setPhoneNumber: (arg0: string) => void;
  }) => {
    return <FormControl size="lg" isDisabled={false} isReadOnly={false} isRequired={false}>
      <Label hintText="Numer telefonu" />
      <Input style={styles.inputFields}>
        <InputField type="text" value={props.phoneNumber} placeholder="123123123" onChangeText={actualPhoneNumber => {
          props.setPhoneNumber(actualPhoneNumber);
        }} selectionColor={"black"} keyboardType="numeric" />
      </Input>
    </FormControl>;
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
      <Button bgColor="#FFB700" style={styles.registerButton} onPress={props.onPress}>
        <ButtonText style={styles.buttonText}>Zatwierdź</ButtonText>
      </Button>
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