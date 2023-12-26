import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import styles from "./styles";

export default function App() {
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [amount, setAmount] = useState("");
  const [serialnumber, setSerialNumber] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    //Postac kodu qr: JSQR-0001-100-20231231-1a2b3c4d
    //Inna postac qr: MSQR-0001-200-20231231-4a3b2c1d
    //				    symbol-serial-kwota-data-sumakontrolna

    const parts = data.split("-");
    if (parts.length !== 5) {
      alert("Kod QR jest nieoryginalny!");
      return false;
    }
    //Symbol
    if (parts[0] !== "JSQR" && parts[0] !== "MSQR") {
      alert("Kod QR jest nieoryginalny!");
      return false;
    }
    //Kwota
    if (!/^\d+$/.test(parts[2])) {
      alert("Kod QR jest nieoryginalny!");
      return false;
    }
    //Data waznosci
    const currentDate = new Date();
    const expiryDate = new Date(
      parts[3].substring(0, 4),
      parts[3].substring(4, 6) - 1,
      parts[3].substring(6, 8),
    );
    if (currentDate > expiryDate) {
      alert("Kod QR jest przeterminowany!");
      setAmount("0");
      return false;
    }
    //suma kontrolna
    const checksum = parts[4];
    if(checksum !== '1a2b3c4d' && checksum !== '4a3b2c1d'){
      alert("Kod QR jest nieoryginalny!");
      return false;
    }
    //Nr seryjny 
    if(parts[1]==="1" || parts[1]==="2" || parts[1]==="3" || parts[1]==="4"){
      alert("Wykorzystano kod uniwersalny");
      //Te kody można w nieskończonosc seryjny 1,2,3,4
    }
    else if (!/^\d+$/.test(parts[1])) {
      //Trzeba sprawdzic czy numer seryjny był wykorzystany w bazie
      alert("Kod QR jest nieoryginalny lub został już wykorzystany!");
      return false;
    }
    
    setAmount(parts[2]);
    setData(data);
  };

  if (hasPermission === null) {
    return <Text>Prośba o pozwolenie na użycie aparatu</Text>;
  }
  if (hasPermission === false) {
    return <Text>Brak zezwolenia dla aparatu</Text>;
  }

  const handleScanAgain = () => {
    setScanned(false);
    setData("");
  };

  const handleConfirm = () => {
    // Tutaj obsluga wysłania danych kasy do bazy
    if (amount !== "0") alert(`Potwierdzono kwotę doładowania: ${amount} zł`);
  };

  return (
    <View style={styles.CameraContainer}>
      <Text style={styles.scanQrText}>Skanuj kod QR</Text>
      <View style={styles.barcodeScanner}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.absoluteFillObject}
        />
      </View>
      {scanned && (
        <View>
          <Text style={styles.Cameratext}>Pomyślnie zeskanowano kod!</Text>
          <Text style={styles.Cameratext}>Kwota doładowania: {amount} zł</Text>
          <View style={styles.CameraButtonsView}>
            <Button title="Skanuj ponownie" onPress={handleScanAgain} />
            <Button title="Zatwierdź" onPress={handleConfirm} />
          </View>
        </View>
      )}
    </View>
  );
}