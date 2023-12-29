# YellowCabs

YellowCabs is an mobile application which is simulating an real mobile app to ride as a taxi driver or booking an taxi courses as passenger. 

## Installation

Clone the project into your local machine using following command: 

```bash
https://github.com/miluski/YellowCabs.git
```

Then, in terminal, provide this command to install node_modules packages:

```bash
npm install
```

You will need also a file named api.config.js in root directory of the project and provide to it above informations:

```javascript
export const FirebaseApiCredentials = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    appId: "YOUR_FIREBASE_APP_ID", 
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    databaseURL: "YOUR_FIREBASE_DATABASE_URL",
    storageBucket: "YOUR_FIREBASE_STORAGE_URL"
}
export const GoogleApiCredentials = {
    apiKey: "YOUR_GOOGLE_API_KEY"
}
```

Used google apis: Places API, Directions API, Distance Matrix API, Geocoding API. Your google api key must have access to mentioned apis.

## Usage

To use this app you will need expo go app installed on your phone or emulated phone. You can run the app via expo, but first you need to run a metro bundler using this command in terminal:

```bash
npx expo --go --tunnel
```

or if you want use it only in LAN:

```bash
npx expo --go
```

## Screenshoots

![Alt Text](./img/Screenshot_20231229_210221_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210413_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210420_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210427_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210433_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210440_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210545_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210647_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210722_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210729_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210750_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210759_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210804_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210811_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210839_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210850_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210856_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210934_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210948_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_210954_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211014_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211033_Media.jpg)
![Alt Text](./img/Screenshot_20231229_211047_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211122_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211153_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211158_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211235_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211247_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211254_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211311_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211319_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211346_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211355_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211419_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211453_Expo_Go.jpg)
![Alt Text](./img/Screenshot_20231229_211507_Expo_Go.jpg)

## License

[MIT](https://choosealicense.com/licenses/mit/)