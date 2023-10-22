import  { initializeApp } from 'firebase/app';

const firebaseConf = {
  apiKey: 'AIzaSyDeyE8rWM6Jqyq-IyujTPd19BdL8MQvqpQ',
  databaseURL: 'https://yellowcabs-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'yellowcabs',
  messagingSenderId: '447116941349',
  appId: 'com.yellowcabs',
};

const firebaseConfig = initializeApp(firebaseConf);

export default firebaseConfig;